
/*https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey=2b49753a505a43fe8dbfb610bb43e250

https://api.spoonacular.com/recipes/search?query=cheese&number=2&diet=vegetarian&exlcudeIngredients=eggs&intolerances=gluten&apiKey=0dcf6018121d4ae3ab90ebb53ead0081 
*/
var intoleranceSelection
var displayIntolerances = ['Dairy','Egg','Gluten','Grain','Peanut','Seafood','Sesame','Shellfish','Soy','Sulfite','Tree','Nut','Wheat']

var intolerances = ['dairy','egg','gluten','grain','peanut','seafood','sesame','shellfish','soy','sulfite','tree','nut','wheat']

var displayDietRestrictions = ['Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Whole30']

var dietrestrictions = ['glutenfree','ketogenic','vegetarian','lacto-vegetarian','ovo-vegetarian','vegan','pescetarian','paleo','primal','whole30']

var foodCategory = ['Bread', 'Rice', 'Cheese', 'Egg', 'Fish','Chicken', 'Prawn', 'Sugar', 'Potato', 'Mango'] 

var drinkCategory = ['gin','vodka','rum']

categoryCall(foodCategory,foodCategory,".foodOptionsList");
categoryCall(drinkCategory,drinkCategory,".drinkOptions");

function categoryCall(category,categoryDisplay,appendPlace) {
    
    for (let index= 0; index < category.length; index++) {
        var NewDiv = $('<div>').addClass("form-check form-check-inline")
        var NewInput = $('<input>').addClass("form-check-input checks1")
        NewInput.attr('id', category[index])
        NewInput.attr('type','checkbox')
        
        var NewLabel = $('<label>').addClass('form-check-label').text(categoryDisplay[index])
        NewDiv.append(NewInput,NewLabel)
        $(appendPlace).append(NewDiv)   
    }
}
writeSelect(intolerances,displayIntolerances,'#intolerances')
writeSelect(dietrestrictions,displayDietRestrictions,'#diet')

$(".checks1").click(function(){
 //console.log(Ingr);
 if(drinkCategory.includes(this.id)){
   renderDrinks(this.id);

   $(".checks1").prop('checked', false);
   $(this).prop('checked',true);
 }
 else{
  
  if($(this).prop('checked')){
    console.log("is checked")
    checkInput(this.id);
  }
  else{
    console.log("is not checked")
    var yesty = this.id;
    Ingr = Ingr.replace(yesty, "");
    console.log(Ingr);
    creatingURL();
    $(".delete").remove();
    $("#ingrList").empty();
    
  }
 }
  
 
  

})
function writeSelect(category,categoryDisplay,appendPlace) {
  for (let index= 0; index < category.length; index++) {
      var newOption = $('<option>').attr('value',category[index]).text(categoryDisplay[index])
      $(appendPlace).append(newOption)
  }
}

function intoleranceDropDown(){
  $('#intolerances').removeClass("hide")
  new SlimSelect({
    select: '#intolerances',
    showSearch: false,
    placeholder: 'Food Intolerances',
    onChange: (data) => {
      intoleranceSelect = ''
      workingDropdown(data)
    }
  })
  }

function workingDropdown(data){
  for (let i = 0; i < data.length; i++) {
    intoleranceSelect += (data[i].value) +"+"
  }
  creatingURL()
}

function dietDropDown(){
  $('#diet').removeClass("hide")
  new SlimSelect({
    select: '#diet',
    showSearch: false,
    placeholder: 'Choose Diet',
    onChange: (data) => {
      dietSelect = ''
      workingDropdownDiet(data)
    }
  })
  console.log('diet')
  }

function workingDropdownDiet(data){
  for (let i = 0; i < data.length; i++) {
    dietSelect += (data[i].value) +"+"
    console.log(dietSelect)
  }
  creatingURL()
}