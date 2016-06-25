function Explosion(x, y, size=20){
    this.size = size;
    this.x = x;
    this.y = y;
    this.isDead = false;
    this.steps = new Array();
    this.step = 0;

    for(var i = 0; i < 8; i++){
        this.steps[i] = this.size/8*i;
    }

    this.draw = function(p){
        if(this.isDead){
            Explosions.splice(Explosions.indexOf(this), 1);
            return;
        }

        p.fillStyle = 'red';
        p.beginPath();
        p.arc(this.x, this.y, this.steps[this.step], 0, 2*Math.PI);
        p.fill();

        if(this.step == this.steps.length){
            this.isDead = true;
        }

        this.step++;
    };
};
