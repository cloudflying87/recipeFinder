var drink = ''

// Listener for enter button on drink input field. 
$("#drinkInpt").keyup(function(){
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#drinkBt").click();
  }
});

$("#drinkBt").click(function(){
  event.preventDefault()
  var item = $("#drinkInpt").val().trim()
  drink = item
 renderDrinks(item)

});

$("#ingrBt").click(function(){
  event.preventDefault()
  var item = $("#ingrInpt").val().trim()
    lookupByIngredient(item)
});

function renderDrinks(text){
  $("#drinkInpt").val('')
  var c = $("<button>");
  var b = $("#drinkList");
  c.addClass("btn btn-warning fas fa-trash text-danger delete-btn");
  c.css({"background":"none","border":"none"});
  $("#drinkList").text(text);
  $("#drinkList").prepend(c);
  lookupByIngredient(text);
  $('#drinkIngLabel').text('Drink Ingredients')
};

$( "#drinkList" ).click(function() {
  $(".delete-btn").remove();
  $("#drinkList").text("");
  $(".beverage").empty();
});

var drinks = [];
function displayButtons(drinks){
  for (let index = 0; index < 12; index++) {
    var newDiv = $("<button>").addClass("col-lg-3 col-md-4 col-6 drink-btn button");
    newDiv.attr("drinkID", drinks[index].idDrink);
    newDiv.attr("index", index);
    newDiv.css({"padding": "10px", "border": "none","margin":"10px","margin-bottom":"20px", });

    var newText = $("<p>").addClass("text-danger");
    newText.text(drinks[index].strDrink);
    newText.css({"text-align":"center","line-height":"0%"});
    
    if (drinks[index].strDrink.length > 25){
      newText.css("font-size","small")
      newText.css("line-height","100%")
    }

    var newLink = $("<a>").addClass("d-block mb-4 h-100");    
    var newImg = $("<img src="+ drinks[index].strDrinkThumb+">").addClass("img-fluid img-thumbnail");
    newImg.css("border","none")
    newLink.append(newImg);
    newDiv.append(newText,newLink);
    $(".beverage").prepend(newDiv);
 }
 
}

function lookupByIngredient(ingredient){
var ing = ingredient;
var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+ing;
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(intialPull) {
    drinks = [];
     for (let index = 0; index < 12; index++) {
       var ranDrink = intialPull.drinks[Math.floor(Math.random()*intialPull.drinks.length)]
       if (drinks.indexOf(ranDrink)===-1){
          drinks.push(ranDrink);
       }
       else{   
             index--;
       }
        }
        $(".beverage").empty();
        displayButtons(drinks);
  })
}

$(document).on('click', ".drink-btn",function(event){
    event.preventDefault()
    $(".modal-body").empty()
    var testID = $(this).attr("drinkID")
    var indexSpot = $(this).attr("index")
    $("#modelId").modal("show");
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
    var imgs1 = $("<img src="+ drinks[indx].strDrinkThumb+">")
    var text1 = $("<div>").text(drinks[indx].strDrink)
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
    })
  }

  $(document).on('click', ".back-btn",function(event){
    displayButtons(drinks);
})