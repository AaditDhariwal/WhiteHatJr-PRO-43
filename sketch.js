
var monkey , monkey_running
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var bGroup, oGroup
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(650,300);

  monkey= createSprite(50,200,10,10);
  monkey.addAnimation("run",monkey_running)
  monkey.scale=0.11;
  
  
  ground=createSprite(300,260,700,5);
  ground.shapeColor="black";
  
   oGroup= createGroup();
   bGroup=createGroup();
 
  }

function draw() {

background("white");

  if(gameState==PLAY){
  //ground
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  //jumping
  if(keyDown("space") && monkey.y>170){
    monkey.velocityY=-15;
  }
  
  //gravity
  monkey.velocityY=monkey.velocityY+0.7
   monkey.collide(ground); 
  
  //spawning obstacles
  var rand= Math.round(random(1,2));
  
  switch(rand){
    case 1: spawnOb1();
            spawnOb1();
        break;
    case 2: spawnOb2();
        break;
        default:break;
  }
  
  //spawning banana
  spawnBanana();
  
  //displaying score
  fill("red");
  textSize(20);
  text("Score="+ score, 500,50);
  
  //calculating score
  if(bGroup.isTouching(monkey)){
    bGroup.destroyEach();
     score=score+2;
     }    
}
  
  //defining game state end
 if (gameState==END){
   ground.velocityX=0;
   bGroup.destroyEach();
   oGroup.destroyEach();
   monkey.destroy();
   ground.velocityX=0;
   fill("black");
   textSize(30)
   text("Game Over",225,100);
   fill("red");
   textSize(25)
   text("Score="+ score,250,135);
 }

  
  if(oGroup.isTouching(monkey)){
     gameState=END;
     }
  
  drawSprites();
}

function spawnOb1(){
  if(frameCount%45==0){
    obstacle=createSprite(random(600,650),250,10,10);
    obstacle.velocityX=-7;
    obstacle.addImage("ob",obstacleImage);
    obstacle.scale=0.09;
    oGroup.add(obstacle);
}
}

function spawnOb2(){
  if(frameCount%60==0){
    obstacle=createSprite(random(600,650),240,10,10);
    obstacle.velocityX=-7;
    obstacle.addImage("ob",obstacleImage);
    obstacle.scale=0.12;
   oGroup.add(obstacle);
}
}

function spawnBanana(){
  if(frameCount%90==0){
     banana=createSprite(700,random(100,175),10,10);
     banana.addImage("b",bananaImage);
    banana.scale=0.1;
    banana.velocityX=-15;
    bGroup.add(banana);
     }
}




