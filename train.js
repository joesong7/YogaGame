class Train {
  
  constructor(){
    this.r = 75;
    this.x = width;
    this.y = random(height/2-10,height / 2);
  }
  
  
  
  move(){
    this.x -= 7;
  }
  
  show(showimg){
    let CC;
    if(showimg === 1){
      CC = c1Img ;
    }else if(showimg === 2){
       CC = c2Img ;
    }else if(showimg === 3){
       CC = c3Img ;
    }
    image(CC,this.x,this.y,this.r,this.r);
    fill(255,50);
    // ellipseMode(CORNER);
    // ellipse(this.x,this.y,this.r,this.r)
  }
}