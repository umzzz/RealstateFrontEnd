import React, { Component } from 'react';
import './ListingDetailsList.css'
import {Typography} from '@material-ui/core'
import uuid from 'uuid/v4'
class ListingDetailsList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let style ={
            item : {
                paddingRigth :"10rem"
            },
            container :{
                display : "flex",
                flexDirection : "column",
                flexWrap : "wrap",

            }
        }
        let properties = Array.isArray(this.props.value)
            ? <div className ="ListingDetailsList-Container" > {this.props.value.map(p => <div key={uuid()} className="ListingDetailsList-value-multiple">{p}</div>)} </div>
            : <p className="ListingDetailsList-value">{this.props.value.toString().toUpperCase()}</p>
        return (
            <div className="ListingDetailsList">
            <Typography variant="button" className="ListingDetailsList-name">{this.props.name.toString().toUpperCase()}</Typography>
                {properties}
            </div>
        );
    }
}

export default ListingDetailsList;