var chatActivado = false;
var name;
var presentacion = document.querySelector("#presentacion");
var chat = document.querySelector("#chat");

$$ = function(v) { return document.querySelector(v); }

function print(msg)
{
	if(msg=="")
	{
		alert("Cuidado! Debes escribir un mensaje!");
	}else{
		var root = $$("#areaChat");
		var e = document.createElement("p");
		e.className = "message";
		e.innerHTML = name + " : " + msg;
		root.appendChild(e);
		return e;
	}

}

/*function init()
{
	print("Bienvenido al seminario del GTI");
}*/

function start(){

				chatActivado = true
				var textBox = document.querySelector("#name");
				name = textBox.value;

				if(name=="")
				{
					alert("Cuidado! Debes escribir un nombre válido!");
				}else{

					presentacion.style.display = "none";
					chat.style.display = "inline"
				}

	}

function listoClick(){

			print($$('#msg').value);
			$$('#msg').value = "";

	}


function teclaPulsada(){


		var e = window.event;
		var keyCode = e.keyCode || e.which;

		if (keyCode == '13'){
		print($$('#msg').value);
		$$('#msg').value = "";
		}

}
