import { Result } from "../../utils/result";
import { Product } from "../product/product";
import { ICart } from "./Icart";

export type Cart = {
  open: boolean;
  products: Product[];
};

export const CartImplementation: ICart = {
  toggleOpen(cart) {
    cart.open = !cart.open;
    return Result.ok(cart);
  },

  addProductToCart(cart, product) {
    const productExists = cart.products.find(({ id }) => id === product.id);

    if (productExists)
      return Result.fail(`Product id [${product.id}] already exists!`);

    cart.products.push(product);
    return Result.ok(cart);
  },

  incrementProductQuantity(cart, product) {
    const productExists = cart.products.find(({ id }) => id === product.id);

    if (!productExists)
      return Result.fail(`Product id [${product.id}] does not exists!`);

    productExists.quantity++;

    return Result.ok(cart);
  },

  decrementProductQuantity(cart, product) {
    const productExists = cart.products.find(({ id }) => id === product.id);

    if (!productExists)
      return Result.fail(`Product id [${product.id}] does not exists!`);

    if (productExists.quantity <= 1)
      return Result.fail(`Cannot decrement product quantity below 1!`);

    productExists.quantity--;
    return Result.ok(cart);
  },

  removeAll(cart) {
    cart.products = [];
    return Result.ok(cart);
  },

  removeProductFromCart(cart, product) {
    const productExists = cart.products.find(({ id }) => id === product.id);

    if (!productExists)
      return Result.fail(`Product id [${product.id}] does not exists!`);

    const products = cart.products.filter(({ id }) => id !== product.id);

    cart.products = products;

    return Result.ok(cart);
  },

  reset(cart) {
    cart.open = false;
    cart.products = [];
    return Result.ok(cart);
  },
};
