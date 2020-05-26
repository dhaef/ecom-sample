import React from 'react';
import { useStore } from 'store';
import FilterOptions from 'components/filter/FilterOptions';
import Cart from 'components/cart/Cart';
import Filters from 'components/filter/Filters';
import Product from 'components/Product/index';

const List = () => {
    const { state, dispatch } = useStore();
    const {
      cart,
      products,
      hasBeenFiltered,
      currentProducts
    } = state;

    let productList = [];
    if (!hasBeenFiltered) {
      productList = products.map((product) => (
        <Product
          key={product.id}
          product={product} />
      ));
    } else if (hasBeenFiltered && currentProducts.length) {
      productList = currentProducts.map((product) => (
        <Product
          key={product.id}
          product={product}
        />
      ))
    } else if (hasBeenFiltered && !currentProducts.length) {
      return <h5>No products found</h5>
    }

    return (
        <div className="container" style={{ marginTop: '.5rem' }}>
            <div className="row">
                <div className="col-3 container">
                    <div className="row">
                        <h1>Product Filters</h1>
                    </div>
                    <FilterOptions />
                </div>
                <div className="col-9">
                    <Cart />
                    <Filters />
                    <div className="card-columns">
                      {productList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List
