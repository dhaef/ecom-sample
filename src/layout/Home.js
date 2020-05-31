import React from 'react';
import { useStore } from 'store/index';
import Product from 'components/product/index';
import Banner from 'components/style/Banner';

const Home = () => {
    const { state, dispatch } = useStore();
    const { products } = state;
    const spotlight = [products[0], products[4], products[6]];

    return (
        <>
            <Banner />
            <h2 className="text-center">Featured Products</h2>
            <div className="container card-columns">
                {spotlight.map(product => <Product key={product.id} product={product} />)}
            </div>
        </>
    )
}

export default Home