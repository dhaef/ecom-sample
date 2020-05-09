import React, { useState } from 'react';
import './App.css';

import Navbar from './Navbar';
import ItemContainer from './components/item/ItemContainer';
import FilterOptions from './components/FilterOptions';
import Cart from './components/cart/Cart';

function App() {
  // Set test products
  const [products, setProducts] = useState([
    { product_id: 1, name: 't-shirt', size: { s: 2, m:3, l:3 }, colors: ['white', 'black'], price: 10, category: 'shirt', img: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?cs=srgb&dl=man-wearing-white-crew-neck-shirt-and-black-jeans-991509.jpg&fm=jpg'},
    { product_id: 2, name: 'long sleeve', size: { s: 2, m:0, l:3 }, colors: ['white', 'black'], price: 12, category: 'shirt', img: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
    { product_id: 3, name: 'hoodie', size: { s: 0, m:3, l:3 }, colors: ['white', 'black'], price: 25, category: 'jacket', img: 'https://images.pexels.com/photos/634785/pexels-photo-634785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 4, name: 'rain coat', size: { s: 2, m:3, l:3 }, colors: ['red', 'yellow'], price: 28, category: 'jacket', img: 'https://images.unsplash.com/photo-1504616267454-5460d659c9be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
    { product_id: 5, name: 'sweat pants', size: { s: 2, m:0, l:3 }, colors: ['grey', 'black'], price: 15, category: 'pants', img: 'https://images.pexels.com/photos/2280342/pexels-photo-2280342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 6, name: 'blue jeans', size: { s: 2, m:3, l:3 }, colors: ['light', 'dark'], price: 30, category: 'pants', img: 'https://images.pexels.com/photos/52574/pexels-photo-52574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 7, name: 'workout shorts', size: { s: 2, m:3, l:0 }, colors: ['blue', 'black'], price: 12, category: 'shorts', img: 'https://images.unsplash.com/photo-1563479145576-b86933239cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
    { product_id: 8, name: 'casual shorts', size: { s: 2, m:3, l:3 }, colors: ['tan', 'dark grey'], price: 17, category: 'shorts', img: 'https://images.pexels.com/photos/5994/man-shorts-people-trunk.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  ]);
  // Store currently filtered items
  const [currentProducts, setCurrentProducts] = useState([]);
  // Store if products has been filtered at all
  const [hasBeenFiltered, setHasBeenFiltered] = useState(false);
  // Store items in customers cart
  const [cart, setCart] = useState([]);
  // Store if customer is checking their cart
  const [showCart, setShowCart] = useState(false);
  // Store current size selected and on what item
  const [size, setSize] = useState({ size: null, id: null });

  // Filter products to what the customer would like to see
  const handleFilterSubmit = (options) => {
    let filtered = products.slice();
    
    if (options.search) {
      const search = options.search.toLowerCase();
      filtered = filtered.filter(product => {
        if (product.name.includes(search) || product.category.includes(search)) {
          return product;
        }
      });
    };

    if (options.price !== 30) {
      filtered = filtered.filter(product => product.price < options.price);
    };

    if (options.sizeSm === "on") {
      filtered = filtered.filter(product => product.size.s > 0);
    };

    if (options.sizeMd === "on") {
      filtered = filtered.filter(product => product.size.m > 0);
    };

    if (options.sizeLg === "on") {
      filtered = filtered.filter(product => product.size.l > 0);
    };

    setHasBeenFiltered(true);
    setCurrentProducts(filtered);
  };

  // Clear current filtered products
  const clearFilter = () => {
    setCurrentProducts([]);
    setHasBeenFiltered(false);
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
      const itemToAdd = products.find(product => product.product_id === parseInt(item));
      // Check if that item is already in the cart
      currentCart.map(cart => {
        if (parseInt(item) === cart.product_id) {
          itemToAdd.customerSize = { ...cart.customerSize };
          alreadyInCart = true;
        }
      });
      // If not in the cart initalize new selected size and quantity object
      if (alreadyInCart === false) {
        itemToAdd.customerSize = { s: 0, m: 0, l: 0 };
      }
      let number = numberOfItems.number;
      // Check what size selected and see if;
      // Item is in stock or
      // Item has the desired amount in stock 
      if (size.size === 's') {
        if (itemToAdd.size.s === 0) {
          alert(`This item is out of stock`);
          return;
          // If in stock is less than selected amount set amount to amount in stock
        } else if (itemToAdd.size.s < numberOfItems.number) {
          alert(`Only added ${itemToAdd.size.s} items. Don't have ${numberOfItems.number} in stock`);
          number = itemToAdd.size.s;
        }
        // Lower the amount in stock 
        setProducts(products.map(product => {
          if (product.product_id === itemToAdd.product_id) {
            product.size.s -= number;
          }
          return product;
        }));
        // Set number of small items
        itemToAdd.customerSize = { ...itemToAdd.customerSize, s: number };
      } else if (size.size === 'm') {
        if (itemToAdd.size.m === 0) {
          alert(`This item is out of stock`);
          return;
          // If in stock is less than selected amount set amount to amount in stock
        } else if (itemToAdd.size.m < numberOfItems.number) {
          alert(`Only added ${itemToAdd.size.m} items. Don't have ${numberOfItems.number} in stock`);
          number = itemToAdd.size.m;
        }
        // Lower the amount in stock 
        setProducts(products.map(product => {
          if (product.product_id === itemToAdd.product_id) {
            product.size.m -= number;
          }
          return product;
        }));
        // Set number of medium items
        itemToAdd.customerSize = { ...itemToAdd.customerSize, m: number };
      } else if (size.size === 'l') {
        if (itemToAdd.size.l === 0) {
          alert(`This item is out of stock`);
          return;
          // If in stock is less than selected amount set amount to amount in stock
        } else if (itemToAdd.size.l < numberOfItems.number) {
          alert(`Only added ${itemToAdd.size.l} items. Don't have ${numberOfItems.number} in stock`);
          number = itemToAdd.size.l;
        }
        // Lower the amount in stock 
        setProducts(products.map(product => {
          if (product.product_id === itemToAdd.product_id) {
            product.size.l -= number;
          }
          return product;
        }));
        // Set number of large items
        itemToAdd.customerSize = { ...itemToAdd.customerSize, l: number };
      }
      // If item is already in the cart don't add it again
      if (alreadyInCart === true) {
        setSize({ size: null, id: null });
        return;
      }
      // Add new item to the cart
      itemToAdd.totalNumberOfItems = number;
      currentCart.push(itemToAdd);
      setCart(currentCart);
      setSize({ size: null, id: null });
    }
  };

  // Remove item from the cart
  const removeFromCart = itemId => {
    const item = cart.find(product => product.product_id === parseInt(itemId));
    const updatedCart = cart.filter(cartItem => cartItem.product_id !== item.product_id);
    setCart(updatedCart);
  };

  // show an hide cart window
  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  // Set current size and which item it's set on
  const setCurrentSize = (currentSize, id) => {
    setSize({ size: currentSize , id: id });
  };

  // Decide which set of products to pass and show
  let productsToDisplay;
  if (hasBeenFiltered === true) {
    productsToDisplay = currentProducts;
  } else if (hasBeenFiltered === false) {
    productsToDisplay = products;
  }

  return (
    <div className="App">
      <Navbar cart={cart} handleShow={handleShowCart} />
      <div className="container" style={{ marginTop: '.5rem' }}>
        <div className="row">
          <div className="col-3 container">
            <div className="row">
              <h1>Filter Search</h1>
            </div>
            <FilterOptions handleFilterSubmit={handleFilterSubmit} clearFilter={clearFilter} />
          </div>
          <div className="col-9">
            <Cart show={showCart} handleClose={handleCloseCart} removeFromCart={removeFromCart} cart={cart} />
            <ItemContainer 
              products={productsToDisplay} 
              hasBeenFiltered={hasBeenFiltered} 
              addToCart={addToCart} 
              setCurrentSize={setCurrentSize} 
              size={size}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
