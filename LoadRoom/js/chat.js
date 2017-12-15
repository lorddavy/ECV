var server = new SillyClient();
var messages = [];

//Variables globales de la web
var chatActivado = false;
var name = "";
var chatEntry = document.querySelector("#chatEntry");
var chatArea = document.querySelector("#chatArea");
var Id_connected

$$ = function(v) { return document.querySelector(v); }

//Printamos por pantalla texto
function print(text){
	if(text==""){
		console.log("Texto vacio!");	//Texto vacio
	}else{
		var root = $$("#chatMsgs");
		var e = document.createElement("p");
		e.className = "message";
		e.innerHTML = text;
		root.appendChild(e);
		return e;
	}
}

//Printamos por pantalla los datos
function printData(data){

	localMsg = data.msg;
	localName = data.name;

	if(localMsg=="")
	{
		console.log("Texto vacio!");	//Texto vacio
	}else{
		var root = $$("#chatMsgs");
		var e = document.createElement("p");
		e.className = "message";
		e.innerHTML = "<span class='tagNombre'>" + localName + "</span>: " + localMsg;
		root.appendChild(e);
		return e;
	}
}



//Enviamos los datos al servidor
function sendDataServer(text){
	if(text==""){
		alert("Cuidado! Debes escribir un mensaje!");	//Texto vacio
	}else{
		var data = {
			name: name,
			msg: text
		}
		//Pasamos los datos a texto y los enviamos
		var json_string = JSON.stringify(data);

		printData(data);
		server.sendMessage(json_string);
	}
}

//Función para cuando se pulsa click en el botón
function listoClick(){
	text = ($$('#msg').value);
	$$('#msg').value = "";
	sendDataServer(text); //Enviamos el mensaje al servidor
}


//Función para cuando se pulsa intro en la caja de texto
function teclaPulsada(){
	var e = window.event;
	var keyCode = e.keyCode || e.which;
	if (keyCode != '13'){
		return;
	}
	text = ($$('#msg').value);
	$$('#msg').value = "";
	if( text[0] == "/" ){
		switch(text){
			case "/clear": clear();
			default: break;
		}
		return;
	}
	
	if(name!=""){
		sendDataServer(text); //Enviamos el mensaje al servidor
	}

	entryToChat();
}

//Iniciamos el chat
function entryToChat(){
	chatActivado = true;
	var textBox = document.querySelector("#name");
	name = textBox.value;
	if(name=="")
	{
		alert("Cuidado! Debes escribir un nombre válido!");
	}else{
		chatEntry.style.display = "none";
		chatArea.style.display = "inline"
		clear();
	}
}

//Iniciamos la conexión con el servidor
function init(){
	server.connect("84.89.136.194:9000", "MegaChat");
	server.on_user_connected  = function( author_id ){
		print("Se ha connectado un nuevo usuario");
	}
	
	server.on_message = function( author_id, data ){
		var recovered_data = JSON.parse(data);	//Recuperamos los datos en texto como una estructura
		printData(recovered_data);
		console.log(data);
	}

	server.on_user_disconnected  = function( author_id ){
		print("Se ha desconnectado un usuario");
	}
}

//Limpiamos los mensajes
function clear()
{
	messages = [];
	messages_root.innerHTML = "";
	//saveToServer();
}

init(); //iniciamos
