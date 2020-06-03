import React, { useEffect } from 'react';
import { useStore } from 'store/index';
import { Modal } from 'react-bootstrap';

const WishList = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        const currentWishList = JSON.parse(window.localStorage.getItem('wishList'));
        if (currentWishList) {
            dispatch({ type: 'setWishList', payload: currentWishList });
        }
    }, [dispatch]);

    const handleRemoveItemFromWishList = e => {
        const updatedWishList = state.wishList.filter(wishListItem => wishListItem.id !== +e.target.id);
        window.localStorage.setItem('wishList', JSON.stringify(updatedWishList));
        dispatch({ type: 'setWishList', payload: updatedWishList });
    };

    return (
        <Modal show={state.showWishList} animation={false} scrollable={true}>
            <Modal.Header>
                <Modal.Title>
                    Your Wish List
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.wishList.length === 0 ?
                    <h3 className="text-center">Your wish list is empty</h3> :
                    state.wishList.map(item => <div key={item.id}>
                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-4 col-md-4">
                                    <img src={item.img} className="card-img" alt="Card cap" style={{ height: '10rem', objectFit: 'cover' }}></img>
                                </div>
                                <div className="col-5 col-md-6">
                                    <div className="card-body">
                                        <p className="card-text" style={{ textTransform: 'capitalize' }}>{item.name}</p>
                                        <p className="card-text">{` $${item.price}`}</p>
                                    </div>
                                </div>
                                <div className="col-3 col-md-2" style={{ marginTop: '1rem' }}>
                                    <button className="btn btn-danger" id={item.id} onClick={handleRemoveItemFromWishList}>
                                        🗑
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" variant="secondary" onClick={() => dispatch({ type: 'showWishList', payload: false })}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default WishList
