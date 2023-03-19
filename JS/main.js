
//^ //////////////////////////////////////////////  Loading Screen ///////////////////////////////////////////////////////



function loader() {
    $(".loading-screen").fadeIn(200)
    $(document).ready(() => {
        $(".loading-screen").fadeOut(500)
        getCategory()
    })
}

loader()

//^ //////////////////////////////////////////////  Side Control Bar ///////////////////////////////////////////////////////

// getting side bar width and set default
let w = $(".side-bar").width();
$(".nav").css("left", "-" + w + "px")



// on clicking side bar menu icon
$("#ctrlBtn").click(() => {

    if ($(".nav").css("left") == "0px") {
        closeSideBar()
    }

    else {
        openSideBar()
    }

})


//  function to open the side bar
function closeSideBar() {
    $("#ctrlBtn").html(`<i class="fas fa-bars fa-2x text-dark"></i>`);

    $("#ctrlBtn").html(`<i class="fas fas fa-xmark fa-2x text-dark"></i>`);
    // links animation 
    $(".links li a").eq(4).slideUp(50, () => {
        $(".links li a").eq(3).slideUp(50, () => {
            $(".links li a").eq(2).slideUp(50, () => {
                $(".links li a").eq(1).slideUp(50, () => {
                    $(".links li a").eq(0).slideUp(50, () => {
                        $(".nav").animate({ left: "-" + w + "px" }, 400, () => {
                            $("#ctrlBtn").html(`<i class="fas fa-bars fa-2x text-dark"></i>`);
                        })
                    })
                })
            })
        })
    })
}

//  function to close the side bar

function openSideBar() {
    $(".nav").animate({ left: "0px" }, 400, () => {
        $("#ctrlBtn").html(`<i class="fas fas fa-xmark fa-2x text-dark"></i>`);
        // links animation 
        $(".links li a").eq(0).slideDown(150, () => {
            $(".links li a").eq(1).slideDown(150, () => {
                $(".links li a").eq(2).slideDown(150, () => {
                    $(".links li a").eq(3).slideDown(150, () => {
                        $(".links li a").eq(4).slideDown(150)
                    })
                })
            })
        })
    })
}




//^ //////////////////////////////////////////////  Get Data from the API ///////////////////////////////////////////////////////

