import React from 'react';
import { useStore } from 'store/index';

const CartItem = ({ product }) => {
  const { dispatch } = useStore();

  const removeFromCart = () => dispatch({ type: 'removeItemFromCart', payload: product });

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-4 col-md-4">
          <img
            src={product.img}
            className="card-img"
            alt="Card cap"
            style={{ height: '10rem', objectFit: 'cover' }}>
          </img>
        </div>
        <div className="col-5 col-md-6">
          <div className="card-body">
            <p
              className="card-text text-heavy"
              style={{ textTransform: 'capitalize' }}>
              {product.name}
            </p>
            <div className="card-text text-heavy size-container">
              <span className="size-item size-item-out">S: {product.customerSize.s}</span>
              <span className="size-item size-item-in">M: {product.customerSize.m}</span>
              <span className="size-item size-item-out">L: {product.customerSize.l}</span>
            </div>
            <p className="card-text text-heavy">{` $${product.price}`}</p>
          </div>
        </div>
        <div
          className="col-3 col-md-2"
          style={{ marginTop: '1rem' }}
        >
          <button
            className="btn btn-danger"
            id={product.id}
            onClick={removeFromCart}
          >
            🗑
            </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
