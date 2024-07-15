import { UniqueID } from "./../shared";

export type Product = {
  id: UniqueID;
  title: string;
  price: number;
  discount: number;
  quantity: number;
  img: {
    url: string;
    alt: string;
  };
};
