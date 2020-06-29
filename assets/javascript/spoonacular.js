var Ingr = ''
var recipeID
var addLink
var food = []
var inc = 0
var hmm = 1;
var dietSelect =''
var intoleranceSelect = ''
var excludeSelect = ''
var createDropdownCalled = 0
var APIKey = '2b49753a505a43fe8dbfb610bb43e250'

// Listener for enter button on drink input field. 
$("#ingrInpt").keyup(function(){
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#ingrBt").click();
  }
});

$("#ingrBt").click(function(){
  event.preventDefault()
  var item = $("#ingrInpt").val().trim()
      if(Ingr !== ''){
        Ingr += ',+' + item
      }
      else{
        Ingr += item
      }
renderFood(item)

if (createDropdownCalled == 0){
  intoleranceDropDown()
  dietDropDown()
  createDropdownCalled = 1
  $('#foodIngredLabel').text('Food Ingredients')
} 

}); 

function checkInput(feed){
  var item = feed;
      if(Ingr !== ''){
        Ingr += ',+' + item
      }
      else{
        Ingr += item
      }
  renderFood(item)
}

function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("options");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  
  if (cityName == 'London'){
    $('#londonButton').css('background-color','#999995')
    $('#parisButton').css('background-color','black') 
  } 
  if (cityName == 'Paris') {
    $('#londonButton').css('background-color','black')
    $('#parisButton').css('background-color','#999999') 
  }
  document.getElementById(cityName).style.display = "block";  
}

function openMenu(menuName) {
  var i;
  var x = document.getElementsByClassName("options1");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(menuName).style.display = "block";  
}

function renderFood(text){
  inc++;
  $("#ingrInpt").val('')
  $(".recipe").empty();
  var a = $("<li>");
  var c = $("<button>");
  c.addClass("btn btn-warning fas fa-trash text-danger delete");
  c.css({"background":"none","border":"none"});
  a.addClass("ingrItem-"+inc);
  c.attr("ind",inc);
  c.attr("nam", text);
  a.css("list-style-type","none");
  a.text(text);
  a.prepend(c);
  $("#ingrList").append(a);
  
  creatingURL();
};

$(document).on('click','.delete', function(event){
  var testy = $(".ingrItem-"+$(this).attr("ind")).text();
  var be = $(this).attr("ind");
  this.remove();
  $(".ingrItem-"+$(this).attr("ind")).remove();
  if (Ingr.indexOf('+')>-1)
  {
    if(be==hmm){
      Ingr = Ingr.replace(testy+",+", "");
      hmm++;
    }
    else{
      Ingr = Ingr.replace(',+'+testy, "");
    }
  }
  else{
    Ingr = Ingr.replace(testy, "");
    $(".recipe").empty();
    //console.log("jalapenos")
  }
  creatingURL()
});
var spoonacularURL 
function creatingURL (){
  $(".recipe").empty();
  // spoonacularURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients="
  spoonacularURL = "https://api.spoonacular.com/recipes/complexSearch?query="
  
  if (Ingr !==''){
    spoonacularURL += Ingr
  } 
  else{
    $(".recipe").empty();
    //console.log("mangos");
  }
  if (dietSelect !==''){
    spoonacularURL += "&diet=" + dietSelect
  }
  if (intoleranceSelect !== ''){
    spoonacularURL += "&intolerances="+ intoleranceSelect
  }
  if (excludeSelect !== ''){
    spoonacularURL += "&exlcudeIngredients="+ excludeSelect  
  }

  spoonacularURL += "&apiKey="+ APIKey

  console.log(spoonacularURL)
  websiteCall()

}

// initial call to the api based on the users search ingredients. 
function websiteCall(){
    $.ajax({
      url: spoonacularURL,
      method: "GET"
    }).then(function(initialPull){
      food = []; 
      if(initialPull.results.length ==0){
        $('#recipeSuggestion').text('No Recipes Found. Change your search criteria.')
      } else {
        $('#recipeSuggestion').text('Recipe Suggestions For You!!')
      }
      for (let i = 0; i < initialPull.results.length; i++) {
        food.push(initialPull.results[i]) 
      }
      if (Ingr !==''){
        displayChoices(food);
        createDropDown();
      } 
      else{
        $(".recipe").empty();
        console.log("mangos");
      }
      
    }); 
  }

function displayChoices(foods){
  for (let index = 0; index < 12; index++) {

    var newDiv = $("<button>").addClass("foodOptions button col-lg-3 col-md-4 col-6");
    newDiv.attr("recipeID", foods[index].id);
    newDiv.css({"padding": "10px", "border": "none","margin":"10px","margin-bottom":"20px", });

    var newText = $("<p>").addClass("text-danger");
    newText.text(foods[index].title);
    newText.css({"text-align":"center","line-height":"0%"});
    
    if (foods[index].title.length > 20 &&foods[index].title.length < 40){
      newText.css("font-size","small")
      newText.css("line-height","100%")
    }
    else if (foods[index].title.length <25){
    }
    else{
      newText.css("line-height","100%")
    }
    var newLink = $("<a>").addClass("d-block mb-4 h-100");
    
    var newImg = $("<img src="+ foods[index].image +">").addClass("img-fluid img-thumbnail");
    newImg.css("border","none")
    newLink.append(newImg);
    newDiv.append(newText,newLink);
    $(".recipe").append(newDiv);
  }
  
}
  // calling the recipe url to get the instructions
function callRecipeURL (recipeID){
  $.ajax({
    url: "https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey="+ APIKey,
    method: "GET"
  }).then(function(data) { 
    window.open(data.sourceUrl, '_blank') 
  }); 
}

$(document).on('click','.foodOptions', function(event){
  event.preventDefault()
  var testID = $(this).attr('recipeID');
  callRecipeURL(testID);
})
