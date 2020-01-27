import React, { Component } from 'react';
import PropertySummaryList from './PropertySummaryList'
import Grid from '@material-ui/core/Grid';
import './ListingSummary.css'
import Paper from '@material-ui/core/Paper';
import uuid from 'uuid/v4'
import ContentTab from './ContentTab'
import MapsComponent from './MapsComponent'

let display = ""
class ListingSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: true,
            map: false,
            setCss: false,
            width: "auto",
            height: "auto"

        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(clickString) {
        if (clickString === "description") {
            this.setState({ summary: true, map: false,   setCss: false});
        } else if (clickString === "map") {

            this.setState({ summary: false, map: true, setCss : true});
        }
    }
    render() {
        let listing = this.props.propsObject
        let summaryList = [];
        for (const key in listing.propertySummary) {
            summaryList.push(
                <Grid key={uuid()}>
                    <PropertySummaryList propertyKey={key} propertyValue={listing.propertySummary[key]} />
                </Grid>
            )
        }
        if (this.state.summary) {
            display = (
                <div>
                    <h2 className="ListingSummary-Heading">Description</h2>
                    <p className="ListingSummary-Content">{listing.description}</p>
                    <h2 className="ListingSummary-Heading">Property Summary</h2>
                    <div className="ListingSummary-Summary">
                        <Grid item xs={6}>
                            <Grid container justify="space-between" spacing={4}>
                                {summaryList}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )
        } else if (this.state.map) {
            display = (
                <MapsComponent lat={listing.location.latitude} lang={listing.location.longitude} />
            )
        }

        return (
            <Paper elevation={3} >
                <div className="ListingSummary card" 
                //style={style}
                >
                    <ContentTab selectTab={this.handleClick} />
                    {display}
                </div>
            </Paper>
        );
    }
}

export default ListingSummary;