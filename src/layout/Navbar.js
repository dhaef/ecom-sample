import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useStore } from 'store/index';

const Navbar = () => {
    const {state, dispatch} = useStore();

    useEffect(() => {
        const currentWishList = JSON.parse(window.localStorage.getItem('wishList'));
        if (currentWishList) {
            dispatch({ type: 'setWishList', payload: currentWishList });
        }
    }, [dispatch]);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to='/' className="navbar-brand">{ window.innerWidth > 600 && 'REACT' } CLOTHING</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to='/men'>Men</Link>
                    <Link className="nav-item nav-link" to='/women'>Women</Link>
                </div>
            </div>
            <Link to='/wish-list' className="nav-item nav-link">
                <button 
                    role="img" 
                    aria-label="heart" 
                    className="btn btn-light"
                    style={{ cursor: 'pointer' }}>🖤
                        <span 
                        role="img" 
                        aria-label="heart" 
                        className="badge badge-danger"
                        >{state.wishList.length}</span>
                </button>
            </Link>
            <button className="btn btn-light" onClick={() => { dispatch({ type: 'toggleCart' }) }}>
                <span role="img" aria-label="cart">🛒</span>
                <span className="badge badge-primary">{state.cart.length}</span>
            </button>
        </nav>
    )
}

export default Navbar
