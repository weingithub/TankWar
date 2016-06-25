function EnemyTank(x, y, direction){
    this.SPEED = 4;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isEnemy = true;
    this.color = 'green'

    this.brain = function(){
        this.direction = 'left';
        this.run();
    };
}
EnemyTank.prototype = new Tank();
