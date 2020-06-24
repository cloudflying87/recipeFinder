
// An easy way to input the user data into the ajax call. 

var userIngr = ''
var Ingr = ''


for (let i = 0; i <= 3; i++) {
  userIngr = prompt()
    if(Ingr !== ''){
      Ingr += ',+' + userIngr
    }
    else{
      Ingr += userIngr
    }
  console.log(Ingr)
}


  function websiteCall(){
    $.ajax({
      url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + Ingr + "&apiKey=2b49753a505a43fe8dbfb610bb43e250",
      method: "GET"
    }).then(function(data) {
      console.log(data)
      


    }); 
  }

websiteCall()