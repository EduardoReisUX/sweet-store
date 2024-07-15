import { Result } from "../../utils/result";
import { Product } from "../product/product";
import { Cart } from "./cart";

export interface ICart {
  toggleOpen: (cart: Cart) => Result<Cart>;
  addProductToCart: (cart: Cart, product: Product) => Result<Cart>;
  incrementProductQuantity: (cart: Cart, product: Product) => Result<Cart>;
  decrementProductQuantity: (cart: Cart, product: Product) => Result<Cart>;
  removeProductFromCart: (cart: Cart, product: Product) => Result<Cart>;
  removeAll: (cart: Cart) => Result<Cart>;
  reset: (cart: Cart) => Result<Cart>;
}
