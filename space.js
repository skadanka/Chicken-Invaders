var space;
var contextSpace;


var stars = [];
var trail =[];
var stars_velocity = 2;

$(document).ready(function()
{
    space = document.getElementById("battle");
    space.width = window.innerWidth / 3;
    space.height = window.innerHeight;
    contextSpace = space.getContext("2d");
    createStars();
    createTrail();
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
        stars.push({
            pointX: Math.random()*space.width, 
            pointY: 30, 
            outerRadius: 
            outerRadius, 
            velocity: velocity,
        });
    }
}

function createTrail(){
    var outerRadius;
    var velocity;
    for(var i = 0; i < 5; i++){
        outerRadius = Math.random()*3;
        velocity = (Math.random()+1)*stars_velocity;
        rotate = Math.random()*45;
        trail.push({
            pointX: Math.random()*space.width, 
            pointY: 30, 
            outerRadius: 
            outerRadius, 
            innerRadius: outerRadius/2, 
            velocity: velocity,
            timeToLeave: Math.random()*6
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


function updateTrailPosition() {
    trail.forEach(star => {
        star.timeToLeave--;
        if(star.timeToLeave < 1){
            star.pointY = spaceship.y;
            star.pointX = spaceship.x;
            star.timeToLeave = Math.random()*10;
        }else{ 
            star.pointY += star.velocity;
        }
        star.rotate = star.rotate*1.002 % 2;
        drawStar(star.pointX, star.pointY, 5, star.outerRadius, star.innerRadius);
    });
}


function main() {
    contextSpace.clearRect(0, 0, space.width, space.height);
    updateStarPosition();
    updateBrigade();
    updateFirePositions();
    updateTrailPosition();
    updateSpaceshipPositions();
}