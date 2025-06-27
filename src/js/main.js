import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { qs } from "./utils.mjs";

const listElement = qs(".product-list");
const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, listElement)
productList.init()
