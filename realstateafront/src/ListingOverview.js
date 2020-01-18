import React, { Component } from 'react';
import './ListingOverview.css'
import { Typography, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Avatar } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import umairImage from './img/Umair.jpg'

class ListingOverview extends Component {
    constructor(props){
        super(props)
        this.state ={

        }
    }
    getPrice() {
            
        return parseFloat(this.props.propsObject.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }
    render() {
        return (
            <Paper elevation={3}>
                <div className="ListingOverview-Content card">
                    <div className="ListingOverview-Details">
                        <Typography variant="h3" className="ListingOverview-Price" >{this.props.currencySymbol}{this.getPrice()}</Typography>
                        <div className = "ListingOverview-Address">
                            <Typography variant="subtitle2">{this.props.propsObject.Address}</Typography>
                            <Typography variant="subtitle2" style ={{paddingTop : "8px"}}>MLS Number: {this.props.propsObject.mlsNumber}</Typography>
                        </div>
                    </div>
                    <ExpansionPanel style={{ backgroundColor: "#DCD0C0" }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >

                            <Typography variant="h6">Contact Us</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Avatar alt="Umair Rajan" src={umairImage} />
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