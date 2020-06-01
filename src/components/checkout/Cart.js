import React from 'react';
import { useStore } from 'store/index';

import CartItem from '../cart/CartItem';
import OrderSummary from './OrderSummary';

const Cart = () => {
    const { state, dispatch } = useStore();

    return (
        <div className="row">
            <div className="col-12 col-md-8">
                {/* <h4>Total [{state.cart.length} item{state.cart.length !== 1 ? 's' : null}]: ${total}</h4> */}
                <div className="card-clomuns">
                    {state.cart.map(item => <CartItem key={item.id} product={item} />)}
                </div>
            </div>
            <div className="col-12 col-md-4">
                <OrderSummary />
                {state.cart.length === 0 ? <button
                    className="btn btn-light"
                    onClick={() => alert('Add items to your cart to proceed')}
                >Proceed to Delivery</button> :
                    <button
                        className="btn btn-primary"
                        onClick={() => dispatch({ type: 'setCheckoutStep', payload: 2 })}
                    >Proceed to Delivery</button>}
            </div>
        </div>
    )
}

export default Cart
