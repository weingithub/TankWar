function Wall(x, y){
    this.SIZE = 40;
    this.x = x;
    this.y = y;

    this.getRect = function(){
        var rect = {'x': this.x, 'y': this.y, 'width': this.SIZE, 'height': this.SIZE};
        return rect;
    };

    this.draw = function(p){
        p.fillStyle = 'black';
        p.fillRect(this.x, this.y, this.SIZE, this.SIZE);
    };
};
