import React, { Component } from 'react';
import './ListingOverview.css'
import { Typography, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Avatar } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class ListingOverview extends Component {
    render() {
        return (
            <Paper elevation={3}>
                <div className="ListingOverview-Content card">
                    <div className="ListingOverview-Details">
                        <Typography variant="h3" className="ListingOverview-Price">${this.props.propsObject.price}</Typography>
                        <div className = "ListingOverview-Address">
                            <Typography variant="subtitle2">{this.props.propsObject.Address}</Typography>
                            <Typography variant="subtitle2" style ={{paddingTop : "8px"}}>MLS Number: {this.props.propsObject.mlsNumber}</Typography>
                        </div>
                    </div>
                    <ExpansionPanel style={{ backgroundColor: "#adadad" }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >

                            <Typography variant="h6">Contact Us</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Avatar alt="Umair Rajan" src="/img/Umair.jpg" />
                            <div className="ListingOverview-ContactInfo">
                                <Typography variant="subtitle2" >
                                    Umair Rajan
                            </Typography>
                                <Typography variant="subtitle2" >
                                    Tel : 780-271-8828
                            </Typography>
                                <Typography variant="subtitle2" >
                                    Email : umairrajan@gamil.com
                            </Typography>
                            </div>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Paper>
        );
    }
}

export default ListingOverview;