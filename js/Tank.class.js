function Tank(x, y, direction){
    this.SIZE = 10;
    this.SPEED = 5;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isRunning = false;
    this.isAttacked = false;
    this.color = 'gray';
    this.oldPosition = {'x': this.x, 'y': this.y};


    this.collideWithTank = function(tank){
        if(isCollide(this.getSquare(), tank.getSquare())){
            this.x = this.oldPosition.x;
            this.y = this.oldPosition.y;
        }
    }

    this.collideWithTanks = function(tanks){
        for(var i = 0; i < tanks.length; i++){
            var t = tanks[i];
            if(t != this){
                this.collideWithTank(tanks[i]);
            }
        }
    }

    this.collideWithWall = function(wall){
        if(isCollide(this.getSquare(), wall.getRect())){
            this.x = this.oldPosition.x;
            this.y = this.oldPosition.y;
        }
    };

    this.collideWithWalls = function(walls){
        for(var i = 0; i < walls.length; i++){
            this.collideWithWall(walls[i]);
        }
    }

    this.getSquare = function(){
        var square = {'x': this.x, 'y': this.y, 'width': this.SIZE*4, 'height': this.SIZE*4};
        if(this.direction == 'left'){
            square['x'] = this.x + this.SIZE;
        }else if(this.direction == 'up'){
            square['y'] = this.y + this.SIZE;
        }
        return square;
    }

    this.getRect = function(){
        var rect = {'x': this.x, 'y': this.y}
        if(this.direction == 'left' || this.direction == 'right'){
            rect['width'] = this.SIZE*5;
        }else if(this.direction == 'up' || this.direction == 'down'){
            rect['width'] = this.SIZE*4;
        }
        if(this.direction == 'left' || this.direction == 'right'){
            rect['height'] = this.SIZE*4;
        }else if(this.direction == 'up' || this.direction == 'down'){
            rect['height'] = this.SIZE*5;
        }
        return rect;
    }

        
    this.attack = function(){
        if(this.isAttacked){
            return;
        }
        if(this.direction == 'left' || this.direction == 'right'){
            var mx = this.x + (this.SIZE*5)/2;
            var my = this.y + (this.SIZE*4)/2;
        }else if(this.direction == 'up' || this.direction == 'down'){
            var mx = this.x + (this.SIZE*4)/2;
            var my = this.y + (this.SIZE*5)/2;
        }
        var m = new Missile(mx, my, this.direction, this.isEnemy, this);
        Missiles.push(m);
    };

    //坦克移动
    this.run = function(){
        this.oldPosition.x = this.x;
        this.oldPosition.y = this.y;
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

        this.collideWithWalls(Walls);
        if(this.isEnemy){
            this.collideWithTank(myTank);
        }
        this.collideWithTanks(Tanks);
    };

    //改变坦克方向
    this.changeDirection = function(direction){
        switch(direction){
            case 'up':
                switch(this.direction){
                    case 'left':
                        this.x += this.SIZE;
                        this.y -= this.SIZE;
                        break;
                    case 'down':
                        this.y -= this.SIZE;
                        break;
                    case 'right':
                        this.y -= this.SIZE;
                        break;
                }
                this.direction = 'up';
                break;
            case 'right':
                switch(this.direction){
                    case 'left':
                        this.x += this.SIZE;
                        break;
                    case 'up':
                        this.y += this.SIZE;
                        break;
                }
                this.direction = 'right';
                break;
            case 'down':
                switch(this.direction){
                    case 'left':
                        this.x += this.SIZE;
                        break;
                    case 'up':
                        this.y += this.SIZE;
                        break;
                }
                this.direction = 'down';
                break;
            case 'left':
                switch(this.direction){
                    case 'up':
                        this.x -= this.SIZE;
                        this.y += this.SIZE;
                        break;
                    case 'right':
                        this.x -= this.SIZE;
                        break;
                    case 'down':
                        this.x -= this.SIZE;
                        break;
                }
                this.direction = 'left';
                break;
        }
    };


    //绘坦克自身
    this.draw = function(p){
        if(this.isDead){
            Tanks.splice(Tanks.indexOf(this), 1);
            score += 10;
            return;
        }
        if(this.isRunning){
            this.run();
        }
        p.fillStyle = this.color;
        var color = p.fillStyle;
        var a_w = this.SIZE/2;
        if(this.isAttacked){
            color = 'orange';
            a_w = this.SIZE/3*2;
        }
        switch(this.direction){
            case 'up':
                p.fillRect(this.x, this.y+this.SIZE, this.SIZE/10*9, 4*this.SIZE);
                p.fillRect(this.x+this.SIZE/10*31, this.y+this.SIZE, this.SIZE/10*9, 4*this.SIZE);
                p.fillRect(this.x+this.SIZE, this.y+2*this.SIZE, 2*this.SIZE, 2*this.SIZE);
                p.fillStyle = color;
                p.fillRect(this.x+(this.SIZE*4-a_w)/2, this.y, a_w, this.SIZE*5/2);
                break;
            case 'right':
                p.fillRect(this.x, this.y, this.SIZE*4, this.SIZE/10*9);
                p.fillRect(this.x, this.y+this.SIZE/10*31, this.SIZE*4, this.SIZE/10*9);
                p.fillRect(this.x+this.SIZE, this.y+this.SIZE, this.SIZE*2, this.SIZE*2);
                p.fillStyle = color;
                p.fillRect(this.x+this.SIZE/2*5, this.y+(this.SIZE*4-a_w)/2, this.SIZE/2*5, a_w);
                break;
            case 'down':
                p.fillRect(this.x, this.y, this.SIZE/10*9, 4*this.SIZE);
                p.fillRect(this.x+this.SIZE/10*31, this.y, this.SIZE/10*9, 4*this.SIZE);
                p.fillRect(this.x+this.SIZE, this.y+this.SIZE, 2*this.SIZE, 2*this.SIZE);
                p.fillStyle = color;
                p.fillRect(this.x+(this.SIZE*4-a_w)/2, this.y+this.SIZE/2*5, a_w, this.SIZE*5/2);
                break;
            case 'left':
                p.fillRect(this.x+this.SIZE, this.y, this.SIZE*4, this.SIZE/10*9);
                p.fillRect(this.x+this.SIZE, this.y+this.SIZE/10*31, this.SIZE*4, this.SIZE/10*9);
                p.fillRect(this.x+this.SIZE*2, this.y+this.SIZE, this.SIZE*2, this.SIZE*2);
                p.fillStyle = color;
                p.fillRect(this.x, this.y+(this.SIZE*4-a_w)/2, this.SIZE/2*5, a_w);
                break;
        }
    };

};
