var trailer;
var spaceship = {cx: 50, cy : 50}

var battle;
var contextBattle;

var shoots = [];

$(document).ready(function() {
    trailer = document.getElementById("trailer");
    battle = document.getElementById("battle");
    // battle.width = window.innerWidth / 3;
    // battle.height = window.innerHeight;
    contextBattle = battle.getContext("2d");
    battle.addEventListener("mousedown", function(e){
        fire(e);
    });

    intervalTimer = setInterval(main, 1);
})

const drawSpaceship  = (cx, cy) => {
    contextBattle.arc(cx, spaceship.cy, 10, 0, Math.PI*2);
    contextBattle.fillStyle = "blue";
    contextBattle.fill();
    contextBattle.stroke()
}

window.onmousemove = e => {
    const x = e.clientX - trailer.offsetWidth / 2, 
          y = e.clientY - trailer.offsetHeight / 2;
    
    if(x > window.innerWidth / 3 - trailer.offsetWidth || x < 0 + trailer.offsetWidth/2){
        return 
    }
    const keyframes = {
            transform: `translate(${x}px)`
        }

    trailer.animate(keyframes, 
        {
            duration: 800,
            fill: "forwards",
        });
    
}

function fire(event){
    const rect = battle.getBoundingClientRect();
    const tr = trailer.getBoundingClientRect();
    const x = tr.x + trailer.offsetWidth/ 2, y = tr.y;
    shoots.push({x: x, y: y});
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


