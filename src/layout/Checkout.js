import React, { useContext } from 'react';
import { StateContext, DispatchContext } from '../App';

import Cart from '../components/checkout/Cart';
import Delivery from '../components/checkout/Delivery';
import Payment from '../components/checkout/Payment';
import Finalize from '../components/checkout/Finalize';

const Checkout = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const { checkout } = state;

    const getStepToDisplay = () => {
        if (checkout === 1) {
            return <Cart />
        } else if (checkout === 2) {
            return <Delivery />
        } else if (checkout === 3) {
            return <Payment />
        } else if (checkout === 4) {
            return <Finalize />
        }
    };

    const handleClick = e => {
        // dispatch({ type: 'setCheckoutStep', payload: +e.target.id });
    };

    return (
        <div className="container">
            <div className="checkout-steps">
                <button id={1} 
                    onClick={ handleClick } 
                    className={`badge-m-right btn ${checkout === 1 ? 'btn-dark' : 'btn-secondary'}`}>
                        <span className="badge badge-light badge-m-right">1</span>
                        Cart </button>
                <button id={2} 
                    onClick={ handleClick } 
                    className={`badge-m-right btn ${checkout === 2 ? 'btn-dark' : 'btn-secondary'}`}>
                        <span className="badge badge-light badge-m-right">2</span>
                        Delivery </button>
                <button id={3} 
                    onClick={ handleClick }
                    className={`badge-m-right btn ${checkout === 3 ? 'btn-dark' : 'btn-secondary'}`}>
                        <span className="badge badge-light badge-m-right">3</span>
                        Payment </button>
                <button id={4} 
                    onClick={ handleClick }
                    className={`badge-m-right btn ${checkout === 4 ? 'btn-dark' : 'btn-secondary'}`}>
                        <span className="badge badge-light badge-m-right">4</span>
                        Finalize</button>
            </div>
            <div>
                { getStepToDisplay() }
            </div>
        </div>
    )
}

export default Checkout
