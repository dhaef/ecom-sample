import React, { useEffect, useState } from 'react'
import { useStore } from 'store';

const SingleProduct = props => {
    const { state, dispatch } = useStore();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState();
    const [formErrors, setFormErrors] = useState({
        currentlyInWishlist: false,
        size: false,
        quantity: false,
        outOfStock: false,
        insufficientStock: false
    });

    const { id, img, name, price, size: inventory } = product;

    useEffect(() => {
        setProduct(
            state.products.find(product => product.id === +props.match.params.id)
        )
    }, [props.match.params.id]);

    const handleAddToCartClick = () => {
        const errors = {
            quantity: quantity < 1,
            size: !size,
            outOfStock: inventory[size] < 1,
            insufficientStock: inventory[size] < quantity,
        };

        const hasError = Object.values(errors).reduce((result, val) => val ? true : result, false);

        setFormErrors(errors);

        if (!hasError) {
            dispatch({
                type: 'addItemToCart',
                payload: { size, quantity, product, currentlyInCart: !!state.cart.find(product => product.id === id) }
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
        <div className="container mt-4 mb-4">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-12 col-md-5">
                    <img src={product.img} className="center-item" style={{ height: '75vh', width: '30vw', objectFit: 'cover' }} />
                </div>
                <div className="col-12 col-md-3">
                    <h1 className="text-center card-title">{product.name}</h1>
                    <p className="text-center">${product.price}</p>
                    <div className="text-center">
                        <p>SIZE: {size === 's' ? 'Small' : size === 'm' ? 'Medium' : size === 'l' ? 'Large' : 'Select Size'}</p>
                        <span
                            className={`mr-2 cursor size-option ${size === 's' ? 'size' : ''}`}
                            onClick={() => { setSize('s') }}>S</span>
                        <span
                            className={`mr-2 cursor size-option ${size === 'm' ? 'size' : ''}`}
                            onClick={() => { setSize('m') }}>M</span>
                        <span
                            className={`cursor size-option ${size === 'l' ? 'size' : ''}`}
                            onClick={() => { setSize('l') }}>L</span>
                    </div>
                    <div className="ml-auto mr-auto mt-3" style={{ width: 'fit-content' }}>
                        <span
                            className="quantity-item p-2"
                            onClick={() => setQuantity(quantity - 1)}>-</span>
                        <span className="quantity-value p-2 pl-3 pr-3">{quantity}</span>
                        <span
                            className="quantity-item p-2"
                            onClick={() => setQuantity(quantity + 1)}>+</span>
                    </div>
                    <div style={{ width: 'fit-content' }} className="ml-auto mr-auto">
                        <button
                            className="btn btn-dark mt-4"
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
                            className="btn btn-dark mt-4 ml-2"
                            style={{ cursor: 'pointer' }}
                            id={id}
                            onClick={handleWishClick}
                        >
                            Add to {state.wishList.find(item => item.id === id) ? '❤️' : '🤍'}
                        </span>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default SingleProduct
