import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Cart, CartImplementation } from "./cart";
import { Product } from "../product/product";

describe("Cart Store", () => {
  const cart: Cart = { open: false, products: [] };

  beforeEach(() => {
    CartImplementation.reset(cart);
  });

  it("should return open equals false on initial state", () => {
    expect(cart.open).toBe(false);
  });

  it("should return an empty array for products on initial state", () => {
    expect(Array.isArray(cart.products)).toBe(true);
    expect(cart.products).toHaveLength(0);
  });

  it("should toggle open state", () => {
    expect(cart.open).toBe(false);
    expect(cart.products).toHaveLength(0);

    CartImplementation.toggleOpen(cart);
    expect(cart.open).toBe(true);

    CartImplementation.toggleOpen(cart);
    expect(cart.open).toBe(false);
    expect(cart.products).toHaveLength(0);
  });

  it("should add product to products list", () => {
    const products: Product[] = [
      {
        id: "1",
        title: "testtitle1",
        price: 1990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
      {
        id: "2",
        title: "testtitle2",
        price: 2990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
    ];

    products.forEach((product) => {
      CartImplementation.addProductToCart(cart, product);
    });

    expect(cart.products).toHaveLength(2);
  });

  it("should assign 1 as initial quantity on product add()", () => {
    const product: Product = {
      id: "1",
      title: "testtitle1",
      price: 1990,
      discount: 0,
      quantity: 1,
      img: { url: "url", alt: "alt" },
    };

    CartImplementation.addProductToCart(cart, product);

    expect(cart.products[0]?.quantity).toBe(1);
  });

  it("should not be able to add the same product twice", () => {
    const product: Product = {
      id: "1",
      title: "testtitle1",
      price: 1990,
      discount: 0,
      quantity: 1,
      img: { url: "url", alt: "alt" },
    };

    CartImplementation.addProductToCart(cart, product);
    CartImplementation.addProductToCart(cart, product);

    expect(cart.products).toHaveLength(1);
  });

  it("should increase product quantity", () => {
    const product: Product = {
      id: "1",
      title: "testtitle1",
      price: 1990,
      discount: 0,
      quantity: 1,
      img: { url: "url", alt: "alt" },
    };

    CartImplementation.addProductToCart(cart, product);
    CartImplementation.incrementProductQuantity(cart, product);

    expect(cart.products[0]?.quantity).toBe(2);
  });

  it("should not increase product quantity if product is not found", () => {
    const products: Product[] = [
      {
        id: "1",
        title: "testtitle1",
        price: 1990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
      {
        id: "2",
        title: "testtitle2",
        price: 2990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
    ];

    CartImplementation.addProductToCart(cart, products[0]);
    CartImplementation.incrementProductQuantity(cart, products[1]);

    expect(cart.products).toHaveLength(1);
    expect(cart.products[0]?.quantity).toBe(1);
    expect(cart.products[1]).toBe(undefined);
    expect(cart.products[1]?.quantity).toBe(undefined);
  });

  it("should decrease product quantity", () => {
    const product: Product = {
      id: "1",
      title: "testtitle1",
      price: 1990,
      discount: 0,
      quantity: 1,
      img: { url: "url", alt: "alt" },
    };

    CartImplementation.addProductToCart(cart, product);
    CartImplementation.incrementProductQuantity(cart, product);
    CartImplementation.decrementProductQuantity(cart, product);

    expect(cart.products[0]?.quantity).toBe(1);
  });

  it("should not decrease product quantity below 1", () => {
    const product: Product = {
      id: "1",
      title: "testtitle1",
      price: 1990,
      discount: 0,
      quantity: 1,
      img: { url: "url", alt: "alt" },
    };

    CartImplementation.addProductToCart(cart, product);
    CartImplementation.decrementProductQuantity(cart, product);
    CartImplementation.decrementProductQuantity(cart, product);

    expect(cart.products[0]?.quantity).toBe(1);
  });

  it("should not decrease product quantity if product is not found", () => {
    const products: Product[] = [
      {
        id: "1",
        title: "testtitle1",
        price: 1990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
      {
        id: "2",
        title: "testtitle2",
        price: 2990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
    ];

    CartImplementation.addProductToCart(cart, products[0]);
    CartImplementation.incrementProductQuantity(cart, products[0]);
    CartImplementation.decrementProductQuantity(cart, products[1]);

    expect(cart.products[0]?.quantity).toBe(2);
    expect(cart.products[1]).toBe(undefined);
  });

  it("should remove a product from the store", () => {
    const products: Product[] = [
      {
        id: "1",
        title: "testtitle1",
        price: 1990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
      {
        id: "2",
        title: "testtitle2",
        price: 2990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
      {
        id: "3",
        title: "testtitle3",
        price: 3990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
    ];

    products.forEach((product) => {
      CartImplementation.addProductToCart(cart, product);
    });

    expect(cart.products).toHaveLength(3);

    CartImplementation.removeProductFromCart(cart, products[2]);

    expect(cart.products).toHaveLength(2);
    expect(cart.products.includes(products[2])).toBeFalsy();
  });

  it("should not change products from store if provided product doesn't exists", () => {
    const products: Product[] = [
      {
        id: "1",
        title: "testtitle1",
        price: 1990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
      {
        id: "2",
        title: "testtitle2",
        price: 2990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
    ];

    CartImplementation.addProductToCart(cart, products[0]);
    CartImplementation.addProductToCart(cart, products[1]);

    expect(cart.products).toHaveLength(2);

    CartImplementation.removeProductFromCart(cart, products[2]);

    expect(cart.products).toHaveLength(2);
  });

  it("should remove all products from the store", () => {
    const products: Product[] = [
      {
        id: "1",
        title: "testtitle1",
        price: 1990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
      {
        id: "2",
        title: "testtitle2",
        price: 2990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
      {
        id: "3",
        title: "testtitle3",
        price: 3990,
        discount: 0,
        quantity: 1,
        img: { url: "url", alt: "alt" },
      },
    ];

    products.forEach((product) => {
      CartImplementation.addProductToCart(cart, product);
    });

    expect(cart.products).toHaveLength(3);

    CartImplementation.removeAll(cart);

    expect(Array.isArray(cart.products)).toBe(true);
    expect(cart.products).toHaveLength(0);
  });
});
