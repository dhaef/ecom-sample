import React, { useEffect, useContext } from 'react'
import ItemsContainer from '../components/item/ItemsContainer';
import { DispatchContext } from '../App';

const Home = (props) => {
    const dispatch = useContext(DispatchContext);

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