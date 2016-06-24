var FPS = 60;
var GAME_WIDTH = 1000;
var GAME_HEIGHT = 600;
var Missiles = new Array();
var Tanks = new Array();
var Explosions = new Array();
var Walls = new Array();

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var pen = canvas.getContext('2d');

    var isDebug = false;

    var myTank = new PlayerTank(10, 10, 'up');

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

        if(isDebug){
            pen.fillStyle = 'black';
            pen.font = 'bold 12px Courier New';
            pen.fillText('TankWar(DEBUG) -- by. Cano', 5, 16);
            pen.fillText('My Tank Position: ' + myTank.x + ', ' + myTank.y, 5, 32);
            pen.fillText('Count Tanks: ' + Tanks.length, 5, 48);
            pen.fillText('Count Missiles: ' + Missiles.length, 5, 64);
            pen.fillText('Count Explosions: ' + Explosions.length, 5, 80);
        }
    };

    function loop(){
        reDraw();
        // Missiles,
        for(var i = 0; i < Missiles.length; i++){
            var m = Missiles[i];
            m.attackTanks(Tanks);
            m.attackTank(myTank);
            m.collideWithWalls(Walls);
        }

        // Tanks.
        myTank.collideWithWalls(Walls);
        myTank.collideWithTanks(Tanks);
        for(var i = 0; i < Tanks.length; i++){
            var t = Tanks[i];
            t.collideWithWalls(Walls);
            t.collideWithTanks(Tanks);
        }
       
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
