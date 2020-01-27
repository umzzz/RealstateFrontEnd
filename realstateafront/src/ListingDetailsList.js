import React, { Component } from "react";
import "./ListingDetailsList.css";
import { Typography } from "@material-ui/core";
import uuid from "uuid/v4";
class ListingDetailsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let properties = Array.isArray(this.props.value) ? (
      <div className="ListingDetailsList-Multiple">
        <Typography
          variant="button"
          className="ListingDetailsList-Name-Multiple"
        >
          {this.props.name.toString().toUpperCase()}
        </Typography>
        <div className="ListingDetailsList-Container-Multiple">
          {this.props.value.map(p => (
            <div key={uuid()} className="ListingDetailsList-Value-Multiple">
              {p}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="ListingDetailsList">
        <Typography variant="button" className="ListingDetailsList-Name">
          {this.props.name.toString().toUpperCase()}
        </Typography>
        <p className="ListingDetailsList-Value">
          {this.props.value.toString().toUpperCase()}
        </p>
      </div>
    );
    return <React.Fragment>{properties}</React.Fragment>;
  }
}

export default ListingDetailsList;
