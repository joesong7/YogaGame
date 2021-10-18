class Train {
  
  constructor(){
    this.r = 75;
    this.x = width;
    this.y = random(height/2-10,height / 2);
  }
  
  hit(uni){
    let x1 = this.x + this.r * 0.8;
    let y1 = this.y + this.r * 0.8;
    let x2 = uni.x + uni.r * 0.5;
    let y2 = uni.y + uni.r * 0.5;
    return collideCircleCircle(x1,y1,this.r,x2,y2,uni.r);
  }
  
  move(){
    this.x -= 7;
  }
  
  show(){
    image(tImg,this.x,this.y,this.r,this.r);
    fill(255,50);
    // ellipseMode(CORNER);
    // ellipse(this.x,this.y,this.r,this.r)
  }
}