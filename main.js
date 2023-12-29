var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var addButton = document.getElementById("addButton");
var updateButton = document.getElementById("updateButton");
var updatedproduct;

var productList = [];

if (localStorage.getItem("products") !== null) {
  productList = JSON.parse(localStorage.getItem("products"));

  displayProductList(productList);
}

function addProduct() {
  if (validInputs() === true) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };

    productList.push(product);

    clearInputs();

    setItemInlocalStorage();

    displayProductList(productList);

  } else {
    alert("Please enter a valid Name, Price and Description")
  }
}

function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

function setItemInlocalStorage() {
  localStorage.setItem("products", JSON.stringify(productList));
}

function displayProductList(list) {
  var table = ``;

  for (var i = 0; i < list.length; i++) {
    table += `
    <tr>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><div class="d-flex justify-content-center"><button onclick ="getproductToUpdate(${i})" class="update btn btn-outline-update rounded-pill"><div class="icon"><i class="fa-solid fa-pen update"></i></div><div class="text">Update</div></button></div></td>
    <td><div class="d-flex justify-content-center"><button class="delete btn btn-outline-danger rounded-pill" onclick="deleteProduct(${i});"><div class="icon"><i class="fa-solid fa-trash-can"></i></div><div class="text">Delete</div></button></div></td>
    </tr>
    `;
  }
  document.getElementById("tBody").innerHTML = table;
}

function deleteProduct(index) {
  productList.splice(index, 1);

  setItemInlocalStorage();

  displayProductList(productList);
}

function search(term) {
  var filterdList = [];
  var termLowerCase = term.toLowerCase();

  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(termLowerCase)) {
      filterdList.push(productList[i]);

      displayProductList(filterdList);
    } else if (productList[i].category.toLowerCase().includes(termLowerCase)) {
      filterdList.push(productList[i]);

      displayProductList(filterdList);
    } else if (productList[i].desc.includes(termLowerCase)) {
      filterdList.push(productList[i]);

      displayProductList(filterdList);
    } else if (productList[i].price.includes(term)) {
      filterdList.push(productList[i]);

      displayProductList(filterdList);
    }
  }
}

function getproductToUpdate(i) {
  addButton.classList.add("d-none");
  updateButton.classList.remove("d-none");
  productNameInput.value = productList[i].name;
  productPriceInput.value = productList[i].price;
  productCategoryInput.value = productList[i].category;
  productDescInput.value = productList[i].desc;
  updatedproduct = i;
}

function setProductToUpdate() {
  addButton.classList.remove("d-none");
  updateButton.classList.add("d-none");
  productList[updatedproduct].name = productNameInput.value;
  productList[updatedproduct].price = productPriceInput.value;
  productList[updatedproduct].category = productCategoryInput.value;
  productList[updatedproduct].desc = productDescInput.value;

  clearInputs();

  setItemInlocalStorage();

  displayProductList(productList);
}

function validInputs() {
  var paternText = /[a-zA-Z0-9]{2,}/;
  var paternNum = /[0-9]{2,}/;

  if (
    paternText.test(productNameInput.value) === true &&
    paternNum.test(productPriceInput.value) === true &&
    paternText.test(productCategoryInput.value) === true
  ) {
    return true;
  } else {
    return false;
  }
}
