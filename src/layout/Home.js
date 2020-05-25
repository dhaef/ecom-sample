import React, { useEffect } from 'react';
import { useStore } from 'store/index';
import ItemsContainer from 'components/item/ItemsContainer';

const Home = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        dispatch({ type: 'clearFilter' })
    }, []);

    return (
        <>
            <ItemsContainer />
        </>
    )
}

export default Home
