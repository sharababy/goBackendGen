package main

import
(
	"database/sql"
	_ "github.com/go-sql-driver/mysql"

)

func getUserObjects(Username string)([]Object){

	db, err := sql.Open("mysql", "root:123@(localhost:3306)/evolution")
    riperr(err)
    defer db.Close()
   
    rows, err := db.Query("SELECT distinct objectname FROM object where username = ?",Username)
   	riperr(err)

   	allObjects :=[]Object{}

   	for rows.Next() {
            	
      	o := Object{}
      	allkv := []KeyVal{}
      	
        err = rows.Scan(&o.ObjectName)
        riperr(err)
        
        objrow, err := db.Query("SELECT field,type FROM object where username = ? and objectname = ?",Username,o.ObjectName)
   		riperr(err)

   		for objrow.Next() {
      		kv := KeyVal{}
       		err = objrow.Scan(&kv.Field,&kv.Type)
        	riperr(err)

        	allkv = append(allkv, kv)
        }
        o.KeyValArray = allkv

        allObjects = append(allObjects,o)
    }
    
    return allObjects
}