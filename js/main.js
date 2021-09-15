/* CRUDS

   C =+> Create   (Done)
   R ==> Read, or retreve (Done)
   U ==> Update (Done)
   D ==> Delete (Done)
   S ==> Search (Done)

   Validation (price) ==> 
   isExist (for product name) ==>
   Adjust isEmpty fun ==>
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
            let product = {
                name: productName.value,
                price: productPrice.value,
                cat: productCategory.value,
                desc: productDescription.value
            }

            CRUDSArray.push(product);
            localStorage.setItem("CRUDS_Data", JSON.stringify(CRUDSArray));

            display();
            clear();
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
                <td><button class="btn btn-warning" onclick="changeBName(${i})">Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `
    }

    displayData.innerHTML = keeper;
}

// ================ To Get Update Row ================
let updateIndex;

// ================ Change BTN Name To Update ================
function changeBName(indexRow) {
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
}

// ================ If The Fields Empty Validation ================
function isEmpty() {
    if (productName.value == "")  {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        return false;
    }
    if (productPrice.value == "")  {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        return false;
    }
    if (productCategory.value == "")  {
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
        return false;
    }
    if (productDescription.value == "")  {
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");
        return false;
    }
    else {
        // productName.classList.remove("is-invalid");
        // productName.classList.remove("is-valid");
        // productPrice.classList.remove("is-invalid");
        // productPrice.classList.remove("is-valid");
        // productCategory.classList.remove("is-invalid");
        // productCategory.classList.remove("is-valid");
        // productDescription.classList.remove("is-invalid");
        // productDescription.classList.remove("is-valid");
        return true;
    }
}

// ================ Product Name Validation ================
let productErrMss = document.querySelector(".productErrMss");

productName.addEventListener("keyup", function () {
    let productNameVal = productName.value;
    let pNameRegex = /^[A-Z][a-zA-Z]+\s?[A-Z]?[a-zA-Z]+$/;

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

