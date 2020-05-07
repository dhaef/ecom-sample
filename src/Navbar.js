import React from 'react'

import Cart from './Cart'

const Navbar = props => {

    // const showCart = () => {
    //     console.log(props.cart);
    //     return <Cart />
    // }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">EXAMPLE REACT</a>
            <button className="btn btn-light" onClick={props.handleShow}>
                Cart 🛒
                {/* <span className="badge badge-light">{props.cart.length}</span> */}
            </button>
        </nav>
    )
}

export default Navbar
