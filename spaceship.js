var battle;
var contextBattle;

var shoots = [];
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var healthBar = 3;


$(document).ready(function() {
    battle = document.getElementById("battle");
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    spaceship = {x: battle.width / 2, y: battle.height - spaceship_height*3}
    // battle.width = window.innerWidth / 3;
    // battle.height = window.innerHeight;
    contextBattle = battle.getContext("2d");
    battle.addEventListener("mousedown", function(e){
        fire(e);
    });

})

function keyDownHandler(e) {

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
    if(e.key == " "){
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

function fire(event){
    const x = spaceship.x, y = spaceship.y;
    shoots.push({x: x, y: y});
}

function drawSpaceship(){
    contextBattle.beginPath();
    contextBattle.arc(spaceship.x, spaceship.y, spaceship_width, 0, Math.PI*2);
    contextBattle.fill();
    contextBattle.moveTo(spaceship.x, spaceship.y - 15);
    contextBattle.lineTo(spaceship.x - 12, spaceship.y + 5);
    contextBattle.fillStyle = "#1d3687";
    contextBattle.fill();
    contextBattle.lineTo(spaceship.x + 12, spaceship.y + 5);
    contextBattle.strokeStyle = "#979797";
    contextBattle.closePath();
    contextBattle.moveTo(spaceship.x, spaceship - 15);
    contextBattle.arc(spaceship.x, spaceship - 12, 30, Math.PI, Math.PI*2);
    contextBattle.fillStyle = "orange"
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

    if(upPressed && spaceship.y > (battle.height / 2) + spaceship_height){
        spaceship.y = spaceship.y - spaceship_speed;
    }else if(downPressed && spaceship.y < battle.height - spaceship_height){
        spaceship.y = spaceship.y + spaceship_speed;
    }
}


function updateFirePositions(){
    shoots.forEach(shoot => {       
        shoot.y = shoot.y - 1;
        if(shoot.y < 0 ){
            var index = shoots.indexOf(shoot);
            shoots.splice(index, 1);
        }
        contextBattle.beginPath();
        contextBattle.arc(shoot.x, shoot.y, 2, 0, Math.PI*2);
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
                healthBar--;
                if(healthBar == 0){
                    alert("You Lost");
                }
                reset();
            }
    });
}


