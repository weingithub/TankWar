function Wall(x, y, color='black', width=40, height=40){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.getRect = function(){
        var rect = {'x': this.x, 'y': this.y, 'width': this.width, 'height': this.height};
        return rect;
    };

    this.draw = function(p){
        p.fillStyle = this.color;
        p.fillRect(this.x, this.y, this.width, this.height);
    };
};
