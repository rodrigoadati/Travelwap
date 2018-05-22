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

export default class CruisesMain extends Component {
    state = { cruises: [] }
    componentDidMount() {
        axios.get('http://localhost:4000/cruise/getAll')
            .then(resp => {
                this.setState({
                    cruises: resp.data.cruises
                });
            })
            .catch(console.error)
    }

    render() {
        const { cruises } = this.state;
        return (
            <div>
                <Card>
                    <AppBar title="Cruise" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                    <CardText>
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    cruises.map((cruise, index) => (
                                        <TableRow key={cruise._id}>
                                            <TableRowColumn>
                                                <Link to={`/adminCruise/details/${cruise._id}`}>
                                                    <MenuItem>
                                                        {cruise.title}
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


