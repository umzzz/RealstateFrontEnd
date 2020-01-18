import React, { Component } from 'react';
import ListingOverview from './ListingOverview'
import axios from 'axios'
import './Listing.css'
import ListingSummary from './ListingSummary'
import Container from '@material-ui/core/Container';
import ListingDetails from './ListingDetails'
import ImageCarousel from './ImageCarousel'
import RoomDetails from './RoomDetails'

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listing: null,
            properties: {},
        }
        this.updatePrice = this.updatePrice.bind(this)
    }
    componentDidMount() {
        let currentComponent = this;
        axios.get(`https://localhost:44365/api/Listing/${this.props.match.params.id}`)
            .then(function (response) {
                console.log(response.data)
                currentComponent.setState({
                    listing: response.data
                })
                if (currentComponent.state.listing != null) {
                    let summarryList = {
                        "PropertyType": currentComponent.state.listing.propertySubType,
                        "buildyear": currentComponent.state.listing.buildyear,
                        "Story": 2
                    }

                    let listingDetailsprop = currentComponent.createListingsDetails()

                    let props = {
                        "price": currentComponent.getPrice(),
                        "Address": currentComponent.state.listing.location.address,
                        "mlsNumber": currentComponent.state.listing.listingID,
                        "description": currentComponent.state.listing.description,
                        "propertySummary": summarryList,
                        "listingDetailsprop": listingDetailsprop,
                        "lat": currentComponent.state.listing.location.latitude,
                        "long": currentComponent.state.listing.location.longitude,
                        "BedRooms": currentComponent.state.listing.bedProperties.roomProperties
                    };
                    console.log(props)
                    currentComponent.setState({ properties: props })
                }
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
    updatePrice(updatedRate){

        let newPrice = parseFloat(this.state.properties.price) * updatedRate
        this.setState(st => {
            st.properties.price = newPrice
        })
    }
    getPrice() {
        let newPrice = parseFloat(this.state.listing.price) * this.props.rate
        return newPrice.toFixed(2)
    }
    render() {
        return (
            <div className="Listing">
                <Container maxWidth="xl" disableGutters={true}>
                    <ImageCarousel />
                    <ListingOverview propsObject={this.state.properties} price={this.state.properties.price} key={this.props.rate} currencySymbol = {this.props.currencySymbol} />
                    <ListingSummary propsObject={this.state.properties} />
                    <ListingDetails listingDetailsprop={this.state.properties.listingDetailsprop} />
                    <RoomDetails rooms={this.state.properties.BedRooms} />
                </Container>
            </div>
        );
    }
}

export default Listing;