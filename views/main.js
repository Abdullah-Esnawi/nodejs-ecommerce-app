// get Products
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const seemoreButton = document.getElementById("seemore-button");
document.addEventListener("DOMContentLoaded", getProducts);
document.getElementById("login-form").addEventListener("submit", loginUser);

searchButton.addEventListener("click", handleSearch);
const productsImages = [
    "./photos/photo_1.jpg",
    "./photos/photo_2.jpg",
    "./photos/photo_3.jpg",
    "./photos/photo_4.jpg",
    "./photos/photo_5.jpg",
    "./photos/photo_6.jpg",
    "./photos/photo_7.jpg",
    "./photos/photo_8.jpg",
    "./photos/photo_9.jpg",
    "./photos/photo_10.jpg",
    "./photos/photo_11.jpg",
    "./photos/photo_12.jpg",
    "./photos/photo_13.jpg",
    "./photos/photo_14.jpg",
    "./photos/photo_15.jpg",
    "./photos/photo_16.jpg",
    "./photos/photo_17.jpg",
    "./photos/photo_18.jpg",
    "./photos/photo_19.jpg",
    "./photos/photo_20.jpg",
  ];
  
function getProducts() {
  fetch("http://localhost:3000/api/v1/products")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      let jsonData;
      try {
        jsonData = JSON.parse(data);
        console.log(jsonData);
      } catch (error) {
        console.error("Error while parsing JSON:", error);
        return;
      }

      const productList = document.getElementById("product-list");
      //   jsonData["data"].
      //   forEach((product) => {
      //     if (product.imageCover.startsWith("undefined/products/")) {
      //       product.imageCover = product.imageCover.substring(19);
      //     }
      //     const productCard = createProductCard(product);
      //     productCard.imageCover = productsImages[]
      //     productList.appendChild(productCard);
      //   });

      for (let i = 0; i < jsonData["data"].length; i++) {
        let product = jsonData.data[i];
        console.log(`product: ${product.name}`);

          product.imageCover = `./photos/photo_${i+1}.jpg`

        const productCard = createProductCard(product);
        productList.appendChild(productCard);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const image = document.createElement("img");
  image.src = product.imageCover;
  image.alt = product.name;
  card.appendChild(image);

  const name = document.createElement("div");
  name.classList.add("name");
  name.textContent = product.name;
  card.appendChild(name);

  const price = document.createElement("div");
  price.classList.add("price");
  price.textContent = "$" + product.price.toFixed(2);
  card.appendChild(price);

  const button = document.createElement("a");
  button.classList.add("seemore-button");
  button.href = "./product_details.html";
  button.textContent = "See more";
  card.appendChild(button);

  return card;
}

function getCategories() {
  fetch("/api/categories")
    .then((response) => response.json())
    .then((data) => {
      // Process the returned data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

// function loginUser(email, password) {
//   fetch("/api/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Process the returned data
//       console.log(data);
//     })
//     .catch((error) => {
//       // Handle any errors
//       console.error(error);
//     });
// }

// Function to handle search request
async function handleSearch() {
  const query = searchInput.value.trim();

  if (query !== "") {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/products?keyword=${query}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //   body: JSON.stringify({ query: query }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Process the data returned from the backend
        console.log(data);
      } else {
        // Handle error response from the backend
        console.error("Search request failed:", response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error occurred during search request:", error);
    }
  } else {
    alert("Please enter a search query");
  }
}

// Add event listener to the search button

////////////////////////////////////////////////////////////////////////

function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Send email and password to the server for authentication
  authenticateUser(email, password);
}

function authenticateUser(email, password) {
  // Make a request to your server to authenticate the user
  fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        // User authenticated successfully, redirect or perform desired actions
        window.location.replace("./index.html");

        console.log("User authenticated successfully!");
      } else {
        // Authentication failed, handle the error
        console.log("Authentication failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

