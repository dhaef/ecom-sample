import React, { useEffect } from 'react';
import { useStore } from 'store/index';

import { handleFilter } from '../../utils/filter';

const FilterOptions = () => {
    const { state, dispatch } = useStore();

    const { filter } = state;

    useEffect(() => {
        const results = handleFilter(filter, state.products);
        dispatch({ type: 'filtered', payload: results });
    }, [filter, dispatch, state.products]);

    const onChange = (e) => {
        dispatch({ type: 'setFilter', payload: { name: e.target.name, value: e.target.value } })
    };

    const clear = () => {
        dispatch({ type: 'clearFilter' });
    };

    const hide = () => {
        dispatch({ type: 'hideFilter' });
    };

    return (
        <>
            <form className="filter-form ml-auto mb-2">
                <select name="sex" className="mr-2" onChange={onChange}>
                    <option value="d">Sex</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                </select>
                <select name="price" className="mr-2" onChange={onChange}>
                    <option value="d">Price</option>
                    <option value="lowest">$0 - $25</option>
                    <option value="low">$25 - $50</option>
                    <option value="middle">$50 - $75</option>
                    <option value="high">$75 - $100</option>
                    <option value="highest">$100+</option>
                </select>
                <select name="size" onChange={onChange}>
                    <option value="d">Size</option>
                    <option value="s">SM</option>
                    <option value="m">MD</option>
                    <option value="l">LG</option>
                </select>
            </form>
        </>
    )
}

export default FilterOptions