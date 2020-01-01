import React, { Component } from 'react';
import ListingOverview from './ListingOverview'
import axios from 'axios'
import './Listing.css'
import ListingSummary from './ListingSummary'
import Container from '@material-ui/core/Container';
import NavBar from './AppBar'
import ListingDetails from './ListingDetails'
import ImageCarousel from './ImageCarousel'
import RoomDetails from './RoomDetails'
import Footer from './Footer'

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listing: null
        }
    }
    componentDidMount() {
        let currentComponent = this;
        axios.get('https://localhost:44365/api/Listing/5dffe125d8ae6147f476173c')
            .then(function (response) {
                console.log(response.data)
                currentComponent.setState({
                    listing: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    createListingsDetails() {
        let listingDetailsprop = []
        let bedroom = {
            heading: "BedRoom",
            "properties": this.state.listing.bedProperties.roomProperties
        }
        bedroom.properties["Number Of Rooms"] = this.state.listing.bedProperties.numberOfRooms
        listingDetailsprop.push(bedroom)
        let Bathroom = {
            heading: "BathRoom",
            "properties": this.state.listing.bathProperties.roomProperties
        }
        Bathroom.properties["Number Of Baths"] = this.state.listing.bathProperties.numberOfRooms
        listingDetailsprop.push(Bathroom)
        for (const key in this.state.listing.propetyProperties) {
            let newProperty = {
                heading: key,
                "properties": this.state.listing.propetyProperties[key]
            }
            listingDetailsprop.push(newProperty)
        }
        return listingDetailsprop


    }
    render() {
        let props = {}
        if (this.state.listing != null) {
            let summarryList = {
                "PropertyType": this.state.listing.propertySubType,
                "buildyear": this.state.listing.buildyear,
                "Story": 2
            }

            let listingDetailsprop = this.createListingsDetails()

            props = {
                "price": parseFloat(this.state.listing.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                "Address": this.state.listing.location.address,
                "mlsNumber": this.state.listing.listingID,
                "description": this.state.listing.description,
                "propertySummary": summarryList,
                "listingDetailsprop": listingDetailsprop,
                "lat": this.state.listing.location.latitude,
                "long": this.state.listing.location.longitude,
                "BedRooms": this.state.listing.bedProperties.roomProperties
            };
        }
        return (
            <div className="Listing">
                <Container maxWidth="xl" disableGutters={true}>
                    <NavBar />
                    <ImageCarousel />
                    <ListingOverview propsObject={props} />
                    <ListingSummary propsObject={props} />
                    <ListingDetails listingDetailsprop={props.listingDetailsprop} />
                    <RoomDetails rooms={props.BedRooms} />

                </Container>
                <Footer />
            </div>
        );
    }
}

export default Listing;