let unicorn ;
let tImg;
let bImg;
let uImg;
let dImg;
let mImg;
var gImg;                
var cImg; 
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
let cango = true;
let noagain = 1;
let trainx = 0;
var cloudx =0 ;
var groundX=0;
var mountounX=0;  
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
  dImg = loadImage("img/finish.png");
  mImg = loadImage("img/moun.png");
  gImg = loadImage("img/ground.png");
  cImg = loadImage("img/cloud.png");
  c1Img = loadImage("img/1.png");
  c2Img = loadImage("img/4.png");
  c3Img = loadImage("img/5.png");
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

// gameScreen = 2;
function backGroundPicture(){              //定义一个背景图片的函数
//   if(gImg>(-1)*(gImg.width)/2){   //如果图片的左半部分在画布上
//    groundX -= 8;                          //就使图片的横坐标减少一定的数值，实现图片向左移动
//   }
//    else    groundX=0;                     //如果图片的左半部分完全离开了画布，就使图片回到初始的位置 
//   image(gImg,groundX,height-20,gImg.width,gImg.height);  //显示地面的图片

//   if(cloudX>(-1)*(cImg.width)/2){     //如果图片的左半部分在画布上
//    cloudX -= 1;                           //就使图片的横坐标减少一定的数值，实现图片向左移动
//   }
//    else   cloudX=0;                       //如果图片的左半部分完全离开了画布，就使图片回到初始的位置
//   image(cImg,cloudX,50,cImg.width,cImg.height);  //显示云彩的图片

//  if(mountounX>(-1)*(mImg.width)/2){ //如果图片的左半部分在画布上
//    mountounX -= 0.3;                       //就使图片的横坐标减少一定的数值，实现图片向左移动
//   }
//    else   mountX=0;                        //如果图片的左半部分完全离开了画布，就使图片回到初始的位置
//   image(mImg,mountounX,60,mImg.width,mImg.height);  //显示大山的图片
background(100, 149, 237); 
image(cImg, 0, 0, width, height);
image(gImg, 0, 0, width, height);
image(mImg, 0, 0, width, height);
}
function draw() {
  //background(bImg)
 
  
   
  if (gameScreen == 0) {   
    
    
    backGroundPicture();
     initScreen();                
   } else if (gameScreen == 1) { 
    backGroundPicture();
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
 

  if(checkPoint === 4){
      gameScreen = 2;
      
    }
  
  
    if(keepGame && checkPoint < 4){

      unicorn.show();
      addObstacle();
      unicorn.move();

      // console.log("遊戲中")
      for(let i = 0; i < trains.length; i++){

        trains[i].show(checkPoint);
        trains[i].move();
        // console.log('checkPoint'+ trains.length);
         // 再次觸發
        // console.log(i + " "+trains[i].x);
        // if(unicorn.hit(trains[i]) && isdone === true){
        //   console.log('trans'+trains[checkPoint-2].x);
        //   console.log('x ' + trainx);
        //   if(((trainx) - (trains[checkPoint-2].x )) <= 7){
        //     noagain = false;
        //   }
        // }

        let go = (unicorn.hit(trains[i]));

        if(go){ //isdone 避免再次觸發
          console.log(i + " "+ trains[i].x)
          hitst = 1;
          // console.log("keepGame")
          // noagain ++;
          trainx = trains[i].x;
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
let obs_count = 0;
function addObstacle(){                    
 
  var interval= 5000;
  if(obs_count === 0){
    interval = 1000;
  }
  
  if (millis()-lastAddTime > interval) {   
      // console.log('time' + (millis()-lastAddTime))
     if (int(interval)%2==0 && obs_count < 3){                  
      trains.push(new Train());  
      obs_count++;
      console.log('obs_count'+obs_count);
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
  // rect(width/2,height/2,400,300);
  // fill(51);
  
  
  
  
  //姿勢對嗎
  //剪刀石頭不
  if(checkPoint === 1 || checkPoint === 2 || checkPoint === 3){
    image(video,width/4,100);
  
    textSize(32);
    textAlign(CENTER,CENTER);
    fill(255);
    text(label,width/2,height - 16 );
    timer(checkPoint); //下一關
    
  }
  
}

//倒數
function timer(checkPoint) {

  
  text(seconds, width/2, 80);
  if (frameCount % 60 == 0 && seconds > 0) {
    seconds --;
    console.log("seconds")
    if(seconds <= 0 ) {
      text("GAME OVER", width/2, height*0.7);
      noLoop();
      setTimeout(function(){
        initScreen();
      },3000);
      
    }
    if((checkPoint == 1 &&  label == "paper") || (checkPoint == 2 &&  label == "stone") || (checkPoint == 3 &&  label == "nothing")){
      console.log('又回了')
      holdtime ++;
      console.log(holdtime);
      if(holdtime >= 2){
        // console.log("paper");
        nextPoint();
      }
      // console.log("holdtime");
    }
  }
}
function nextPoint(){
    setTimeout(()=>{
      keepGame = true;
      hitst = 0;
      isdone = true;
      trains.splice(0,1);
      console.log(trains);
      checkPoint += 1;
      
      // console.log("text")
    },2000);
    //----- 為神麼會閃一下就不見
      textSize(200); 
      textAlign(CENTER,CENTER);
      text("o", width/2+20, height/2);
      console.log("iswork") 
       
  
}

function endGameScreen(){ 
   background(150,146,241,3);
   textAlign(CENTER);                 
   fill(255);                  
   textSize(75);                     
   text("成功", width/2, 80); 
   image(dImg,width/4,height/4,400,400);
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



