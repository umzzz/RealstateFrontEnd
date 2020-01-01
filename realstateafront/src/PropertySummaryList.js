import React, { Component } from 'react';
import './PropertySummaryList.css'

class PropertySummaryList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="PropertySummaryList">
                <span className="PropertySummaryList-Key">{this.props.propertyKey.toString().toUpperCase()}</span>
                <span className="PropertySummaryList-Value">{this.props.propertyValue.toString().toUpperCase()}</span>
            </div>
        );
    }
}

export default PropertySummaryList;