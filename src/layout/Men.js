import React, { useEffect, useContext } from 'react'
import ItemsContainer from '../components/item/ItemsContainer';
import { DispatchContext } from '../App';

const Men = (props) => {
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch({ type: 'men' });
    }, []);

    return (
        <>
            <ItemsContainer />
        </>
    )
}

export default Men
