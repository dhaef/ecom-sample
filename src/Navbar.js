import React from 'react'

const Navbar = props => {

    const showCart = () => {
        console.log(props.cart);
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">EXAMPLE REACT</a>
            <button className="btn btn-light" onClick={showCart}>
                Cart 🛒<span className="badge badge-light">{props.cart.length}</span>
            </button>
        </nav>
    )
}

export default Navbar
