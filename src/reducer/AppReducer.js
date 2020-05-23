
export const appReducer = (state, action) => {
    switch (action.type) {
      case 'orderComplete':
        return {
          ...state,
          cart: []
        }
      case 'filtered':
        return {
          ...state,
          currentProducts: action.payload,
          hasBeenFiltered: true,
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
      case 'addItemToCart':
        return {
          ...state,
          cart: action.payload
        }
      case 'removeItemFromCart':
        return {
          ...state,
          cart: state.cart.filter(cartItem => cartItem.product_id !== action.payload.item.product_id),
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
        return {
          ...state
        }
    }
  };