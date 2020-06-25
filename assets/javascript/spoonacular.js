
$("#ingrBt").click(function(){
  console.log('button clicked')
  event.preventDefault()
  
  var item = $("#ingrInpt").val().trim()

      if(Ingr !== ''){
        Ingr += ',+' + item
      }
      else{
        Ingr += item
      }
    console.log(Ingr)
  

renderInputs(item)

});

function renderInputs(text){

  $("#ingrInpt").val('')

  var a = $("<li>");
  a.addClass("ingrItem")
  a.text(text)
    $("#ingrList").append(a);
  
};

// window.onbeforeunload = function() {
//   return "Dude, are you sure you want to leave? Think of the kittens!";
// }

var userIngr = ''
var Ingr = 'bacon,+cheese'

var recipeID
var addLink
var food = []
// initial call to the api based on the users search ingredients. 
  function websiteCall(){
    $.ajax({
      url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + Ingr + "&apiKey=2b49753a505a43fe8dbfb610bb43e250",
      method: "GET"
    }).then(function(initialPull){
      for (let i = 0; i < initialPull.length; i++) {
        food.push(initialPull[i]) 
      }
      
      displayChoices(food);
    }); 
  }

  function displayChoices(food){
      for (let i = 0; i < 9; i++) {
        var addRecipeOptions = $('<button>');
        addRecipeOptions.addClass('foodOptions button col-lg-3 col-md-4 col-6');
        addRecipeOptions.attr('recipeID',food[i].id);
        var imgFood = $("<img src="+ food[i].image +">") ;
        var text = $('<p>').text(food[i].title);
        text.addClass("text-danger")
        addRecipeOptions.append(text,imgFood);
        $(".recipe").append(addRecipeOptions)  
      }  
  }
  // calling the recipe url to get the instructions
function callRecipeURL (recipeID){
  $.ajax({
    url: "https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey=2b49753a505a43fe8dbfb610bb43e250",
    method: "GET"
  }).then(function(data) { 

    //console.log(data.sourceUrl);

    window.open(data.sourceUrl, '_blank')
    


    
  }); 
}

$(document).on('click','.foodOptions', function(event){
  event.preventDefault()
  console.log("this happened")
  var testID = $(this).attr('recipeID');

  callRecipeURL(testID);





})
/* if we want to try extract the recipe from the site instead of just linking to the site.
  function extractRecipe(){
    $.ajax({
      url: "https://api.spoonacular.com/recipes/extract?" + data.sourceUrl+"&apiKey=2b49753a505a43fe8dbfb610bb43e250",
      method: "GET"
    }).then(function(extract) {
      var extract = $('<div>').text(extract)
      console.log(extract)
    }); 
  }
*/
websiteCall()