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
        background: '#d32f2f'
    },
    raisedButton: {
        margin: '12px'
    },
    textField: {
        width: '400px'
    }

};

class CarsMain extends Component {
    state = { cars: [] }
    componentDidMount() {
        axios.get('http://localhost:4000/api/cars')
            .then(resp => {
                this.setState({
                    cars: resp.data.cars
                });
            })
            .catch(console.error)
    }

    render() {
        const { cars } = this.state;
        return (
            <div>
                <Card>
                    <AppBar title="Cars" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                    <CardText>
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    cars.map((car, index) => (
                                        <TableRow key={car._id}>
                                            <TableRowColumn>
                                                <Link to={`/cars/details/${car._id}`}>
                                                    <MenuItem>
                                                        {car.title}
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

export default CarsMain;

