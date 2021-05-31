//Create variables here
var dog;
var happydog;
var foodS;
var foodRef;
var database;
var dogImg;
var dogImg2;
var milkimg,milkbottle;
var feed,addfood;
var fedTime,lastFed;
var foodObj;



function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
 dogImg2 = loadImage("images/dogImg1.png");
 milkimg = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(500,500);
  foodObj = new Food();
  database = firebase.database();

  dog = createSprite(250,250,5,5);
  dog.addImage(dogImg2);
  dog.scale = 0.2;

  feed = createButton("feed the dog");
  feed.position(650,100);
  feed.mousePressed(feedDog);

  addfood = createButton("Add food");
  addfood.position(750,95);
  addfood.mousePressed(addFoods)

  milkbottle = createSprite(150,320);
  milkbottle.addImage(milkimg);
  milkbottle.visible = 0;
  milkbottle.scale = 0.1


  //foodRef = database.ref('food');
  //foodRef.on("value",readstock);

  //foodRef.set(20)
}


function draw() {  
  background(46, 139, 87);


  //if(keyWentDown(UP_ARROW)){
    //writeStock(foodS);
    //dog.addImage(dogImg);
   // dog.scale = 0.3
  //}

  drawSprites();
  console.log(value);
  foodObj.display();
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  //add styles here
  textSize(15);
  fill("white");
  if(lastfed>=12){
    text("Last fed : 12 AM",400,50);
} else if(lastfed == 0){
    text("Last fed : 12 AM",400,50);
}else{
    text("Last fed :"+lastfed+ "AM",400,50);
}
fill(4,23,117);
textSize(20);
text(value,400,dog.y-80)
  //dog.display();

  

}

function feedDog(){
  foodObj.getFoodStock();
  if(foodObj.foodStock<=0){
    foodObj.foodStock = 0;
    milkbottle.visible = 0;
    dog.addImage(dogImg);
  }else{
    dog.addImage(dogImg2);
    if(foodObj.foodStock===1){
      milkbottle.visible = 0;
      dog.addImage(dogImg);
    }
  
  else
  milkbottle.visible = 1
  foodObj.updateFoodStock(foodObj.foodStock-1);
  database.ref('/').update({
  Food:foodObj.foodStock,
  FeedTime:hour()
  });
}
}

function addFoods(){
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}