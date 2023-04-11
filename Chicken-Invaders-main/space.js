var space;
var contextSpace;

var status = true;

var stars = [];
var trail =[];
var stars_velocity = 2;
var score = 0;
var scoreTag;
var healthTag;

var gameState = false;

$(document).ready(function()
{
    space = document.getElementById("space");

    space.style.width='100%';
    space.style.height='100%';
    space.width  = space.offsetWidth;
    space.height = space.offsetHeight;

    scoreTag = document.getElementById("score");
    healthTag = document.getElementById("health");
    scoreTag.textContent = `Score: ${score}`;
    contextSpace = space.getContext("2d");
    createTrail();
    createStars(20);
});


function createStars(starsAmount){
    var outerRadius;
    var velocity;
    stars = []
    for(var i = 0; i < starsAmount
        ; i++){
        outerRadius = Math.random()*3;
        velocity = (Math.random()+1)*stars_velocity;
        stars.push({
            pointX: Math.random()*space.width, 
            pointY: 30, 
            outerRadius: 
            outerRadius, 
            velocity: velocity,
        });
    }
}




function drawStar(cx,cy,spikes,outerRadius,innerRadius){
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
    contextSpace.strokeStyle= "blue";
    contextSpace.fillStyle= "red";
    contextSpace.stroke();
    
    contextSpace.fill();
  }

function drawStar(cx, cy, radius){
    contextSpace.beginPath();
    contextSpace.arc(cx, cy, radius, 0, Math.PI*2);
    contextSpace.fillStyle = "white";
    contextSpace.fill();
    contextSpace.stroke();
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
        // drawStar(star.pointX, star.pointY, 5, star.outerRadius, star.innerRadius, star.rotate);
        drawStar(star.pointX, star.pointY, star.outerRadius);
    });
}



