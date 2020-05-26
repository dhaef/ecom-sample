import React, { useEffect } from 'react';
import { useStore } from 'store/index';
import Products from 'components/Product/Products';

const Home = ({ sexFitFilter = 'clearFilter' }) => {
    const { state, dispatch } = useStore();

    useEffect(() => {
      dispatch({ type: sexFitFilter });
    }, [sexFitFilter]);

    useEffect(() => {
        dispatch({ type: 'clearFilter' });
    }, []);

    return (
        <>
            <Products />
        </>
    )
}

export default Home
