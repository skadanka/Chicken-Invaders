var canvas;
var contextShips;
var enemy_spaceship_size = 13;
var speed = 2;


var brigade = [];
var enemyShots = [];
var enemyBullet;
var enemeis_killed = 0;
const points = [20, 15, 10, 5];
const health = [4, 3, 2, 1]
const colors = ['blue', 'green', 'purple', 'red']

$(document).ready(function(){
    canvas = document.getElementById("space");
    contextShips = canvas.getContext("2d");
    
   createBrigade();
});

function createBrigade(){
    for(let i = 0; i < 4; i++){
        brigade[i] = [];
        for(let j = 0; j < 5; j++){
            enemySpaceship = {x: startCx + 60*j, 
                y:  40 + 50*i, 
                alive: 1, type: i, 
                points: points[i], 
                health: health[i]
            }
            brigade[i][j] = enemySpaceship;
        }
    }  
} 

function drawEnemy(cx, cy, color){
    contextShips.beginPath();
    contextShips.arc(cx, cy, enemy_spaceship_size, 0, Math.PI*2);
    contextShips.moveTo(cx - enemy_spaceship_size, cy);
    contextShips.lineTo(cx, cy + enemy_spaceship_size*2);
    contextShips.lineTo(cx + enemy_spaceship_size, cy)
    contextShips.strokeStyle = 'grey';
    contextShips.fillStyle = color;
    contextShips.fill();
    contextShips.stroke();
}

function drawBrigade(speed){
    collisionDetetctionEnemy();
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 5; j++){
            if(brigade[i][j].alive == 1){
                brigade[i][j].x += speed;
                drawEnemy(brigade[i][j].x, brigade[i][j].y, colors[i]);         
            }
        }
    }
}

function updateEnemyFirePositions(){
    enemyShots.forEach(shoot => {       
        shoot.y = shoot.y + 1;
        if(shoot.y > canvas.height ){
            var index = enemyShots.indexOf(shoot);
            enemyShots.splice(index, 1);
        }
        contextBattle.beginPath();
        contextBattle.arc(shoot.x, shoot.y, 3, 0, Math.PI*2);
        contextBattle.fillStyle = "red";
        contextBattle.strokeStyle = "darkorange";
        contextBattle.fill();
        contextBattle.stroke();
    });
}

function collisionDetetctionEnemy(){
    shoots.forEach(shoot => {
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < brigade[i].length; j++){
                if( brigade[i][j].alive == 1 &&
                    brigade[i][j].x  + enemy_spaceship_size > shoot.x && 
                    brigade[i][j].x - enemy_spaceship_size < shoot.x && 
                    brigade[i][j].y + enemy_spaceship_size > shoot.y &&
                    brigade[i][j].y - enemy_spaceship_size < shoot.y ){
                        brigade[i][j].health -= 1;
                        var index = shoots.indexOf(shoot);
                        shoots.splice(shoot, 1);
                        if(brigade[i][j].health == 0){
                            enemeis_killed++;
                            score = score + brigade[i][j].points;
                            scoreTag.textContent = `Score: ${score}`;
                            brigade[i][j].alive = 0;
                        }
                }
            }
        }
    });
}

function enemyShot(){
    if(enemyBullet.y > canvas.height*0.75){
        while(true){
            var row = Math.round(Math.random()*3);

            if(brigade[row].length > 0 ){
                var col = Math.round(Math.random()*(brigade[row].length-1));
                enemyBullet = {x: brigade[row][col].x, y: brigade[row][col].y};
                enemyShots.push(enemyBullet);
                return;
            }
        }
    }
}

var startCx = 20;
var move_right = true;
function updateBrigade(){
    if(enemeis_killed == 20){
        reset();
    }
    enemyShot();
    if(startCx > canvas.width - enemy_spaceship_size*2*9){
        move_right = false;
    }else if(startCx < 10) {
        move_right = true;
    }

    if(move_right){
        startCx = startCx + speed;
        drawBrigade(speed);
    }else{
        startCx = startCx - speed;
        drawBrigade(-speed);
    }

}
