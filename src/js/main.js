import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { qs, backPackNumber, loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert";

loadHeaderFooter();

const listElement = qs(".product-list");
const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

const htmlElement = qs("main");
const alertDataSource = new ProductData("alerts");
const alert = new Alert(alertDataSource, htmlElement);
alert.init();

