import React, { useState, useContext } from 'react'
import { DispatchContext } from '../../App';
import States from './States';

const Delivery = () => {
    const dispatch = useContext(DispatchContext);
    const [shipping, setShipping] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        zipCode: '',
        state: '',
        phoneNumber: '',
        email: '',
        alert: null,
    });

    const handleChange = e => setShipping({ ...shipping, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();

        if (shipping.firstName === '' || 
            shipping.lastName === '' || 
            shipping.streetAddress === '' ||
            shipping.city === '' ||
            shipping.zipCode === '' ||
            shipping.state === '' ||
            shipping.phoneNumber === '' ||
            shipping.email === '') {
                alert('Please fill in all fields');
                // setShipping({ ...shipping, alert: 'Please fill in all fields' });
                return;
            }
        console.log(shipping);
        dispatch({ type: 'setCheckoutStep', payload: 3 });
    }

    return (
        <div>
            <h3>Shipping Info</h3>
            {/* <div className={`alert alert-danger ${alert !== null ? 'hide' : null }`} role="alert">
                { alert ? <p>{shipping.alert}</p> : null }
            </div> */}
            <form onSubmit={handleSubmit}>
                <div className="row" style={{ marginBottom: '1rem' }}>
                    <div className="col">
                        {/* <label htmlFor="inputFirstName">First Name</label> */}
                        <input 
                            name="firstName" 
                            type="text" 
                            className="form-control" 
                            placeholder="First Name" 
                            value={shipping.firstName}
                            onChange={handleChange}></input>
                    </div>
                    <div className="col">
                        {/* <label htmlFor="inputLastName">Last Name</label> */}
                        <input 
                            name="lastName" 
                            type="text" 
                            className="form-control" 
                            placeholder="Last Name"
                            value={shipping.lastName}
                            onChange={handleChange}></input>
                    </div>
                </div>
                <div className="form-group">
                    {/* <label htmlFor="inputStreetAddress">Street Address</label> */}
                    <input 
                        name="streetAddress" 
                        type="text" 
                        className="form-control" 
                        placeholder="Street Address"
                        value={shipping.streetAddress}
                        onChange={handleChange}></input>
                </div>
                <div className="row" style={{ marginBottom: '1rem' }}>
                    <div className="col">
                        {/* <label htmlFor="inputFirstName">City/Town</label> */}
                        <input 
                            name="city" 
                            type="text" 
                            className="form-control" 
                            placeholder="City/Town"
                            value={shipping.city}
                            onChange={handleChange}></input>
                    </div>
                    <div className="col">
                        {/* <label htmlFor="inputLastName">Zip Code</label> */}
                        <input 
                            name="zipCode" 
                            type="text" 
                            className="form-control" 
                            placeholder="Zip Code"
                            value={shipping.zipCode}
                            onChange={handleChange}></input>
                    </div>
                </div>
                <div className="form-group">
                    {/* <label htmlFor="inputStreetAddress">State</label> */}
                    <select 
                        name="state" 
                        className="form-control" 
                        placeholder="State"
                        value={shipping.state}
                        onChange={handleChange}>
                        <States />
                    </select>
                </div>
                <hr />
                <h3>Contact Info</h3>
                <div className="row" style={{ marginBottom: '1rem' }}>
                    <div className="col">
                        {/* <label htmlFor="inputFirstName">First Name</label> */}
                        <input 
                            name="phoneNumber" 
                            type="text" 
                            className="form-control" 
                            placeholder="Phone Number"
                            value={shipping.phoneNumber}
                            onChange={handleChange}></input>
                    </div>
                    <div className="col">
                        {/* <label htmlFor="inputLastName">Last Name</label> */}
                        <input 
                            name="email" 
                            type="email" 
                            className="form-control" 
                            placeholder="Email"
                            value={shipping.email}
                            onChange={handleChange}></input>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Review and Pay</button>
            </form>
        </div>
    )
}

export default Delivery
