import { getLocalStorage, qs, setLocalStorage, backPackNumber} from "./utils.mjs"

export default class ShoopingCart{
    constructor(cartItemsSource, htmlElement){
        this.cartItems = getLocalStorage(cartItemsSource) || [];
        this.htmlElement = qs(htmlElement)
    }

    init(){
        console.log(this.cartItems)
        console.log(this.htmlElement)
        this.renderCartContents()
    }

    renderCartContents() {
        const htmlItems = this.cartItems.map((item) => cartItemTemplate(item));
        this.htmlElement.innerHTML = htmlItems.join("");
        this.deleteItem(this.cartItems);
        this.calculateTotal(this.cartItems);
}
calculateTotal(cartItems) {
  const htmlTotal = qs(".cart-footer-hide");
  let total = 0;
  cartItems.forEach((element) => {
    total += element.FinalPrice;
  });
  if (cartItems.length > 0) {
    htmlTotal.style.display = "block";
    htmlTotal.innerHTML = `<p class="cart-total">Total: $ ${total.toFixed(2)} </p>`;
  }
  else{
    htmlTotal.style.display = "none";
  }
}

deleteItem(cartItems) {
  cartItems.forEach((item) => {
    document.getElementById(`${item.Id}`).addEventListener("click", () => {
      let newCartItems = cartItems.filter((element) => element.Id != item.Id);
      setLocalStorage("so-cart", newCartItems);
      this.cartItems = getLocalStorage("so-cart") || [];
      this.renderCartContents();
      backPackNumber()
    });
  });
}    
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
  <p class="cart-card__quantity">qty: 1 <span class="deleteItem" id="${item.Id}"> &#10060;</span></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

