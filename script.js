let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");

let mode = "create";
let tmp;
let searchMode = "byTitle";
let searchBtn = document.getElementById("search");

// get total

function getTotal() {
  if (price.value != "" && tax.value != "" && ads.value != "") {
    let result = +price.value + +tax.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

//create a product

let dataProducts;
if (localStorage.getItem("Products") != null) {
  dataProducts = JSON.parse(localStorage.getItem("Products"));
} else {
  dataProducts = [];
}

function createProducts() {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // count
  if(newProduct.title != '' && newProduct.total != '' && newProduct.category != '' && count.value < 200) {

      if (mode === "create") {
        if (newProduct.count > 1) {
          for (let i = 0; i < newProduct.count; i++) {
            dataProducts.push(newProduct);
          }
        } else {
          dataProducts.push(newProduct);
        }
      } else {
        dataProducts[tmp] = newProduct;
        mode = "create";
        create.innerHTML = "Create";
        count.style.display = 'inline-block';
        count.nextElementSibling.style.display = "inline-block"; // يخفي أول <br>
        count.nextElementSibling.nextElementSibling.style.display = "inline-block"; // يخفي الثاني
      }
      //save data in local storage
      localStorage.setItem("Products", JSON.stringify(dataProducts));
      clearData();
      displayData();
      getTotal();
  }

}

// clear inputs once created

function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = '';
}

// read
// array => [1 , 2 , 3, 4, 5, 6]
function displayData() {
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    table += `
        <tr>
              <td>${i + 1}</td>
              <td>${dataProducts[i].title}</td>
              <td>${dataProducts[i].price}</td>
              <td>${dataProducts[i].tax}</td>
              <td>${dataProducts[i].ads}</td>
              <td>${dataProducts[i].discount}</td>
              <td>${dataProducts[i].total}</td>
              <td>${dataProducts[i].category}</td>
              <td><button onclick = "updateProduct(${i})" id="update">update</button></td>
              <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;

  let deleteAllBtn = document.getElementById("deleteAll");
  if (dataProducts.length > 0) {
    deleteAllBtn.innerHTML = `<button onclick = "deleteAll()">Delete All (${dataProducts.length})</button>`;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}

displayData();

// delete

function deleteData(i) {
  dataProducts.splice(i, 1);
  localStorage.setItem("Products", JSON.stringify(dataProducts));
  displayData();
}

// delete all button

function deleteAll() {
  dataProducts.splice(0);
  localStorage.clear();
  displayData();
}

// update

function updateProduct(x) {
  title.value = dataProducts[x].title;
  price.value = dataProducts[x].price;
  tax.value = dataProducts[x].tax;
  ads.value = dataProducts[x].ads;
  discount.value = dataProducts[x].discount;
  category.value = dataProducts[x].category;
  getTotal();
    count.style.display = "none";
    count.nextElementSibling.style.display = "none"; // يخفي أول <br>
    count.nextElementSibling.nextElementSibling.style.display = "none"; // يخفي الثاني
  tmp = x;
  create.innerHTML = "Update";
  mode = "update";
  create.onclick = () => {
    createProducts();
  };
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search

function getSearchMode(id) {
  if (id === "byTitle") {
    searchBtn.placeholder = "Search By Title";
  } else {
    searchBtn.placeholder = "Search By Category";
    searchMode = "byCategory";
  }
  searchBtn.focus();
  searchBtn.value = "";
  displayData();
}

function search(value) {
  let countData = 0;
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    if (searchMode === "byTitle") {
      if (dataProducts[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].tax}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick = "updateProduct(${i})" id="update">update</button></td>
                <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
            </tr>`;
        countData += 1;
      }
    } else {
      if (dataProducts[i].category.includes(value.toLowerCase())) {
        table += `
             <tr>
                 <td>${i + 1}</td>
                 <td>${dataProducts[i].title}</td>
                 <td>${dataProducts[i].price}</td>
                 <td>${dataProducts[i].tax}</td>
                 <td>${dataProducts[i].ads}</td>
                 <td>${dataProducts[i].discount}</td>
                 <td>${dataProducts[i].total}</td>
                 <td>${dataProducts[i].category}</td>
                 <td><button onclick = "updateProduct(${i})" id="update">update</button></td>
                 <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
             </tr>`;
        countData += 1;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;

}




