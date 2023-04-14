var battle;
var contextBattle;

var shoots;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var healthBar = 3;

var fireButton = " ";

var spaceshipColor = "orange";

$(document).ready(function() {
    battle = document.getElementById("space");
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    shoots = new Array();
    contextBattle = battle.getContext("2d");

    spaceship = {x: 0, y:0};
})

function setSpaceship(){
    spaceship = {x: battle.width / 2, y: battle.height - spaceship_height*3}
}

function setSpaceshipColor(color){
    spaceshipColor = color;
}

function keyDownHandler(e) {
    if(e.key == "Esc"){
        
    }
    if (e.key == " Right" || e.key == "ArrowRight" ){
        rightPressed = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    }else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
}


function keyUpHandler(e) {
    if(e.key == fireButton){
        fire(e);
    }
    if (e.key == "Right" || e.key == "ArrowRight" ){
        rightPressed = false;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
    
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false;
    }else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
}

var bullet;
function fire(event){
    var cx = spaceship.x, cy = spaceship.y;
    bullet = {x: cx, y: cy, alive: 1}; 
    shoots.push(bullet);
    spaceshipShoot.play();
}

function drawSpaceship(){
    contextBattle.beginPath();
    contextBattle.arc(spaceship.x, spaceship.y, spaceship_width, 0, Math.PI*2);
    contextBattle.fill();
    contextBattle.moveTo(spaceship.x, spaceship.y - 15);
    contextBattle.lineTo(spaceship.x - 12, spaceship.y + 5);
    contextBattle.fillStyle = spaceshipColor;
    contextBattle.fill();
    contextBattle.lineTo(spaceship.x + 12, spaceship.y + 5);
    contextBattle.strokeStyle = "#979797";
    contextBattle.closePath();
    contextBattle.moveTo(spaceship.x, spaceship - 15);
    contextBattle.arc(spaceship.x, spaceship - 12, 30, Math.PI, Math.PI*2);
    contextBattle.fillStyle = "#808080";
    contextBattle.fill()
    contextBattle.stroke();
}

var spaceship_width = 10;
var spaceship_height = 10;
var spaceship;
var spaceship_speed = 3;


function updateSpaceshipPositions(){
    collisionDetetctionSpaceship();
    drawSpaceship();
    if(rightPressed && spaceship.x < battle.width - spaceship_width){
        spaceship.x = spaceship.x + spaceship_speed;
    }else if(leftPressed && spaceship.x > 0 + spaceship_width){
        spaceship.x = spaceship.x - spaceship_speed;
    }

    if(upPressed && spaceship.y > (battle.height * 0.6) + spaceship_height){
        spaceship.y = spaceship.y - spaceship_speed;
    }else if(downPressed && spaceship.y < battle.height - spaceship_height){
        spaceship.y = spaceship.y + spaceship_speed;
    }
}


function updateFirePositions(){
    shoots.forEach(shoot => {       
        shoot.y = shoot.y - 2.5;
        if(shoot.y < 0 ){
            var index = shoots.indexOf(shoot);
            shoots.splice(index, 1);
        }
 
        contextBattle.beginPath();
        contextBattle.arc(shoot.x, shoot.y, 3, 0, Math.PI*2);
        contextBattle.fillStyle = "yellow";
        contextBattle.strokeStyle = "darkorange";
        contextBattle.fill();
        contextBattle.stroke();
    });
}

function collisionDetetctionSpaceship(){
    enemyShots.forEach(bullet => {
        if(bullet.x < spaceship.x + spaceship_width 
            && bullet.x > spaceship.x - spaceship_width
            && bullet.y < spaceship.y + spaceship_width
            && bullet.y > spaceship.y - spaceship_width){
                spaceshipExplodeSound.play();
                healthBar--;
                reset();
            }
    });
}


function drawBubble(cx, cy, size){
    contextSpace.beginPath();
    contextSpace.arc(cx, cy, size, 0, Math.PI*2);
    contextSpace.fillStyle = "white";
    contextSpace.fill();
    contextSpace.stroke();
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
            star.pointX += Math.sin(star.pointY)*3;
        }

        drawBubble(star.pointX, star.pointY, star.size);
    });
}


function createTrail(){
    for(var i = 0; i < 15; i++){
        velocity = (Math.random()+1)*1;
        trail.push({
            pointX: Math.random()*battle.width, 
            pointY: 30, 
            size: Math.random()*3,
            velocity: velocity,
            timeToLeave: Math.random()*15
        });
    }
}
