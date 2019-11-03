var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var ctx = document.getElementById("canvas").getContext("2d");
var pointSize =3;
var points = [];
var points2= [];
var v;
var minx;
var maxx;
var miny;
var maxy;
var minx2;
var maxx2;
var miny2;
var maxy2;
var center;

window.addEventListener('click', 
	function(){
		getPosition(event);
});

window.addEventListener('keypress',
	function(){
		if(event.keyCode == 97)// 'a'
			redraw(event);
	});

window.addEventListener('keypress',
	function(){
		if(event.keyCode == 115){// 's'
			resetRed();
			randomPoints(event);
			
		}
	})

window.addEventListener('keypress',
	function(){
		if(event.keyCode == 102)// 'f'
			checkOverlap(event);
	})

window.addEventListener('keypress',
	function(){
		if(event.keyCode == 113)// 'q'
			//redrawOBB();
			axis(event);
	});

function getPosition(event){
     
     var rect = canvas.getBoundingClientRect();
     var x = event.clientX - rect.left;
     var y = event.clientY - rect.top;
     v = new Vec2(x,y);
     points.push(v);
     drawCoordinates(x,y);
  	 checkMinMax();	    	    
}


function drawCoordinates(x,y){	

	ctx.fillStyle = "#fffff";
	ctx.beginPath();
	ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
	ctx.fill();
	
}

function drawCoordinatesRed(x,y){	

	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
	ctx.fill();
	
}


function checkMinMax(){
	minx = points[0].x;
	miny = points[0].y;
	maxx = points[0].x;
	maxy = points[0].y
	
	for (var i = 0; i < points.length; i++) {
		
		if(points[i].x < minx){
			minx = points[i].x;
		}

		else if(points[i].x > maxx){
			maxx = points[i].x;
		}
		
		if (points[i].y < miny) {
			miny = points[i].y; 
		}
		
		else if(points[i].y > maxy ) {
			maxy = points[i].y;
		}
	}

}


function checkMinMaxRed(){
	minx2 = points2[0].x;
	miny2 = points2[0].y;
	maxx2 = points2[0].x;
	maxy2 = points2[0].y;
	
	for (var i = 0; i < points2.length; i++) {
		
		if(points2[i].x < minx2){
			minx2 = points2[i].x;
		}

		else if(points2[i].x > maxx2){
			maxx2 = points2[i].x;
		}
		
		if (points2[i].y < miny2) {
			miny2 = points2[i].y; 
		}
		
		else if(points2[i].y > maxy2 ) {
			maxy2 = points2[i].y;
		}
	}

}

function randomPoints(event){
	var x0 =( Math.floor((Math.random()*canvas.width)+1));
	var y0 =(Math.floor((Math.random()*canvas.height)+1));
	
	for (var i = 0; i < 10; i++) {
		var x =x0 + ( Math.floor((Math.random()*x0)+1));
		var y =(Math.floor((Math.random()*y0)+1));
		v = new Vec2(x,y);
     	points2.push(v);
     	drawCoordinatesRed(x,y);
     }	
     
   	drawRectRed();
}


function drawLine(x1,y1,x2,y2,color){
	ctx.beginPath();
	ctx.moveTo(x1,y1); 
	ctx.lineTo(x2,y2);
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.closePath();
}


function drawRect(){
	
	checkMinMax();
	drawLine(minx,maxy,maxx,maxy,"#fffff");//base
	drawLine(minx,miny,maxx,miny,"#fffff");//topo 
	drawLine(minx,maxy,minx,miny,"#fffff");//lado direito
	drawLine(maxx,maxy,maxx,miny,"#fffff");//lado esquerdo

}


function drawRectRed(){
	checkMinMaxRed();
    
	drawLine(minx2,maxy2,maxx2,maxy2,"red");//base
	drawLine(minx2,miny2,maxx2,miny2,"red");//topo 
	drawLine(minx2,maxy2,minx2,miny2,"red");//lado direito
	drawLine(maxx2,maxy2,maxx2,miny2,"red");//lado esquerdo

}

function redraw(event){
	ctx.clearRect(0,0,innerWidth,innerHeight);
	checkMinMax();
	for (var i = 0; i <points.length; i++) {
		drawCoordinates(points[i].x,points[i].y);
	}
	drawRect();
}

function checkOverlap(event){

	if(!(  maxx < minx2
		||maxy < miny2
		||minx > maxx2
		||miny > maxy2)){

	drawLine(minx,maxy,maxx,maxy,"blue");//base
	drawLine(minx,miny,maxx,miny,"blue");//topo 
	drawLine(minx,maxy,minx,miny,"blue");//lado direito
	drawLine(maxx,maxy,maxx,miny,"blue");//lado esquerdo
	drawLine(minx2,maxy2,maxx2,maxy2,"blue");//base
	drawLine(minx2,miny2,maxx2,miny2,"blue");//topo 
	drawLine(minx2,maxy2,minx2,miny2,"blue");//lado direito
	drawLine(maxx2,maxy2,maxx2,miny2,"blue");//lado esquerdo

	}
}


function resetRed(){
	if(points2!=null){
		ctx.clearRect(0,0,innerWidth,innerHeight);
		for (var i = 0; i <points.length; i++) {
		drawCoordinates(points[i].x,points[i].y);
		}
		points2 = [];
		redraw();	
	}	
}



function redrawOBB(){
	ctx.clearRect(0,0,innerWidth,innerHeight);
	checkMinMax();
	for (var i = 0; i <points.length; i++) {
		drawCoordinates(points[i].x,points[i].y);
	}
	drawRect();

}

function axis(event){
	console.log("q");
	checkMinMax();
	
	drawLine(minx,maxy,maxx,miny, "blue");
	c = new Vec2((maxx+minx)/2,(miny+maxy)/2);
	ctx.fillStyle = "blue";
	ctx.beginPath();
	ctx.arc(c.x, c.y, pointSize, 0, Math.PI * 2, true);
	ctx.fill();
	var v = c;
	v.normalize();


	u = new Vec2(-v.y, v.x);

	u2 = new Vec2(-c.y, c.x);

	drawLine(c.x,c.y, u.x*(c.x), u.y*(c.y),"red");
	

}



function Vec2(x,y){
	this.x = x;
	this.y = y;

	this.magnitude = function()
	{
		return Math.sqrt( x*x + y*y );
	}
	
	this.squaredMagnitude = function()
	{
		return ( x*x + y*y );
	}
	
	this.normalize = function()
	{
		this.x = this.x/this.magnitude();
		this.y =  this.y/this.magnitude();
	}
	
	
	this.dot = function(v){
		return this.x*v.x + this.y*v.y;
	}
	
	this.cross = function(v){
		return this.x*v.y - this.y*v.x;
	}
	
	this.sub = function(v){
		return Vec2( this.x-v.x, this.y-v.y );
	}	
}

