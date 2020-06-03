import React, { useState } from 'react';
import { useStore } from 'store/index';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { id, img, name, price, size: inventory } = product;
  const { state, dispatch } = useStore();
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [formErrors, setFormErrors] = useState({
    currentlyInWishlist: { hasError: false, msg: "Item already in wish list" },
    size: { hasError: false, msg: "Select a size" },
    quantity: { hasError: false, msg: "Select a quantity" },
    insufficientStock: { hasError: false, msg: "Insufficient Stock" }
  });

  const handleAddToCartClick = () => {
    const errors = {
      size: { hasError: !size, msg: "Select a size" },
      quantity: { hasError: quantity < 1, msg: "Select a quantity" },
      insufficientStock: { hasError: inventory[size] < quantity, msg: "Insufficient Stock" }
    };
    const errorMsgs = [];
    // const hasError = Object.values(errors).reduce((result, val) => val.hasError ? true : result, false);
    const hasErrors = Object.values(errors).reduce((result, val) => {
      if (val.hasError) {
        errorMsgs.push(val.msg);
        return true;
      } else {
        return result;
      }
    }, false);

    setFormErrors(errors);

    if (!hasErrors) {
      dispatch({
        type: 'addItemToCart',
        payload: { size, quantity, product, currentlyInCart: !!state.cart.find(product => product.id === id) }
      });
    } else {
      dispatch({
        type: 'showAlert',
        payload: errorMsgs
      })
    }
  };

  const handleWishClick = e => {
    const currentlyInWishlist = state.wishList.find(product => product.id === id);
    if (currentlyInWishlist) {
      setFormErrors({
        ...formErrors, currentlyInWishlist: {
          ...formErrors.currentlyInWishlist,
          hasError: true
        }
      });
    } else {
      const updatedWishList = state.wishList.concat({ ...product });
      window.localStorage.setItem('wishList', JSON.stringify(updatedWishList));
      dispatch({ type: 'setWishList', payload: updatedWishList });
    }
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      <Link to={`/product/${id}`}>
        <img className="card-img-top" src={img} alt="Card cap" style={{ height: '10rem', objectFit: 'cover' }} />
      </Link>
      <div
        className="card-body">
        <h4 className="card-title text-center text-heavy">
          <Link to={`/product/${id}`} className="product-link">
            {name}
          </Link>
        </h4>
        {formErrors.size.hasError && <h6 className="card-text alert-msg text-center">{formErrors.size.msg}</h6>}
        <p
          className={`text-center pick-size
                    ${formErrors.size.hasError ? 'invalid' : ''}
                  `}
        >
          <span
            className={`
                        cursor text-heavy
                        ${size === 's' ? 'size' : ''}
                        ${inventory.s > 0 ? '' : 'out-of-stock'}
                      `}
            style={{ marginRight: '1rem' }}
            id={id}
            onClick={() => setSize('s')}
          >
            S
                    </span>
          <span
            className={`
                          cursor text-heavy
                          ${size === 'm' ? 'size' : ''}
                          ${inventory.m > 0 ? '' : 'out-of-stock'}
                        `}
            style={{ marginRight: '1rem' }}
            id={id}
            onClick={() => setSize('m')}
          >
            M
                    </span>
          <span
            className={`
                          cursor text-heavy
                          ${size === 'l' ? 'size' : ''}
                          ${inventory.l > 0 ? '' : 'out-of-stock'}
                        `}
            id={id}
            onClick={() => setSize('l')}
          >
            L
                    </span>
        </p>
        {formErrors.quantity.hasError && <h6 className="card-text alert-msg text-center">{formErrors.quantity.msg}</h6>}
        <div
          className={`
                    card-text
                    qty-input
                    ${formErrors.quantity.hasError ? 'invalid' : ''}
                  `}
        >
          <div className="ml-auto mr-auto mt-3" style={{ width: 'fit-content' }}>
            <span
              className="quantity-item p-2"
              onClick={() => setQuantity(quantity - 1)}>-</span>
            <span className="quantity-value p-2 pl-3 pr-3">{quantity}</span>
            <span
              className="quantity-item p-2"
              onClick={() => setQuantity(quantity + 1)}>+</span>
          </div>
        </div>
        <p className="card-text text-center text-heavy">Price: ${price}</p>
        {formErrors.insufficientStock.hasError && (
          <h6 className="card-text alert-msg text-center">
            {formErrors.insufficientStock.msg}
          </h6>
        )}
        {/* {formErrors.currentlyInWishlist.hasError && <h6 className="card-text alert-msg text-center mb-2">{formErrors.currentlyInWishlist.msg}</h6>} */}
        <button
          className="btn btn-dark text-heavy"
          style={{ width: '100%' }}
          onClick={handleAddToCartClick}>
          Add to {' '}
          <span
            role="img"
            aria-label="cart">
            🛒
            </span>
        </button>
        <span
          role="img"
          aria-label="heart"
          className="top"
          style={{ cursor: 'pointer' }}
          id={id}
          onClick={handleWishClick}
        >
          {state.wishList.find(item => item.id === id) ? '❤️' : '🤍'}
        </span>
      </div>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
}

export default Product
