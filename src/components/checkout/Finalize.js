import React, { useEffect, useContext } from 'react';
import { useStore } from 'store/index';

const Finalize = () => {
    const {dispatch} = useStore();

    useEffect(() => {
        return () => {
            dispatch({ type: 'orderComplete' });
        }
    }, [])

    return (
        <div>
            <h2>Thank you for you order!</h2>
            <p>Check your email for confirmation</p>
        </div>
    )
}

export default Finalize
