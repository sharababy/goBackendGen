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

	var funcName string

	

	if details.UseCase == "option1" {
		funcName = "ServeHTML"+ (details.RouterNumber)
	}

	var routerCall string
	routerCall = "server." + details.Method + "(\"" + details.RouterURL + "\"," + funcName +")"


	return routerCall


}