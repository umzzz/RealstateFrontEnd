import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, InputLabel, FormHelperText, FormControl, Select, NativeSelect } from '@material-ui/core';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let currenctSelectorStyle = {
            display: "flex",
            "justifyContent": "space-between"
        }
        return (
            <div >
                <AppBar position="static" style={{ backgroundColor: "#ADADAD" }}>
                    <Toolbar style={currenctSelectorStyle}>
                        <Typography variant="h6" >
                            RealState APP
                        </Typography>
                        <FormControl style ={{width : "75px"}}>
                            <InputLabel htmlFor="age-native-simple">Curreny</InputLabel>
                            <Select
                            native
                            autoWidth
                            >
                                
                                <option value={10}>USD</option>
                                <option value={20}>CAD</option>
                                <option value={30}>Pound</option>
                            </Select>
                        </FormControl>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;


/**
 *     <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange('age')}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
 */