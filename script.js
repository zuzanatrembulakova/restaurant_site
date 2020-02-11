const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    console.log(data)
    data.forEach(function (oneCategory) {
        console.log(oneCategory)

        //create links
        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCategory}`);
        a.textContent = oneCategory;
        document.querySelector(".submenu").appendChild(a);
        a.classList.add(".submenu_item");


        //create sections
        const section = document.createElement("section");
        section.id = oneCategory;
        const h2 = document.createElement("h2");
        h2.textContent = oneCategory;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);
    })

    getProducts()
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()

        })
        .then(function (data) {
            showdata(data)
        })

    function showdata(jsonData) {
        console.log(jsonData)
        jsonData.forEach(showCourses);
        /*setuparrows();*/

    }
}

/*const divmap = {};
divmap["starter"] = document.querySelector("#course_starters");
divmap["main"] = document.querySelector("#course_main");
divmap["dessert"] = document.querySelector("#course_desserts");
divmap["drinks"] = document.querySelector("#course_drinks");
divmap["sideorders"] = document.querySelector("#course_sideorders");*/

function showCourses(course) {
    const smallImg = getImageName(course.image);

    const template = document.querySelector("template").content;

    var aCopy = template.cloneNode(true);

    aCopy.querySelector(".title").textContent = course.name;
    aCopy.querySelector(".short_description").textContent = course.shortdescription;

    if (course.discount) {
        aCopy.querySelector(".discount").style.display = "inline";
        aCopy.querySelector(".discount span").textContent = course.discount;

        const new_price = Math.round(course.price - course.price * course.discount / 100);
        aCopy.querySelector(".new_price").style.display = "inline";
        aCopy.querySelector(".new_price span").textContent = new_price + ".00 DKK"
    }


    aCopy.querySelector(".price").textContent = course.price + ".00 DKK";

    aCopy.querySelector(".course_img").src = smallImg;

    if (course.soldout == true) {
        aCopy.querySelector(".soldout").style.display = "inline";
        aCopy.querySelector(".course_img").classList.add("soldout_course");
    }

    var icons = aCopy.querySelector(".icons").children;
    setUpIcons(icons, course, false);
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${course.id}`)
            .then(res => res.json())
            .then((data) => {setUpIcons(icons, data, true)});

    aCopy.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${course.id}`)
            .then(res => res.json())
            .then((data) => {showDetails(data)});
    });

    /*console.log(`#${course.category}`);*/
    document.querySelector(`#${course.category}`).appendChild(aCopy);
    /*divmap[course.category].appendChild(aCopy)*/
}

function setUpIcons(icons, course, hasAllergens){
    if (course.vegetarian == false) {
        icons[0].style.display = "none";
    }

    if (course.alcohol == 0) {
        icons[2].style.display = "none";
    }

    icons[1].style.display = "none";
    icons[3].style.display = "none";
    icons[4].style.display = "none";

    if (hasAllergens){
        if (course.allergens.includes("laktose")){
            icons[1].style.display = "inline";
        }
        if (course.allergens.includes("kartofler")){
            icons[3].style.display = "inline";
        }
        if (course.allergens.includes("nødder")){
            icons[4].style.display = "inline";
        }
    }
}

function getImageName(imageName){
    const baseimg = "https://kea-alt-del.dk/t5/site/imgs/";
    return baseimg + "small/" + imageName + "-sm.jpg";
}

function showDetails(data) {
    console.log(data);
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-sdescription").textContent = data.shortdescription;
    modal.querySelector(".modal-ldescription").textContent = data.longdescription;
    modal.querySelector(".modal-image").src = getImageName(data.image);
    //...
    modal.classList.remove("hide")
}


/*---ARROW BUTTONS-------------------------------------*/

/*function setuparrows() {
    var arrowdownbtns = document.querySelectorAll("#arrow_btn");

    for (i = 0; i < arrowdownbtns.length; i++) {
        arrowdownbtns[i].onclick = (function () {
            var currenti = i;
            return function () {
                btnClick(currenti);
            }
        })();
    }
}*/

function setupclose() {
    var closebtns = document.querySelectorAll("#close");

    for (i = 0; i < arrowdownbtns.length; i++) {
        closebtns[i].onclick = (function () {
            var currenti = i;
            return function () {
                btnClick(currenti);
            }
        })();
    }
}

function btnClick(index) {
    modal[index].style.display = "none";
}


window.onscroll = function () {
    stickybar()
    scrollFunction()
};

/*---NAV BAR-------------------------------------*/

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickybar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

/*---GO TO TOP BTN-------------------------------------*/

function scrollFunction() {
    var topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() { // eslint-disable-line no-unused-vars
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
