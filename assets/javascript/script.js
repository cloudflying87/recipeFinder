
lookupByIngredient("vodka");
function lookupByIngredient(ingredient){
var ing = ingredient;
var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+ing;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(intialPull) {
  
    var drinks = [];
    
     //console.log(Math.floor(Math.random()*100));
     for (let index = 0; index < 10; index++) {
       
       
        drinks.push(intialPull.drinks[Math.floor(Math.random()*intialPull.drinks.length)]);

     }
    console.log(drinks);
    
    //console.log(drinks[0].idDrink);
    //console.log("hi");
    lookupDrink(drinks[0].idDrink);
  
  })

}

function lookupDrink(idDrink){



var id = idDrink

var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(intialPull) {
   
    //console.log(intialPull);
    var i = 1;
    var name = "strIngredient"+i;
    
    var ingredients = [];
    //var newVar = intialPull.drinks[0].strIngredient1 +"."+ intialPull.drinks[0].strIngredient2 +"."+ intialPull.drinks[0].strIngredient3 +"."+ intialPull.drinks[0].strIngredient4 +"."+ intialPull.drinks[0].strIngredient5 +"."+ intialPull.drinks[0].strIngredient6 + "."+intialPull.drinks[0].strIngredient7 +"."+ intialPull.drinks[0].strIngredient8 +"."+ intialPull.drinks[0].strIngredient9 + "."+intialPull.drinks[0].strIngredient10 +"."+ intialPull.drinks[0].strIngredient11 +"."+ intialPull.drinks[0].strIngredient12 +"."+ intialPull.drinks[0].strIngredient13 +"."+ intialPull.drinks[0].strIngredient14 +"."+ intialPull.drinks[0].strIngredient15;
    while(intialPull.drinks[0][name] != null) {
         
            
            ingredients.push(intialPull.drinks[0][name]);
            i++;
            //console.log(intialPull.drinks[0][name]);
            name = "strIngredient"+i;
         
       }
       

       console.log(ingredients);
       
    //var res = newVar.split(".");
   // console.log(intialPull.drinks[0].strIngredient+i.toString());


    
        
      
      
    })
  }
//=======
// An easy way to input the user data into the ajax call. 

var userIngr = ''
var Ingr = ''


for (let i = 0; i <= 1; i++) {
  userIngr = prompt()
    if(Ingr !== ''){
      Ingr += ',+' + userIngr
    }
    else{
      Ingr += userIngr
    }
  console.log(Ingr)
}

var recipeID
var addLink
var pick = 2
  function websiteCall(){
    $.ajax({
      url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + Ingr + "&apiKey=2b49753a505a43fe8dbfb610bb43e250",
      method: "GET"
    }).then(function(data) {
      console.log(data)
      console.log(recipeID = data[pick].id)
      recipeID = data[pick].id
      callRecipeURL()
    }); 
  }

function callRecipeURL (){
  $.ajax({
    url: "https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey=2b49753a505a43fe8dbfb610bb43e250",
    method: "GET"
  }).then(function(data) {
    $.ajax({
      url: "https://api.spoonacular.com/recipes/extract?" + data.sourceUrl+"&apiKey=2b49753a505a43fe8dbfb610bb43e250",
      method: "GET"
    }).then(function(extract) {
      var extract = $('<div>').text(extract)
      console.log(extract)
    });
    addLink = $('<a>').attr('href',data.sourceUrl).text(data.title)
    var image = $('<img>').attr('src',data.image)
    $('#Test').append(addLink,image)
    console.log("Test and Recipe ID " + recipeID)
    console.log(data)
  }); 
}
  function extractRecipe(){
    $.ajax({
      url: "https://api.spoonacular.com/recipes/extract?" + data.sourceUrl+"&apiKey=2b49753a505a43fe8dbfb610bb43e250",
      method: "GET"
    }).then(function(extract) {
      var extract = $('<div>').text(extract)
      console.log(extract)
    }); 
  }

websiteCall()

