import { getLocalStorage, qs } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  calculateTotal(cartItems)
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateTotal(cartItems){
  const htmlTotal = qs(".cart-footer-hide")
  let total = 0;
  cartItems.forEach(element => {
    total += element.FinalPrice;
  });
  if (cartItems.length > 0){
  htmlTotal.style.display= "block";
  htmlTotal.innerHTML = `<p class="cart-total">Total: $ ${total.toFixed(2)} </p>`;
  }
}

renderCartContents();
