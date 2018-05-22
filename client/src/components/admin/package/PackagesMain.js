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
        background: '#1B5E20'
    },
    raisedButton: {
        margin: '12px'
    },
    link: {
        textDecoration: 'none'
    }

};

class PackagesMain extends Component {
    state = { packages: [] }
    componentDidMount() {
        axios.get('http://localhost:4000/package/getAllNoFilter')
            .then(resp => {
                this.setState({
                    packages: resp.data.packages
                });
            })
            .catch(console.error)
    }

    render() {
        const { packages } = this.state;
        return (
            <div>
                <Card>
                    <AppBar title="Packages" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                    <CardText>
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    packages.map((pack, index) => (
                                        <TableRow key={pack._id}>
                                            <TableRowColumn>
                                                <Link to={`/adminPackage/details/${pack._id}`} style={styles.link}>
                                                    <MenuItem className="text-center">
                                                        {pack.title}
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

export default PackagesMain;