//!  --------------------Search-----------------------------
// search function by name
async function searchByName(required) {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${required}`);
    var result = await response.json();
    if (result.meals != null) {
        console.log(result);
        displaySearchByName(result)
        fetchingInputText()
    }

    else {
        console.log("res is null");
    }


}


// search function by letter
async function searchByLetter(letter) {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    var result = await response.json();

    if (result.meals != null) {
        displaySearchByName(result)
        fetchingInputText()
    }

    else {
        console.log("res is null");
    }


}


//? ---------------------------------------- search btn--------------------------------------------------

$("#searchBtn").click(function (e) {
    e.preventDefault()
    closeSideBar()
    $(".loading-screen").css("display", "block");

    setTimeout(() => {
        $(".loading-screen").css("display", "none");

        let box =
            `
    <div class="container p-5 ">
                
    <div class="inputs d-flex justify-content-around mb-5">
        <div class="searchByName position-relative">
            <input id="searchName" class=" form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            <p class="searchByNameMessage form-control text-center bg-danger text-white position-absolute top-100"></p>
        </div>
        <div class="searchByLetter">
            <input id="searchLetter" class=" form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
            <p class="searchByNameMessage form-control text-center bg-danger ">LLLLLLLLLLLLLLLL</p>
        </div>
    </div>

    <div class="row g-5">
        
    </div>


    
   
    </div>

    `
        $("#website").html(box)

        fetchingInputText()



    }, 500)


})

// fetching text from inputs and show messages

function fetchingInputText() {

    $("#searchName").keyup(function () {
        $("#searchLetter").val("")
        if ($(this).val().length >= 4) {
            let searchedWord = $(this).val();
            $(this).next().fadeOut(150)
            searchByName(searchedWord)

        }

        else {
            $(this).next().fadeIn(250)
            $(this).next().html("Too Short Input ....")
        }


    })

    $("#searchLetter").keyup(function () {
        $("#searchName").val("")
        let searchedletter = $(this).val();
        $(this).next().fadeOut(150)
        searchByLetter(searchedletter)
    })


}


// displaying meals searched by Name

function displaySearchByName(arrayOfMeals) {
    var container = ``


    for (var i = 0; i < arrayOfMeals.meals.length; i++) {
        container +=

            `

            <div class="col-md-3" data-mealID='${arrayOfMeals.meals[i].idMeal}'>
                <div  class="meal-img position-relative  ">
                    
                    <div class="img-test"><img src=${arrayOfMeals.meals[i].strMealThumb} class="img-fluid rounded-3" alt="1"></div>
                    <div class="overlay d-flex align-items-center ps-2"><p class="fs-3 fw-bold">${arrayOfMeals.meals[i].strMeal}</p></div>
                </div>
                
            </div>
    
    
        `

    }


    $(".row").html(container);


    $(".col-md-3").click(function () {
        var id = $(this).attr("data-mealID");

        $(".loading-screen").css("display", "block");
        setTimeout(() => {
            $(".loading-screen").css("display", "none");
            getMealByID(id)

        }, 1500)







    })



}

//^ //////////////////////////////////////////////  Get Data from the API ///////////////////////////////////////////////////////

async function getMealByID(id) {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var result = await response.json();
    if (result != null) {
        displayMealDetails(result)


    }

    else {
        console.log("res is null");
    }


}



function displayMealDetails(arrayOfMeals) {
    $("#website").html("");
    var ulBox = ``;
    let dataValues;
    let dataMap = new Map(Object.entries(arrayOfMeals));

    for (const [x, y] of dataMap) {
        dataValues = y
    }


    // Dealing With Nulls
    let tag = "No Reciepes";
    let source = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsolutiondots.com%2Fblog%2Fwordpress-404-error%2F&psig=AOvVaw3OJcgub_d7DE4peDOr-rRk&ust=1679251052211000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOipk-WP5v0CFQAAAAAdAAAAABAE"

    if (arrayOfMeals.meals[0].strTags) {
        tag = arrayOfMeals.meals[0].strTags;
    }

    if (arrayOfMeals.meals[0].strSource) {
        source = arrayOfMeals.meals[0].strSource;
    }




    let box =

        `
    
    <div class="container p-5 text-white">
    <div class="row">


        <div class="col-md-4">
            <div class="meal-details-img">
                <img src=${arrayOfMeals.meals[0].strMealThumb} class="img-fluid rounded-3" alt="">
                <p class="fs-1 fw-bold ">${arrayOfMeals.meals[0].strMeal}</p>
            </div>
        </div>

        <div class="col-md-8">
            <h1 class="">Instructions</h1>
            <span> ${arrayOfMeals.meals[0].strInstructions} </span>

            <p class="fs-3 fw-bolder mt-2">Area: ${arrayOfMeals.meals[0].strArea}</p>
            <p class="fs-3 fw-bolder mt-2">Category : ${arrayOfMeals.meals[0].strCategory}Side</p>
            <p class="fs-3 fw-bolder mt-2">Recipes :</p>

            <ul id="ingredientsList" class="list-unstyled d-flex g-3 flex-wrap">

            </ul>

            <p class="fs-3 fw-bolder mt-2">Recipes :</p>

            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">${tag}</li>
            </ul>
            
            <a target="_blank" class="btn btn-success" href=${source} >Source</a>
            <a target="_blank" class="btn btn-danger" href=${arrayOfMeals.meals[0].strYoutube} >Youtube</a>

        </div>


    </div>
</div>
    
    
    `;



    $("#website").html(box);



    let reqMeal = dataValues[0]


    for (var i = 1; i < (dataValues.length + 2); i++) {

        let measureIndex = "strMeasure" + i.toString()
        let ingredientIndex = "strIngredient" + i.toString()

        if ((reqMeal[measureIndex])) {
            ulBox +=
                `
            <li class="alert alert-info m-2 p-1"> ${reqMeal[measureIndex]}  ${reqMeal[ingredientIndex]}</li>
            `
        }


    }


    $("#ingredientsList").html(ulBox);



}



//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//? ---------------------------------      Categories ----------------------------------------------------------
//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#catgBtn").click(function (e) {
    e.preventDefault()
    closeSideBar()
    $(".loading-screen").css("display", "block");

    setTimeout(() => {
        $(".loading-screen").css("display", "none");
        getCategory()
    }, 1500);


})




//^ //////////////////////////////////////////////  Get Data from the API ///////////////////////////////////////////////////////

async function getCategory() {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var result = await response.json();
    if (result != null) {
        console.log(result);
        console.log(result.categories.length);
        displayCategories(result.categories);

    }

    else {
        console.log("res is null");
    }


}



function displayCategories(categoriesArr) {
    let cartona = ``
    let box =
        `
    <div class="container p-5 text-white">
       <div class="row g-5"></div>
    </div>  
    `
    $("#website").html(box);



    console.log(categoriesArr.length);
    for (let i = 0; i < categoriesArr.length; i++) {
        cartona +=
            `
            <div class="col-md-3" data-mealID=${categoriesArr[i].idCategory} data-catg-name=${categoriesArr[i].strCategory} >
                
                <div class="cat-card position-relative text-center">
                    <img src=${categoriesArr[i].strCategoryThumb} class="img-fluid rounded-3" alt="">
                    <div class="overlay ps-2 rounded-3">
                        <h3 class=" catg-name fw-bolder"> ${categoriesArr[i].strCategory} </h3>
                        <p>${categoriesArr[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}....</p>
                    </div>
                </div>

            </div>

        `

    }

    $(".row").html(cartona)

    $(".col-md-3").click(function () {
        var category = $(this).attr("data-catg-name");

        $(".loading-screen").css("display", "block");
        setTimeout(() => {
            $(".loading-screen").css("display", "none");
            filterMealsBycatg(category)

        }, 1500)

    })


}


//^ //////////////////////////////////////////////  Showing Meals After Selecting Categories ///////////////////////////////////////////////////////

//^ //////////////////////////////////////////////  Get Data from the API ///////////////////////////////////////////////////////

async function filterMealsBycatg(catgeory) {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catgeory}`);
    var result = await response.json();
    if (result != null) {
        console.log(result.meals);
        showByCategory(result.meals)

    }

    else {
        console.log("res is null");
    }


}



