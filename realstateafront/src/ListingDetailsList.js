import React, { Component } from 'react';
import './ListingDetailsList.css'

class ListingDetailsList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        // console.log(this.props.propertyValue.toString().toUpperCase())
        return (
            <div className="ListingDetailsList">
                <h4 className="ListingDetailsList-name">{this.props.name.toString().toUpperCase()}</h4>
                <p className="ListingDetailsList-value">{this.props.value.toString().toUpperCase()}</p>
            </div>
        );
    }
}

export default ListingDetailsList;