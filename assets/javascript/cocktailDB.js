
lookupByIngredient("vodka");
var drinks = [];

function displayButtons(drinks){
  for (let index = 0; index < 10; index++) {
    
    var addDrinks = $("<button>")
    addDrinks.addClass("drink-btn")
    addDrinks.attr("drinkID", drinks[index].idDrink);
    var imgs = $("<img src="+ drinks[index].strDrinkThumb+">")
    var text = $("<div>").text(drinks[index].strDrink)
    addDrinks.append(text,imgs);
    $(".test").append(addDrinks);
 }
}

function lookupByIngredient(ingredient){
var ing = ingredient;
var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+ing;
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(intialPull) {
  
     
     //console.log(Math.floor(Math.random()*100));
     for (let index = 0; index < 10; index++) {
       
        drinks.push(intialPull.drinks[Math.floor(Math.random()*intialPull.drinks.length)]);
        }
        displayButtons(drinks);
        console.log(drinks);
  })
}

$(document).on('click', ".drink-btn",function(event){
    event.preventDefault()
    $(".test").empty()
    var testID = $(this).attr("drinkID")

    console.log(testID)
    lookupDrink(testID)
    
})

function lookupDrink(idDrink){
var id = idDrink

var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(ingredientPull) {
    var i = 1;
    var name = "strIngredient"+i;
    
    while(ingredientPull.drinks[0][name] != null) {
            var list = $("<ul>")
            var ingredients = $('<li>').text(ingredientPull.drinks[0][name]);
            i++;
            name = "strIngredient"+i;
            $(".test").append(ingredients)
       }
      
    var newBtn = $("<button>");
    newBtn.text("Go Back");
    newBtn.addClass("back-btn")
    $(".test").append(newBtn);

       console.log(ingredientPull)
    })
  }

  $(document).on('click', ".back-btn",function(event){
    $(".test").empty();
    displayButtons(drinks);
})