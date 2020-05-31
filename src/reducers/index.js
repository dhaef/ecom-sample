export default function rootReducer(state, { type, payload }) {
  switch (type) {
    case 'addItemToCart':
      return {
        ...state,
        products: state.products.map(product =>
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
        cart: !payload.currentlyInCart ? [
          ...state.cart,
          {
            ...payload.product,
            customerSize: {
              ...payload.product.customerSize,
              [payload.size]: payload.quantity
            }
          }
        ] : state.cart.map(product => product.id !== payload.product.id
          ? product
          : {
            ...payload.product,
            customerSize: {
              ...product.customerSize,
              [payload.size]: payload.product.customerSize[payload.size] += payload.quantity
            }
          }
        )
      }
    case 'orderComplete':
      return {
        ...state,
        cart: [],
        checkout: 1,
      }
    case 'filtered':
      return {
        ...state,
        currentProducts: payload,
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
          [payload.name]: payload.value
        }
      }
    case 'setPay':
      return {
        ...state,
        pay: {
          ...state.pay,
          [payload.name]: payload.value
        }
      }
    case 'setShipping':
      return {
        ...state,
        shipping: {
          ...state.shipping,
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
        cart: state.cart.filter(cartItem => cartItem.id !== payload.id),
        products: state.products.map(product => product.id !== payload.id
          ? product
          : {
            ...product,
            size: {
              s: product.size.s += payload.customerSize.s,
              m: product.size.m += payload.customerSize.m,
              l: product.size.l += payload.customerSize.l,
            }
          })
      }
    case 'setWishList':
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
    case 'hideFilter':
      return {
        ...state,
        hideFilter: true,
      }
    case 'showFilter':
      return {
        ...state,
        hideFilter: false,
      }
    case 'showWishList':
      return {
        ...state,
        showWishList: payload
      }
    default:
      return {
        ...state
      }
  }
};