import React, { useReducer, createContext } from 'react';
import './App.css';

import Navbar from './Navbar';
import ItemContainer from './components/item/ItemContainer';
import FilterOptions from './components/FilterOptions';
import Cart from './components/cart/Cart';

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
    case 'updateProducts':
      return {
        ...state,
        products: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

const initalState = {
  products: [
    { product_id: 1, name: 't-shirt', size: { s: 5, m:3, l:3 }, colors: ['white', 'black'], price: 10, category: 'shirt', img: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?cs=srgb&dl=man-wearing-white-crew-neck-shirt-and-black-jeans-991509.jpg&fm=jpg'},
    { product_id: 2, name: 'long sleeve', size: { s: 2, m:0, l:3 }, colors: ['white', 'black'], price: 12, category: 'shirt', img: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
    { product_id: 3, name: 'hoodie', size: { s: 0, m:3, l:3 }, colors: ['white', 'black'], price: 25, category: 'jacket', img: 'https://images.pexels.com/photos/634785/pexels-photo-634785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 4, name: 'rain coat', size: { s: 2, m:3, l:3 }, colors: ['red', 'yellow'], price: 28, category: 'jacket', img: 'https://images.unsplash.com/photo-1504616267454-5460d659c9be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
    { product_id: 5, name: 'sweat pants', size: { s: 2, m:0, l:3 }, colors: ['grey', 'black'], price: 15, category: 'pants', img: 'https://images.pexels.com/photos/2280342/pexels-photo-2280342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 6, name: 'blue jeans', size: { s: 2, m:3, l:3 }, colors: ['light', 'dark'], price: 30, category: 'pants', img: 'https://images.pexels.com/photos/52574/pexels-photo-52574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 7, name: 'workout shorts', size: { s: 2, m:3, l:0 }, colors: ['blue', 'black'], price: 12, category: 'shorts', img: 'https://images.unsplash.com/photo-1563479145576-b86933239cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
    { product_id: 8, name: 'casual shorts', size: { s: 2, m:3, l:3 }, colors: ['tan', 'dark grey'], price: 17, category: 'shorts', img: 'https://images.pexels.com/photos/5994/man-shorts-people-trunk.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  ],
  currentProducts: [],
  hasBeenFiltered: false,
  showCart: false,
  size: { size: null, id: null },
  cart: [],
}

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(appReducer, initalState);

  const { size, cart, products } = state;

  const checkSizeOfItem = (itemBeingAdded, numberOfItems, sizeOfItem, isInCart) => {
    if (itemBeingAdded.size[sizeOfItem] === 0) {
      alert(`This item is out of stock`);
      return;
    } else if (itemBeingAdded.size[sizeOfItem] < numberOfItems) {
      alert(`Only added ${itemBeingAdded.size[sizeOfItem]} items. Don't have ${numberOfItems} in stock`);
      numberOfItems = itemBeingAdded.size[sizeOfItem];
    }

    const updatedProducts = products.map(product => {
      if (product.product_id === itemBeingAdded.product_id) {
        product.size[sizeOfItem] -= numberOfItems;
      }
      return product;
    });
    dispatch({ type: 'updateProducts', payload: updatedProducts });

    isInCart ? 
      itemBeingAdded.customerSize = { ...itemBeingAdded.customerSize, [sizeOfItem]: (numberOfItems += parseInt(itemBeingAdded.customerSize[sizeOfItem])) } :
      itemBeingAdded.customerSize = { ...itemBeingAdded.customerSize, [sizeOfItem]: numberOfItems }

    return itemBeingAdded;
  };

  // Add selected item to customers cart
  const addToCart = (item, numberOfItems) => {
    // Check if customer selected the size 
    if (size.size === null || size.id !== item) {
      alert('Please select a size for this item');
      return;
      // Check if customer selected the number of items
    } else if (numberOfItems.id !== null && item !== numberOfItems.id) {
      alert('Please select number of items for the product you would like to add');
      return;
    } else {
      let alreadyInCart = false;
      const currentCart = cart;
      // Get the item to add to the cart
      let itemToAdd = products.find(product => product.product_id === parseInt(item));
      // Check if that item is already in the cart
      currentCart.forEach(cart => {
        if (parseInt(item) === cart.product_id) {
          itemToAdd.customerSize = { ...cart.customerSize };
          alreadyInCart = true;
        }
      });
      // If not in the cart initalize new selected size and quantity object
      if (alreadyInCart === false) {
        itemToAdd.customerSize = { s: 0, m: 0, l: 0 };
      }
    
      // Check what size selected and see if;
      // Item is in stock or
      // Item has the desired amount in stock 
      if (size.size === 's') {
        checkSizeOfItem(itemToAdd, parseInt(numberOfItems.number), 's', alreadyInCart);
      } else if (size.size === 'm') {
        checkSizeOfItem(itemToAdd, parseInt(numberOfItems.number), 'm', alreadyInCart);
      } else if (size.size === 'l') {
        checkSizeOfItem(itemToAdd, parseInt(numberOfItems.number), 'l', alreadyInCart);
      }
      // If item is already in the cart don't add it again
      if (alreadyInCart === true) {
        dispatch({ type: 'setCurrentSize', payload: { size: null, id: null } });
        return;
      }
      
      currentCart.push(itemToAdd);
      dispatch({ type: 'addItemToCart', payload: currentCart });
      dispatch({ type: 'setCurrentSize', payload: { size: null, id: null } });
    }
  };
  
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="App">
          <Navbar />
          <div className="container" style={{ marginTop: '.5rem' }}>
            <div className="row">
              <div className="col-3 container">
                <div className="row">
                  <h1>Filter Search</h1>
                </div>
                <FilterOptions />
              </div>
              <div className="col-9">
                <Cart />
                <ItemContainer
                  addToCart={addToCart}
                />
              </div>
            </div>
          </div>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
