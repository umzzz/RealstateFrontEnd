import React, { Component } from "react";
import {
  Paper,
  withStyles,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
const Styles = {
  root: {
    minHeight: "50vh",
    margin: "10px 0"
  },
  search: {
    display: "flex",
    justifyContent: "space-between",
    boxShadow: `7px 8px 15px -3px rgba(0,0,0,0.62);
      -webkit-box-shadow: 7px 8px 15px -3px rgba(0,0,0,0.62);
      -moz-box-shadow: 7px 8px 15px -3px rgba(0,0,0,0.62);`
  },
  searchForm: {
    width: "70%",
    padding: "0 15%",
    height: "20%"
  },
  searchBox: {
    padding: "2px 8px",
    display: "flex",
    alignItems: "center"
  },
  searchBoxContainer: {
    padding: "0 20%",
    maxHeight: "30%"
  },
  results: {
    width: "70%",
    margin: "0 15%",
    marginTop: "3rem"
  },
  resultsMessage: {
    display: "flex",
    justifyContent: "center"
  },
  select: {
    minWidth: 135,
    margin: "0 2%"
  },
  selectContainer: {
    padding: "0 17%"
  }
};
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      isLoaing: false,
      resultsDisplaying: false,
      resultFound: null,
      currentSelectType: "Residential",
      searchFilter: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  handleChange(evt) {
    this.setState({
      searchTerm: evt.target.value
    });
  }
  handleSwitchChange() {
    if (this.state.currentSelectType === "Residential") {
      this.setState({
        currentSelectType: "Comercial"
      });
    } else {
      this.setState({
        currentSelectType: "Residential"
      });
    }
  }
  handleClick(evt) {
    let currentComponent = this;
    evt.preventDefault();
    this.setState({
      isLoaing: true
    });
    let body = {
      SearchTerm: this.state.searchTerm,
      PropertyType: this.state.currentSelectType,
      Filters: this.state.searchFilter
    };
    console.log(body);

    axios
      .post(`https://localhost:44365/api/Listing/filter`, body)
      .then(function(response) {
        if (
          response.data ===
          "We couldnt find any listings please expand your search"
        ) {
          currentComponent.setState({
            resultsDisplaying: true,
            resultFound: null,
            isLoaing: false
          });
        } else {
          currentComponent.props.history.push({
            pathname: "/search",
            state: { results: response.data }
          });
        }
      });
  }
  handleFilterChange(evt) {
    if (evt.target.name === "minPrice") {
      this.setState(st => {
        let priceFilter = st.searchFilter.filter(x => x.FilterName === "Price");
        if (priceFilter.length === 0) {
          return st.searchFilter.push({
            FilterName: "Price",
            FilterValue: {
              gt: evt.target.value
            }
          });
        } else {
          st.searchFilter.map(x => {
            if (x.FilterName === "Price") {
              x.FilterValue["gt"] = evt.target.value;
            }
            return x;
          });
          return st;
        }
      });
    } else if (evt.target.name === "maxPrice") {
      this.setState(st => {
        let priceFilter = st.searchFilter.filter(x => x.FilterName === "Price");
        if (priceFilter.length === 0) {
          return st.searchFilter.push({
            FilterName: "Price",
            FilterValue: {
              lt: evt.target.value
            }
          });
        } else {
          st.searchFilter.map(x => {
            if (x.FilterName === "Price") {
              x.FilterValue["lt"] = evt.target.value;
            }
            return x;
          });
          return st;
        }
      });
    } else if (evt.target.name === "numberOfRooms") {
      let roomsfilter = {};
      if (evt.target.value.indexOf("+") === -1) {
        roomsfilter = {
          FilterName: "NumberOfBedRooms",
          FilterValue: {
            eq: evt.target.value
          }
        };
      } else {
        roomsfilter = {
          FilterName: "NumberOfBedRooms",
          FilterValue: {
            gt: evt.target.value.substring(0, 1)
          }
        };
      }
      this.setState(st => {
        let priceFilter = st.searchFilter.filter(
          x => x.FilterName === "NumberOfBedRooms"
        );
        if (priceFilter.length === 0) {
          return st.searchFilter.push(roomsfilter);
        } else {
          st.searchFilter.map(x => {
            if (
              x.FilterName === "NumberOfBedRooms" &&
              evt.target.value.indexOf("+") === -1
            ) {
              x.FilterValue = {
                eq: evt.target.value
              };
            } else {
              x.FilterValue = {
                gt: evt.target.value.substring(0, 1)
              };
            }
            return x;
          });
          return st;
        }
      });
    } else if (evt.target.name === "numberOfBathrooms") {
      let roomsfilter = {};
      if (evt.target.value.indexOf("+") === -1) {
        roomsfilter = {
          FilterName: "NumberOfBathRooms",
          FilterValue: {
            eq: evt.target.value
          }
        };
      } else {
        roomsfilter = {
          FilterName: "NumberOfBathRooms",
          FilterValue: {
            gt: evt.target.value.substring(0, 1)
          }
        };
      }
      this.setState(st => {
        let priceFilter = st.searchFilter.filter(
          x => x.FilterName === "NumberOfBathRooms"
        );
        if (priceFilter.length === 0) {
          return st.searchFilter.push(roomsfilter);
        } else {
          st.searchFilter.map(x => {
            if (
              x.FilterName === "NumberOfBathRooms" &&
              evt.target.value.indexOf("+") === -1
            ) {
              x.FilterValue = {
                eq: evt.target.value
              };
            } else {
              x.FilterValue = {
                gt: evt.target.value.substring(0, 1)
              };
            }
            return x;
          });
          return st;
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { resultsDisplaying, resultFound } = this.state;

    return (
      <Paper className={classes.root}>
        {
          <table style={{ width: "100%" }}>
            <tbody>
              <tr style={{ height: "5em" }}>
                <th>
                  <FormControl component="form" className={classes.searchForm}>
                    <div className={classes.search}>
                      <InputBase
                        className={classes.searchBox}
                        placeholder="Search Term"
                        inputProps={{ "aria-label": "search Box" }}
                        onChange={this.handleChange}
                      />
                      <IconButton
                        type="submit"
                        aria-label="search"
                        onClick={this.handleClick}
                      >
                        <SearchIcon />
                      </IconButton>
                    </div>
                  </FormControl>
                </th>
              </tr>
              <tr>
                <th>
                  <div className={classes.selectContainer}>
                    <FormControlLabel
                      control={
                        <Switch
                          //checked={state.checkedA}
                          onChange={this.handleSwitchChange}
                          color="default"
                          inputProps={{
                            "aria-label": "checkbox with default color"
                          }}
                        />
                      }
                      label={this.state.currentSelectType}
                    />
                    <FormControl className={classes.select}>
                      <InputLabel>
                        Min Price
                      </InputLabel>
                      <Select
                        defaultValue=""
                        name="minPrice"
                        onChange={this.handleFilterChange}
                      >
                        <MenuItem value={``} disabled>
                          Min Price
                        </MenuItem>
                        <MenuItem value={`100,000`}>100,000</MenuItem>
                        <MenuItem value={`200,000`}>200,000</MenuItem>
                        <MenuItem value={`300,000`}>300,000</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.select}>
                      <InputLabel>
                        Max Price
                      </InputLabel>
                      <Select
                        defaultValue=""
                        name="maxPrice"
                        onChange={this.handleFilterChange}
                      >
                        <MenuItem value={``} disabled>
                          Max Price
                        </MenuItem>
                        <MenuItem value={`100,000`}>100,000</MenuItem>
                        <MenuItem value={`200,000`}>200,000</MenuItem>
                        <MenuItem value={`300,000`}>300,000</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.select}>
                      <InputLabel>
                        # of rooms
                      </InputLabel>
                      <Select
                        defaultValue=""
                        name="numberOfRooms"
                        onChange={this.handleFilterChange}
                      >
                        <MenuItem value={``} disabled>
                          # of rooms
                        </MenuItem>
                        <MenuItem value={`1`}>1</MenuItem>
                        <MenuItem value={`2`}>2</MenuItem>
                        <MenuItem value={`3`}>3</MenuItem>
                        <MenuItem value={`3+`}>3+</MenuItem>
                      </Select>
                    </FormControl>
                    {this.state.currentSelectType === "Residential" && (
                      <FormControl className={classes.select}>
                        <InputLabel>
                          # of bathrooms
                        </InputLabel>
                        <Select
                          defaultValue=""
                          name="numberOfBathrooms"
                          onChange={this.handleFilterChange}
                        >
                          <MenuItem value={``} disabled>
                            # of bathrooms
                          </MenuItem>
                          <MenuItem value={`1`}>1</MenuItem>
                          <MenuItem value={`2`}>2</MenuItem>
                          <MenuItem value={`3`}>3</MenuItem>
                          <MenuItem value={`3+`}>3+</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </div>
                </th>
              </tr>
              {this.state.isLoaing && (
                <tr className={classes.results}>
                  <td>
                    <Skeleton
                      variant="rect"
                      width={"63vw"}
                      height={118}
                      style={{ maxWidth: "850px", margin: "auto" }}
                    />
                  </td>
                </tr>
              )}
              {resultFound == null && resultsDisplaying && (
                <tr>
                  <td>
                    <div className={classes.results}>
                      <Alert severity="info">
                        {" "}
                        <Typography
                          className={classes.resultsMessage}
                          variant="subtitle2"
                        >
                          We did not find anything please expand your search
                          criteria
                        </Typography>
                      </Alert>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </Paper>
    );
  }
}

export default withStyles(Styles)(Search);