function showByCategory(data) {

    let cartona = ``;

    for (let i = 0; i < data.length; i++) {
        cartona +=
            `
            <div class="col-md-3" data-mealID=${data[i].idMeal}>
                
            <div  class="meal-img position-relative  ">
                    
            <div class="img-test"><img src=${data[i].strMealThumb} class="img-fluid rounded-3" alt="1"></div>
            <div class="overlay d-flex align-items-center ps-2"><p class="fs-3 fw-bold">${data[i].strMeal}</p></div>
            </div>

            </div>

        `

    }


    $(".row").html(cartona)

    $(".col-md-3").click(function () {
        var id = $(this).attr("data-mealID");

        $(".loading-screen").css("display", "block");

        setTimeout(() => {
            $(".loading-screen").css("display", "none");
            getMealByID(id)


        }, 1500)



    })

}








//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//? ---------------------------------      Area       ----------------------------------------------------------
//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#areaBtn").click(function (e) {
    e.preventDefault()
    closeSideBar()
    $(".loading-screen").css("display", "block");

    setTimeout(() => {
        $(".loading-screen").css("display", "none");
        getArea()

    }, 1500)


})


//^ //////////////////////////////////////////////  Get Data from the API /////////////////////////////////////


async function getArea() {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    var result = await response.json();
    if (result != null) {
        console.log(result.meals);
        displayArea(result.meals)

    }

    else {
        console.log("res is null");
    }


}


function displayArea(data) {
    let cartona = ``;
    let box =

        `
    <div class="container p-5 text-white">   
    <div class="row g-5 ms-5"></div>
    </div>  `;





    for (let i = 0; i < data.length; i++) {

        cartona +=
            `
        <div class="col-md-3 text-white p-5 cursor-pointer"  data-country=${data[i].strArea}>
            
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3 id="countryName" class="">${data[i].strArea}</h3>

    </div>
        `


    }


    $("#website").html(box);
    $(".row").html(cartona);


    $(".col-md-3").click(function () {
        var country = $(this).attr("data-country");

        $(".loading-screen").css("display", "block");

        setTimeout(() => {
            $(".loading-screen").css("display", "none");
            filterMealsByArea(country)


        }, 1500)

    })

}






//^ //////////////////////////////////////////////  Get Data from the API ///////////////////////////////////////////////////////

async function filterMealsByArea(area) {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    var result = await response.json();
    if (result != null) {
        console.log(result.meals);
        showByCategory(result.meals)


    }

    else {
        console.log("res is null");
    }







}




//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//? ---------------------------------      Ingredients      ----------------------------------------------------
//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#ingridentBtn").click(function (e) {
    e.preventDefault()
    closeSideBar()
    $(".loading-screen").css("display", "block");

    setTimeout(() => {
        $(".loading-screen").css("display", "none");
        getIngredient()
    }, 1500)





})




//^ //////////////////////////////////////////////  Get Data from the API /////////////////////////////////////

async function getIngredient() {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    var result = await response.json();
    if (result != null) {
        displayIngrident(result.meals.splice(0, 20))
    }

    else {
        console.log("res is null");
    }


}



//! filtering Meals by Ingrident

