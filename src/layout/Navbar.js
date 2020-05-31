import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from 'store/index';

const Navbar = () => {
    const { state, dispatch } = useStore();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const currentWishList = JSON.parse(window.localStorage.getItem('wishList'));
        if (currentWishList) {
            dispatch({ type: 'setWishList', payload: currentWishList });
        }
    }, [dispatch]);

    return (
        <nav className="navbar navbar-expand-md navbar-dark ">
            <Link to='/' className="navbar-brand">DOSS</Link>
            <button
                className="navbar-toggler"
                type="button"
                onClick={() => setShowMenu(!showMenu)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`navbar-collapse ${showMenu ? "" : "collapse"}`} id="navbarNav">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to='/men'>Men</Link>
                    <Link className="nav-item nav-link" to='/women'>Women</Link>
                </div>
                <div className="ml-auto">
                    <button
                        role="img"
                        aria-label="heart"
                        className="btn btn-light mr-2"
                        onClick={() => { dispatch({ type: 'showWishList', payload: true }) }}
                        style={{ cursor: 'pointer' }}>🖤
                            <span
                            role="img"
                            aria-label="heart"
                            className="badge badge-danger"
                        >{state.wishList.length}</span>
                    </button>
                    <button className="btn btn-light" onClick={() => { dispatch({ type: 'toggleCart' }) }}>
                        <span role="img" aria-label="cart">🛒</span>
                        <span className="badge badge-primary">{state.cart.length}</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
