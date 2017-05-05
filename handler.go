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
	
	path := "markup/home.html"

	homepage , err := template.ParseFiles( path )
	riperr(err)

	homepage.Execute(w,nil)
}

func Generate(w http.ResponseWriter , r *http.Request, _ httprouter.Params) {	
		
	router := r.FormValue("router")
	method := r.FormValue("method")
	action := r.FormValue("action")
	pathToHTML := r.FormValue("pathToHTML")

	routerNumber := r.FormValue("routerNumber")

	routerDetails := RouterDetails{ 

		RouterURL : router,
		Method : method,
		UseCase : action,
		PathToHTML : pathToHTML,
		RouterNumber : routerNumber,
	}

	fmt.Println(routerDetails)

	//allVars := getVariablesFromURL(url)
	//str_allVars := strings.Join(allVars," ")
	
	routerCall := generateRouterCall(routerDetails) 

	fmt.Println( routerCall )

	//fmt.Println(allVars)
	fmt.Fprintf(w,routerCall)
	
}


func riperr(err error){
 	if err!= nil{

    		log.Println(err)

    	}
 }
