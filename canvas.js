
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

function drawCoordinates(x,y,color){	
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.font = "10px Arial";
  ctx.fillText("Ponto: "+x+','+y, x, y);
}

function drawLine(x1,y1,x2,y2,color,width){
  ctx.lineWidth = width;
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
  distance(v){
    return Math.sqrt(Math.pow(v.x - this.x,2) + Math.pow(v.y - this.y,2))
  }

}

class Circle {
  constructor(){
      this.radius = 80
      this.x = canvas.width/2+30
      this.y = canvas.height/2
      this.intersectionPoints = []

      this.draw()
  }

    checkIntersection(line){

        let dx = line.x2 - line.x1;
        let dy = line.y2 - line.y1;

        let A = dx * dx + dy * dy;
        let B = 2 * (dx * (line.x1 - this.x) + dy * (line.y1 - this.y));
        let C = (line.x1 - this.x) * (line.x1 - this.x) +
            (line.y1 - this.y) * (line.y1 - this.y) -
            this.radius * this.radius;
        
        let det = (B * B) - (4 * (A * C));
        console.log(A)
        console.log(det)
        let t = -B / (2 * A);
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
            this.intersectionPoints.push(intersection1)
            drawCoordinates(intersection1.x,intersection1.y,"blue")
            return 1;
        }
        else
        {
            // Two solutions.
            console.log('elseeee')
            t = ((-B + Math.sqrt(det)) / (2 * A));
            let intersection1 =
                new Vec2(line.x1 + t * dx, line.y1 + t * dy);
                // drawCoordinates(intersection1.x,intersection1.y)
            t = ((-B - Math.sqrt(det)) / (2 * A));
            let intersection2 =
                new Vec2(line.x1 + t * dx,line.y1 + t * dy);
                // drawCoordinates(intersection2.x,intersection2.y)
               
            let check1 = intersection1.distance(line.p1) + intersection1.distance(line.p2) === line.p1.distance(line.p2)
            let check2 = intersection2.distance(line.p1) + intersection2.distance(line.p2) === line.p1.distance(line.p2)
            console.log(check1 , check2)
            if(check1 && check2){
                console.log('if 1')
                this.intersectionPoints.push(intersection1)
                this.intersectionPoints.push(intersection2)
                drawCoordinates(intersection1.x,intersection1.y,"blue")
                drawCoordinates(intersection2.x,intersection2.y,"blue")
                this.intersectionPoints = bubbleSort(this.intersectionPoints,line)
                return 2;
            }
            if(check1 && !check2){
                this.intersectionPoints.push(intersection1)
                drawCoordinates(intersection1.x,intersection1.y,"blue")
                return 1;
            }
            if(!check1 && check2){
                this.intersectionPoints.push(intersection2)
                drawCoordinates(intersection2.x,intersection2.y,"blue")
                return 1;
            }
        }
    }

    checkPointInOrOut(point){
        //(xp−xc)2+(yp−yc)2 with r2.
        let d = Math.pow(point.x-this.x,2)+Math.pow(point.y-this.y,2)
        if(d<= Math.pow(this.radius,2)){
            return true
        }
        else{
            return false
        }
    }

    draw(){
        // drawCoordinates(this.x,this.y);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

class Square {
  constructor(){
        this.width = 200
        this.heigth = 100
        this.x = canvas.width/2-80
        this.y = canvas.height/2+50
        this.lineLeft = new Line(this.x-this.width/2,this.y+this.heigth/2, this.x-this.width/2, this.y - this.heigth/2)
        this.lineTop = new Line(this.x-this.width/2, this.y - this.heigth/2 , this.x+(this.width/2), this.y - this.heigth/2)
        this.lineBottom = new Line(this.x-this.width/2,this.y+this.heigth/2,this.x+this.width/2,this.y+this.heigth/2)
        this.lineRight = new Line(this.x+this.width/2,this.y+this.heigth/2,this.x+this.width/2,this.y-this.heigth/2)
        this.intersectionPoints = []

        this.draw()
    }

    checkIntersection(line){
        let l = checkIntersectionLines(line,this.lineLeft)
        let t = checkIntersectionLines(line,this.lineTop)
        let r = checkIntersectionLines(line,this.lineRight)
        let b = checkIntersectionLines(line,this.lineBottom)
        console.log('L: ' + l)
        console.log('T :' + t)
        console.log('R :' + r)
        console.log('B :' + b)
        if(l != null){
            //drawCoordinates(l.x,l.y)
            drawCoordinates(l.x,l.y,"red")
            this.intersectionPoints.push(l)
            // if(this.checkPointInOrOut(line.p1)){
            //     console.log("line.p1 tá dentro")
            // }
        }
        if(t != null){
            //drawCoordinates(t.x,t.y)
            drawCoordinates(t.x,t.y,"red")
            this.intersectionPoints.push(t)
            // if(this.checkPointInOrOut(line.p1)){
            //     this.intersectionPoints.push(t)
            //     console.log("line.p1 tá dentro")
            //     intersections.push(t)
            // }
        }    
        if(r != null){
            //drawCoordinates(r.x,r.y)
            drawCoordinates(r.x,r.y,"red")
            this.intersectionPoints.push(r)

            // if(this.checkPointInOrOut(line.p1)){
            //     console.log("line.p1 tá dentro")
            //     intersections.push(r)
            // }
        }    
        if(b != null){
            //drawCoordinates(b.x,b.y)
            drawCoordinates(b.x,b.y,"red")
            this.intersectionPoints.push(b)

            // if(this.checkPointInOrOut(line.p1)){
            //     console.log("line.p1 tá dentro")
            //     intersections.push(b)
            // }
        }
        this.intersectionPoints = bubbleSort(this.intersectionPoints, line)
    }

    checkPointInOrOut(point){
        //if is inside or on the border
        if( point.x >= this.x-this.width/2 && 
            point.x <= this.x+this.width/2 && 
            point.y >= this.y-this.heigth/2 &&
            point.y <= this.y+this.heigth/2
            ){
             return true   
        }else{
            return false
        }
    }

    draw(){
        // drawCoordinates(this.x,this.y)
        drawLine(this.lineLeft.x1,this.lineLeft.y1,this.lineLeft.x2,this.lineLeft.y2)
        drawLine(this.lineTop.x1,this.lineTop.y1,this.lineTop.x2,this.lineTop.y2)
        drawLine(this.lineBottom.x1,this.lineBottom.y1,this.lineBottom.x2,this.lineBottom.y2)
        drawLine(this.lineRight.x1,this.lineRight.y1,this.lineRight.x2,this.lineRight.y2)
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

// class Tree{
//     constructor(){
//         this.objects = []
//         this.ray
//         this.intersectionPoints = []
//         this.operations = []
//     }

//     initialize(operation){
//         this.operationTree = new Operation(operation)
//     }

//     addOperation(operation){
//         this.operationTree = new Operation()
//     }

//     addObject(object){
//         this.objects.push(object)
//     }

//     addRay(x1,y1,x2,y2){
//         this.ray = new Line(x1,y1,x2,y2)
//     }

//     checkIntersections(){
//         if(this.objects !== null){
//             for(let i = 0; i < this.objects.length; i++){
//                 // if(this.objects[i].constructor.name === "Square"){
//                     console.log(this.objects[i].constructor.name)
//                     this.objects[i].checkIntersection(this.ray)
//                     for(let j = 0 ; j < this.objects[i].intersectionPoints.length; j++){
//                         this.intersectionPoints.push(this.objects[i].intersectionPoints[j]) 
//                     }
//                 // }
//                 // else if()
//             }
//             console.log('pontos de intersecção da arvore: ' + JSON.stringify(this.intersectionPoints))
//         }
//     }

//     executeOperations(){
//         if(this.objects.length>1 && this.operations !== null){
//             for(let i = 0; i < this.operations.length; i++){
                
//             }
//         }
//         else{
//             return false
//         }
//     }
// }

// class Operation{
//     //tipos => uniao = u, intersecção = i, diferença = d, 
//     constructor(type){
//         this.type = typew
//         this.left = null
//         this.rigth = null
//     }

//     //busca operação com 2 objetos filhos
//     searchOperation(){

//     }


// }

// function checkIntersectionLines(lineA, lineB){

//     // calculate the distance to intersection point
//     let uA = ((lineB.x2-lineB.x1)*(lineA.y1-lineB.y1) - (lineB.y2-lineB.y1)*(lineA.x1-lineB.x1)) / ((lineB.y2-lineB.y1)*(lineA.x2-lineA.x1) - (lineB.x2-lineB.x2)*(lineA.y2-lineA.y1));
//     let uB = ((lineA.x2-lineA.x1)*(lineA.y1-lineB.y1) - (lineA.y2-lineA.y1)*(lineA.x1-lineB.x1)) / ((lineB.y2-lineB.y1)*(lineA.x2-lineA.x1) - (lineB.x2-lineB.x1)*(lineA.y2-lineA.y1));

//     // if uA and uB are between 0-1, lines are colliding
//     if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
//         return new Vec2(lineA.x1 + (uA * (lineA.x2-lineA.x1)), lineA.y1 + (uA * (lineA.y2-lineA.y1)));
//     }
//     else{
//         return null;

//     }
// }                            
function checkIntersectionLines(lineA, lineB){
    if(Math.sign(lineA.p2.sub(lineA.p1).cross(lineB.p1.sub(lineA.p1))) == Math.sign(lineA.p2.sub(lineA.p1).cross(lineB.p2.sub(lineA.p1))) 
      || Math.sign(lineB.p2.sub(lineB.p1).cross(lineA.p1.sub(lineB.p1))) == Math.sign(lineB.p2.sub(lineB.p1).cross(lineA.p2.sub(lineB.p1))) ){
        return null; 
    }
    else{
        let v = math.intersect([lineA.x1, lineA.y1], [lineA.x2, lineA.y2], [lineB.x1, lineB.y1], [lineB.x2, lineB.y2])
        return new Vec2(v[0],v[1]);
    }
}
function colisions(tipo,o1,o2,l){
    let i = 0
    let j = 0
    let col = []
    o1.checkIntersection(l)
    o2.checkIntersection(l)
    let state1 = o1.checkPointInOrOut(l.p1)
    let state2 = o2.checkPointInOrOut(l.p1)
	while (i < o1.intersectionPoints.length || j < o2.intersectionPoints.length) {
        if(tipo==='u'){
            if (j >= o2.intersectionPoints.length || (i < o1.intersectionPoints.length && o1.intersectionPoints[i].distance(l.p1) < o2.intersectionPoints[j].distance(l.p1))) {
                    state1 = !state1;
                    if (!state2) {
                        col.push(o1.intersectionPoints[i]);
                    }
                    i++
                }   
            else {
                state2 = !state2;
                if (!state1) {
                    col.push(o2.intersectionPoints[j]);
                }
                j++;
            }
        }
        else if(tipo==='i'){
            if (j >= o2.intersectionPoints.length || 
                (i < o1.intersectionPoints.length && o1.intersectionPoints[i].distance(l.p1) < o2.intersectionPoints[j].distance(l.p1))) {
                state1 = !state1;
                if (state2) {
                    col.push(o1.intersectionPoints[i]);
                }
                i++
            }
            else {
                state2 = !state2;
                if (state1) {
                    col.push(o2.intersectionPoints[j]);
                }
                j++;
            }
        }
        else if(tipo==='d'){
            let d1 = Infinity, d2 = Infinity
            if (i < o1.intersectionPoints.length)d1 = o1.intersectionPoints[i].distance(l.p1);
            if (j < o2.intersectionPoints.length)d2 = o2.intersectionPoints[j].distance(l.p1)
            //if (d1 == d2) d2 += SMALL_NUMBER;
            if (d1 < d2) {
                state1 = !state1;
                if (!state2) {
                    col.push(o1.intersectionPoints[i]);
                }
                i++;
            }
            else {
                state2 = !state2;
                if (state1) {
                    col.push(o2.intersectionPoints[j]);
                }
                j++
            }
        }
    }


    for(let k = 0 ; k < col.length;k++){
        drawCoordinates(col[k].x,col[k].y,'green')
    }
    return col
}

//ordenar pontos de intersecção com relação a distancia entre o primeiro ponto da reta
function bubbleSort(array,line) {
    let isSorted = false;

    while(!isSorted) {
        isSorted = true;

        for(let i = 0; i < array.length - 1; i++) {
            let a = array[i].distance(line.p1) ;
            let b = array[i+1].distance(line.p1)
            c = a > b
            if(a > b) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                isSorted = false;
            }
        }
    }
    return array;
}
 l = new Line(450, 300, 770, 350)
//l = new Line(400, 300, 500, 300)
drawCoordinates(l.x1, l.y1)
drawLine(l.x1, l.y1, l.x2, l.y2)
c = new Circle()
// c.checkIntersection(l)
s  = new Square()
// s.checkIntersection(l)
// t = new TreeObjects()
// t.addObject(c)
// t.addObject(s)
// t.addRay(650, 300, 750, 350)
// t.checkIntersections()

console.log('s: '+ JSON.stringify(s.intersectionPoints))
console.log(JSON.stringify(colisions('d',c,s,l)))
