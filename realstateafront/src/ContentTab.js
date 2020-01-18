import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MapIcon from '@material-ui/icons/Map';
import DescriptionIcon from '@material-ui/icons/Description';

class ContentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedtab : 0
        }
        this.handleTabClick = this.handleTabClick.bind(this);
    }
    
    handleTabClick(event, value){
        this.setState({ selectedtab: value });
    }
    render() {
        return (
            <div>
                <Paper style ={{backgroundColor : "#DCD0C0"}}> 
                    <Tabs 
                        value = {this.state.selectedtab}
                        variant="fullWidth"
                        onChange={this.handleTabClick}
                    >
                        <Tab onClick = {()=>{this.props.selectTab("description")}} icon={<DescriptionIcon />} aria-label="phone" />
                        <Tab onClick = {()=>{this.props.selectTab("map")}} icon={<MapIcon />} aria-label="favorite" />
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

export default ContentTab;