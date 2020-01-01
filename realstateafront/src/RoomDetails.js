import React, { Component } from 'react';
import { Typography, Paper } from '@material-ui/core';
import uuid from 'uuid/v4'
import './RoomDetails.css'

class RoomDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let properties = []
        if (this.props.rooms != undefined) {
            properties = Object.entries(this.props.rooms).map(x =>
                <div  key={uuid()}>
                    <div className="RoomsDetails-Detials">
                        <Typography variant="body1" className="RoomsDetails-Name" >
                            {x[0]}
                        </Typography>
                        <Typography variant="body1" className="RoomsDetails-value">
                            {x[1]}
                        </Typography>
                    </div>
                    <hr/>
                </div>
            )
        }

        return (
            <Paper elevation={3} >
                <div className="RoomsDetails">
                    <Typography variant="h3" >Rooms</Typography>
                    {properties}
                </div>
            </Paper>
        );
    }
}

export default RoomDetails;