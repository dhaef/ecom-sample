import React, { useState } from 'react';
import './App.css';

import Navbar from './Navbar';
import ItemContainer from './ItemContainer';
import FilterOptions from './FilterOptions';
import Cart from './Cart';

function App() {
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
  const [currentProducts, setCurrentProducts] = useState([]);
  const [hasBeenFiltered, setHasBeenFiltered] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [size, setSize] = useState({ size: null, id: null });

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

  const clearFilter = () => {
    setCurrentProducts([]);
    setHasBeenFiltered(false);
  };

  const addToCart = (item, numberOfItems) => {
    if (size.size === null || size.id !== item) {
      alert('Please select a size for this item');
      return;
    } else if (numberOfItems.id !== null && item !== numberOfItems.id) {
      alert('Please select number of items for the product you would like to add');
      return;
    } else {
      const currentCart = cart;
      const itemToAdd = products.find(product => product.product_id === parseInt(item));
      itemToAdd.customerSize = size.size;
      itemToAdd.totalNumberOfItems = numberOfItems.number;
      currentCart.push(itemToAdd);
      setCart(currentCart);
      setSize({ size: null, id: null });
    }
  };

  const removeFromCart = itemId => {
    const item = cart.find(product => product.product_id === parseInt(itemId));
    const updatedCart = cart.filter(cartItem => cartItem.product_id !== item.product_id);
    setCart(updatedCart);
  };

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const setCurrentSize = (currentSize, id) => {
    setSize({ size: currentSize , id: id });
  };

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
