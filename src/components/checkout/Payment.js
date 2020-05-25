import React, { useState } from 'react';
import { useStore } from 'store/index';

const Payment = () => {
    const { state, dispatch } = useStore();
    const totalValOfEachItemInCart = state.cart.map(item => ((item.price*item.customerSize.s)+(item.price*item.customerSize.m)+(item.price*item.customerSize.l)));
    const total = totalValOfEachItemInCart.reduce((auc, curVal) => { return auc + curVal}, 0);
    const salesTax = Math.floor(((total * .06) * 100)) / 100;
    const [pay, setPay] = useState({
        cardNumber: '',
        name: '',
        expire: '',
        cvv: '',
    });

    const { cardNumber, name, expire, cvv } = pay;

    const handleChange = e => setPay({ ...pay, [e.target.name]: e.target.value });
 
    const handleSubmit = e => {
        e.preventDefault();
        if (!cardNumber || !name || !expire || !cvv) {
            alert('Please fill in all fields');
            return;
        }
        console.log(pay);
        dispatch({ type: 'setCheckoutStep', payload: 4 });
        dispatch({ type: 'orderComplete' });
    };
 
    return (
        <div className="container">
            <div className='row'>
                <div className="col-8">
                    <h3>Payment Method</h3>
                    {/* Card number, name on card, month/year, cvv */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {/* <label htmlFor="inputFirstName">First Name</label> */}
                            <input
                                name="cardNumber"
                                type="text"
                                className="form-control"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="inputLastName">Last Name</label> */}
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Name on card"
                                value={name}
                                onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="inputFirstName">First Name</label> */}
                            <input
                                name="expire"
                                type="text"
                                className="form-control"
                                placeholder="Expiration date"
                                value={expire}
                                onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="inputLastName">Last Name</label> */}
                            <input
                                name="cvv"
                                type="text"
                                className="form-control"
                                placeholder="CVV"
                                value={cvv}
                                onChange={handleChange}></input>
                        </div>
                        <button className="btn btn-primary">Place Order</button>
                        <button 
                            className="btn btn-dark" 
                            onClick={() => dispatch({ type: 'setCheckoutStep', payload: 2 })}
                            style={{ marginLeft: '1rem' }}>Go Back</button>
                    </form>
                </div>
                <div className="col-4">
                    <h4>Order Summary</h4>
                    <p>{state.cart.length} items for ${total}</p>
                    <p>Delievery: FREE</p>
                    <p>Sales Tax: ${salesTax}</p>
                    <p>Total: ${total + salesTax}</p>
                </div>
            </div>
        </div>
    )
}

export default Payment
