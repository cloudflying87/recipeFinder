
lookupByIngredient("vodka");
var drinks = [];

function displayButtons(drinks){
  
  for (let index = 0; index < 12; index++) {
    //console.log("this happened")

    var newDiv = $("<button>").addClass("col-lg-3 col-md-4 col-6 drink-btn");
    newDiv.attr("drinkID", drinks[index].idDrink);
    newDiv.attr("index", index);
    newDiv.css({"padding": "0", "border": "none","background": "none","margin-bottom":"10px" });
    
    var newText = $("<p>").addClass("text-danger");
    newText.text(drinks[index].strDrink);
    newText.css({"text-align":"center","line-height":"0%"});
    
    var newLink = $("<a>").addClass("d-block mb-4 h-100");
    
    var newImg = $("<img src="+ drinks[index].strDrinkThumb+">").addClass("img-fluid img-thumbnail");
    //newImg.css({"margin-top":"0px","padding-top":"0px","border-top":"0px"})
    newLink.append(newImg);
    newDiv.append(newText,newLink);
    $(".beverage").append(newDiv);
    



    /*
    var addDrinks = $("<button>")
    addDrinks.addClass("drink-btn button col-lg-3 col-md-4 col-6")
    addDrinks.attr("drinkID", drinks[index].idDrink);
    addDrinks.attr("index", index);
   // addDrinks.data('target', '#modelId')
    var imgs = $("<img src="+ drinks[index].strDrinkThumb+">")
    var text = $("<p>").text(drinks[index].strDrink)
    text.addClass("text-danger");
    addDrinks.append(text,imgs);
    $(".beverage").append(addDrinks);*/
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
     for (let index = 0; index < 12; index++) {
       var ranDrink = intialPull.drinks[Math.floor(Math.random()*intialPull.drinks.length)]
       if (drinks.indexOf(ranDrink)===-1){
          drinks.push(ranDrink);
          
       }
       else{   
             index--;
       }
        
        }
        displayButtons(drinks);
       // console.log(drinks);
  })
}

$(document).on('click', ".drink-btn",function(event){
    event.preventDefault()
    $(".modal-body").empty()
    //$(".test").empty()
    var testID = $(this).attr("drinkID")
    var indexSpot = $(this).attr("index")
    $("#modelId").modal("show");

    //console.log(testID)
    lookupDrink(testID, indexSpot)
    
})

function lookupDrink(idDrink, indx){
var id = idDrink

var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(ingredientPull) {
    var i = 1;
    var name = "strIngredient"+i;
    //var addPic = $("<div>");
    var imgs1 = $("<img src="+ drinks[indx].strDrinkThumb+">")
    var text1 = $("<div>").text(drinks[indx].strDrink)
    //addPic.append(text1,imgs1);
    //console.log(drinks[indx].strDrink)
   $(".modal-title").text(drinks[indx].strDrink)
   $(".modal-body").append(imgs1);
    
    while(ingredientPull.drinks[0][name] != null) {
            var list = $("<ul>")
            var ingredients = $('<li>').text(ingredientPull.drinks[0][name]);
            i++;
            name = "strIngredient"+i;
            $(".modal-body").append(ingredients)
       }

       var instructions = $("<div>").text(ingredientPull.drinks[0].strInstructions)
       $(".modal-body").append(instructions);
      //console.log(drinks)
    /*  
    var newBtn = $("<button>");
    newBtn.text("Go Back");
    newBtn.addClass("back-btn")
    $(".test").append(newBtn);
*/
       //console.log(ingredientPull)
    })
  }

  $(document).on('click', ".back-btn",function(event){
    //$(".test").empty();
    displayButtons(drinks);
})