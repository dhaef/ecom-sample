import React from 'react'

import Cart from './components/cart/Cart'

const Navbar = props => {

    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">EXAMPLE REACT</a>
            <button className="btn btn-light" onClick={props.handleShow}>
                Cart 🛒
                <span className="badge badge-primary">{props.cart.length}</span>
            </button>
        </nav>
    )
}

export default Navbar
