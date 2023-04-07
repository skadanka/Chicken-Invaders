var space;
var contextSpace;


var stars = [];
var stars_velocity = 2;

$(document).ready(function()
{
    space = document.getElementById("battle");
    space.width = window.innerWidth / 3;
    space.height = window.innerHeight;
    contextSpace = space.getContext("2d");
    createStars();
    intervalTimer = setInterval(main, 1);
});

function backgroundGrad(){

    contextSpace.fillStyle = "black";
    contextSpace.fillRect(0, 0, space.width, space.height);
}

function createStars(){
    var outerRadius;
    var velocity;
    for(var i = 0; i < 30; i++){
        outerRadius = Math.random()*3;
        velocity = (Math.random()+1)*stars_velocity;
        rotate = Math.random()*45;
        stars.push({
            pointX: Math.random()*space.width, 
            pointY: 30, outerRadius: 
            outerRadius, 
            innerRadius: outerRadius/2, 
            velocity: velocity,
            rotate : rotate,
        });
    }
}


function drawStar(cx,cy,spikes,outerRadius,innerRadius, rotate){
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;

    contextSpace.beginPath();
    contextSpace.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
      contextSpace.lineTo(x,y)
      rot+=step

      x=cx+Math.cos(rot)*innerRadius;
      y=cy+Math.sin(rot)*innerRadius;
      contextSpace.lineTo(x,y)
      rot+=step
    }
    contextSpace.lineTo(cx,cy-outerRadius);
    contextSpace.closePath();
    contextSpace.lineWidth=5;
    contextSpace.strokeStyle='black';
    contextSpace.stroke();
    contextSpace.fillStyle='white';

    contextSpace.fill();
  }


function updateStarPosition() {
    stars.forEach(star => {
        if(star.pointY > space.height){
            star.pointY = 0;
            star.pointX = Math.random()*space.width;
        }else{ 
            star.pointY += star.velocity;
        }
        
        star.rotate = star.rotate*1.002 % 2;
        drawStar(star.pointX, star.pointY, 5, star.outerRadius, star.innerRadius, star.rotate);
    });
}


function main() {
    contextSpace.clearRect(0, 0, space.width, space.height);
    updateBrigade();
    updateStarPosition();
    updateFirePositions();
}