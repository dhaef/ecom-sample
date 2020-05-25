import { products } from 'products';

export default {
  products,
  currentProducts: [],
  hasBeenFiltered: false,
  showCart: false,
  size: { size: null, id: null },
  cart: [],
  filter: {
    search: '',
    price: 30,
    sizeSm: false,
    sizeMd: false,
    sizeLg: false,
    men: true,
    women: true,
  },
  checkout: 1,
  wishList: [],
};
