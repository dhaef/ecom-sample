import React, { useState, useContext } from 'react'

import { DispatchContext } from '../../App'

const Item = props => {
    const dispatch = useContext(DispatchContext);
    const [numberOfItems, setNumberOfItems] = useState({ number: 1, id: null });

    const pickSizeToColor = sizeToColor => {
        if (props.size.id == props.product.product_id && sizeToColor == props.size.size) {
            return 'size';
        }
    };

    return (
        <div className="card">
            <img className="card-img-top" src={props.product.img} alt="Card image cap" style={{ height: '10rem', objectFit: 'cover' }} />
            <div className="card-body">
                <h4 className="card-title">{props.product.name.slice(0, 1).toUpperCase()}{props.product.name.slice(1)}</h4>
                <p>
                    <span 
                        className={`cursor ${props.product.size.s > 0 ? 'font-weight-normal' : 'out-of-stock'} ${pickSizeToColor('s')}`} 
                        style={{ marginRight: '1rem' }} 
                        id={props.product.product_id}
                        onClick={e => dispatch({ type: 'setCurrentSize', payload: { size: 's', id: e.target.id } })}>
                            S
                    </span>
                    <span 
                        className={`cursor ${props.product.size.m > 0 ? 'font-weight-normal' : 'out-of-stock'} ${pickSizeToColor('m')}`} 
                        style={{ marginRight: '1rem' }}
                        id={props.product.product_id}
                        onClick={e => dispatch({ type: 'setCurrentSize', payload: { size: 'm', id: e.target.id } })}>
                            M
                    </span>
                    <span 
                        className={`cursor ${props.product.size.l > 0 ? 'font-weight-normal' : 'out-of-stock'} ${pickSizeToColor('l')}`} 
                        style={{ marginRight: '1rem' }} 
                        id={props.product.product_id}
                        onClick={e => dispatch({ type: 'setCurrentSize', payload: { size: 'l', id: e.target.id } })}>
                            L
                    </span>
                </p>
                <div className="card-text" style={{ marginBottom: '16px' }}>
                    <span>Quantity: </span>
                    <select value={numberOfItems.number} className="custom-select" id={props.product.product_id} onChange={e => setNumberOfItems({ number: e.target.value, id: e.target.id })}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <p className="card-text">Price: ${props.product.price}</p>
                <button 
                    className="btn btn-light" 
                    id={props.product.product_id} 
                    onClick={(e)=> {
                        props.addToCart(e.target.id, numberOfItems);
                        setNumberOfItems({ number: 1, id: null });
                    }}
                    >Add to 🛒
                </button>
            </div>
        </div>
    )
}

export default Item
