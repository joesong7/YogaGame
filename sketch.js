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

let label = "wating...";

//EVENTS
var mousePress = false;
var mousePressEvent = false;
var mouseReleaseEvent = false;
var keyPress = false;
var keyPressEvent = false;
var keyReleaseEvent = false;

function preload(){
  uImg = loadImage("S__61939715-removebg-preview.png");
  bImg = loadImage("121.png");
  tImg = loadImage("train.png");
  
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  
}
function setup() {
  if(mobile()) {
    c = createCanvas(windowWidth,windowHeight);
  }
  else {
    c = createCanvas(650, 450);
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
  
  classifyVideo();
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}


// gameScreen = 1;
function draw() {
  //background(bImg)
  image(bImg, 0, 0, width, height);

  if (gameScreen == 0) {         //如果当前是游戏准备开始界面状态
     initScreen();                //调用游戏准备方法，进入游戏准备界面
   } else if (gameScreen == 1) {  //如果当前是游戏界面状态
     gamePlayScreen();   
     //调用开始游戏方法，进入游戏界面
   } else if (gameScreen == 2) {  //如果当前是游戏结束界面状态
     gameOverScreen();            //调用游戏结束方法，进入游戏结束界面
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
  classifyVideo();
}


function initScreen(){
  text("press into",20,50); 
  
}  
let isdone = false;
let isMove = true;
function gamePlayScreen(){
  
  //image(video, 0, 0);
  
  train.show();
  unicorn.show();
  console.log('moveeee');
  unicorn.move();
  if(isMove){
    train.move();
  }
  
  if(mousePressEvent || (keyPressEvent && key == ' ') ) {
    
    
      unicorn.jump();
    
    
    
    mousePressEvent = false;
    mouseReleaseEvent = false;
    keyPressEvent = false;
    keyReleaseEvent = false;
  }
  
  
  if(train.hit(unicorn) && isdone === false){
    hitst = 1;
    
    let sgame = false;
    smallgame();
    isMove  = false; //動
    console.log("可以");
    //let sgame = smallgame();

    
      if(sgame){
        isMove  = false;

      }
      
    
  } else if(isdone === true){
    console.log('new world')
  }
  
  
  
}
  
function smallgame() {
  // noLoop();
  rect(width/2,height/2,400,300);
  fill(51);
  
  // console.log(label);
  image(video,100,100);
  
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(255);
  text(label,width/2,height - 16 );
  
  if(label === "paper"){
    
    sgame = true;
    console.log("剪刀");
  }
}
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



