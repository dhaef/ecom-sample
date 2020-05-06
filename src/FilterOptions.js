import React, { useState } from 'react'


const FilterOptions = props => {
    const [filter, setFilter] = useState({
        search: '',
        price: 30,
        sizeSm: false,
        sizeMd: false,
        sizeLg: false,
    });

    const onChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleFilterSubmit(filter)
    };

    const clear = () => {
        setFilter({
            search: '',
            price: 30,
            sizeSm: false,
            sizeMd: false,
            sizeLg: false,
        });
        props.clearFilter();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" name="search" value={filter.search} onChange={onChange} />
                </div>
                <div className="row">
                    <span>${filter.price}</span><input type="range" min='0' max="30" value={filter.price} name="price" onChange={onChange} />
                </div>
                <div className="row">
                    <label><input type="checkbox" name="sizeSm" style={{ marginRight: '.5rem' }} checked={filter.sizeSm} onChange={onChange} />SM</label>
                    <label><input type="checkbox" name="sizeMd" style={{ marginRight: '.5rem', marginLeft: '.5rem' }} checked={filter.sizeMd} onChange={onChange} />MD</label>
                    <label><input type="checkbox" name="sizeLg" style={{ marginRight: '.5rem', marginLeft: '.5rem' }} checked={filter.sizeLg} onChange={onChange} />LG</label>
                </div>
                <div className="row">
                    <input className="btn btn-primary" type="submit" value="Filter" />
                </div>
            </form>
            <div className="row">
                <button className="btn btn-secondary" onClick={clear} style={{ marginTop: '.5rem' }}>Reset</button>
            </div>
        </div>
    )
}

export default FilterOptions