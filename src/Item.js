import React from 'react'

const Item = props => {
    return (
        <div className="card">
            <img className="card-img-top" src={props.product.img} alt="Card image cap" style={{ height: '10rem', objectFit: 'cover' }} />
            <div className="card-body">
                <h4 className="card-title">{props.product.name}</h4>
                <p className="card-text">Price: ${props.product.price}</p>
            </div>
        </div>
    )
}

export default Item
