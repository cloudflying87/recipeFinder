// An easy way to input the user data into the ajax call. 
window.onbeforeunload = function() {
  return "Dude, are you sure you want to leave? Think of the kittens!";
}

var userIngr = ''
var Ingr = 'cheese,+cucumber'


// for (let i = 0; i <= 1; i++) {
//   userIngr = prompt()
//     if(Ingr !== ''){
//       Ingr += ',+' + userIngr
//     }
//     else{
//       Ingr += userIngr
//     }
//   console.log(Ingr)
// }

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
      for (let i = 0; i < food.length; i++) {
        var addRecipeOptions = $('<button>');
        addRecipeOptions.addClass('foodOptions');
        addRecipeOptions.attr('recipeID',food[i].id);
        
        var imgFood = $("<img src="+ food[i].image +">") ;
        var text = $('<div>').text(food[i].title);
        addRecipeOptions.append(text,imgFood);
        $(".test").append(addRecipeOptions)  
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

