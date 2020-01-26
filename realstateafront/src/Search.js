import React, { Component } from "react";
import { Paper, withStyles, InputBase, FormControl } from "@material-ui/core";
import SearchResultMobile from "./SearchResultsMobile";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Skeleton from "@material-ui/lab/Skeleton";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Styles = {
  root: {
    minHeight: "80vh",
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
    margin: "0 15%"
  }
};
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      isLoaing: false,
      resultsDisplaying: false,
      resultFound: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(evt) {
    this.setState({
      searchTerm: evt.target.value
    });
  }
  handleClick(evt) {
    let currentComponent = this;
    evt.preventDefault();
    this.setState({
      isLoaing: true
    });
    let body = {
      SearchTerm: this.state.searchTerm,
      Filters: []
    };

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
  render() {
    const { classes } = this.props;
    const { resultsDisplaying, resultFound } = this.state;

    return (
      <Paper className={classes.root}>
        {
          <table style={{ width: "100%" }}>
            <tbody>
              <tr style={{ height: "8em" }}>
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
                    <Paper className={classes.results}>
                      <h4>We did not find anything please search again</h4>
                    </Paper>
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
