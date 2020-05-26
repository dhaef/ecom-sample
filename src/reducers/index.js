export default function rootReducer(state, action) {
  switch (action.type) {

    case 'addItemToCart':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id !== action.payload.product.id
            ? product
            : {
                ...product,
                size: {
                  ...action.payload.product.size,
                  [action.payload.size]: action.payload.product.size[action.payload.size] - action.payload.quantity
                }
              }
        ),
        cart: [
          ...state.cart,
          {
            ...action.payload.product,
            customerSize: {
              ...action.payload.product.customerSize,
              [action.payload.size]: action.payload.quantity
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
        currentProducts: action.payload,
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
          [action.payload.name]: action.payload.value
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
        size: action.payload
      }
    case 'removeItemFromCart':
      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem.id !== action.payload.item.id),
        products: action.payload.cart
      }
    case 'setWishList':
      return {
        ...state,
        wishList: action.payload
      }
    case 'addItemToWishList': 
      return {
        ...state,
        wishList: action.payload
      }
    case 'removeItemFromWishList':
      return {
        ...state,
        wishList: action.payload
      }
    case 'updateProducts':
      return {
        ...state,
        products: action.payload
      }
    case 'setCheckoutStep':
      return {
        ...state,
        checkout: action.payload
      }
    default:
      return state;
  }
}
