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
                <div className="form-group">
                    <input
                        className="form-control form-control-md"
                        type="text" 
                        name="search" 
                        placeholder="Search..." 
                        value={filter.search} 
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="checkbox" name="men" style={{ marginRight: '.5rem' }} checked={filter.men} onChange={onChange} />
                    <label className="form-check-label" htmlFor="men">Male</label>
                    <input type="checkbox" name="women" style={{ marginRight: '.5rem', marginLeft: '.5rem' }} checked={filter.women} onChange={onChange} />
                    <label className="form-check-label" htmlFor="women">Female</label>
                </div>
                <div className="form-group">
                    <span style={{ width: '20%' }}>${filter.price}</span><input className="margin-center" type="range" min='0' max="30" value={filter.price} style={{ width: '80%' }} name="price" onChange={onChange} />
                </div>
                <div className="form-group">
                    {/* <label><input type="checkbox" name="sizeSm" style={{ marginRight: '.5rem' }} checked={filter.sizeSm} onChange={onChange} />SM</label>
                    <label><input type="checkbox" name="sizeMd" style={{ marginRight: '.5rem', marginLeft: '.5rem' }} checked={filter.sizeMd} onChange={onChange} />MD</label>
                    <label><input type="checkbox" name="sizeLg" style={{ marginRight: '.5rem', marginLeft: '.5rem' }} checked={filter.sizeLg} onChange={onChange} />LG</label> */}
                    <select 
                        name="size"
                        value={filter.size} 
                        onChange={onChange}
                        className="form-control form-control-md">
                        <option value='d'>Select a Size</option>
                        <option value="s">SM</option>
                        <option value="m">MD</option>
                        <option value="l">LG</option>
                    </select>
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Filter" />
                    <button 
                        className="btn btn-secondary" 
                        onClick={clear} 
                        style={{ marginLeft: '.5rem' }}
                        >Reset</button>
                </div>
            </form>
        </div>
    )
}

export default FilterOptions