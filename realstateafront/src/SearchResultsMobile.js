import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import houseImage from "./img/1.jpg";
import uuid from "uuid/v4";
import "./SearchResultMobile.css";

let selectedResult = null;
class SearchResultMobile extends Component {
  static defaultProps = {
    results: [
      {
        id: "5e0ec44e86b1fdf3e5341287",
        listingID: "00927113",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        location: {
          latitude: "53.531027",
          longitude: "-113.687472",
          address: "21338 94 A Ave, Edmonton AB, Canada, T5T 4E3"
        },
        propertyType: 1,
        propertySubType: "House",
        price: 190000,
        bedProperties: {
          numberOfRooms: 4,
          roomProperties: {
            "The Room Baby Sleeps in has a bed and some toys":
              '15" x 10" x 10"',
            "Second Bedroom": '5" x 5" x 5"',
            "Third Bedroom": '5" x 5" x 5"',
            "Fourth Bedroom": '5" x 5" x 5"'
          }
        },
        bathProperties: {
          numberOfRooms: 1,
          roomProperties: {
            "Master Bathroom": '5" x 5" x 5"',
            "Upstairs Second Bathroom": '5" x 5" x 5"',
            "Powder Room": '5" x 5" x 5"'
          }
        },
        propetyProperties: {
          Exterior: {
            Roof: ["newly renovated"]
          },
          Interrior: {
            Kitchen: [
              "Quartz Counter Tops",
              "Tiles Flooring",
              "Newly Painted",
              "Newly Stove",
              "newly renovated",
              "newly renovated",
              "newly renovated",
              "Newly Stove",
              "newly renovated"
            ],
            Bath: ["Tiles"]
          }
        },
        buildyear: 2015,
        pictures: [
          {
            typeID: 0,
            url: ""
          }
        ],
        fees: "200"
      }
    ]
  };
  constructor(props) {
    super(props);
    this.state = {
      resultIsDisplayed: false,
      resultSelected: null
    };
    this._bound = null;
  }
  handleClick(result) {
    console.log(result);
    this.setState({
      resultIsDisplayed: true,
      resultSelected: result
    });
  }
  updateString(str) {
    if (str.length > 150) {
      return str.substring(1, 147) + "...";
    } else {
      return str;
    }
  }
  componentWillMount() {

  }

  render() {
    const { results } = this.props;
    const { resultIsDisplayed, resultSelected } = this.state;

    // let points = [];
    // results.forEach(result => {
    //   let location = { lat: result.location.latitude, lng: result.location.longitude }
    //   points.push(location)
    // });
    // let bound = new this.props.google.maps.LatLngBounds();
    // for (var i = 0; i < points.length; i++) {
    //   bound.extend(points[i]);
    // }
    return (
      <Grid
        classsname="Map-Container"
        item
        sm={12}
        style={{ position: "relative", height: "100%", width: "47.5vw" }}
      >
        <Map
          className="MapsComponent"
          google={this.props.google}
          zoom={14}
          initialCenter={{ lat: "53.531027", lng: "-113.687472" }}
          bou
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
          <Link to={`listing/${resultSelected.id}`}>
            <Card
              className={resultIsDisplayed ? "search-result-card" : ""}
              style={{
                position: "fixed",
                top: "59%",
                left: "31%",
                transform: "translate(-50%, -50%)",
                zIndex: "10",
                width: "35%"
              }}
            >
              <CardActionArea>
                <CardMedia
                  image={houseImage}
                  title="Contemplative Reptile"
                  style={{
                    height: "10rem", // as an example I am modifying width and height
                    width: "60%",
                    marginLeft: "20%"
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    ${resultSelected.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {this.updateString(resultSelected.description)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )}
      </Grid>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAYxKa8MehJ5V8hARdBbyJa_ecZ5pnhJso"
})(SearchResultMobile);
