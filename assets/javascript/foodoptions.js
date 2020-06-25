
/*https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey=2b49753a505a43fe8dbfb610bb43e250

https://api.spoonacular.com/recipes/search?query=cheese&number=2&diet=vegetarian&exlcudeIngredients=eggs&intolerances=gluten&apiKey=0dcf6018121d4ae3ab90ebb53ead0081 
*/

var intolerances = ['dairy','egg','gluten','grain','peanut','seafood','sesame','shellfish','soy','sulfite','tree','nut','wheat']

var dietrestrictions = ['glutenfree','ketogenic','vegetarian','lacto-vegetarian','ovo-vegetarian','vegan','pescetarian','paleo','primal','whole30']

addingIntolerances();

function addingIntolerances(){
    for (let i = 0; i < intolerances.length; i++) {
    var list = $('<option>');
    list.attr('type', 'checkbox').val(intolerances[i]).text(intolerances[i]);
    $('#intoleranceDropdown').append(list)
    // list.addclass('checkbox')
    // list.append(intolerances[i])
    
    
}};


var addIntolerance = $('#intoleranceDropdown');
    addIntolerance.click(function () {
                console.log('working')
            })
    
            addIntolerance.onblur = function(evt) {
                addIntolerance.classList.remove('visible');
            }

