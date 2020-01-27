import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: window.localStorage.getItem("selectedCurrency") || "USD"
    };
    this.handelChange = this.handelChange.bind(this);
  }
  componentWillMount() {
    let currentState = this;
    if (currentState.state.selectedCurrency !== "USD") {
      let selectedCurrency = currentState.state.selectedCurrency;
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?symbols=USD,${selectedCurrency}`
        )
        .then(function(rate) {
          window.localStorage.setItem("selectedCurrency", selectedCurrency);
          let exchnageRate =
            rate.data.rates[selectedCurrency] / rate.data.rates["USD"];
          let currencySign =
            selectedCurrency === "CAD" || selectedCurrency === "USD"
              ? "$"
              : "£";
          currentState.props.rate(exchnageRate, currencySign, selectedCurrency);
        });
    }
  }
  handelChange(evt) {
    let currentState = this;
    axios
      .get(
        `https://api.exchangeratesapi.io/latest?symbols=USD,${evt.target.value}`
      )
      .then(function(rate) {
        window.localStorage.setItem("selectedCurrency", evt.target.value);
        let exchnageRate =
          rate.data.rates[evt.target.value] / rate.data.rates["USD"];
        let currencySign =
          evt.target.value === "CAD" || evt.target.value === "USD" ? "$" : "£";
        currentState.props.rate(exchnageRate, currencySign, evt.target.value);
      });
  }
  render() {
    let currenctSelectorStyle = {
      display: "flex",
      justifyContent: "space-between"
    };
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#DCD0C0" }}>
          <Toolbar style={currenctSelectorStyle}>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Typography variant="h6">RealState APP</Typography>
            </Link>
            <FormControl>
              <InputLabel style={{ width: "75px" }}>Curreny</InputLabel>
              <Select
                autoWidth
                value={this.props.currencySymbol}
                onChange={this.handelChange}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"CAD"}>CAD</MenuItem>
                <MenuItem value={"GBP"}>Pound</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
