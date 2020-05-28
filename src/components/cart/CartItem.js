import React from 'react';
import { useStore } from 'store/index';

const CartItem = ({ product }) => {
    const {dispatch} = useStore();

    const removeFromCart = () => dispatch({ type: 'removeItemFromCart', payload: product });
    
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-4 col-md-4">
            <img src={product.img} className="card-img" alt="Card cap" style={{ height: '10rem', objectFit: 'cover' }}></img>
          </div>
          <div className="col-5 col-md-6">
            <div className="card-body">
              <p className="card-text">{`${product.name.slice(0, 1).toUpperCase()}${product.name.slice(1)}`}</p>
              <p className="card-text">
                {`Size: ${product.customerSize.s > 0 ? `S : ${product.customerSize.s}` : ''}
                            ${product.customerSize.m > 0 ? `M : ${product.customerSize.m}` : ''}
                            ${product.customerSize.l > 0 ? `L : ${product.customerSize.l}` : ''}`}
              </p>
              <p className="card-text">{` $${product.price}`}</p>
            </div>
          </div>
          <div className="col-3 col-md-2" style={{ marginTop: '1rem' }}>
            <button className="btn btn-danger" id={product.id} onClick={removeFromCart}>
              🗑
            </button>
          </div>
        </div>
      </div>
    )
}

export default CartItem
