export default function rootReducer(state, { type, payload }) {
  switch (type) {

    case 'addItemToCart':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id !== payload.product.id
            ? product
            : {
                ...product,
                size: {
                  ...payload.product.size,
                  [payload.size]: payload.product.size[payload.size] - payload.quantity
                }
              }
        ),
        cart: [
          ...state.cart,
          {
            ...payload.product,
            customerSize: {
              ...payload.product.customerSize,
              [payload.size]: payload.quantity
            }
          }
        ]
      };
    case 'orderComplete':
      return {
        ...state,
        cart: []
      }
    case 'filtered': {
      const nextState = {
        ...state,
        currentProducts: payload,
        hasBeenFiltered: true,
      }
      return nextState;
    }
    case 'clearFilter':
      return {
        ...state,
        currentProducts: [],
        hasBeenFiltered: false,
        filter: {
          search: '',
          price: 30,
          sizeSm: false,
          sizeMd: false,
          sizeLg: false,
          men: true,
          women: true,
        }
      }
    case 'setFilter':
      return {
        ...state,
        filter: {
          ...state.filter,
          [payload.name]: payload.value
        }
      }
    case 'women':
      return {
        ...state,
        currentProducts: state.products.filter(product => product.fit.includes('women')),
        hasBeenFiltered: true,
        filter: {
          search: '',
          price: 30,
          sizeSm: false,
          sizeMd: false,
          sizeLg: false,
          women: true,
          men: false,
        }
      }
    case 'men':
      return {
        ...state,
        currentProducts: state.products.filter(product => product.fit.includes('men')),
        hasBeenFiltered: true,
        filter: {
          search: '',
          price: 30,
          sizeSm: false,
          sizeMd: false,
          sizeLg: false,
          men: true,
          women: false
        }
      }
    case 'toggleCart':
      return {
        ...state,
        showCart: !state.showCart
      }
    case 'setCurrentSize':
      return {
        ...state,
        size: payload
      }
    case 'removeItemFromCart':
      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem.id !== payload.item.id),
        products: payload.cart
      }
    case 'setWishList':
      return {
        ...state,
        wishList: payload
      }
    case 'addItemToWishList': 
      return {
        ...state,
        wishList: payload
      }
    case 'removeItemFromWishList':
      return {
        ...state,
        wishList: payload
      }
    case 'updateProducts':
      return {
        ...state,
        products: payload
      }
    case 'setCheckoutStep':
      return {
        ...state,
        checkout: payload
      }
    default:
      return state;
  }
}
