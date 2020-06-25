var Ingr = ''
var recipeID
var addLink
var food = []

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
renderFood(item)
});

function renderFood(text){
  $("#ingrInpt").val('')
  $(".recipe").empty();
  var a = $("<li>");
  a.addClass("ingrItem")
  a.text(text)
  $("#ingrList").append(a);
  websiteCall();
};

// window.onbeforeunload = function() {
//   return "Dude, are you sure you want to leave? Think of the kittens!";
//  }

// initial call to the api based on the users search ingredients. 
function websiteCall(){
    $.ajax({
      url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + Ingr + "&apiKey=0dcf6018121d4ae3ab90ebb53ead0081",
      method: "GET"
    }).then(function(initialPull){
      food = [];
      for (let i = 0; i < initialPull.length; i++) {
        food.push(initialPull[i]) 
      }
      displayChoices(food);
    }); 
  }

  function displayChoices(food){
     
    for (let index = 0; index < 12; index++) {
      //console.log("this happened")
  
      var newDiv = $("<button>").addClass("foodOptions button col-lg-3 col-md-4 col-6");
      newDiv.attr("recipeID", food[index].id);
      //console.log(food[index].id)
      newDiv.css({"padding": "10px", "border": "none","margin":"10px","margin-bottom":"20px", });
  
      var newText = $("<p>").addClass("text-danger");
      newText.text(food[index].title);
      newText.css({"text-align":"center","line-height":"0%"});
      
      if (food[index].title.length > 20 &&food[index].title.length < 40){
        newText.css("font-size","small")
        newText.css("line-height","100%")
      }
      else if (food[index].title.length <25){
        console.log("this happens")
        
      }
      else{
        newText.css("line-height","100%")
        console.log("this")
      }
      var newLink = $("<a>").addClass("d-block mb-4 h-100");
      
      
      var newImg = $("<img src="+ food[index].image +">").addClass("img-fluid img-thumbnail");
      newImg.css("border","none")
      //newImg.css({"margin-top":"0px","padding-top":"0px","border-top":"0px"})
      newLink.append(newImg);
      newDiv.append(newText,newLink);
      $(".recipe").append(newDiv);
    }
    /*for (let i = 0; i < 9; i++) {
        var addRecipeOptions = $('<button>');
        addRecipeOptions.addClass('foodOptions button col-lg-3 col-md-4 col-6');
        addRecipeOptions.attr('recipeID',food[i].id);
        var imgFood = $("<img src="+ food[i].image +">") ;
        var text = $('<p>').text(food[i].title);
        text.addClass("text-danger")
        addRecipeOptions.append(text,imgFood);
        $(".recipe").append(addRecipeOptions)  
      }  */
  }
  // calling the recipe url to get the instructions
function callRecipeURL (recipeID){
  $.ajax({
    url: "https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey=0dcf6018121d4ae3ab90ebb53ead0081",
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
