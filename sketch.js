let unicorn ;
let tImg;
let bImg;
let uImg;
let trains = [];
let train;
let checkbox;
let c;
let gameScreen = 0 ; 

let classifier;
let hitst = 0;

let modelURL = 'https://teachablemachine.withgoogle.com/models/3zlSSqQYT/';

let label = "wating";
let done_game = false;
let keepGame = true;
let isdone = false;
let isMove = true;
let checkPoint = 1;
let countdown;
let seconds = 10;
let holdtime = 0;
let lastAddTime = 0;

//EVENTS
var mousePress = false;
var mousePressEvent = false;
var mouseReleaseEvent = false;
var keyPress = false;
var keyPressEvent = false;
var keyReleaseEvent = false;

//載入
function preload(){
  uImg = loadImage("img/standup.png");
  bImg = loadImage("img/121.png");
  tImg = loadImage("img/train.png");
  
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  
}
function setup() {
  if(mobile()) {
    c = createCanvas(windowWidth,windowHeight);
  }
  else {
    c = createCanvas(700, 500);
  }
  // imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER,CENTER);
  
  unicorn = new Unicorn();
  train = new Train();
  
  
  video = createCapture(VIDEO);
  video.size(400, 450);
  video.hide();
  
  //ml5
  classifyVideo();
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}


function draw() {
  //background(bImg)
  image(bImg, 0, 0, width, height);

  if (gameScreen == 0) {         
     initScreen();                
   } else if (gameScreen == 1) {  
     gamePlayScreen();
   } else if (gameScreen == 2) {  
     endGameScreen();            
   } 
  
  
    mousePressEvent = false;
    mouseReleaseEvent = false;
    keyPressEvent = false;
    keyReleaseEvent = false;
  
  
} 
//EVENT
function mousePressed() {
  mousePress = true;
  mousePressEvent = true;
}
function mouseReleased() {
  mousePress = false;
  mouseReleaseEvent = true;
}
function keyPressed() {
  keyPress = true;
  keyPressEvent = true;
}
function keyReleased() {
  keyPress = false;
  keyReleaseEvent = true;
}



function gotResults(error,results){
  if(error){
    console.error(error);
    return;
  }
  label = results[0].label;
  // console.log(label);
  classifyVideo();
}

//開始畫面
function initScreen(){ 
   unicorn.show();
   textAlign(CENTER);                 
   fill(255);                  
   textSize(100);                     
   text("YOGA", width/2, height/2); 

   fill(251, 215, 67);                   
   noStroke();                         
   rectMode(CENTER);                   
   rect(width/2, height-80, 120,60,20); 
   fill('#222222'); 
   textSize(30);                       
   text("開始", width/2, height-75);
  
}  


//遊戲中
function gamePlayScreen(){
  train.show();
  unicorn.show();
  addObstacle();
  if(keepGame){
    
    unicorn.move();
    
    // console.log("遊戲中")
    for(let t of trains){
      t.move();
      if(t.hit(unicorn) && isdone === false){ //isdone 避免再次觸發
        console.log("hitst")
        hitst = 1;
        console.log("keepGame")
        keepGame = false;
      }
    }
    
  }else{
    // console.log("靜止動作");
    smallgame();
  }
  
  if(mousePressEvent || (keyPressEvent && key == ' ') ) { 
    // console.log("有跳");
    unicorn.jump();
    mousePressEvent = false;
    mouseReleaseEvent = false;
    keyPressEvent = false;
    keyReleaseEvent = false;
  }

  
  
}
//障礙物
let obs_count = 1;
function addObstacle(){                    
  var interval=random(800,4000);           
  if (millis()-lastAddTime > interval) {   

     if (int(interval)%2==0 && obs_count <= 3){             obs_count ++;
        trains.push(new Train());       
     }
     // else{                                 
     //   birds.push(new Bird());             
     // }
      lastAddTime = millis();              
  }
} 
//判斷game
function smallgame() {
  
  //isMove  = false; //不能動
  rect(width/2,height/2,400,300);
  fill(51);
  
  
  image(video,width/4,100);
  
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(255);
  text(label,width/2,height - 16 );
  
  //姿勢對嗎
  //剪刀石頭不
  if(checkPoint === 1 || checkPoint === 2 || checkPoint === 3){
    timer(checkPoint); //下一關
    console.log("checkPoint === "+ checkPoint)
  }
  
}

//倒數
function timer(checkPoint) {

  
  text(seconds, width/2, 80);
  if (frameCount % 60 == 0 && seconds > 0) {
    seconds --;
    console.log("seconds")
    if((checkPoint == 1 &&  label == "paper")){
      holdtime ++;
      console.log(holdtime);
      if(holdtime >= 2){
        console.log("paper");
        nextPoint();
      }
      console.log("holdtime");
    }
  }
  
  console.log("fuck");
  if(seconds < 0 ) {
    // text("GAME OVER", width/2, height*0.7);
    
    console.log("<0")
  }

}
function nextPoint(){
    setTimeout(()=>{
      keepGame = true;
      hitst = 0;
      isdone = true;
      checkPoint += 1;
      console.log("text")
    },2000);
    //----- 為神麼會閃一下就不見
      textSize(200); 
      textAlign(CENTER,CENTER);
      text("o", width/2+20, height/2);
      console.log("iswork") 
       
  
}

//成功辨識
function game_sucess(){
   
}
// 滑鼠事件
function mouseClicked(){
  gameScreen = 1;
  
}


function checkloop(){
  if(this.checked()){
    loop();
  }
}





// mobile
function mobile() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}



