import React, { useState } from 'react';
import './App.css';

import Navbar from './Navbar';
import ItemContainer from './ItemContainer';
import FilterOptions from './FilterOptions';

function App() {
  const [products, setProducts] = useState([
    { product_id: 1, name: 't-shirt', colors: ['white', 'black'], price: 10, category: 'shirt', img: 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?cs=srgb&dl=man-wearing-white-crew-neck-shirt-and-black-jeans-991509.jpg&fm=jpg'},
    { product_id: 2, name: 'long sleeve', colors: ['white', 'black'], price: 12, category: 'shirt', img: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
    { product_id: 3, name: 'hoodie', colors: ['white', 'black'], price: 25, category: 'jacket', img: 'https://images.pexels.com/photos/634785/pexels-photo-634785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 4, name: 'rain coat', colors: ['red', 'yellow'], price: 28, category: 'jacket', img: 'https://images.unsplash.com/photo-1504616267454-5460d659c9be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80' },
    { product_id: 5, name: 'sweat pants', colors: ['grey', 'black'], price: 15, category: 'pants', img: 'https://images.pexels.com/photos/2280342/pexels-photo-2280342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 6, name: 'blue jeans', colors: ['light', 'dark'], price: 30, category: 'pants', img: 'https://images.pexels.com/photos/52574/pexels-photo-52574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
    { product_id: 7, name: 'workout shorts', colors: ['blue', 'black'], price: 12, category: 'shorts', img: 'https://images.unsplash.com/photo-1563479145576-b86933239cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
    { product_id: 8, name: 'casual shorts', colors: ['tan', 'dark grey'], price: 17, category: 'shorts', img: 'https://images.pexels.com/photos/5994/man-shorts-people-trunk.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
  ]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [hasBeenFiltered, setHasBeenFiltered] = useState(false);

  const handleFilterSubmit = (options) => {
    let filtered = products.slice();
    
    if (options.search) {
      filtered = filtered.filter(product => {
        if (product.name.includes(options.search) || product.category.includes(options.search)) {
          return product;
        }
      });
    };

    if (options.price != 30) {
      filtered = filtered.filter(product => product.price < options.price);
    };

    setHasBeenFiltered(true);
    setCurrentProducts(filtered);
  };

  const clearFilter = () => {
    setCurrentProducts([]);
    setHasBeenFiltered(false);
  }

  let productsToDisplay;
  if (hasBeenFiltered === true) {
    productsToDisplay = currentProducts;
  } else {
    productsToDisplay = products;
  }

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-3">
            <h1>Filter</h1>
            <FilterOptions handleFilterSubmit={handleFilterSubmit} clearFilter={clearFilter} />
          </div>
          <div className="col-9">
            <ItemContainer products={productsToDisplay} hasBeenFiltered={hasBeenFiltered} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
