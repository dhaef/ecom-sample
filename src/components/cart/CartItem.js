import React from 'react'

const CartItem = props => {
    return (
        <div className="card text-center">
            <div className="card-body">
                <p className="card-text">{ `${props.product.name.slice(0,1).toUpperCase()}${props.product.name.slice(1)}` }</p>
                <p className="card-text">
                    {`Size: ${props.product.customerSize.s > 0 ? `S : ${props.product.customerSize.s}` : ''}
                            ${props.product.customerSize.m > 0 ? `M : ${props.product.customerSize.m}` : ''}
                            ${props.product.customerSize.l > 0 ? `L : ${props.product.customerSize.l}` : ''}`}
                </p>
                <p className="card-text">{` $${props.product.price}`}</p>
                {/* <p className="card-text">{`Quantity: ${props.product.totalNumberOfItems}`}</p> */}
                <button className="btn btn-danger" id={props.product.product_id} onClick={e => props.removeFromCart(e.target.id)}>
                    🗑
                </button>
            </div>
        </div>
    )
}

export default CartItem
