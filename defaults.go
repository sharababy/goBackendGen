//defaults.go

package main


func getFirstBlock() string{

	var FirstBlock string

	FirstBlock = "<br>package main\n<br><br>import\n<br>(<br>"

	return FirstBlock
}


func getPackageList(pkgList []string) string{

	var Packages string

	for _, pkg := range pkgList{

		Packages += "&nbsp;&nbsp;\"" +  pkg +"\"<br>"
	}

	return Packages
}


func getBeginMainFunc() string{

	var BeginMainFunc string

	BeginMainFunc = ")<br><br>func main() {\n<br>" + "&nbsp;&nbsp;server := httprouter.New() \n<br>"

	return BeginMainFunc
}

func getEndMainFunc() string{

	var EndMainFunc string

	EndMainFunc = "\n<br>&nbsp;&nbsp;http.ListenAndServe(GetPort(),server)\n<br>" + "}\n<br>" + "<br>func GetPort() string {\n<br>"+"&nbsp;&nbsp;var port = os.Getenv(\"PORT\")\n<br>"+"&nbsp;&nbsp;if port == \"\" {\n<br>"+"&nbsp;&nbsp;&nbsp;&nbsp;port = \"3000\"\n<br>"+"&nbsp;&nbsp;&nbsp;&nbsp;fmt.Println(\"Server running at port \" + port)\n<br>"+"&nbsp;&nbsp;}\n<br>"+"&nbsp;&nbsp;return \":\" + port\n<br>"+"}\n<br>"

	return EndMainFunc
}
