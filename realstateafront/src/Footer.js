import React, { Component } from "react";
import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";

const styles = {
  FotterContnet: {
    margin: "auto",
    color: "black"
  },
  AppBar :{
    backgroundColor: "#F4F4F4" ,
    marginTop : "1.5vh"
  }
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
      const {classes} = this.props
    return (
      <div>
        <AppBar position="static" className = {classes.AppBar}>
          <Toolbar>
            <div className={classes.FotterContnet}>
              <Typography variant="body2">All rights Reserved</Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
