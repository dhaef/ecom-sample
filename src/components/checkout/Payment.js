import React, { useState, useContext } from 'react'
import { DispatchContext } from '../../App';

const Payment = () => {
    const dispatch = useContext(DispatchContext);

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
    }
 
    return (
        <div>
            <h3>Payment Method</h3>
            {/* Card number, name on card, month/year, cvv */}
            <form onSubmit={handleSubmit}>
                <div className="row" style={{ marginBottom: '1rem' }}>
                    <div className="col">
                        {/* <label htmlFor="inputFirstName">First Name</label> */}
                        <input
                            name="cardNumber"
                            type="text"
                            className="form-control"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={handleChange}></input>
                    </div>
                    <div className="col">
                        {/* <label htmlFor="inputLastName">Last Name</label> */}
                        <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Name on card"
                            value={name}
                            onChange={handleChange}></input>
                    </div>
                </div>
                <div className="row" style={{ marginBottom: '1rem' }}>
                    <div className="col">
                        {/* <label htmlFor="inputFirstName">First Name</label> */}
                        <input
                            name="expire"
                            type="text"
                            className="form-control"
                            placeholder="Expiration date"
                            value={expire}
                            onChange={handleChange}></input>
                    </div>
                    <div className="col">
                        {/* <label htmlFor="inputLastName">Last Name</label> */}
                        <input
                            name="cvv"
                            type="email"
                            className="form-control"
                            placeholder="CVV"
                            value={cvv}
                            onChange={handleChange}></input>
                    </div>
                </div>
                <button className="btn btn-primary">Place Order</button>
            </form>
        </div>
    )
}

export default Payment
