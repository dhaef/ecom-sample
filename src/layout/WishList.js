import React, { useContext } from 'react'
import { StateContext, DispatchContext } from '../App'

const WishList = () => {
    const state = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    return (
        <div className="container">
            <h2>Your Wish List</h2>
            { state.wishList.length === 0 ? 
                <h3>Your wish list is empty</h3> : 
                state.wishList.map(item => <div key={item.product_id}>
                    <div className="card mb-3">
                        <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={item.img} className="card-img" alt="Card cap" style={{ height: '10rem', objectFit: 'cover' }}></img>
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <p className="card-text">{`${item.name.slice(0, 1).toUpperCase()}${item.name.slice(1)}`}</p>
                                <p className="card-text">{` $${item.price}`}</p>
                            </div>
                        </div>
                        <div className="col-md-2" style={{ marginTop: '1rem' }}>
                            <button className="btn btn-danger" id={item.product_id} onClick={e => dispatch({ type: 'removeItemFromWishList', payload: +e.target.id })}>
                            🗑
                            </button>
                        </div>
                        </div>
                    </div>
                </div>) }
        </div>
    )
}

export default WishList
