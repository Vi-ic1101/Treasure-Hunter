var road,boy,cash,diamonds,jwellery,sword;
var roadImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var gameOver;
var PLAY=1;
var END=0;
var gameState=PLAY

var touches=[1,2]

function preload(){
  roadImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOver_Img =loadImage("gameOver.png");
}


function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
road=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
road.addImage(roadImg);

gameOver=createSprite(windowWidth/2,windowHeight/2)
gameOver.addImage(gameOver_Img)
//creating boy running
boy = createSprite(200,800,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
console.log(touches.length)
  background(0);
  boy.x = World.mouseX || touches.length 
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  boy.setCollider("circle",-7,5,600)
 
  
  
 
  //code to reset the background
  
  if (cashG.isTouching(boy)){
  treasureCollection=treasureCollection+50;
    cashG.destroyEach(0)
  }
  
  if (jwelleryG.isTouching(boy)){
  treasureCollection=treasureCollection+100;
    jwelleryG.destroyEach(0)
  }
  
  if (diamondsG.isTouching(boy)){
  treasureCollection=treasureCollection+150;
    diamondsG.destroyEach  (diamonds)
  }
  
  if (cashG.isTouching(boy)){
  treasureCollection=treasureCollection+50;
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,windowWidth/2,30);
  
if (gameState===PLAY){
  
   
road.velocityY = 4;  
  if(road.y > 400 ){
    road.y =road.y/2
  }
  
   createCash();
    createDiamonds();
    createJwellery();
    createSword();

  gameOver.visible=false
  if(boy.isTouching(swordGroup)) {
     gameState=END
   }
  
}else if(gameState===END){
  
  textSize(30);
  fill(255);
  text("click ⬆GameOver⬆ to restart",200,400);
  
     swordGroup.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        cashG.destroyEach();
        
        cashG.setVelocityYEachY=0
  jwelleryG.setVelocityYEach=0
  diamondsG.setVelocityY=0
        road.velocityY=0;

  gameOver.visible=true
} 

if (mousePressedOver(gameOver)){
  gameState=PLAY
  treasureCollection=0
}

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(windowWidth),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.2;
  cash.velocityY=4;
  cash.lifetime =200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(windowWidth),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.05;
  diamonds.velocityY=4;
  diamonds.lifetime =200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(windowWidth),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.16;
  jwellery.velocityY=4;
  jwellery.lifetime =200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(windowWidth),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY=4;
  sword.lifetime = 200;
  swordGroup.add(sword);

    sword.setCollider("circle")
  }
}
function reset(){
  road.velocity=4;
  gameOver.visible=true
  gameState=PLAY
  treasureCollection=0
}
