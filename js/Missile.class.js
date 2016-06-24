function Missile(x, y, direction, isEnemy){
    this.SIZE = 3;
    this.SPEED = 12;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isEnemy = isEnemy;
    this.isDead = false;

    //获取Missiles自身矩形
    this.getRect = function(){
        var rect = {'x': this.x, 'y': this.y, 'width': this.SIZE*2, 'height': this.SIZE*2};
        return rect;
    }

    
    //判断是否击中坦克
    this.attackTank = function(tank){
        if(this.isDead){
            return;
        }
        var isAttacked = false
        if(this.isEnemy != tank.isEnemy){
           isAttacked = isCollide(this.getRect(), tank.getSquare());
        }
        if(isAttacked){
            this.isDead = true;
            tank.isDead = true;
            Explosions.push(new Explosion(this.x, this.y));
        }
    };

    this.attackTanks = function(tanks){
        for(var i = 0; i < tanks.length; i++){
            this.attackTank(tanks[i]);
        }
    };

    this.collideWithWall = function(wall){
        if(this.isDead){
            return;
        }
        var isCollided = isCollide(this.getRect(), wall.getRect());
        if(isCollided){
            this.isDead = true;
        }
    };

    this.collideWithWalls = function(walls){
        for(var i = 0; i < walls.length; i++){
            this.collideWithWall(walls[i]);
        }
    };

    //子弹移动
    this.run = function(){
        switch(this.direction){
            case 'left':
                this.x -= this.SPEED;
                break;
            case 'up':
                this.y -= this.SPEED;
                break;
            case 'right':
                this.x += this.SPEED;
                break;
            case 'down':
                this.y += this.SPEED;
                break;
        }
        if(this.x > GAME_WIDTH || this.y > GAME_HEIGHT || this.x < 0-this.SIZE*2 || this.y < 0-this.SIZE*2){
            this.isDead = true;
        }
    };

    this.draw = function(p){
        if(this.isDead){
            Missiles.splice(Missiles.indexOf(this, 1));
            return;
        }
        this.run();
        p.fillStyle = 'red';
        p.beginPath();
        p.arc(this.x, this.y, this.SIZE, 0, 2*Math.PI);
        p.fill();
    };
};
