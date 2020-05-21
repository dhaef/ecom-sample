import React, { useEffect, useContext } from 'react'
import ItemsContainer from '../components/item/ItemsContainer';
import { DispatchContext } from '../App';

const Women = (props) => {
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch({ type: 'women' });
    }, [dispatch]);

    return (
        <>
            <ItemsContainer />
        </>
    )
}

export default Women
