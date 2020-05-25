import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../App';

import { handleFilter } from '../../utils/filter';

const FilterOptions = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    const { filter } = state;

    const onChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        dispatch({ type: 'setFilter', payload: { name: e.target.name, value } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const results = handleFilter(filter, state.products);
        dispatch({ type: 'filtered', payload: results });
    };

    const clear = () => {
        dispatch({ type: 'clearFilter' });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" name="search" placeholder="Search..." value={filter.search} onChange={onChange} />
                </div>
                <div className="row">
                    <label><input type="checkbox" name="men" className="mr-2" checked={filter.men} onChange={onChange} />Male</label>
                    <label><input type="checkbox" name="women" className="mr-2 ml-2" checked={filter.women} onChange={onChange} />Female</label>
                </div>
                <div className="row">
                    <span>${filter.price}</span><input type="range" min='0' max="30" value={filter.price} name="price" onChange={onChange} />
                </div>
                <div className="row">
                    <label><input type="checkbox" name="sizeSm" className="mr-2" checked={filter.sizeSm} onChange={onChange} />SM</label>
                    <label><input type="checkbox" name="sizeMd" className="mr-2 ml-2" checked={filter.sizeMd} onChange={onChange} />MD</label>
                    <label><input type="checkbox" name="sizeLg" className="mr-2 ml-2" checked={filter.sizeLg} onChange={onChange} />LG</label>
                </div>
                <div className="row">
                    <input className="btn btn-primary" type="submit" value="Filter" />
                </div>
            </form>
            <div className="row">
                <button className="btn btn-secondary mt-2" onClick={clear} >Reset</button>
            </div>
        </div>
    )
}

export default FilterOptions