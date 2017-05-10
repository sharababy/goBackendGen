package main

import
(
	"net/http"
	"httprouter"
	"fmt"
	"os"
)

type Route struct{

	Method string
	URL string
	Function httprouter.Handle
}

type Routers []Route


func main() {

	server := httprouter.New()

	for _,route := range RouterList{
		server.Handle(route.Method,route.URL,route.Function)
	}

	server.ServeFiles("/markup/styles/*filepath", http.Dir("./markup/styles"))
	server.ServeFiles("/markup/js/*filepath", http.Dir("./markup/js"))
	http.ListenAndServe(GetPort(),server)
}


var RouterList = Routers{
	Route{
		"GET",
		"/",
		GenHome,
	},
	Route{
		"POST",
		"/make/",
		Generate,
	},
	Route{
		"POST",
		"/challenge/",
		Authenticate,
	},
	Route{
		"POST",
		"/logout/",
		Logout,
	},
}


func GetPort() string {
        var port = os.Getenv("PORT")

        if port == "" {
                port = "3000"
                fmt.Println("Server running at port " + port)
        }
        return ":" + port
}

/*
Possible errors:

1 .router URL  must begin with /



*/



