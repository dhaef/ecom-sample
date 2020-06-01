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
        const errors = {
            cardNumberError: !cardNumber,
            nameError: !name,
            expireError: !expire,
            cvvError: !cvv,
        };

        const hasErrors = Object.values(errors).reduce((result, val) => val ? true : result, false);

        setFormErrors(errors);

        if (!hasErrors) {
            dispatch({ type: 'setCheckoutStep', payload: 4 });
        }
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
                            {formErrors.cardNumberError ? <span className="invalid">Add a card #</span> : null}
                            <input
                                name="cardNumber"
                                type="text"
                                className={`form-control ${formErrors.cardNumberError ? 'invalid' : ''}`}
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="inputLastName">Last Name</label> */}
                            {formErrors.nameError ? <span className="invalid">Add name on card</span> : null}
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
                            {formErrors.expireError ? <span className="invalid">Add expiration date</span> : null}
                            <input
                                name="expire"
                                type="text"
                                className="form-control"
                                placeholder="Expiration date (MM/YY)"
                                value={expire}
                                onChange={handleChange}></input>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="inputLastName">Last Name</label> */}
                            {formErrors.cvvError ? <span className="invalid">Add CVV</span> : null}
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
