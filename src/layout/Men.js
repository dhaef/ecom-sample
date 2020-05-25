import React, { useEffect } from 'react';
import { useStore } from 'store/index';
import ItemsContainer from '../components/item/ItemsContainer';

const Men = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        dispatch({ type: 'men' });
    }, [dispatch]);

    return (
        <>
            <ItemsContainer />
        </>
    )
}

export default Men
