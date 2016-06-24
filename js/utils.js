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
