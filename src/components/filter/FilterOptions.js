import React, { useContext, useEffect } from 'react';
import { DispatchContext, StateContext } from '../../App';

import { handleFilter } from '../../utils/filter';

const FilterOptions = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    const { filter } = state;

    useEffect(() => {
        const results = handleFilter(filter, state.products);
        dispatch({ type: 'filtered', payload: results });
    }, [filter, dispatch, state.products]);

    const onChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        dispatch({ type: 'setFilter', payload: { name: e.target.name, value } })
        // setfilter(
        //     { ...filter, [e.target.name]: value }
        // );
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const results = handleFilter(filter, state.products);
    //     dispatch({ type: 'filtered', payload: results });
    // };

    const clear = () => {
        dispatch({ type: 'clearFilter' });
    };

    const hide = () => {
        dispatch({ type: 'hideFilter' });
    };

    return (
        <div>
            <div className="row">
                <h1 className="center-item">Filters</h1>
            </div>
            <form 
                // onSubmit={handleSubmit}
            >
                <div className="row">
                    <input 
                        className="center-item filter-item"
                        type="text" 
                        name="search" 
                        placeholder="Search..." 
                        value={filter.search} 
                        onChange={onChange} />
                </div>
                <div className="row center-item" style={{ width: 'fit-content' }}>
                    <label><input type="checkbox" name="men" className="mr-2" checked={filter.men} onChange={onChange} />Male</label>
                    <label><input type="checkbox" name="women" className="mr-2 ml-2" checked={filter.women} onChange={onChange} />Female</label>
                </div>
                <div className="row center-item" style={{ width: 'fit-content' }}>
                    <p className="text-center">${filter.price}</p>
                    <input type="range" min='0' max="30" value={filter.price} name="price" onChange={onChange} />
                </div>
                <div className="row">
                    <select className="center-item filter-item" name="size" onChange={onChange}>
                        <option value="d">Select a size</option>
                        <option value="s">SM</option>
                        <option value="m">MD</option>
                        <option value="l">LG</option>
                    </select>
                </div>
                {/* <div className="row">
                    <input className="btn btn-primary" type="submit" value="Filter" />
                </div> */}
            </form>
            <div className="row">
                <button className={`btn btn-secondary mt-2 ${ window.innerWidth < 600 ? "ml-auto mr-1" : "ml-auto mr-auto"}`} onClick={clear} >Reset</button>
                { window.innerWidth < 600 ? <button className="btn btn-secondary mt-2 mr-auto ml-1" onClick={hide} >Hide</button> : null}
            </div>
        </div>
    )
}

export default FilterOptions