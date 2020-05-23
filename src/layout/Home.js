import React, { useEffect, useContext } from 'react';
import ItemsContainer from '../components/item/ItemsContainer';
import { DispatchContext } from '../App';

const Home = () => {
    const dispatch = useContext(DispatchContext);

    useEffect(() => {
        dispatch({ type: 'clearFilter' })
    }, [dispatch]);

    return (
        <>
            <ItemsContainer />
        </>
    )
}

export default Home
