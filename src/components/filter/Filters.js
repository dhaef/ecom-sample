import React, { useContext } from 'react';
import { StateContext } from '../../App';

const Filters = () => {
    const state = useContext(StateContext);

    const { filter } = state;

    return (
        <div>
            { filter.search !== '' ? <p className="badge badge-primary badge-m-right">{filter.search}</p> : null }
            { filter.price < 30 ? <p className="badge badge-primary badge-m-right">{`>$${filter.price}`}</p> : null }
            { filter.sizeSm === true ? <p className="badge badge-primary badge-m-right">S</p> : null }
            { filter.sizeMd === true ? <p className="badge badge-primary badge-m-right">M</p> : null }
            { filter.sizeLg === true ? <p className="badge badge-primary badge-m-right">L</p> : null }
            { filter.men === true ? <p className="badge badge-primary badge-m-right">Men</p> : null }
            { filter.women === true ? <p className="badge badge-primary badge-m-right">Women</p> : null }
        </div>
    )
}

export default Filters
