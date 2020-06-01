import React from 'react';
import { useStore } from 'store';

const OrderSummary = () => {
    const { state } = useStore();

    const totalValOfEachItemInCart = state.cart.map(item => ((item.price * item.customerSize.s) + (item.price * item.customerSize.m) + (item.price * item.customerSize.l)));
    const total = totalValOfEachItemInCart.reduce((auc, curVal) => { return auc + curVal }, 0);
    const salesTax = Math.floor((total * .06) * 100) / 100;

    return (
        <div className="order-summary p-3 mb-2 mt-2">
            <h4 className="text-center">Order Summary</h4>
            {/* <p>{state.cart.length} items for <span className="float-right">${total}</span></p> */}
            <p>Delievery: <span className="float-right">FREE</span></p>
            <p>Subtotal[{state.cart.length} item{state.cart.length !== 1 ? 's' : null}]: <span className="float-right">${total}</span></p>
            <p className="mb-0">Total: <span className="float-right">${total + salesTax}</span></p>
        </div>
    )
}

export default OrderSummary
