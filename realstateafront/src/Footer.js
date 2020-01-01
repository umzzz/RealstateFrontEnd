import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div >
            <AppBar position="static" style={{ backgroundColor: "#F4F4F4" }}>
                <Toolbar>
                    <div className = "Footer-Content">
                        <Typography variant="body2" >
                            All rights Reserved
                    </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>);
    }
}

export default Footer;