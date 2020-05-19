import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

import { DispatchContext, StateContext } from '../App'

const Navbar = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to='/' className="navbar-brand" >FASHION REACT</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to='/?category=men'>Men</Link>
                    <Link className="nav-item nav-link" to='/?category=women'>Women</Link>
                </div>
            </div>
            <button className="btn btn-light" onClick={() => { dispatch({ type: 'toggleCart' }) }}>
                Cart <span role="img" aria-label="cart">🛒</span>
                <span className="badge badge-primary">{state.cart.length}</span>
            </button>
        </nav>
    )
}

export default Navbar
