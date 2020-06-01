import React, { useEffect } from 'react';
import { useStore } from 'store/index';

const Finalize = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        return () => {
            dispatch({ type: 'orderComplete' });
        }
    })

    return (
        <div>
            <h2>Thank you for you order {state.shipping.firstName}!</h2>
            <p>Confirmation sent to {state.shipping.email}</p>
        </div>
    )
}

export default Finalize
