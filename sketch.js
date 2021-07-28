const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;

var deadImg,laser,position,jarImg,bgImg,endImg,player,playerImg,pillar,pillarImg,staticOptions,con1,conOptions1,constraintcreated = false;

function preload(){
  jarImg = loadImage("jar.png");
  bgImg = loadImage("museum.jpg");
  endImg = loadImage("end.png");
  deadImg = loadImage("dead.png");
  playerImg = loadImage("robot.png");
  pillarImg = loadImage("pillar.png");
}

function setup() {
  createCanvas(1536, 660);

  engine = Engine.create();
  world = engine.world;
  
  staticOptions = {
    isStatic : true
  }

  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);

  ground = Bodies.rectangle(768,height,width,20,staticOptions);
  World.add(world,ground);

  pillar = Bodies.rectangle(768,height-90,250,165,staticOptions)
  World.add(world,pillar);

  position = {x: 768, y: height-230};

  player = Bodies.rectangle(80,40,90,80,staticOptions);
  World.add(world,player);

  laser = Bodies.rectangle(width/2,height,width,20,staticOptions);
  World.add(world,laser);
}


function draw() 
{
  background(51);
  Engine.update(engine);

  if (constraintcreated == false && collide(player,position) == true){
    console.log("constraint")
    constraintcreated = true;
  }

  image(bgImg,768,220,1536,930);

  fill("#ff0000");
  rect(laser.position.x,laser.position.y,width,20);
  
  line(player.position.x,0,player.position.x,player.position.y);

  image(playerImg,player.position.x,player.position.y,150,140);

  image(pillarImg,pillar.position.x,pillar.position.y,250,200);

  image(jarImg,position.x,position.y,80,100);

  if (keyCode == LEFT_ARROW){
    player.position.x -= 2.5;
  }

  if (keyCode == RIGHT_ARROW){
    player.position.x += 2.5;
  }

  if (keyCode == DOWN_ARROW){
    player.position.y += 5;
  }

  if (keyCode == UP_ARROW){
    player.position.y -= 5;
  }

  if (constraintcreated == true){
    position.x = player.position.x-10;
    position.y = player.position.y;
  }

  if (constraintcreated == true && player.position.x <= 150 && player.position.y <= 70){
    image(endImg,768,height/2,width,height)
  }

  if(laser.position.y <= 150){
    move = "right";
  }

  if(laser.position.y >= height){
    move = "left";
  }
  
  if(move == "right"){
    laser.position.y += 5.5;
  }

  if(move == "left"){
    laser.position.y -= 5.5;
  }

  if(player.position.y >= laser.position.y-20 && player.position.y <= laser.position.y+20){
    image(deadImg,768,height/2,width,height)
    player.destroy();
  }
  console.log(player.position.y + "," + laser.position.y);
}

function keyReleased(){
  keyCode = null;
}

function collide(body,pos)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,pos.x,pos.y);
          if(d<=50)
            {
              return true; 
            }
            else{
              return false;
            }
         }
}