var PLAY=1;
var END=0;
var gameState=PLAY;

var ironMan, background, ironManImg, ironManImg2, backgroundImg, collide1, collide2, collide3, obj, objImg, objGroup;

function preload() {
  backgroundImg = loadImage("images/city_background.png");

  ironManImg = loadImage("images/iron-man-flying.png");

  objImg = loadImage("images/birdObj.png");
}

function setup() {
  createCanvas(1000, 800);
  
  collide1 = createSprite(4000, -10, 10000, 20);
  collide1.visible=false;
  collide2 = createSprite(390, 400, 20, 1000);
  collide2.visible=false;
  collide3 = createSprite(4000, 600, 10000, 20);
  collide3.visible=false;

  background = createSprite(4090,400)
  background.addImage(backgroundImg);

  ironMan = createSprite(400,300,10,10);
  ironMan.addImage("fly" ,ironManImg);
  ironMan.scale=0.5;

  objGroup = new Group()
}

function draw() {  
  if (gameState === PLAY) {
    bird();
    
    movement();

    gameOver();

    ironMan.velocityX = 10;

  } else if (gameState === END) {
    ironMan.velocityX = 0;
    ironMan.velocityY = 0;

    objGroup.setVelocityEach(0, 0);
    objGroup.setLifetimeEach(-1)

  }
  
  camera.position.x = ironMan.x + 200;
  camera.position.y = 400;
  
  if (ironMan.x >= 7400){
    ironMan.x=400;
  }
  
  collideEdges();  

  drawSprites();

  if (gameState === END) {
    fill(rgb(255, 0, 0));
    textSize(100);
    stroke("black");
    strokeWeight(5);
    text("Simulation Over", ironMan.x-145, 350);

    fill(rgb(255, 0, 0));
    textSize(30);
    stroke("black");
    strokeWeight(3);
    text("you hit a bird", ironMan.x+145, 400);
    text("Press ctrl + r to play again", ironMan.x+60, 30);
  }
}

function movement() {
  if (keyDown("up")) {
    ironMan.velocityY = -10;
  }
  if (keyDown("down")) {
    ironMan.velocityY = +10;
  }

  if (keyWentUp("up")) {
    ironMan.velocityY = 0;
  }
  if (keyWentUp("down")) {
    ironMan.velocityY = 0;
  }
}

function bird() {
  if (World.frameCount % 30 === 0 && gameState === PLAY) {
    objY = random(10, 600);
    obj = createSprite(ironMan.x + 800, objY,10,10);
    obj.addImage(objImg);
    obj.scale = 0.15;
    objGroup.add(obj)
    objGroup.setVelocityEach(-7, 0);
    objGroup.setLifetimeEach(35)
  }
}

function collideEdges() {
  ironMan.collide(collide1);
  ironMan.collide(collide2);
  ironMan.collide(collide3);
}

function gameOver() {
  if (ironMan.isTouching(objGroup)) {
    gameState=END
  }
}
