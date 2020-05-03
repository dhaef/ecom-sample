import React, { Component } from 'react'

export class FilterOptions extends Component {
    constructor(props) {
        super(props);

        // this.onSearch = this.onSearch.bind(this)
    }



    render() {
        return (
            <div>
                <input onChange={(e) => this.props.filterSearch(e.target.value)} />
                <input type="range" min='0' max="30" defaultValue="30" onChange={(e) => this.props.filterSlider(e.target.value)} />
            </div>
        )
    }
}

export default FilterOptions
