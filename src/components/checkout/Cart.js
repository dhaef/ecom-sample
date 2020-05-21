import React, { useContext } from 'react'
import { StateContext, DispatchContext } from '../../App'
import CartItem from '../cart/CartItem'

const Cart = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    const totalValOfEachItemInCart = state.cart.map(item => ((item.price*item.customerSize.s)+(item.price*item.customerSize.m)+(item.price*item.customerSize.l)));
    const total = totalValOfEachItemInCart.reduce((auc, curVal) => { return auc + curVal}, 0);

    return (
        <div className="row">
            <div className="col-8">
                <h4>Total [{state.cart.length} item{state.cart.length !== 1 ? 's' : null}]: ${total}</h4>
                <div className="card-clomuns">
                    { state.cart.map(item => <CartItem key={item.product_id} product={item} /> )}
                </div>
            </div>
            <div className="col-4">
                { state.cart.length === 0 ? <button 
                    className="btn btn-light" 
                    onClick={() => alert('Add items to your cart to proceed')}
                    >Proceed to Delivery</button> : 
                    <button 
                    className="btn btn-primary" 
                    onClick={() => dispatch({ type: 'setCheckoutStep', payload: 2 })}
                    >Proceed to Delivery</button> }
            </div>
        </div>
    )
}

export default Cart
