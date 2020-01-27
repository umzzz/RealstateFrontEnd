import React, { Component } from "react";
import "./ListingDetails.css";
import ListingDetailsList from "./ListingDetailsList";
import {Divider,Grid,Paper,Typography} from "@material-ui/core";
import uuid from "uuid/v4";

class ListingDetails extends Component {
  static defaultProps = {
    listingDetailsprop: [
      {
        heading: "Test",
        properties: {
          name: "Some Key",
          value: "Some Value"
        }
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let properties = this.props.listingDetailsprop.map(x => (
      <Grid item xs={12} key={uuid()} style ={{padding :"8px 16px"}}>
        <Typography variant ="h5">{x.heading}</Typography>
        <Divider />
        <Grid item xs={12} container>
          {Object.entries(x.properties).map(([key, value]) => {
            return <ListingDetailsList key={uuid()} name={key} value={value} />;
          })}
        </Grid>
      </Grid>
    ));
    return (
      <Paper elevation={3}>
        <div className="ListingDetails">
          <Typography variant = "h3" gutterBottom>Building</Typography>
          <div className="ListingDetails-Summary">
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={4} className>
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
