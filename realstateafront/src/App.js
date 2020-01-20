import React, { Component } from "react";
import "./App.css";
import Listing from "./Listing";
import Container from "@material-ui/core/Container";
import { Route } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./AppBar";
import Search from "./Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeMultiplier: window.localStorage.getItem("exchnageRate") || "1",
      rateSymbol: window.localStorage.getItem("currencySymbol") || "$"
    };
    this.listingElement = React.createRef();
    this.updateRate = this.updateRate.bind(this);
  }
  componentWillMount() {
    window.localStorage.getItem("rate") ||
      window.localStorage.setItem("rate", "CAD");
    window.localStorage.getItem("exchnageRate") ||
      window.localStorage.setItem("exchnageRate", "1");
    window.localStorage.getItem("exchnageRate") ||
      window.localStorage.setItem("currencySymbol", "$");
  }
  updateRate(updatedRate, symbol) {
    this.listingElement.current.updatePrice(updatedRate);
    this.setState({
      exchangeMultiplier: updatedRate,
      rateSymbol: symbol
    });
  }
  render() {
    return (
      <div>
        <Route>
          <Container maxWidth="lg">
            <NavBar rate={this.updateRate} />
            <Route exact path="/" render={ () => <Search />} />
            <Route
              exact
              path="/listing/:id"
              render={routeProp => (
                <Listing
                  {...routeProp}
                  rate={this.state.exchangeMultiplier}
                  ref={this.listingElement}
                  currencySymbol={this.state.rateSymbol}
                />
              )}
            />
            <Footer />
          </Container>
        </Route>
      </div>
    );
  }
}
export default App;
