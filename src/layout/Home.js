import React, { useEffect } from 'react';
import { useStore } from 'store/index';
import ItemsContainer from 'components/item/ItemsContainer';

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
            <ItemsContainer />
        </>
    )
}

export default Home
