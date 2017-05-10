package main

import(
	"httprouter"
	"net/http"
	"html/template"
	"log"
	"fmt"
	//"strings"
)

func GenHome(w http.ResponseWriter , r *http.Request, _ httprouter.Params){
	
	session, err := store.Get(r, "goBackend-cookie")
	riperr(err)


	sessvar := Session{}

	auth, _ := session.Values["authenticated"]
	uname, _ := session.Values["username"]

	if auth=="true" {
			
		sessvar.Username = uname.(string)
		sessvar.AuthToken = true

	}else{
		sessvar.AuthToken = false
	}



	path := "markup/home.html"

	homepage , err := template.ParseFiles( path )
	riperr(err)

	err = session.Save(r, w)
	riperr(err)

	homepage.Execute(w,sessvar)
}

func Generate(w http.ResponseWriter , r *http.Request, _ httprouter.Params) {	
		
	router := r.FormValue("router")
	method := r.FormValue("method")
	action := r.FormValue("action")
	pathToHTML := r.FormValue("pathToHTML")
	pathToCSS := r.FormValue("pathToCSS")
	routerNumber := r.FormValue("routerNumber")

	var finalCode string

	routerDetails := RouterDetails{ 

		RouterURL : router,
		Method : method,
		UseCase : action,
		PathToHTML : pathToHTML,
		RouterNumber : routerNumber,
		PathToCSS : pathToCSS,
	}

	fmt.Println(routerDetails)
	//allVars := getVariablesFromURL(url)
	//str_allVars := strings.Join(allVars," ")
	
	routerCall := generateRouterCall(routerDetails) 

	finalCode = getFirstBlock() + getPackages(action) + getBeginMainFunc() + routerCall + getEndMainFunc() + generateRouterFunc(routerDetails)

	//fmt.Println(allVars)
	fmt.Fprintf(w,finalCode)
	
}


func riperr(err error){
 	if err!= nil{

    		log.Println(err)

    	}
 }
