import React from 'react'

const Item = props => {

    return (
        <div className="card">
            <img className="card-img-top" src={props.product.img} alt="Card image cap" style={{ height: '10rem', objectFit: 'cover' }} />
            <div className="card-body">
                <h4 className="card-title">{props.product.name.slice(0, 1).toUpperCase()}{props.product.name.slice(1)}</h4>
                <p>
                    <span className={props.product.size.s > 0 ? 'font-weight-normal' : 'out-of-stock'} style={{ marginRight: '.5rem' }}>S</span>
                    <span className={props.product.size.m > 0 ? 'font-weight-normal' : 'out-of-stock'} style={{ marginRight: '.5rem' }}>M</span>
                    <span className={props.product.size.l > 0 ? 'font-weight-normal' : 'out-of-stock'} style={{ marginRight: '.5rem' }}>L</span>
                </p>
                <p className="card-text">Price: ${props.product.price}</p>
                <button className="btn btn-light" id={props.product.product_id} onClick={(e)=>props.addToCart(e.target.id)}>Add to 🛒</button>
            </div>
        </div>
    )
}

export default Item
