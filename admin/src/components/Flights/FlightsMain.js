import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

const styles = {
    divContainer: {
        padding: '10px'
    },
    appBar: {
        background: '#3F51B5'
    },
    raisedButton: {
        margin: '12px'
    },
    textField: {
        width: '400px'
    }

};

class FlightsMain extends Component {
    state = { flights: [] }
    componentDidMount() {
        axios.get('http://localhost:4000/flight/getAll/')
            .then(resp => {
                this.setState({
                    flights: resp.data.flights
                });
            })
            .catch(console.error)
    }

    render() {
        const { flights } = this.state;
        return (
            <div>
                <Card>
                    <AppBar title="Flights" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                    <CardText>
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    flights.map((flight, index) => (
                                        <TableRow key={flight._id}>
                                            <TableRowColumn>
                                                <Link to={`/flights/details/${flight._id}`}>
                                                    <MenuItem>
                                                        {flight.title}
                                                    </MenuItem>
                                                </Link>
                                            </TableRowColumn>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default FlightsMain;


// <Link to={`/flights/details/${flight._id}`}>
// <FlatButton label="Full width" fullWidth={true} >
//     <TableRow key={flight._id}>
//         <TableRowColumn>{flight.title}</TableRowColumn>
//         <TableRowColumn>{flight.country}</TableRowColumn>
//         <TableRowColumn>{flight.airline}</TableRowColumn>
//     </TableRow>
// </FlatButton>
// </Link>

// <FlatButton><Link to={`/flights/details/${flight._id}`}>{flight.title}</Link></FlatButton>
//                                             <TableRowColumn><Link to={`/flights/details/${flight._id}`}>{flight.country}</Link></TableRowColumn>
//                                             <TableRowColumn><Link to={`/flights/details/${flight._id}`}>{flight.airline}</Link></TableRowColumn>