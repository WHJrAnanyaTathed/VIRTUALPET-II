//Create variables here
var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood,foodObj;
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 400);
  database=firebase.database();

  foodObj=new Food();
  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
feed=createButton("feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("add food to the dog");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);
foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed=data.val();
});

// **** HERE I NEED TO WRITE POINT NUMBER 2 FROM THE DOCUMENT ****
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM", 350, 30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else {
  text("Last Feed : "+ lastFed + " AM", 350, 30);
}
  

  drawSprites();
}

  
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
    
function feedDog(){
  dog.addImage(dogImg1); 
  if(foodObj.getFoodStock()<= 0){
     foodObj.updateFoodStock(foodObj.getFoodStock()*0);
    }
    else {
       foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
     }
      database.ref('/').update({
         Food:foodObj.getFoodStock(),
        FeedTime:hour()
        }) 
       } 

function addFoods(){
foodS++;
  database.ref('/').update({
    food:foodS
  })
}




