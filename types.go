package main

type RouterDetails struct{
	
	RouterURL string
	Method string
	UseCase string
	PathToHTML string
	PathToCSS string
	
	RouterNumber string
}


type SmallUser struct{

	Username string
	Password string
}

type Session struct{
	AuthToken bool
	Username string
}