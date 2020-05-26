import React from 'react';
import { useStore } from 'store/index';
import FilterOptions from 'components/filter/FilterOptions';
import Cart from 'components/cart/Cart';
import Filters from 'components/filter/Filters';
import Item from 'components/item/Item';

const ItemsContainer = () => {
    const { state, dispatch } = useStore();
    const {
      cart,
      products,
      hasBeenFiltered,
      currentProducts
    } = state;

    let itemsList = [];
    if (!hasBeenFiltered) {
      itemsList = products.map((product) => (
        <Item
          key={product.id}
          product={product} />
      ));
    } else if (hasBeenFiltered && currentProducts.length) {
      itemsList = currentProducts.map((product) => (
        <Item
          key={product.id}
          product={product}
        />
      ))
    } else if (hasBeenFiltered && !currentProducts.length) {
      return <h5>No items found</h5>
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
                      {itemsList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemsContainer
