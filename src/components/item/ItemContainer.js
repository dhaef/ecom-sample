import React, { useContext } from 'react'

import Item from './Item'
import { StateContext } from '../../App'

const ItemContainer = (props) => {
    const state = useContext(StateContext);

    const { hasBeenFiltered, products, currentProducts } = state

    const handleDisplay = () => {
        if (hasBeenFiltered === false) {
            return products.map(product => <Item key={product.product_id} product={product} addToCart={props.addToCart} />)
        } else if (hasBeenFiltered === true && currentProducts.length > 0) {
            return currentProducts.map(product => <Item key={product.product_id} product={product} addToCart={props.addToCart}  />)
        } else if (hasBeenFiltered === true && currentProducts.length === 0) {
            return <h5>No items found</h5>
        }
    };

    return (
        <div className="card-columns">
            {handleDisplay()}
        </div>
    )
}

export default ItemContainer
