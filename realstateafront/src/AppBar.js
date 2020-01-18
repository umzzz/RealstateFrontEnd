import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, InputLabel, FormControl, Select, NativeSelect, MenuItem } from '@material-ui/core';
import axios from 'axios'
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: window.localStorage.getItem('rate')
        }
        this.handelChange = this.handelChange.bind(this)
    }

    async handelChange(evt) {
        let rate = await axios.get(`https://api.exchangeratesapi.io/latest?symbols=${this.state.currency},${evt.target.value}`)
        let exchnageRate =rate.data.rates[evt.target.value]/rate.data.rates[this.state.currency] 
        window.localStorage.setItem("exchnageRate", exchnageRate.toString())
        this.setState({ currency: evt.target.value })
        let currencySign = (evt.target.value === "CAD" || evt.target.value === "USD") ? "$" : "£"
        this.props.rate(exchnageRate,currencySign)
        window.localStorage.setItem("rate", evt.target.value)
        window.localStorage.setItem("currencySymbol", currencySign)

    }
    render() {
        let currenctSelectorStyle = {
            display: "flex",
            "justifyContent": "space-between"
        }
        return (
            <div >
                <AppBar position="static" style={{ backgroundColor: "#DCD0C0" }}>
                    <Toolbar style={currenctSelectorStyle}>
                        <Typography variant="h6" >
                            RealState APP
                        </Typography>
                        <FormControl>
                            <InputLabel style={{ width: "75px" }}>Curreny</InputLabel>
                            <Select
                                autoWidth
                                value={this.state.currency}
                                onChange={this.handelChange}
                            >
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'CAD'}>CAD</MenuItem>
                                <MenuItem value={'GBP'}>Pound</MenuItem>
                            </Select>
                        </FormControl>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;