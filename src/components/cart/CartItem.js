import React, { useContext } from 'react'

import { DispatchContext, StateContext } from '../../App'

const CartItem = props => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    const removeFromCart = itemId => {
        const item = state.cart.find(product => product.product_id === parseInt(itemId));
        const updatedProducts = state.products.map(product => {
          if (product.product_id === item.product_id) {
            product.size = {
              s: product.size.s += item.customerSize.s,
              m: product.size.m += item.customerSize.m,
              l: product.size.l += item.customerSize.l,
            }
          }
          return product;
        });
        // console.log(updatedProducts)
        // const updatedCart = cart.filter(cartItem => cartItem.product_id !== item.product_id);
        // setCart(updatedCart);
        dispatch({ type: 'removeItemFromCart', payload: { item, cart: updatedProducts } })
      };

    return (
        <div className="card text-center">
            <div className="card-body">
                <p className="card-text">{ `${props.product.name.slice(0,1).toUpperCase()}${props.product.name.slice(1)}` }</p>
                <p className="card-text">
                    {`Size: ${props.product.customerSize.s > 0 ? `S : ${props.product.customerSize.s}` : ''}
                            ${props.product.customerSize.m > 0 ? `M : ${props.product.customerSize.m}` : ''}
                            ${props.product.customerSize.l > 0 ? `L : ${props.product.customerSize.l}` : ''}`}
                </p>
                <p className="card-text">{` $${props.product.price}`}</p>
                {/* <p className="card-text">{`Quantity: ${props.product.totalNumberOfItems}`}</p> */}
                <button className="btn btn-danger" id={props.product.product_id} onClick={e => removeFromCart(e.target.id)}>
                    🗑
                </button>
            </div>
        </div>
    )
}

export default CartItem