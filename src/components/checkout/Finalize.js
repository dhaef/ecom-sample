import React, { useEffect, useContext } from 'react';
import {DispatchContext} from '../../App';

const Finalize = () => {
    const dispatch = useContext(DispatchContext);

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
