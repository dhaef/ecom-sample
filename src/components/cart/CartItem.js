import React, { useContext } from 'react';
import { useStore } from 'store/index';

const CartItem = props => {
    const { dispatch, state } = useStore();

    const removeFromCart = itemId => {
        const item = state.cart.find(product => product.id === parseInt(itemId));
        const updatedProducts = state.products.map(product => {
          if (product.id === item.id) {
            product.size = {
              s: product.size.s += item.customerSize.s,
              m: product.size.m += item.customerSize.m,
              l: product.size.l += item.customerSize.l,
            }
          }
          return product;
        });
        dispatch({ type: 'removeItemFromCart', payload: { item, cart: updatedProducts } });
      };

    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={props.product.img} className="card-img" alt="Card cap" style={{ height: '10rem', objectFit: 'cover' }}></img>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <p className="card-text">{`${props.product.name.slice(0, 1).toUpperCase()}${props.product.name.slice(1)}`}</p>
              <p className="card-text">
                {`Size: ${props.product.customerSize.s > 0 ? `S : ${props.product.customerSize.s}` : ''}
                            ${props.product.customerSize.m > 0 ? `M : ${props.product.customerSize.m}` : ''}
                            ${props.product.customerSize.l > 0 ? `L : ${props.product.customerSize.l}` : ''}`}
              </p>
              <p className="card-text">{` $${props.product.price}`}</p>
            </div>
          </div>
          <div className="col-md-2" style={{ marginTop: '1rem' }}>
            <button className="btn btn-danger" id={props.product.id} onClick={e => removeFromCart(e.target.id)}>
              🗑
            </button>
          </div>
        </div>
      </div>
    )
}

export default CartItem
