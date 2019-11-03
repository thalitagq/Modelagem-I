
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = document.getElementById("canvas").getContext("2d");
// ctx.translate(0, canvas.height);
// ctx.scale(1, -1);
let pointSize =3;
let points = [];
let pointsAux = [];
let v;
let maxx;
let miny;
let center;
let minPoint;
let next_point;
let indexOfMinPoint;
let nextPoints = [];
let points_interated;
let dir_vec2;
let initialPoints = [];
let indexesOfNextsPoints = [];
let indexOfMinPoint2;
let pointsTriang = [];
let candidatos =[];

window.addEventListener('click', 
	function(){
    getPosition(event);
});

function getPosition(event){
     
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  v = new Vec2(x,y);
  points.push(v);
  initialPoints.push(v);
  pointsTriang.push(v);
  drawCoordinates(x,y);
  console.log('ponto:' + '('+v.x+','+v.y+')');
}

function drawCoordinates(x,y){	
  ctx.fillStyle = "#fffff";
  ctx.beginPath();
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.font = "10px Arial";
  ctx.fillText("Ponto: "+x+','+y, x, y);
}

function drawLine(x1,y1,x2,y2,color){
  ctx.beginPath();
  ctx.moveTo(x1,y1); 
  ctx.lineTo(x2,y2);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}

class Vec2 {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }
      //norma do vetor(tamanho)
  magnitude(){
      return Math.sqrt(this.x * this.x + this.y * this.y);
  };

      //norma do vetor ao quadrado
  squaredMagnitude(){
      return (this.x * this.x + this.y * this.y);
  };

      //vetor normalizado
  normalize(){
      this.x = this.x / this.magnitude();
      this.y = this.y / this.magnitude();
  };

      //produto escalar
  dot(v) {
      return this.x * v.x + this.y * v.y;
  };

      //produto vetorial
   cross(v) {
      return this.x * v.y - this.y * v.x;
  };
      
      //adição dde vetores
   add (v) {
      return new Vec2(this.x + v.x, this.y + v.y);
  };

      //subtraçao de vetores
  sub(v) {
      return new Vec2(this.x - v.x, this.y - v.y);
  };
  checkIgual(v){
      if(this.x == v.x && this.y == v.y){
          return true;
      }
      else{
          return false;
      }
  }

}

class Circle {
  constructor(){
      this.radius = 50
      this.x = canvas.width/2
      this.y = canvas.height/2
      drawCoordinates(this.x,this.y);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
  }
}

class Square {
  constructor(){
        this.width = 50
        this.heigth = 50
        this.x = canvas.width/2
        this.y = canvas.height/2
        this.lineLeft = new Line(this.x-this.width/2,this.y+this.heigth/2, this.x-this.width/2, this.y - this.heigth/2)
        this.lineTop = new Line(this.x-this.width/2, this.y - this.heigth/2 , this.x+(this.width/2), this.y - this.heigth/2)
        this.lineBottom = new Line(this.x-this.width/2,this.y+this.heigth/2,this.x+this.width/2,this.y+this.heigth/2)
        this.lineRight = new Line(this.x+this.width/2,this.y+this.heigth/2,this.x+this.width/2,this.y-this.heigth/2)
        
        drawCoordinates(this.x,this.y)
        drawLine(this.lineLeft.x1,this.lineLeft.y1,this.lineLeft.x2,this.lineLeft.y2)
        drawLine(this.lineTop.x1,this.lineTop.y1,this.lineTop.x2,this.lineTop.y2)
        drawLine(this.lineBottom.x1,this.lineBottom.y1,this.lineBottom.x2,this.lineBottom.y2)
        drawLine(this.lineRight.x1,this.lineRight.y1,this.lineRight.x2,this.lineRight.y2)
    }

