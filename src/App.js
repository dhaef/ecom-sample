import React, { useReducer, createContext } from 'react';
import './App.css';

import Navbar from './layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { products } from './products';
import Home from './layout/Home';
import Men from './layout/Men';
import Women from './layout/Women';
import Checkout from './layout/Checkout';
import WishList from './layout/WishList';

const appReducer = (state, action) => {
  switch (action.type) {
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
    case 'addItemToWishList': 
      return {
        ...state,
        wishList: action.payload
      }
    case 'removeItemFromWishList':
      return {
        ...state,
        wishList: state.wishList.filter(wishListItem => wishListItem.product_id !== action.payload)
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
}

const initalState = {
  products: products,
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
}

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(appReducer, initalState);
  
  return (
    <Router>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path={'/'} component={Home}></Route>
              <Route exact path={'/men'} component={Men}></Route>
              <Route exact path={'/women'} component={Women}></Route>
              <Route exact path={'/checkout'} component={Checkout}></Route>
              <Route exact path={'/wish-list'} component={WishList}></Route>
            </Switch>
          </div>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </Router>
  );
}

export default App;
