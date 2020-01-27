import React, { Component } from "react";
import "./App.css";
import Listing from "./Listing";
import Container from "@material-ui/core/Container";
import { Route } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./AppBar";
import Search from "./Search";
import SearchResultMobile from "./SearchResultsMobile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeMultiplier: "1",
      rateSymbol: "$",
      currency: "USD"
    };
    // this.listingElement = React.createRef();
    this.updateRate = this.updateRate.bind(this);
  }
  updateRate(updatedRate, symbol, currency) {
    this.setState({
      exchangeMultiplier: updatedRate,
      rateSymbol: symbol,
      currency: currency
    });
  }
  render() {
    return (
      <div>
        <Route>
          <Container maxWidth="lg">
            <NavBar
              rate={this.updateRate}
              currencySymbol={this.state.currency}
            />
            <Route
              exact
              path="/"
              render={routeProps => <Search {...routeProps} />}
            />
            <Route
              exact
              path="/search"
              render={() => (
                <SearchResultMobile
                  rate={this.state.exchangeMultiplier}
                  currencySymbol={this.state.rateSymbol}
                />
              )}
            />
            <Route
              exact
              path="/listing/:id"
              render={routeProp => (
                <Listing
                  {...routeProp}
                  rate={this.state.exchangeMultiplier}
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
