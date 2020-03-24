import React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  withStyles
} from "@material-ui/core";

const styles = {
  root: {
    backgroundColor: "#f4f4f4",
    height: "auto",
    margin: "10px 0px",
    padding: "25px",
    border : "solid 1px #A6A6A6"
  },
  table: {
    maxWidth: "70%",
    backgroundColor: "#E6E6E6"
  },
  tableContainer: {
    display: "flex",
    justifyContent: "center"
  }
};

const ComericalProperties = props => {
  const { classes } = props;
  return (
    <Paper elevation={3}>
      <div className={classes.root}>
        <Typography variant="h3">Property Information</Typography>
        <div className={classes.tableContainer}>
          <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table">
              <TableBody>
                {props.comercial.map(row => (
                  <TableRow key={row.key}>
                    <TableCell>{row.key}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ComericalProperties);
