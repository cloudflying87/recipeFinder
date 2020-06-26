
/*https://api.spoonacular.com/recipes/" + recipeID +"/information?includeNutrition=false&apiKey=2b49753a505a43fe8dbfb610bb43e250

https://api.spoonacular.com/recipes/search?query=cheese&number=2&diet=vegetarian&exlcudeIngredients=eggs&intolerances=gluten&apiKey=0dcf6018121d4ae3ab90ebb53ead0081 
*/

var foodCategory = ['Bread', 'Rice', 'Cheese', 'Egg', 'Fish','Chicken', 'Prawn', 'Sugar', 'Potato', 'Mango'] 

var drinkCategory = ['gin','vodka','rum']

categoryCall(foodCategory,".options");
categoryCall(drinkCategory,".drinkOptions");

function categoryCall(category,appendPlace) {
    
    for (let index= 0; index < category.length; index++) {
        var NewDiv = $('<div>').addClass("form-check form-check-inline")
        var NewInput = $('<input>').addClass("form-check-input")
        NewInput.attr('id', category[index])
        NewInput.attr('type','checkbox')
        
        var NewLabel = $('<label>').addClass('form-check-label').text(category[index])
        NewDiv.append(NewInput,NewLabel)
        $(appendPlace).append(NewDiv)   
    }
}

var menuClicked;

var displayIntolerances = ['Dairy','Egg','Gluten','Grain','Peanut','Seafood','Sesame','Shellfish','Soy','Sulfite','Tree','Nut','Wheat']

var intolerances = ['dairy','egg','gluten','grain','peanut','seafood','sesame','shellfish','soy','sulfite','tree','nut','wheat']

var displayDietRestrictions = ['Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Whole30']

var dietrestrictions = ['glutenfree','ketogenic','vegetarian','lacto-vegetarian','ovo-vegetarian','vegan','pescetarian','paleo','primal','whole30']

addingOptions(intolerances,displayIntolerances,'.intolerances');
addingOptions(dietrestrictions,displayDietRestrictions,'.diet');


function addingOptions(selectOptions,displayOptions,placement){
    for (let i = 0; i < selectOptions.length; i++) {
    var list = $("<input>");
    list.attr('type','checkbox')
    list.val(selectOptions[i]).text(displayOptions[i]);
    $(placement).append(list) 
}};

// tippy('#myButton', {
//     allowHTML: true,
//     animateFill: true,
//     animation: 'scale',
//     animation: 'shift-away',
//     content: messages,
// })
/*
function toggleClass(elem,className){
if (elem.className.indexOf(className) !== -1){
    elem.className = elem.className.replace(className,'');
}
else{
    elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
}

return elem;
}

function toggleDisplay(elem){
const curDisplayStyle = elem.style.display;			

if (curDisplayStyle === 'none' || curDisplayStyle === ''){
    elem.style.display = 'block';
}
else{
    elem.style.display = 'none';
}

}

function toggleMenuDisplay(e){
// const dropdown = e.currentTarget.parentNode
console.log(e)
const menu = dropdown.querySelector('.menu');
const icon = dropdown.querySelector('.fa-angle-right');

toggleClass(menu,'hide');
toggleClass(icon,'rotate-90');
}

function handleOptionSelected(e){
toggleClass(e.target.parentNode, 'hide');			

const id = e.target.id;
const newValue = e.target.textContent + ' ';
const titleElem = document.querySelector('.dropdown .title');
const icon = document.querySelector('.dropdown .title .fa');


titleElem.textContent = newValue;
titleElem.appendChild(icon);

//trigger custom event
document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
    //setTimeout is used so transition is properly shown
setTimeout(() => toggleClass(icon,'rotate-90',0));
}

function handleTitleChange(e){
const result = document.getElementById('result');
console.log(e.target.textContent)
}

//get elements
const dropdownTitle = document.querySelector('.dropdown .title');

const dropdownOptions = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
$('.dropdown').on('click', function(event){
    event.preventDefault();
    menuClicked = this.id
    toggleMenuDisplay(menuClicked);
}

);

dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));

document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);

*/

/*
function toggleClass(elem,className){
    if (elem.className.indexOf(className) !== -1){
      elem.className = elem.className.replace(className,'');
    }
    else{
      elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
    }
  
    return elem;
  }
  
  function toggleDisplay(elem){
    const curDisplayStyle = elem.style.display;			
  
    if (curDisplayStyle === 'none' || curDisplayStyle === ''){
      elem.style.display = 'block';
    }
    else{
      elem.style.display = 'none';
    }
  
  }
  
  function toggleMenuDisplay(e){
    const dropdown = e.currentTarget.parentNode;
    const menu = dropdown.querySelector('.menu');
    const icon = dropdown.querySelector('.fa-angle-right');
  
    toggleClass(menu,'hide');
    toggleClass(icon,'rotate-90');
  }
  
  function handleOptionSelected(e){
    toggleClass(e.target.parentNode, 'hide');			
  
    const id = e.target.id;
    const newValue = e.target.textContent + ' ';
    const titleElem = document.querySelector('.dropdown .title');
    const icon = document.querySelector('.dropdown .title .fa');
  
  
    titleElem.textContent = newValue;
    titleElem.appendChild(icon);
  
    //trigger custom event
    document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
      //setTimeout is used so transition is properly shown
    setTimeout(() => toggleClass(icon,'rotate-90',0));
  }
  
  function handleTitleChange(e){
    const result = document.getElementById('result');
  
    console.log(e.target.textContent);
  }
  
  //get elements
  const dropdownTitle = document.querySelector('.dropdown .title');
  const dropdownOptions = document.querySelectorAll('.dropdown .option');
  
  //bind listeners to these elements
  dropdownTitle.addEventListener('click', toggleMenuDisplay);
  
  dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));
  
  document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);

*/