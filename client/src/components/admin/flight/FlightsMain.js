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
        background: '#0D47A1'
    },
    raisedButton: {
        margin: '12px'
    },
    link: {
        textDecoration: 'none'
    }

};

class FlightsMain extends Component {
    state = { flights: [] }
    componentDidMount() {
        axios.get('http://localhost:4000/flight/getAll')
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
                                                <Link to={`/adminFlight/details/${flight._id}`} style={styles.link}>
                                                    <MenuItem  className="text-center">
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
