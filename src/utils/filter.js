// import React, { useContext, useEffect } from 'react';
// import { StateContext, DispatchContext } from '../App'
// options, products
export const handleFilter = (options, products) => {
    // const state = useContext(StateContext);
    // const dispatch = useContext(DispatchContext);

    let filtered = products.slice();
    // let options = state.filter;

    // console.log(options)

    if (options.search) {
        const search = options.search.toLowerCase();
        filtered = filtered.filter(product => {
            if (product.name.includes(search) || product.category.includes(search)) {
                return product;
            }
            return null;
        });
    };

    if (options.men === false) {
        filtered = filtered.filter(product => product.fit.includes('women'));
    }

    if (options.women === false) {
        filtered = filtered.filter(product => product.fit.includes('men'));
    }

    if (options.price !== 30) {
        filtered = filtered.filter(product => product.price < options.price);
    };

    if (options.sizeSm) {
        filtered = filtered.filter(product => product.size.s > 0);
    };

    if (options.sizeMd) {
        filtered = filtered.filter(product => product.size.m > 0);
    };

    if (options.sizeLg) {
        filtered = filtered.filter(product => product.size.l > 0);
    };
    return filtered;
    // dispatch({ type: 'filtered', payload: filtered });
}
