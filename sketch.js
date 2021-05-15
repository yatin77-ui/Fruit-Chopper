var PLAY = 1;
var END = 0;
var gameState = PLAY;

var knife, knifeImage


var fruitsGroup, fruit1, fruit2, frut3,fruit4;
var bombsGroup, bombImage;
var score=0;

var gameOver, restart;



function preload(){
  knife = loadImage("knife.png")
  
   
  bombImage = loadImage("bomb.png");
  
  fruit1 = loadImage("apple.png");
  fruit1 = loadImage("pineapple.png");
  fruit1 = loadImage("strawberry.png");
  fruit1 = loadImage("bana.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  knife = createSprite(200, 350, 10, 20);
  knife.addImage("knife",knifeImage)
  knife.scale = 0.5;
  knife.velocityX= mouse.x
  knife.velocityY= mouse.y
  
  
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  
  fruitsGroup = new Group();
  bombsGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
   
  
    
    
    spawnFruits();
    spawnBombs();
    if(fruitsGroup.isTouching(knife)){
      score= score+100
    }
  
    if(bombsGroup.isTouching(knife)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
   
   bombsGroup.setVelocityXEach(0);
   fruitsGroup.setVelocityXEach(0);
    
    
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnFruits() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var fruit = createSprite(600,120,40,10);
    fruits.y = Math.round(random(80,120));
     var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: fruits.addImage(fruit1);
              break;
      case 2: fruits.addImage(fruit2);
              break;
      case 3: fruits.addImage(fruit3);
              break;
      case 4: fruits.addImage(fruit4);
              break;
          default: break;
    }
    
   
    fruits.scale = 0.5;
    fruits.velocityX = -3;
    
     //assign lifetime to the variable
    fruits.lifetime = 200;
    
   
    //add each cloud to the group
    fruitsGroup.add(fruits);
  }
  
}

function spawnBombs() {
  if(frameCount % 60 === 0) {
    var bomb = createSprite(600,165,10,40);
    //obstacle.debug = true;
    bombs.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    bombs.addImage(bombImage);
    //assign scale and lifetime to the obstacle           
    bombs.scale = 0.5;
    bombs.lifetime = 300;
    //add each obstacle to the group
    bombsGroup.add(bombs);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  bombsGroup.destroyEach();
  fruitsGroup.destroyEach();
  
  knife.changeImage("knife",knifeImage);
  }
  
  
  
  
