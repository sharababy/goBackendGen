package main

import(
	"httprouter"
	"net/http"
	"fmt"
	//"strings"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/sessions"
)


var (
	
	key = []byte("3F64F2F8456D67EE46AA823530215DCE6A92A989022F2A28A6B957B33D0FA986")
	store = sessions.NewCookieStore(key)
)

func Authenticate(w http.ResponseWriter , r *http.Request , _ httprouter.Params){
	
		session, err:= store.Get(r, "goBackend-cookie")
		riperr(err)

		uname := r.FormValue("username")
		pword := r.FormValue("password")

		newUser := SmallUser{

			Username : uname,
			Password : pword,
		}

		userExists := Validate(newUser)

		if userExists == true {
			
			
			session.Values["authenticated"] = "true"
			session.Values["username"] = uname
			err = session.Save(r, w)
			riperr(err)
			fmt.Fprintf(w,uname)
		}

		if userExists == false {
			
			fmt.Fprintf(w,"falied@userAuth@confirmed")
		}
}

func Validate(User SmallUser) (bool){

	db, err := sql.Open("mysql", "root:123@(localhost:3306)/evolution")
    riperr(err)
    defer db.Close()
   
    rows, err := db.Query("SELECT username,password FROM user where username = ?",User.Username)
   	riperr(err)

    for rows.Next() {
      
        var username string
        var password string
      
        err = rows.Scan(&username,&password)
        
        riperr(err)
        
        if (username == User.Username) {
        	if (password == User.Password) {        		
        		return true;
        	}
        }

    }
    return false
}

func Logout(w http.ResponseWriter , r *http.Request , _ httprouter.Params){

	session, err := store.Get(r, "goBackend-cookie")
	riperr(err)

	session.Values["authenticated"] = false
	session.Values["username"] = ""
	err = session.Save(r, w)
	riperr(err)

	fmt.Fprintf(w,"")

}
