
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
  function websiteCall(){
    $.ajax({
      url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + Ingr + "&apiKey=2b49753a505a43fe8dbfb610bb43e250",
      method: "GET"
    }).then(function(data) {
      console.log(data)
      console.log(recipeID = data[0].id)
      recipeID = data[0].id
      callRecipe()

    }); 
  }

  function callRecipe (){
  $.ajax({
    url: "https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey=2b49753a505a43fe8dbfb610bb43e250",
    method: "GET"
  }).then(function(data) {
    var addLink = $('<a>').attr('href',data.sourceUrl).text(data.sourceName)
    var image = $('<img>').attr('src',data.image)
    $('#Test').append(addLink,image)
    
    
    console.log("Test and Recipe ID " + recipeID)


    console.log(data)
    
    

  }); 
}

websiteCall()