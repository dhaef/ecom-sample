import React, { Component, useState } from 'react'


const FilterOptions = props => {
    const [filter, setFilter] = useState({
        search: '',
        price: 30
    })

    const onChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleFilterSubmit(filter)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" onChange={onChange} />
                <span>${filter.price}</span><input type="range" min='0' max="30" defaultValue="30" name="price" onChange={onChange} />
                <input className="btn btn-primary" type="submit" value="Filter" />
            </form>
            <button className="btn btn-secondary" onClick={props.clearFilter} style={{ marginTop: '.5rem' }}>Reset</button>
        </div>
    )
}

export default FilterOptions