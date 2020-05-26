import React, { useEffect, useState } from 'react';
import { useStore } from 'store';

const Product = ({ product }) => {
    const { id, img, name, price, size: inventory } = product;
    const { dispatch, state } = useStore();
    const [size, setSize] = useState();
    const [quantity, setQuantity] = useState(1);
    const [formErrors, setFormErrors] = useState({
      currentlyInCart: false,
      currentlyInWishlist: false,
      size: false,
      quantity: false,
      outOfStock: false,
      insufficientStock: false
    });

    const handleAddToCartClick = () => {
      const errors = {
        quantity: quantity < 1,
        size: !size,
        currentlyInCart: !!state.cart.find(({ id: productId }) => id === productId),
        outOfStock: inventory[size] < 1,
        insufficientStock: quantity > inventory[size]
      };

      const hasError = Object.values(errors).reduce((result, val) => val ? true : result, false);

      setFormErrors(errors);

      if (!hasError) {
        dispatch({
          type: 'addItemToCart',
          payload: { size, quantity, product }
        });
      }
    };

    const handleWishClick = () => {
        const currentlyInWishlist = state.wishlist.find(({ id: productId }) => id === productId);
        if (currentlyInWishlist) {
          return setFormErrors({ ...formErrors, currentlyInWishlist: true });
        }
        const updatedWishList = state.wishList.concat({ ...product });
        window.localStorage.setItem('wishList', JSON.stringify(updatedWishList));
        dispatch({ type: 'addItemToWishList', payload: { updatedWishList } });
    };

    return (
        <div className="card">
            <img className="card-img-top" src={img} alt="Card cap" style={{ height: '10rem', objectFit: 'cover' }} />
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <p
                  className={`
                    ${formErrors.size ? 'invalid' : ''}
                  `}
                >
                    <span
                      className={`
                        cursor
                        ${size === 's' ? 'size' : ''}
                        ${inventory.s > 0 ? 'font-weight-normal' : 'out-of-stock'}
                      `} 
                      style={{ marginRight: '1rem' }}
                      id={id}
                      onClick={() => setSize('s')}
                    >
                      S
                    </span>
                    <span 
                        className={`
                          cursor
                          ${size === 'm' ? 'size' : ''}
                          ${inventory.m > 0 ? 'font-weight-normal' : 'out-of-stock'}
                        `} 
                        style={{ marginRight: '1rem' }}
                        id={id}
                        onClick={() => setSize('m')}
                    >
                      M
                    </span>
                    <span 
                        className={`
                          cursor
                          ${size === 'l' ? 'size' : ''}
                          ${inventory.l > 0 ? 'font-weight-normal' : 'out-of-stock'}
                        `} 
                        style={{ marginRight: '1rem' }}
                        id={id}
                        onClick={() => setSize('l')}
                    >
                      L
                    </span>
                </p>
                <div
                  className={`
                    card-text
                    ${formErrors.quantity ? 'invalid' : ''}
                  `}
                  style={{ marginBottom: '16px' }}
                >
                    <span>Quantity: </span>
                    <select
                      value={quantity}
                      className="custom-select"
                      id={id}
                      onChange={({ target: { value } }) => setQuantity(Number(value))}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
                {formErrors.insufficientStock && (
                  <div className="card-text">
                    insufficient stock
                  </div>
                )}
                <p className="card-text">Price: ${price}</p>
                <button className="btn btn-light" onClick={handleAddToCartClick}>
                  Add to <span role="img" aria-label="cart">🛒</span>
                </button>
                <span 
                    role="img" 
                    aria-label="heart" 
                    className="badge badge-light badge-m-right"
                    style={{ cursor: 'pointer' }}
                    id={id}
                    onClick={handleWishClick}
                >🖤</span>
            </div>
        </div>
    )
}

export default Product;
