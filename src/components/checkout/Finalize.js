import React, { useContext } from 'react';
import { DispatchContext } from '../../App';

const Finalize = () => {
    const dispatch = useContext(DispatchContext);

    return (
        <div>
            <h2>Thank you for you order!</h2>
            <p>Check your email for confirmation</p>
            <button 
                    className="btn btn-dark" 
                    onClick={() => dispatch({ type: 'setCheckoutStep', payload: 3 })}
                    >Go Back</button>
        </div>
    )
}

export default Finalize
