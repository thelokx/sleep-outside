import ShoopingCart from "./ShoppingCart.mjs";
import { getLocalStorage, setLocalStorage, qs, backPackNumber, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const shoopingCart = new ShoopingCart("so-cart", ".product-list")
shoopingCart.init()
