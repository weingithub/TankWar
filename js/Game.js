var FPS = 60;
var SCREEN_WIDTH = 1200;
var SCREEN_HEIGHT = 640;
var OVERWALLWIDTH = 5;
var GAME_WIDTH = SCREEN_WIDTH - OVERWALLWIDTH*2;
var GAME_HEIGHT = SCREEN_WIDTH - OVERWALLWIDTH*2;
var Missiles = new Array();
var Tanks = new Array();
var Explosions = new Array();
var Walls = new Array();
var myTank = null;
var score = 0;

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var pen = canvas.getContext('2d');

    var isDebug = false;

    myTank = new PlayerTank(10, 10, 'up');

    for(var j = 0; j < 2; j++){
        for(var i = 0; i < 4; i++){
            Tanks.push(new EnemyTank(200+i*100, 100*(j+1), 'up'));
        }
    }

    for(var i = 0; i < 8; i++){
        Walls.push(new Wall(40*i+120, 400));
    }
    for(var i = 0; i < 6; i++){
        Walls.push(new Wall(700, 40*i+150));
    }
    Walls.push(new Wall(0, 0, 'gray', width=SCREEN_WIDTH, height=OVERWALLWIDTH));
    Walls.push(new Wall(0, SCREEN_HEIGHT-OVERWALLWIDTH, 'gray', width=SCREEN_WIDTH, height=10));
    Walls.push(new Wall(0, 0, 'gray', width=OVERWALLWIDTH, height=SCREEN_HEIGHT));
    Walls.push(new Wall(SCREEN_WIDTH-OVERWALLWIDTH, 0, 'gray', width=10, height=SCREEN_HEIGHT));



    /*
    // generate map
    function generateMap(seed){
        console.log('update seed: ' + seed);
        var count_walls = Math.floor(seed * 4) + 4;
        //generate walls
    }

    // generate map seed.
    var seed = Math.random();
    var seed_edit = document.getElementById('seed_edit');
    if(seed_edit.value != ''){
        seed = seed_edit.value;
    }else{
        seed_edit.value = seed;
    }
    generateMap(seed);
   */


    function reDraw(){
        pen.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // draw tanks.
        myTank.draw(pen);
        for(var i = 0; i < Tanks.length; i++){
            Tanks[i].draw(pen);
        }

        // draw missiles.
        for(var i = 0; i < Missiles.length; i++){
            Missiles[i].draw(pen);
        }

        // draw explosions.
        for(var i = 0; i < Explosions.length; i++){
            Explosions[i].draw(pen);
        }

        // draw walls.
        for(var i = 0; i < Walls.length; i++){
            Walls[i].draw(pen);
        }

        pen.fillStyle = 'black';
        pen.font = 'bold 12px Courier New';
        if(isDebug){
            pen.fillText('TankWar(DEBUG) -- by. Cano', 5, 16);
            pen.fillText('My Tank Position: ' + myTank.x + ', ' + myTank.y, 5, 32);
            pen.fillText('Count Tanks: ' + Tanks.length, 5, 48);
            pen.fillText('Count Missiles: ' + Missiles.length, 5, 64);
            pen.fillText('Count Explosions: ' + Explosions.length, 5, 80);
            pen.fillText('Count Walls: ' + Walls.length, 5, 96);
        }
        pen.font = 'bold 14px Courier New';
        pen.fillText('Game Score: ' + score, GAME_WIDTH-120, 20);
    };

    function loop(){
        for(var i = 0; i < Tanks.length; i++){
            Tanks[i].brain();
        }
        reDraw();
    }

    setInterval(loop, 1000/FPS);

    window.onkeydown = function(keyEvent){
        var key = keyEvent.key || keyEvent.keyCode;
        switch(key){
            case '3':
                if(isDebug){
                    isDebug = false;
                }else{
                    isDebug = true;
                }
            default:
                myTank.keyDownEvent(key);
        }
    }

    window.onkeyup = function(keyEvent){
        var key = keyEvent.key || keyEvent.keyCode;
        myTank.keyUpEvent(key);
    }
};
