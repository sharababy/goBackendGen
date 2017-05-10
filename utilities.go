package main



func getVariablesFromURL(URL string)([]string){

	route := URL
	flag :=0
	currentVar := ""
	allVars := []string{}

	for _,k := range route{
		if ( k=='/' && currentVar != "")  {
			flag = 0
			allVars = append(allVars,currentVar)
			currentVar = ""
		}
		if flag==1 {
			currentVar = currentVar + string(k)
		}	
		if k==':' {
			flag = 1
		}
	}

	if (currentVar != ""){
		flag = 0
		allVars = append(allVars,currentVar)
		currentVar = ""
	}

	return allVars
}

func generateRouterCall(details RouterDetails) string{

	
	var routerCall string

	if details.UseCase == "option1" {
		var funcName string
		funcName = "ServeHTML"+ (details.RouterNumber)
		routerCall = "&nbsp;&nbsp;server." +  details.Method + "(\"" + details.RouterURL + "\"," + funcName +")"
	}
	if details.UseCase == "option2" {
		routerCall = "&nbsp;&nbsp;server.ServeFiles(\"" + (details.PathToCSS) + "*filepath\",http.Dir(\"."+ (details.PathToCSS) + "\"))"
	}	

	return routerCall
}


func generateRouterFunc(details RouterDetails) string{

	var funcDefn string

	funcDefn = " "

	if details.UseCase == "option1" {
		
		funcName := "ServeHTML"+ (details.RouterNumber)
		args := "(w http.ResponseWriter , r *http.Request, _ httprouter.Params) {"
		BeginfuncDefn := "<br><br>func " + funcName + args

		BeginFuncBody := "<br>&nbsp;path := \"" + details.PathToHTML + "\"<br>"
		subFunc1 := "&nbsp;homepage , err := template.ParseFiles( path )<br>"
		errCheck := "&nbsp;if(err!=nil){<br>&nbsp;&nbsp;log.Println(err)<br>&nbsp;}"
		subFunc2 := "<br>&nbsp;homepage.Execute(w,nil)<br>}<br>"

		funcDefn = BeginfuncDefn + BeginFuncBody + subFunc1 + errCheck + subFunc2
	}

	return funcDefn
}


func getPackages(action string) string{

	var pkgList []string

	if action[1:]=="option1" {
		pkgList = []string{"net/http","httprouter","html/template","fmt","os","log"}
	
	}else if action[1:]=="option2" {
		pkgList = []string{"net/http","httprouter","fmt","os"}
	}

	return getPackageList(pkgList)
}

