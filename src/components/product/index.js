import React, { useState } from 'react';
import { useStore } from 'store/index';

const Product = ({ product }) => {
    const { id, img, name, price, size: inventory } = product;
    const { state, dispatch } = useStore();
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
            currentlyInCart: !!state.cart.find(product => product.id === id),
            outOfStock: inventory[size] < 1,
            insufficientStock: inventory[size] < quantity,
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

    const handleWishClick = e => {
        const currentlyInWishlist = state.wishList.find(product => product.id === id);
        if (currentlyInWishlist) {
            setFormErrors({ ...formErrors, currentlyInWishlist: true });
        } else {
          const updatedWishList = state.wishList.concat({ ...product });
          window.localStorage.setItem('wishList', JSON.stringify(updatedWishList));
          dispatch({ type: 'setWishList', payload: updatedWishList }); 
        }
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
                    Insufficient stock
                  </div>
                )}
                <p className="card-text">Price: ${price}</p>
                { formErrors.currentlyInCart && <div className='card-text'>Item in cart</div> }
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
                >
                  { state.wishList.find(item => item.id === id) ? '🖤' : '🤍'}
                </span>
                { formErrors.currentlyInWishlist && <span className="card-text">Product on wish list</span> }
            </div>
        </div>
    )
}

export default Product
