
var title = document.querySelector("h1");
title.style.color = "red";


var button = document.querySelector("button");
button.addEventListener("click", myclick);


var input = document.querySelector("#name")
var text = input.value;

var div = document.createElement("div");
div.innerHTML = "User says " + text;


function mykey(e){
  if(e.which == 13){
    myclick();
  }
}


parent.scrollTop = 100px; 
