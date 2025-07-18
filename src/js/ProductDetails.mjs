import { getLocalStorage, setLocalStorage, backPackNumber } from "./utils.mjs";
export default class ProductDetails{
    constructor(productId, dataSource){
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }
    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId)
        // the product details are needed before rendering the HTML
        this.renderProductDetails(this.product)
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
      
        document.getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
}
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product)
        setLocalStorage("so-cart", cartItems);
        backPackNumber()
    }

    renderProductDetails(product){
      productDetailsTemplate(product);
    }
}

function productDetailsTemplate(product){
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productDiscount').textContent = `Discount: ${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}`;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
} 

