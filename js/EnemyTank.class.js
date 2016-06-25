function EnemyTank(x, y, direction){
    this.SPEED = 4;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isEnemy = true;
    this.color = 'green'

    this.isNotInWall = function(){
        var notInWall = true;
        for(var i = 0; i < Walls.length; i++){
            if(isCollide(this.getSquare(), Walls[i].getRect())){
                notInWall = false;
            }
        }
        return notInWall;
    };

    this.isNotInTank = function(){
        var notInTank = true;
        for(var i = 0; i < Tanks.length; i++){
            if(isCollide(this.getSquare(), Tanks[i].getSquare())){
                notInTank = false;
            }
        }
        if(isCollide(this.getSquare(), myTank.getSquare())){
            notInTank = false;
        }
        return notInTank;
    };

    this.goTo = function(){
        if(getChance(120)){
            var dir = getRandomDirection();
            while(dir == this.direction){
                dir = getRandomDirection();
            }
            this.changeDirection(dir);
        }
        this.run();
    };

    this.brain = function(){
        this.goTo();
        if(getChance(60)){
            this.attack();
        }
    };
};
EnemyTank.prototype = new Tank();
