function EnemyTank(x, y, direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isEnemy = true;
    this.color = 'green'

    this.brain = function(){
        this.y++;
    };
}
EnemyTank.prototype = new Tank();
