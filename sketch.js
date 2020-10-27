
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage,bananaGroup;
var obstacle, obstacleImage
var obstacleGroup;
var score = 0;
var ground;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;
function preload(){
  
  monkey_collided = loadAnimation("collided.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400,400); 
 monkey = createSprite(50,350,1,1);
 monkey.addAnimation("running",monkey_running);
 monkey.addAnimation("collided",monkey_collided);
 monkey.scale=0.1;
 ground = createSprite(200,390,800,20);
 ground.velocityX=-5;
 bananaGroup = createGroup();
 obstacleGroup = createGroup();
}


function draw() {
 background("white");
 if(gameState === PLAY){
  if(keyDown("space")&& monkey.y >= 349) {
    monkey.velocityY = -12;
    }     
 survivalTime = survivalTime + Math.round(getFrameRate()/60);
   monkey.velocityY = monkey.velocityY + 0.4;
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score+1;
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
   Bananas();
 Obstacles();
 } else if (gameState === END){
   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();
   monkey.changeAnimation("collided", monkey_collided);
 }
    if(ground.x<0){
   ground.x=200;
 }
  monkey.collide(ground);
 
 text("Survival Time: "+survivalTime,290,50)
 text("Score: "+ score,340,30);
 
 drawSprites();
}
function Bananas(){
  if(frameCount%80===0){
    banana = createSprite(400,250,10,10);
    banana.y = Math.round(random(180,280))
    banana.addImage(bananaImage); 
    banana.scale = 0.1;
    banana.velocityX=-8;
    banana.lifetime=50;
    bananaGroup.add(banana);
  }
}
function Obstacles(){
  if(frameCount%200===0){
    obstacle = createSprite(400,370,10,10);
    obstacle.addImage(obstacleImage); 
    obstacle.scale = 0.1;
    obstacle.velocityX=-8;
    obstacle.lifetime=50;
    obstacleGroup.add(obstacle);
  }
}






