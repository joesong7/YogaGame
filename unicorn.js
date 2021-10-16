class Unicorn{
  
  constructor() {
    this.r = 100;
    this.x = 50;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 3;
    this.newp = height - this.r
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
    
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y,0,this.newp);
    // this.x += 3;
  }
  
  show(){
    image(uImg,this.x,this.y,this.r,this.r);
    fill(255,50)
    // ellipseMode(CORNER);
    // ellipse(this.x,this.y,this.r,this.r);
  }
}