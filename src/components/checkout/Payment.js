import React, { useState } from 'react';
import { useStore } from 'store/index';
import OrderSummary from './OrderSummary';

const Payment = () => {
    const { state, dispatch } = useStore();
    const [formErrors, setFormErrors] = useState({
        cardNumberError: false,
        nameError: false,
        expireError: false,
        cvvError: false
    });

    const { cardNumber, name, expire, cvv } = state.pay;

    const handleChange = e => dispatch({ type: 'setPay', payload: { name: [e.target.name], value: e.target.value } });

    const handleSubmit = e => {
        e.preventDefault();
        if (!cardNumber || !name || !expire || !cvv) {
            alert('Please fill in all fields');
            return;
        } else if (cvv.length < 3 || cvv.length > 4) {

        }
        dispatch({ type: 'setCheckoutStep', payload: 4 });
    };

    return (
        <div className="container">
            <div className='row'>
                <div className="col-12 col-md-8">
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
                <div className="col-12 col-md-4">
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}

export default Payment
