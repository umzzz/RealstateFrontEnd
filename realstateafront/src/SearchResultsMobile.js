import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, } from "google-maps-react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import uuid from "uuid/v4";
import "./SearchResultMobile.css";
import { withRouter, Redirect } from "react-router-dom";
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";

class SearchResultMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultIsDisplayed: false,
      resultSelected: null,
      resultAnimation: ""
    };
    this.handleCardClose = this.handleCardClose.bind(this);
  }
  getPrice(price) {
    console.log(price);
    return parseFloat(price * this.props.rate)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  handleClick(result) {
    this.setState({
      resultIsDisplayed: true,
      resultSelected: result,
      resultAnimation: "animationActive"
    });
  }
  handleCardClose() {
    this.setState({
      resultIsDisplayed: false,
      resultAnimation: ""
    });
  }
  updateString(str) {
    if (str.length > 150) {
      return str.substring(1, 147) + "...";
    } else {
      return str;
    }
  }
  render() {
    let results = null;
    if (
      this.props.location != null &&
      this.props.location.state != null &&
      this.props.location.state.results != null
    ) {
      results = this.props.location.state.results;
    }
    const { resultIsDisplayed, resultSelected, resultAnimation } = this.state;
    let bounds = new this.props.google.maps.LatLngBounds();
    results.forEach(result => {
      let latlng = new this.props.google.maps.LatLng(
        result.location.latitude,
        result.location.longitude
      );
      bounds.extend(latlng);
    });
    return (
      <div>
        {!results ? (
          <Redirect to="/" />
        ) : (
          <Grid
            classsname="Map-Container"
            item
            sm={12}
            style={{ position: "relative", height: "80vh" }}
          >
            <Map
              className="MapsComponent"
              google={this.props.google}
              zoom = {10}
              initialCenter={{
                lat: bounds.getCenter().lat(),
                lng: bounds.getCenter().lng()
              }}
              bounds={bounds}
            >
              {results.map(result => (
                <Marker
                  onClick={() => this.handleClick(result)}
                  key={uuid()}
                  position={{
                    lat: result.location.latitude,
                    lng: result.location.longitude
                  }}
                />
              ))}
            </Map>
            {resultIsDisplayed && resultSelected && (
              <Card
                className={
                  resultIsDisplayed
                    ? `search-result-card ${resultAnimation}`
                    : ""
                }
                style={{
                  zIndex: "10",
                  maxWidth: "50%",
                  display: "flex",
                  margin: "auto"
                }}
              >
                <CardActionArea>
                  <CardMedia
                    image={`https://localhost:44365/api/Attachment/getObject/${resultSelected.pictures[0].url}/500/170`}
                    title="SelectedListing"
                    style={{
                      height: "10rem",
                      width: "100%",
                      margin: "auto"
                    }}
                  />
                  <CancelPresentationRoundedIcon
                    style={{
                      position: "absolute",
                      right: "10px",
                      down: "10px"
                    }}
                    onClick={this.handleCardClose}
                  />
                  <Link
                    to={`listing/${resultSelected.id}`}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {this.props.currencySymbol}
                        {this.getPrice(resultSelected.price)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {this.updateString(resultSelected.description)}
                      </Typography>
                    </CardContent>
                  </Link>
                </CardActionArea>
              </Card>
            )}
          </Grid>
        )}
      </div>
    );
  }
}

export default withRouter(
  GoogleApiWrapper({
    apiKey: "AIzaSyAYxKa8MehJ5V8hARdBbyJa_ecZ5pnhJso"
  })(SearchResultMobile)
);
