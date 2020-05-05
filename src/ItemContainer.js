import React, { Component } from 'react'

import Item from './Item'

export class ItemContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
                   
        }
    }

    handleDisplay() {
        if (this.props.hasBeenFiltered === false) {
            return this.props.products.map(product => <Item key={product.product_id} product={product} />)
        } else if (this.props.hasBeenFiltered === true && this.props.products.length > 0) {
            return this.props.products.map(product => <Item key={product.product_id} product={product} />)
        } else if (this.props.hasBeenFiltered === true && this.props.products.length === 0) {
            return <h5>No items found</h5>
        }
    }

    render() {
        return (
            <div className="card-columns">
                { this.handleDisplay() }
            </div>
        )
    }
}

export default ItemContainer
