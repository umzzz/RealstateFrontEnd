import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import './ListingDetails.css'
import ListingDetailsList from './ListingDetailsList'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import uuid from 'uuid/v4'

class ListingDetails extends Component {
    static defaultProps = {
        listingDetailsprop: [{
            heading: "Test",
            properties: {
                name: "Some Key",
                value: "Some Value"
            }
        }]
    }
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let properties = this.props.listingDetailsprop.map(x =>
            <Grid item xs={12} key = {uuid()} >
                <h3>{x.heading}</h3>
                <Divider />
                <Grid item xs={12}container >
                    {Object.entries(x.properties).map(([key, value]) => {
                        return <ListingDetailsList
                            key = {uuid()}
                            name={key}
                            value={value}
                        />
                    })}
                </Grid>

            </Grid>
        )
        return (
            <Paper elevation={3}>
                <div className="ListingDetails">
                    <h1 className="ListingDetails-Heading">Building</h1>
                    <div className="ListingDetails-Summary">
                        <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={4}>
                                {properties}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Paper>

        );
    }
}

export default ListingDetails;