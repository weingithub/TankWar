function PlayerTank(x, y, direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isEnemy = false;
    this.color = 'blue'

    this.keyDownEvent = function(key){
        switch(key){
            case 'w':
                this.changeDirection('up');
                this.isRunning = true;
                break;
            case 'a':
                this.changeDirection('left');
                this.isRunning = true;
                break;
            case 's':
                this.changeDirection('down');
                this.isRunning = true;
                break;
            case 'd':
                this.changeDirection('right');
                this.isRunning = true;
                break;
            case 'j':
                this.attack();
                this.isAttacked = true;
        }
    };

    this.keyUpEvent = function(key){
        if(this.direction == 'up' && key == 'w'){
            this.isRunning = false;
        }
        if(this.direction == 'left' && key == 'a'){
            this.isRunning = false;
        }
        if(this.direction == 'down' && key == 's'){
            this.isRunning = false;
        }
        if(this.direction == 'right' && key == 'd'){
            this.isRunning = false;
        }
        if(key == 'j'){
            this.isAttacked = false;
        }
    };
}
PlayerTank.prototype = new Tank();
