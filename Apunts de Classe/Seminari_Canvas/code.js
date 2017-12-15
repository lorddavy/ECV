var can = document.getElementById('theCanvas');
var ctx = can.getContext('2d');
var img = new Image();


var t=0;
var xPos=0;
var yPos=0;
var xDir=1;
var yDir=1;

img.src = "http://bit.ly/1TXERkq";
img.width = 200;
img.height = 100;

img.onload = function(){
	ctx.drawImage(img,
		xPos, //position of top edge
		yPos, //position of left edge
		img.width, //width
		img.height); //height
}


setInterval (function(){
	can.width = window.innerWidth-25;
	can.height = window.innerHeight-25;
	ctx.clearRect(0, 0, can.width, can.height);
	ctx.drawImage(img,
		xPos, //position of top edge
		yPos, //position of left edge
		img.width, //width
		img.height); //height
	movingFunction();

}, 16);

movingFunction = function(){
	if(xPos < 0){
		xDir *= -1;
	}
	if(yPos < 0){
		yDir *= -1;
	}
	if(xPos > window.innerWidth-25-img.width){ //Rebota con left
		xDir *= -1;
	}
	if(yPos > window.innerHeight-25-img.height){ //Rebota con bottom
		yDir *= -1;
	}
	xPos += xDir;
	yPos += yDir;
}

movingCircle = function(){
	xPos=100*Math.cos(t/100);
	yPos=100*Math.sin(t/100);
	t++;
}
