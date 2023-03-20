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

    /* empty field */
    emptyDisplayDetails()

    /* searching is ...... */
    const searching = document.getElementById('searching-id');
    searching.innerHTML = `
     <h5 class="fw-semibold">You're searching <span class="fw-bold"> "${searchText}"</span></h5>
    `
}

/* empty so */

/* Enter key function */

const input = document.getElementById('input-field');

input.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        searchMeals()
    }
})


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
                <div class="card cursor" onclick="loadMealDetails(${meal?.idMeal})">
                    <img src="${meal?.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal?.strMeal.slice(0 - 31)}</h5>
                            <h6 class="card-title">ID: ${meal?.idMeal}</h6>
                            <h6 class="card-title">Category: ${meal?.strCategory}</h6>
                            <h6 class="card-title">Area: ${meal?.strArea}</h6>
                            <h6 class="card-title">Tags: ${meal?.strTags}</h6>
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
    div.classList.add('card')
    div.innerHTML = `
        <div class="card-body">
            <div class="row">
                <div class="col-sm-4 mb-3 mb-sm-0">
                        <div class="card-body">
                            <div class="img-fluid meal-img">
                                <img src="${meal?.strMealThumb}" alt="">
                            </div>
                    </div>
                </div>
                    <div class="col-sm-8">
                        <div class="card-body">
                            <h4 class="card-title">${meal?.strMeal}</h4>
                            <h6 class="card-title">ID: ${meal?.idMeal}</h6>
                            <h6 class="card-title">Category: ${meal?.strCategory}</h6>
                            <h6 class="card-title">Area: ${meal?.strArea}</h6>
                            <h6 class="card-title">Tags: ${meal?.strTags}</h6>
                            <p class="card-text">
                            <h6>Discription:</h6>${meal?.strInstructions.slice(0 - 500)}</p>
                                <div class="text-center">
                                    <h6 class="text-start">Recipe Video:</h6>
                                    <a href="${meal?.strYoutube}" target="_blank" class="text-black text-decoration-none fs-5 btn-light btn"><span class="text-danger"><i class="fa-brands fa-youtube"></i></span> Youtube</a>
                                    </div>
                            </div>
                    </div>
                </div>
            </div>

    `

    mealDetails.appendChild(div)
}


/* empty solve */
const emptyDisplayDetails = () => {
    const mealDetails = document.getElementById('meal-details');
    const searchField = document.getElementById('input-field');
    const searching = document.getElementById('searching-id');

    searching.textContent = '';
    mealDetails.textContent = '';
    searchField.textContent = '';
} 
