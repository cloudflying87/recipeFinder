var Ingr = ''
var recipeID
var addLink
var food = []
var inc = 0
var hmm = 1;

$("#ingrBt").click(function(){
  //console.log('button clicked')
  event.preventDefault()
  var item = $("#ingrInpt").val().trim()
      if(Ingr !== ''){
        Ingr += ',+' + item
      }
      else{
        Ingr += item
      }
    //console.log(Ingr)
renderFood(item)
}); 

function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("options");
  //console.log(x);
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(cityName).style.display = "block";  
}

function openMenu(menuName) {
  var i;
  var x = document.getElementsByClassName("options1");
 // console.log(x);
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
  c.attr("ind",inc)
  a.css("list-style-type","none");
  a.text(text);
  a.append(c);
  $("#ingrList").append(a);
  
  websiteCall(Ingr);
 // console.log(inc)

};

$(document).on('click','.delete', function(event){
  var testy = $(".ingrItem-"+$(this).attr("ind")).text();
  
  var be = $(this).attr("ind");
  this.remove();
  $(".ingrItem-"+$(this).attr("ind")).remove();

  //console.log(be+"    "+hmm)

  if (Ingr.indexOf('+')>-1)
  {
    if(be==hmm){
      Ingr = Ingr.replace(testy+",+", "");
      console.log("happening");
      hmm++;

    }
    else{
      Ingr = Ingr.replace(',+'+testy, "");
    }
    
    
  }
  else{
    Ingr = Ingr.replace(testy, "");
    
  }
  
 // console.log(Ingr);
 $(".recipe").empty();
  websiteCall(Ingr);

  
  
  

});

// window.onbeforeunload = function() {
//   return "Dude, are you sure you want to leave? Think of the kittens!";
//  }

// initial call to the api based on the users search ingredients. 
function websiteCall(url){
  //console.log("why arent I working")
    $.ajax({
      url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + url + "&apiKey=2b49753a505a43fe8dbfb610bb43e250",
      method: "GET"
    }).then(function(initialPull){
      food = [];
      console.log("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + url + "&apiKey=2b49753a505a43fe8dbfb610bb43e250");
      for (let i = 0; i < initialPull.length; i++) {
        food.push(initialPull[i]) 
      }
      displayChoices(food);
    }); 
  }

  function displayChoices(foods){
     
    for (let index = 0; index < 12; index++) {
      
  
      var newDiv = $("<button>").addClass("foodOptions button col-lg-3 col-md-4 col-6");
      newDiv.attr("recipeID", foods[index].id);
      //console.log(food[index].id)
      newDiv.css({"padding": "10px", "border": "none","margin":"10px","margin-bottom":"20px", });
  
      var newText = $("<p>").addClass("text-danger");
      newText.text(foods[index].title);
      newText.css({"text-align":"center","line-height":"0%"});
      
      if (foods[index].title.length > 20 &&foods[index].title.length < 40){
        newText.css("font-size","small")
        newText.css("line-height","100%")
      }
      else if (foods[index].title.length <25){
       //console.log("this happens")
        
      }
      else{
        newText.css("line-height","100%")
       // console.log("this")
      }
      var newLink = $("<a>").addClass("d-block mb-4 h-100");
      
      
      var newImg = $("<img src="+ foods[index].image +">").addClass("img-fluid img-thumbnail");
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
    url: "https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey=2b49753a505a43fe8dbfb610bb43e250",
    method: "GET"
  }).then(function(data) { 
    //console.log(data.sourceUrl);
    window.open(data.sourceUrl, '_blank') 
  }); 
}

$(document).on('click','.foodOptions', function(event){
  event.preventDefault()
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