async function filterMealsByIngrident(Ingrident) {

    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingrident}`);
    var result = await response.json();
    if (result != null) {
        console.log(result.meals);
        showByCategory(result.meals)


    }

    else {
        console.log("res is null");
    }







}




function displayIngrident(data) {
    let cartona = ``;
    let box =

        `
    <div class="container p-5 text-white text-center">   
    <div class="row g-5 ms-5"></div>
    </div>  `;





    for (let i = 0; i < data.length; i++) {

        cartona +=
            `
        <div class="col-md-3 p-2 cursor-pointer" data-ingrident=${data[i].strIngredient}>
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3 class="mt-3"  id="ingredientName" class="">${data[i].strIngredient}</h3>
        <p class="fs-6">${data[i].strDescription.split(" ").slice(0, 15).join(" ")}</p>
    </div>
        `


    }


    $("#website").html(box);
    $(".row").html(cartona);


    $(".col-md-3").click(function () {
        var Ingrident = $(this).attr("data-ingrident");


        $(".loading-screen").css("display", "block");

        setTimeout(() => {
            $(".loading-screen").css("display", "none");
            filterMealsByIngrident(Ingrident)


        }, 1500)

    })

}



//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//? ---------------------------------      Contact      ----------------------------------------------------
//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// onclick




$("#contactBtn").click(function (e) {
    e.preventDefault()
    closeSideBar()
    $(".loading-screen").css("display", "block");
    setTimeout(() => {
        $(".loading-screen").css("display", "none");
        displayContact()
        interactContact()

    }, 1500)




})


const nameRegex = /^[A-Za-z\s]{3,30}$/
const ageRegex = /^(1[89]|[2-9][0-9])$/
const phoneRegex = /^(002)?(01)[0125][0-9]{8}$/
const mailRegex = /^[a-z0-9_]{5,}(@)[a-z]{4,}(.)[a-z]{3}(.[a-z]{2})?$/
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/














function interactContact() {
    $("#formName").keyup(function () {

        validation(nameRegex, $("#formName"), $("#nameMsg"))
        formCheck()

    })

    $("#formMail").keyup(function () {

        validation(mailRegex, $("#formMail"), $("#mailMsg"))
        formCheck()

    })

    $("#formPhone").keyup(function () {

        validation(phoneRegex, $("#formPhone"), $("#phoneMsg"))
        formCheck()

    })

    $("#formAge").keyup(function () {

        validation(ageRegex, $("#formAge"), $("#ageMsg"))
        formCheck()

    })


    $("#formPass").keyup(function () {

        validation(passRegex, $("#formPass"), $("#passMsg"))
        formCheck()

    })
}








function formCheck() {
    // console.log(($("#formPass").val() === frepass.val()));


    if (((nameRegex.test($("#formName").val())) && (mailRegex.test($("#formMail").val())) && (phoneRegex.test($("#formPhone").val())) && (ageRegex.test($("#formAge").val())) && (passRegex.test($("#formPass").val())))) {
        $("#formBtn").removeAttr("disabled")
    }
}







function validation(regex, element, message) {

    if (!(regex.test(element.val()))) message.fadeIn(500);
    else message.fadeOut(500);
}



function displayContact() {

    let box = `
    
    <div class="container p-5 text-center">

    <div class="row g-5 py-5">

        <div class="col-md-6 position-relative">
            <input id="formName" class="form-control my-3 " type="text" placeholder="Enter your Name">
            <div id="nameMsg" class="form-message position-absolute top-100  start-50  w-75 translate-middle-x rounded-3 bg-warning form control text-center">At least 3 letters<br>Special characters and numbers not allowed</div>
        </div>

        
        <div class="col-md-6 position-relative">
            <input id="formMail" class="form-control my-3 " type="text" placeholder="Enter your Email">
            <div id="mailMsg" class="form-message position-absolute top-100  start-50  w-75 translate-middle-x rounded-3 bg-warning form control text-center">Email not valid *exemple@yyy.zzz</div>

        </div>


        
        <div class="col-md-6 position-relative">
            <input id="formPhone" class="form-control my-3 " type="text" placeholder="Enter your Phone">
            <div id="phoneMsg" class="form-message position-absolute top-100  start-50  w-75 translate-middle-x rounded-3 bg-warning form control text-center">Enter valid Phone Number</div>

        </div>


        
        <div class="col-md-6 position-relative">
            <input id="formAge" class="form-control my-3 " type="text" placeholder="Enter your Age">
            <div id="ageMsg" class="form-message position-absolute top-100  start-50  w-75 translate-middle-x rounded-3 bg-warning form control text-center">Enter a Valid Age (18 to 99)</div>

        </div>

        
        <div class="col-md-6 position-relative">
            <input id="formPass" class="form-control my-3 " type="text" placeholder="Enter your Password">
            <div id="passMsg" class="form-message position-absolute top-100  start-50  w-75 translate-middle-x rounded-3 bg-warning form control text-center">Enter valid Pass of more than 8 chars <br> At least one: Number, Symbol, capital letter </div>

        </div>

        
        <div class="col-md-6 position-relative">
            <input id="formRePass" class="form-control my-3 " type="text" placeholder="RePassword">
            <div class="form-message position-absolute top-100  start-50  w-75 translate-middle-x rounded-3 bg-warning form control text-center">**********</div>

        </div>


   
    </div>

    <button id="formBtn" class="btn btn-outline-info w-50 ms-auto mt-5" disabled>Submit</button>



</div>
    
    
    
    
    `

    $("#website").html(box)




}