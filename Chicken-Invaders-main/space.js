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
    createStars();
    createTrail();

});




function reset(){
    createBrigade();
    if(healthBar == 0){
        alert("You Lost");
        healthBar = 3;
        enemeis_killed = 0;
    }
    if(enemeis_killed == 20){
        alert("You Won");
        healthBar = 3;
        enemeis_killed = 0;
    }

    score = 0;
    scoreTag.textContent = `Score: ${score}`;
    shoots = [];
    enemyShots = [];
    spaceship = {x: space.width / 2, y: space.height - spaceship_height*3}
    enemyBullet = {x: space.width / 2, y: space.height};
    healthTag.textContent = '🚀'.repeat(healthBar);
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


