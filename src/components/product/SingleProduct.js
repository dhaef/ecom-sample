import React, { useEffect, useState } from 'react'
import { useStore } from 'store';

const SingleProduct = props => {
    const { state, dispatch } = useStore();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState();
    const [formErrors, setFormErrors] = useState({
        currentlyInWishlist: { hasError: false, msg: "Item already on wish list" },
        size: { hasError: false, msg: "Select a size" },
        quantity: { hasError: false, msg: "Select a quantity" },
        insufficientStock: { hasError: false, msg: "Insufficient Stock" }
    });

    const { id, size: inventory } = product;

    useEffect(() => {
        setProduct(
            state.products.find(product => product.id === +props.match.params.id)
        );
        // eslint-disable-next-line
    }, [props.match.params.id]);

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
        <div className="container mt-4 mb-4">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-12 col-md-5">
                    <img
                        src={product.img}
                        className="center-item single-img"
                        alt="Card cap" />
                </div>
                <div className="col-12 col-md-5">
                    <h1 className="text-center card-title">{product.name}</h1>
                    <p className="text-center">${product.price}</p>
                    {formErrors.size.hasError && <h6 className="card-text alert-msg text-center">{formErrors.size.msg}</h6>}
                    <div className={`text-center pick-size ${formErrors.size.hasError && 'invalid'}`}>
                        <p className="text-heavy">SIZE: {size === 's' ? 'Small' : size === 'm' ? 'Medium' : size === 'l' ? 'Large' : 'Select Size'}</p>
                        <span
                            className={`mr-2 cursor text-heavy ${size === 's' ? 'size' : ''} ${inventory && inventory.s > 0 ? '' : 'out-of-stock'}`}
                            onClick={() => { setSize('s') }}>S</span>
                        <span
                            className={`mr-2 cursor text-heavy ${size === 'm' ? 'size' : ''} ${inventory && inventory.m > 0 ? '' : 'out-of-stock'}`}
                            onClick={() => { setSize('m') }}>M</span>
                        <span
                            className={`cursor text-heavy ${size === 'l' ? 'size' : ''} ${inventory && inventory.l > 0 ? '' : 'out-of-stock'}`}
                            onClick={() => { setSize('l') }}>L</span>
                    </div>
                    {formErrors.quantity.hasError && <h6 className="card-text alert-msg text-center">{formErrors.quantity.msg}</h6>}
                    <div className={`ml-auto mr-auto mt-3 ${formErrors.quantity.hasError && 'invalid'}`} style={{ width: 'fit-content' }}>
                        <span
                            className="quantity-item p-2"
                            onClick={() => setQuantity(quantity - 1)}>-</span>
                        <span className="quantity-value p-2 pl-3 pr-3">{quantity}</span>
                        <span
                            className="quantity-item p-2"
                            onClick={() => setQuantity(quantity + 1)}>+</span>
                    </div>
                    {formErrors.insufficientStock.hasError && (
                        <h6 className="card-text alert-msg text-center mt-4 mb-0">
                            {formErrors.insufficientStock.msg}
                        </h6>
                    )}
                    {/* {formErrors.currentlyInWishlist.hasError && <h6 className="card-text alert-msg text-center mt-4 mb-0">{formErrors.currentlyInWishlist.msg}</h6>} */}
                    <div style={{ width: 'fit-content' }} className="ml-auto mr-auto">
                        <button
                            className="btn btn-dark mt-4 text-heavy"
                            style={{ width: 'fit-content' }}
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
                            className="btn btn-dark mt-4 ml-2 text-heavy"
                            style={{ cursor: 'pointer' }}
                            id={id}
                            onClick={handleWishClick}
                        >
                            Add to {state.wishList.find(item => item.id === id) ? '❤️' : '🤍'}
                        </span>
                    </div>
                </div>
                {/* <div className="col-md-2"></div> */}
            </div>
        </div>
    )
}

export default SingleProduct
