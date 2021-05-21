var dog, happyDog, sadDog;
var foodObj;
var foodS, foodStock;

function preload(){
	sadDog = loadImage("Dog.png");
  happyDog = loadImage("Happydog.png");
}

function setup() {
	createCanvas(500,500);
  db = firebase.database();

  dog=createSprite(250,300,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;
  
  foodStock = db.ref("Food");
  foodStock.on("value", readStock);
  textSize(20);

}


function draw() {
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  drawSprites(); 
  fill(255,255,255);
  stroke("black");
  text("Food Remamining : "+ foodS, 170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key to Feed Drago Milk!!!", 130, 10, 300, 20);

}

function readStock(data){
  foodS = data.val();
}



function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  db.ref('/').update({
    Food:x
  })
}