import React, { useContext } from 'react'

import { DispatchContext, StateContext } from './App'

const Navbar = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <span className="navbar-brand" >FASHION REACT</span>
            <button className="btn btn-light" onClick={() => { dispatch({ type: 'toggleCart' }) }}>
                Cart <span role="img" aria-label="cart">🛒</span>
                <span className="badge badge-primary">{state.cart.length}</span>
            </button>
        </nav>
    )
}

export default Navbar
