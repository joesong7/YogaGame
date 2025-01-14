class Unicorn{
  
  constructor() {
    this.r = 95;
    this.x = 50;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 3;
    this.newp = height - this.r
  }
  hit(uni){ // uni是train
    let x1 = this.x + this.r * 0.8;
    let y1 = this.y + this.r * 0.8;
    let x2 = uni.x + uni.r * 0.5;
    let y2 = uni.y + uni.r * 0.5;
    return collideCircleCircle(x1,y1,this.r,x2,y2,uni.r);
  }
  jump(){
    if(hitst==0){
      if(this.y === height - this.r){
        this.vy = -30;
      }
    }
  }
  stop(){
    
    // this.gravity = 0;
  }
  move(){
    if(hitst==0){
      this.y += this.vy;
      this.vy += this.gravity;
      this.y = constrain(this.y,0,this.newp);
    }
    
    // this.x += 3;
  }
  
  show(){
    image(uImg,this.x,this.y,this.r,this.r);
    fill(255,50)
    // ellipseMode(CORNER);
    // ellipse(this.x,this.y,this.r,this.r);
  }
}