    checkIntersection(line){
        let intersections = []
        let l = checkIntersectionLines(line,this.lineLeft)
        let t = checkIntersectionLines(line,this.lineTop)
        let r = checkIntersectionLines(line,this.lineRight)
        let b = checkIntersectionLines(line,this.lineBottom)
        console.log('L: ' + l)
        console.log('T :' + t)
        console.log('R :' + r)
        console.log('B :' + b)
        if(l != null){
            drawCoordinates(l.x,l.y)
            intersections.push(l)
        }
        if(t != null){
            drawCoordinates(t.x,t.y)
            intersections.push(t)
        }    
        if(r != null){
            drawCoordinates(r.x,r.y)
            intersections.push(r)
        }    
        if(b != null){
            drawCoordinates(b.x,b.y)
            intersections.push(b)
        }
    }
}

class Line {
    constructor(x1,y1,x2,y2){
        this.x1 = x1 
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2

        this.p1 = new Vec2(this.x1, this.y1)
        this.p2 = new Vec2(this.x2, this.y2)
    }
}

function checkIntersectionCircle(line, circle){
    
    let dx = line.x2 - line.x1;
    let dy = line.y2 - line.y1;

    let A = dx * dx + dy * dy;
    let B = 2 * (dx * (line.x1 - circle.x) + dy * (line.y1 - circle.y));
    let C = (line.x1 - circle.x) * (line.x1 - circle.x) +
        (line.y1 - circle.y) * (line.y1 - circle.y) -
        circle.radius * circle.radius;
    
    let det = (B * B) - (4 * (A * C));
    console.log(A)
    console.log(det)
    t = -B / (2 * A);
    console.log('distance: ' + t)
    if ((A <= 0.0000001) || (det < 0))
    {
        // No real solutions.
        return 0;
    }
    else if (det === 0)
    {
        // One solution.
        t = -B / (2 * A);
        console.log('distance: ' + t)
        let intersection1 = new Vec2(line.x1 + t * dx, line.y1 + t * dy);
        drawCoordinates(intersection1.x,intersection1.y)
        return 1;
    }
    else
    {
        // Two solutions.
        t = ((-B + Math.sqrt(det)) / (2 * A));
        let intersection1 =
            new Vec2(line.x1 + t * dx, line.y1 + t * dy);

            drawCoordinates(intersection1.x,intersection1.y)
        t = ((-B - Math.sqrt(det)) / (2 * A));
        let intersection2 =
            new Vec2(line.x1 + t * dx,line.y1 + t * dy);
            drawCoordinates(intersection2.x,intersection2.y)

        return 2;
    }
}

function checkIntersectionLines(lineA, lineB){

    // calculate the distance to intersection point
    let uA = ((lineB.x2-lineB.x1)*(lineA.y1-lineB.y1) - (lineB.y2-lineB.y1)*(lineA.x1-lineB.x1)) / ((lineB.y2-lineB.y1)*(lineA.x2-lineA.x1) - (lineB.x2-lineB.x2)*(lineA.y2-lineA.y1));
    let uB = ((lineA.x2-lineA.x1)*(lineA.y1-lineB.y1) - (lineA.y2-lineA.y1)*(lineA.x1-lineB.x1)) / ((lineB.y2-lineB.y1)*(lineA.x2-lineA.x1) - (lineB.x2-lineB.x1)*(lineA.y2-lineA.y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return new Vec2(lineA.x1 + (uA * (lineA.x2-lineA.x1)), lineA.y1 + (uA * (lineA.y2-lineA.y1)));
    }
    return null;

}

function lineSlope(pointA,pointB){
     a = pointA.x-pointB.x
    console.log('slope ' + a)
	if (pointA.x-pointB.x === 0)
        return NaN
	else
		return (pointA.y-pointB.y)/(pointA.x-pointB.x);
}



// l = new Line(450, 300, 150, 300)
l = new Line(250, 300, 370, 300)
drawLine(l.x1, l.y1, l.x2, l.y2)
// c = new Circle()
// console.log(checkIntersection(l,c))
s  = new Square()
console.log(s.checkIntersection(l))