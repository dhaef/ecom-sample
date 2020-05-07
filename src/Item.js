import React from 'react'

const Item = props => {

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
                        onClick={e => props.setCurrentSize('s', e.target.id)}>
                            S
                    </span>
                    <span 
                        className={`cursor ${props.product.size.m > 0 ? 'font-weight-normal' : 'out-of-stock'} ${pickSizeToColor('m')}`} 
                        style={{ marginRight: '1rem' }}
                        id={props.product.product_id}
                        onClick={e => props.setCurrentSize('m', e.target.id)}>
                            M
                    </span>
                    <span 
                        className={`cursor ${props.product.size.l > 0 ? 'font-weight-normal' : 'out-of-stock'} ${pickSizeToColor('l')}`} 
                        style={{ marginRight: '1rem' }} 
                        id={props.product.product_id}
                        onClick={e => props.setCurrentSize('l', e.target.id)}>
                            L
                    </span>
                </p>
                <p className="card-text">Price: ${props.product.price}</p>
                <button className="btn btn-light" id={props.product.product_id} onClick={(e)=>props.addToCart(e.target.id)}>Add to 🛒</button>
            </div>
        </div>
    )
}

export default Item
