import React, { useEffect } from 'react';
import { useStore } from 'store/index';
import ItemsContainer from '../components/item/ItemsContainer';
import { DispatchContext } from '../App';

const Women = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        dispatch({ type: 'women' });
    }, []);

    return (
        <>
            <ItemsContainer />
        </>
    )
}

export default Women
