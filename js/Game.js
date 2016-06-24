var FPS = 60;
var GAME_WIDTH = 1000;
var GAME_HEIGHT = 600;
var Missiles = new Array();
var Tanks = new Array();
var Explosions = new Array();

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var pen = canvas.getContext('2d');

    var isDebug = false;

    var myTank = new PlayerTank(10, 10, 'up');

    for(var i = 0; i < 8; i++){
        Tanks.push(new EnemyTank(200+i*100, 200, 'up'));
    }

    // generate walls
    var w = new Wall(100, 200);

    function generateWalls(){
        var seed = Math.random;
    };

    function reDraw(){
        pen.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        w.draw(pen);

        myTank.draw(pen);
        for(var i = 0; i < Missiles.length; i++){
            Missiles[i].draw(pen);
        }
        for(var i = 0; i < Tanks.length; i++){
            Tanks[i].draw(pen);
        }
        for(var i = 0; i < Explosions.length; i++){
            Explosions[i].draw(pen);
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
            m.collideWithWall(w);
        }

        // Tanks.
        myTank.collideWithWall(w);
        myTank.collideWithTanks(Tanks);
        for(var i = 0; i < Tanks.length; i++){
            var t = Tanks[i];
            t.collideWithWall(w);
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
