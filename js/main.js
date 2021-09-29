/* CRUDS

   C =+> Create   (Done)
   R ==> Read, or retreve (Done)
   U ==> Update (Done)
   D ==> Delete (Done)
   S ==> Search (Done)

   Validation (price) ==> 
   isExist (for product name) ==>
   Make the catigory section as dropdown list ==>
*/

// ================ Holding The Needed Elements ================
let productName = document.getElementById('pName');
let productPrice = document.getElementById('pPrice');
let productCategory = document.getElementById('pCat');
let productDescription = document.getElementById('pDesc');

let displayData = document.getElementById('displayHere');

let mainBtn = document.getElementById('mainBtn');

let mySearch = document.getElementById('mySearch');

let CRUDSArray = [];

// ================ Checking Whether There Is Data In Local Storage Or Not ================
if (localStorage.getItem("CRUDS_Data") != null) {
    CRUDSArray = JSON.parse(localStorage.getItem("CRUDS_Data"));
    display();
}

// ================ Add Product Function ================
mainBtn.addEventListener('click', function () {
    // ================ Check The BTN Is Add Or Update ================
    if (mainBtn.innerHTML == "Add Product") {
        if (isEmpty()) {
            if (isExist()) {
                let product = {
                    name: productName.value,
                    price: productPrice.value,
                    cat: productCategory.value,
                    desc: productDescription.value
                }

                CRUDSArray.push(product);
                localStorage.setItem("CRUDS_Data", JSON.stringify(CRUDSArray));

                // isExist();
                display();
                clear();
            }
        }
    }
    else {
        updateProduct();
        display();
    }

});

// ================ Display Function ================
function display() {
    let keeper = ``;
    for (let i = 0; i < CRUDSArray.length; i++) {
        keeper += `
            <tr>
                <td class="tbody-num">${i + 1}</td>
                <td>${CRUDSArray[i].name}</td>
                <td>${CRUDSArray[i].price}</td>
                <td class="tbody-cat">${CRUDSArray[i].cat}</td>
                <td class="tbody-desc">${CRUDSArray[i].desc}</td>
                <td><button class="btn btn-warning" onclick="changePName(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `
    }

    displayData.innerHTML = keeper;
}

// ================ To Get Update Row ================
let updateIndex;

// ================ Change BTN Name To Update ================
function changePName(indexRow) {
    updateIndex = indexRow;
    getProductsFromUpdate();
    mainBtn.classList.replace("btn-outline-secondary", "btn-warning");
    mainBtn.innerHTML = "Update Product";
}

// ================ Update Function ================

function updateProduct() {
    CRUDSArray[updateIndex].name = productName.value;
    CRUDSArray[updateIndex].price = productPrice.value;
    CRUDSArray[updateIndex].cat = productCategory.value;
    CRUDSArray[updateIndex].desc = productDescription.value;
    localStorage.setItem("CRUDS_Data", JSON.stringify(CRUDSArray));
    clear();
    mainBtn.classList.replace("btn-warning", "btn-outline-secondary");
    mainBtn.innerHTML = "Add Product";
}

// ================ Get The Data From Update BTN And Add Them Into Their Inputs To Update Them ================
function getProductsFromUpdate() {
    productName.value = CRUDSArray[updateIndex].name;
    productPrice.value = CRUDSArray[updateIndex].price;
    productCategory.value = CRUDSArray[updateIndex].cat;
    productDescription.value = CRUDSArray[updateIndex].desc;
}

// ================ Delete Function ================
function deleteProduct(deleteRow) {
    CRUDSArray.splice(deleteRow, 1);
    localStorage.setItem("CRUDS_Data", JSON.stringify(CRUDSArray));
    display();
}

// ================ Search Function ================
mySearch.addEventListener("keyup", function () {
    let keeper = ``;

    for (let i = 0; i < CRUDSArray.length; i++) {
        if (CRUDSArray[i].name.toLowerCase().includes(mySearch.value.toLowerCase())) {
            keeper += `
                <tr>
                    <td class="tbody-num">${i + 1}</td>
                    <td>${CRUDSArray[i].name}</td>
                    <td>${CRUDSArray[i].price}</td>
                    <td class="tbody-cat">${CRUDSArray[i].cat}</td>
                    <td class="tbody-desc">${CRUDSArray[i].desc}</td>
                    <td><button class="btn btn-warning" onclick="changeBName(${i})">Update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>
            `
        }
    }

    displayData.innerHTML = keeper;
});

// ================ Clear Inputs Function ================
function clear() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";

    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
}

// =======================================================================================
// ================ If The Fields Empty Validation ================
let emptyMss = document.querySelector(".ifEmpty");

function isEmpty() {
    if (productName.value == "" || productPrice.value == "" || productCategory.value == "" || productDescription.value == "") {
        emptyMss.classList.replace("d-none", "d-block");
        return false;
    }
    else {
        emptyMss.classList.replace("d-block", "d-none");
        return true;
    }
}

// ================ Is Exist Function ================
let existMss = document.querySelector(".ifExist");
let didFind = false;

function isExist() {
    for (let i = 0; i < CRUDSArray.length ; i++) {
        if (productName.value === CRUDSArray[i].name && productPrice.value === CRUDSArray[i].price) {
            didFind = true;
            // console.log("Found match");
        }
        if (didFind) {
            console.log("Found match");
            didFind = false;
            existMss.classList.replace("d-none", "d-block");
            return false;
        }
        else if (!didFind) {
            console.log("Didn't find any match");
            existMss.classList.replace("d-block", "d-none");
            return true;
        }
    }
}

// ================ Product Name Validation ================
let productErrMss = document.querySelector(".productErrMss");

productName.addEventListener("keyup", function () {
    let productNameVal = productName.value;
    let pNameRegex = /^[A-Z][a-zA-Z ]+?[A-Z]?[a-zA-Z ]+$/;

    if (pNameRegex.test(productNameVal) == true) {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        productErrMss.classList.replace("d-block", "d-none");
    }
    else {
        productName.classList.remove("is-valid");
        productName.classList.add("is-invalid");
        productErrMss.classList.replace("d-none", "d-block");
    }
});

// ================ Product Price Validation ================
// let priceErrMss = document.querySelector(".priceErrMss");

// productPrice.addEventListener("keyup", function () {
//     if (!isNaN(productPrice.value)) {
//         console.log("Yes, this is a number");
//         if (productPrice.value >= 100 && productPrice.value <= 1000000) {   => this is not working should make it regex
//             productPrice.classList.add("is-valid");
//             productPrice.classList.remove("is-invalid");
//             priceErrMss.classList.replace("d-block", "d-none");
//         }
//     }
//     else {
//         console.log("No, not a number");
//         productPrice.classList.remove("is-valid");
//         productPrice.classList.add("is-invalid");
//         priceErrMss.classList.replace("d-none", "d-block");
//     }
// });

