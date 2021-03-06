import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useStore } from 'store/index';

import CartItem from './CartItem';

const Cart = () => {
    const { state, dispatch } = useStore();
    const [cartIsEmpty, setCartIsEmpty] = useState(false);

    const totalValOfEachItemInCart = state.cart.map(item => ((item.price * item.customerSize.s) + (item.price * item.customerSize.m) + (item.price * item.customerSize.l)));
    const total = totalValOfEachItemInCart.reduce((auc, val) => { return auc + val }, 0);

    const continueShopping = () => {
        setCartIsEmpty(false);
        dispatch({ type: 'toggleCart' });
    };

    const checkIfCartEmpty = () => {
        if (state.cart.length === 0) {
            return <p>Your Cart is empty</p>
        } else {
            return state.cart.map(product => <CartItem key={product.id} product={product} />);
        }
    };

    const handleClick = () => dispatch({ type: 'toggleCart' });

    return (
        <>
            {/* Set modal animation to false to avoid DOMnode error */}
            <Modal
                show={state.showCart}
                animation={false}
                centered={true}
                scrollable={true}
            >
                <Modal.Header>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {checkIfCartEmpty()}
                    <h5>Total: ${total}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary"
                        variant="secondary"
                        onClick={continueShopping}
                    >
                        Continue Shopping
                    </button>
                    {state.cart.length === 0
                        ? <button
                            className="btn btn-light"
                            onClick={() => setCartIsEmpty(true)}>
                            Checkout
                        </button>
                        : <Link to="/checkout"
                            className="btn btn-primary"
                            variant="primary"
                            onClick={handleClick}>
                            Checkout
                        </Link>}
                    {cartIsEmpty
                        ? <p
                            className="invalid"
                            style={{ width: '100%', textAlign: 'center' }}>
                            Add an item to checkout
                        </p>
                        : null}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Cart