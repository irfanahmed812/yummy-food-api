/* error */
document.getElementById('error').style.display = 'none';

/* search field */
const searchMeals = () => {
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    // console.log(searchText);

    /* empty value */
    searchField.value = '';

    /* error */
    document.getElementById('error').style.display = 'none';
    if (searchText == '') {
        document.getElementById('error').style.display = 'block';
    }
    else {
        /* fetch */
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
    }
}

/* display search result */

const displaySearchResult = (meals) => {
    // console.log(meals);
    const searchResult = document.getElementById('display-result');

    /* empty */
    // searchResult.innerHTML = '';
    searchResult.textContent = '';

    if (meals == null) {
        searchResult.innerHTML = `
        <div class="text-center container d-flex justify-content-center">
            <p class="fs-4">Search result not found <i class="fa-solid fa-face-sad-tear"></i> please try again later</p>
        </div>
        `
    }
    else {
        /* use forEach */
        meals.forEach(meal => {
            console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
                <div class="card">
                    <img src="${meal?.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal?.strMeal.slice(0 - 31)}</h5>
                            <h6 class="card-title">ID: ${meal?.idMeal}</h6>
                            <h6 class="card-title">Category: ${meal?.strCategory}</h6>
                            <h6 class="card-title">Area: ${meal?.strArea}</h6>
                            <h6 class="card-title">Tags: ${meal?.strTags}</h6>
                            <div class="text-center pt-2">
                                <button class="btn btn-outline-primary" onclick="loadMealDetails(${meal?.idMeal})">See more</button>
                            </div>
                        </div>
                </div>
        `
            searchResult.appendChild(div);

        })
    }

}

/* meal details */

const loadMealDetails = (mealId) => {
    // console.log(mealId);

    const url = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data?.meals?.[0]))
}


/* display meal details */

const displayMealDetails = (meal) => {
    console.log(meal);

    const mealDetails = document.getElementById('meal-details');

    /* empty */
    mealDetails.textContent = '';

    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
        <div class="card">
            <img src="${meal?.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal?.strMeal}</h5>
                    <h6 class="card-title">ID: ${meal?.idMeal}</h6>
                    <h6 class="card-title">Category: ${meal?.strCategory}</h6>
                    <h6 class="card-title">Area: ${meal?.strArea}</h6>
                    <h6 class="card-title">Tags: ${meal?.strTags}</h6>
                    <p class="card-text"><h6>Discription:</h6>${meal?.strInstructions.slice(0 - 500)}</p>
                    <div class="text-center">
                        <h6 class="text-start">Recipe Video:</h6>
                        <a href="${meal?.strYoutube}" target="_blank" class="text-black text-decoration-none fs-5 btn-light btn"><span class="text-danger"><i
                        class="fa-brands fa-youtube"></i></span> Youtube</a>
                    </div>
                </div>
        </div>        
    `

    mealDetails.appendChild(div)
}

