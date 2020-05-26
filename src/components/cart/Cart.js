import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useStore } from 'store/index';
import CartItem from './CartItem';

const Cart = props => {
    const { state, dispatch } = useStore();
    const totalValOfEachItemInCart = state.cart.map(item => ((item.price*item.customerSize.s)+(item.price*item.customerSize.m)+(item.price*item.customerSize.l)));
    const total = totalValOfEachItemInCart.reduce((auc, curVal) => { return auc + curVal}, 0);

    const checkIfCartEmpty = () => {
        if (state.cart.length === 0) {
            return <p>Your Cart is empty</p>
        } else { 
            return state.cart.map(item => <CartItem key={item.id} product={item} />);
        }
    };

    const handleClick = () => dispatch({ type: 'toggleCart' });
    
    return (
        <>
            {/* Set modal animation to false to avoid DOMnode error */}
            <Modal show={state.showCart} animation={false}> 
                <Modal.Header>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { checkIfCartEmpty() }
                    <h5>Total: ${total}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" variant="secondary" onClick={() => dispatch({ type: 'toggleCart' })}>
                        Close
                    </button>
                    { state.cart.length === 0 ? 
                        <button className="btn btn-light" onClick={() => alert('Add items to your cart to checkout')}>Checkout</button> : 
                        <Link to="/checkout" className="btn btn-primary" variant="primary" onClick={ handleClick }>Checkout</Link> }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Cart
