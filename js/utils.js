function isCollide(rect1, rect2){
    var isCollide = false;
    if(rect1.x + rect1.width > rect2.x && 
       rect1.x < rect2.x + rect2.width &&
       rect1.y + rect1.height > rect2.y &&
       rect1.y < rect2.y + rect2.height)
    {
        isCollide = true;
    }
    return isCollide;
};

function getChance(all){
    var r = Math.floor(Math.random() * all);
    if(r == 0){
        return true;
    }
    return false;
}

function getRandomPosition(){
    var pos = {};
    pos['x'] = Math.floor(Math.random() * GAME_WIDTH) + 5;
    pos['y'] = Math.floor(Math.random() * GAME_HEIGHT) + 5;
    return pos;
};

function getRandom(max, min=0){
    return Math.floor(Math.random() *(max - min)) + min;
}

function getRandomDirection(){
    var r = getRandom(3);
    var dir = null;
    switch(r){
    case 0:
        dir = 'left';
        break;
    case 1:
        dir = 'up';
        break;
    case 2:
        dir = 'right';
    break;
    case 3:
        dir = 'down';
        break;
    }
    return dir;
}
