//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;


function preload()
{
  //load images here
  dogIMG = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  console.log(database);

  dog = createSprite(250,250,20,20);
  dog.addImage(dogIMG);
  dog.scale = 0.3;
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke("black");
  text("Press Up Arrow to Feed Dog", 130,30);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x=0;
  }
  else{
    x = x-1;
  }

  database.ref("/").update({
    "food": x
  })
  console.log(foodS)
}



