document.getElementById('search-btn').addEventListener('click', function() {
    const inputText = document.getElementById('input-text').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
        .then(res => res.json())
        .then(data => {
            const allFood = document.getElementById('all-food-div');
            const mealItem = data.meals;
            let addHtml ='';
            if (inputText === '') {
                alert('Please type your food name');
            }
            else{
                if (data.meals) {
                    mealItem.forEach(foodName => {
                        addHtml +=`
                            <div onclick="allFoodDiv(${foodName.idMeal})" class = 'food-item'>
                                <img src="${foodName.strMealThumb}">
                                <h2>${foodName.strMeal}</h2>
                            </div>
                        `
                    });
                } else {
                    alert(inputText + 'Food is Not Available');
                }
                
            }
            allFood.innerHTML = addHtml;
        })
})

const allFoodDiv = mealID => {
    const eachFood = document.getElementById('each-food');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data =>{
            const addHtml = `
                <div class="single-food">
                    <img src="${data.meals[0].strMealThumb}">
                    <h2>${data.meals[0].strMeal}</h2>
                    <div class="single-food-second-div">
                        <h4>Ingredients: </h4>
                        <ul>
                            <li>${data.meals[0].strIngredient1}</li>
                            <li>${data.meals[0].strIngredient2}</li>
                            <li>${data.meals[0].strIngredient3}</li>
                            <li>${data.meals[0].strIngredient4}</li>
                            <li>${data.meals[0].strIngredient5}</li>
                            <li>${data.meals[0].strIngredient6}</li>
                        </ul>
                    </div>
                </div>
            `
            eachFood.innerHTML = addHtml;
        })
}


