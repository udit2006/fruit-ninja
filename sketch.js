var sword,swordimage,swordsound;
var fruit,f1,f2,f3,f4;
var monster,a1,a2;
var gameover,gameoverimage,gameoversound;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var fruitgroup,monstergroup;
var position;

function preload()
{
  swordimage=loadImage("sword.png");
  swordsound=loadSound("knifeSwooshSound.mp3");
  f1=loadImage("fruit1.png");
  f2=loadImage("fruit2.png");
  f3=loadImage("fruit3.png");
  f4=loadImage("fruit4.png");
  gameoverimage=loadImage("gameover.png");
  gameoversound=loadSound("gameover.mp3");
  a1=loadImage("alien1.png");
  a2=loadImage("alien2.png");
  
}

function setup()
{
  createCanvas(600,600);
  
  sword=createSprite(200,200,10,10);
  sword.addImage(swordimage);
  sword.scale=0.5;
  
  fruitgroup=new Group();
  monstergroup=new Group();
  
  gameover=createSprite(300,250,10,10);
  gameover.addImage(gameoverimage);
  gameover.scale=1.5;
  
  sword.debug=false;

}

function draw()
{
  background(180);
  text("score="+score,550,25);

  
  if(gameState===PLAY)
  {
    sword.x=World.mouseX;
    sword.y=World.mouseY;
    
    spawnmonsters();
    spawnfruits();
    
    if(fruitgroup.isTouching(sword))
    {
      fruitgroup.destroyEach();
      score=score+1;
      swordsound.play();
    }
    
    if(monstergroup.isTouching(sword))
    {
      gameState=END;
      fruitgroup.destroyEach();
      monstergroup.destroyEach();
      gameoversound.play();
      
    }
      
    
  
    
    gameover.visible=false;
  }
  
  else if(gameState===END)
  {
    fruitgroup.setVelocityEach(0);
    monstergroup.setVelocityEach(0);
    gameover.visible=true;
    
  }
 
  
  drawSprites();
}

function spawnfruits()
{
  if(frameCount%80===0)
  {
     position=Math.round(random(1,2));
    
    fruit=createSprite(600,10,10,10);
    if(position===1)
    {
      fruit.x=600;
      fruit.velocityX= -(7+score/4);
    }
    else
    {
      if( position===2)
      {
      fruit.x=0;
      fruit.velocityX=(7+score/4);
      
      }
    }   
    var rand=Math.round(random(1,4));
    switch(rand)
    {
      case 1:fruit.addImage(f1);
             break;
      case 2:fruit.addImage(f2);
             break;
      case 3:fruit.addImage(f3);
             break;
      case 4:fruit.addImage(f4);
             break;
             default:break; 
    }
    fruit.scale=0.3;
    fruit.lifetime=100;
    fruit.y=Math.round(random(50,550));
    
    fruit.depth=sword.depth;
    sword.depth=sword.depth+1;
    
    fruitgroup.add(fruit);
  
}
}  

function spawnmonsters()
{
  if(frameCount%100===0)
  {
    monster=createSprite(0,10,10,10);
    monster.velocityX=(7+score/10);
    var rand=Math.round(random(1,2));
    switch(rand)
    {
      case 1:monster.addImage(a1);
             break;
      case 2:monster.addImage(a2);
             break;
             default:break; 
             
    }
    monster.lifetime=300;
    monster.y=Math.round(random(50,340));
    
    monstergroup.add(monster);
    
  }
}


