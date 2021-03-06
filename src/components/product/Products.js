import React, { useEffect } from 'react';
import { useStore } from 'store';
import FilterOptions from 'components/filter/FilterOptions';
import Product from 'components/product/index';

const List = (props) => {
    // { sexFitFilter = 'clearFilter' }
    const { state, dispatch } = useStore();
    const {
        products,
        hasBeenFiltered,
        currentProducts
    } = state;

    useEffect(() => {
        dispatch({ type: props.sexFitFilter });
        // eslint-disable-next-line
    }, [props.sexFitFilter]);

    // useEffect(() => {
    //     dispatch({ type: 'clearFilter' });
    // }, []);

    let productList = [];
    if (!hasBeenFiltered) {
        productList = products.map(product => (
            <Product
                key={product.id}
                product={product}
            />
        ))
    } else if (hasBeenFiltered && currentProducts.length) {
        productList = currentProducts.map(product => (
            <Product
                key={product.id}
                product={product}
            />
        ))
    } else if ((hasBeenFiltered && !currentProducts.length)) {
        productList = <h5 className="card-title">Not Products</h5>
    }

    const showFilter = () => {
        dispatch({ type: 'showFilter' })
    }

    return (
        <div className="container mt-2">
            <div className="row">
                {state.hideFilter ?
                    <p
                        className="text-center mb-0"
                        onClick={showFilter}>
                        Show Filter Options
                        </p> :
                    <FilterOptions />}
            </div>
            <div className="row">
                <div className="col-12 col-md-12 products-container">
                    {/* <Filters /> */}
                    <div className="card-columns">
                        {productList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List