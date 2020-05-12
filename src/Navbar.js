import React, { useContext } from 'react'

import Cart from './components/cart/Cart'
import { DispatchContext } from './App'

const Navbar = props => {
    const dispatch = useContext(DispatchContext);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">FASHION REACT</a>
            <button className="btn btn-light" onClick={() => { dispatch({ type: 'toggleCart' }) }}>
                Cart 🛒
                <span className="badge badge-primary">{props.cart.length}</span>
            </button>
        </nav>
    )
}

export default Navbar
