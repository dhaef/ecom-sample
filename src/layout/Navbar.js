import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { DispatchContext, StateContext } from '../App';

const Navbar = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    useEffect(() => {
        const currentWishList = JSON.parse(window.localStorage.getItem('wishList'));
        if (currentWishList) {
            dispatch({ type: 'setWishList', payload: currentWishList });
        }
    }, [dispatch]);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to='/' className="navbar-brand" >FASHION REACT</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to='/men'>Men</Link>
                    <Link className="nav-item nav-link" to='/women'>Women</Link>
                </div>
            </div>
            <Link to='/wish-list' className="nav-item nav-link">
                <div 
                    role="img" 
                    aria-label="heart" 
                    className="btn btn-light notify"
                    style={{ cursor: 'pointer' }}>🖤
                    { state.wishList.length === 0 ? null : <span className="badge badge-danger">{state.wishList.length}</span> }
                </div>
            </Link>
            <button className="btn btn-light" onClick={() => { dispatch({ type: 'toggleCart' }) }}>
                Cart <span role="img" aria-label="cart">🛒</span>
                <span className="badge badge-primary">{state.cart.length}</span>
            </button>
        </nav>
    )
}

export default Navbar
