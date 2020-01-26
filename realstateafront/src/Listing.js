import React, { Component } from "react";
import ListingOverview from "./ListingOverview";
import axios from "axios";
import "./Listing.css";
import ListingSummary from "./ListingSummary";
import Container from "@material-ui/core/Container";
import ListingDetails from "./ListingDetails";
import ImageCarousel from "./ImageCarousel";
import RoomDetails from "./RoomDetails";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingIsFetched: false
    };
    this.updatePrice = this.updatePrice.bind(this);
    this._currentListing = null;
  }
  async componentWillMount() {
    try {
      let fetchedListing = await axios.get(
        `https://localhost:44365/api/Listing/${this.props.match.params.id}`
      );
      console.log(fetchedListing.data);
      this._currentListing = fetchedListing.data;
      this._currentListing["propertySummary"] = {
        PropertyType: fetchedListing.data.propertySubType,
        buildyear: fetchedListing.data.buildyear,
        Story: 2
      };
      this._currentListing["listingDetailsprop"] = this.createListingsDetails()
      this.setState({
        listingIsFetched: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  //     axios.get(`https://localhost:44365/api/Listing/${this.props.match.params.id}`)
  //         .then(function (response) {
  //             console.log(response.data)
  //             currentComponent.setState({
  //                 listing: response.data
  //             })
  //             if (currentComponent.state.listing != null) {
  //                 let summarryList = {
  //                     "PropertyType": currentComponent.state.listing.propertySubType,
  //                     "buildyear": currentComponent.state.listing.buildyear,
  //                     "Story": 2
  //                 }

  //                 let listingDetailsprop = currentComponent.createListingsDetails()

  //                 currentComponent._currentListing  = {
  //                     "price": currentComponent.getPrice(),
  //                     "Address": currentComponent.state.listing.location.address,
  //                     "mlsNumber": currentComponent.state.listing.listingID,
  //                     "description": currentComponent.state.listing.description,
  //                     "propertySummary": summarryList,
  //                     "listingDetailsprop": listingDetailsprop,
  //                     "lat": currentComponent.state.listing.location.latitude,
  //                     "long": currentComponent.state.listing.location.longitude,
  //                     "BedRooms": currentComponent.state.listing.bedProperties.roomProperties,
  //                     attachmets: currentComponent.state.listing.pictures
  //                 };
  //                 console.log(currentComponent._currentListing)
  //             }
  //         })
  //         .catch(function (error) {

  //         })
  // }
  createListingsDetails() {
    let listingDetailsprop = [];
    let bedroom = {
      heading: "BedRoom",
      properties: this._currentListing.bedProperties.roomProperties
    };
    bedroom.properties[
      "Number Of Rooms"
    ] = this._currentListing.bedProperties.numberOfRooms;
    listingDetailsprop.push(bedroom);
    let Bathroom = {
      heading: "BathRoom",
      properties: this._currentListing.bathProperties.roomProperties
    };
    Bathroom.properties[
      "Number Of Baths"
    ] = this._currentListing.bathProperties.numberOfRooms;
    listingDetailsprop.push(Bathroom);
    for (const key in this._currentListing.propetyProperties) {
      let newProperty = {
        heading: key,
        properties: this._currentListing.propetyProperties[key]
      };
      listingDetailsprop.push(newProperty);
    }
    return listingDetailsprop;
  }
  updatePrice(updatedRate) {
    let newPrice = parseFloat(this._currentListing.price) * updatedRate;
    this.setState(st => {
      st.properties.price = newPrice;
    });
  }
  getPrice() {
    let newPrice = parseFloat(this._currentListing.price) * this.props.rate;
    return newPrice.toFixed(2);
  }
  render() {
    return (
      <React.Fragment>
        {this.state.listingIsFetched && (
          <div className="Listing">
            <Container maxWidth="xl" disableGutters={true}>
              <ImageCarousel images={this._currentListing.pictures} />
              <ListingOverview
                propsObject={this._currentListing}
                price={this._currentListing.price}
                key={this.props.rate}
                currencySymbol={this.props.currencySymbol}
              />
              <ListingSummary propsObject={this._currentListing} />
              <ListingDetails
                listingDetailsprop={this._currentListing.listingDetailsprop}
              />
              <RoomDetails rooms={this._currentListing.bedProperties.roomProperties} />
            </Container>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Listing;
