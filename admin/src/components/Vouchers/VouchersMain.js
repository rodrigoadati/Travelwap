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
        background: '#283593'
    },
    raisedButton: {
        margin: '12px'
    },
    textField: {
        width: '400px'
    }
}

class VouchersMain extends Component {
    state = { vouchers: [] }

    componentDidMount() {
        axios.get('http://localhost:4000/voucher/getAll/')
            .then(resp => {
                this.setState({ vouchers: resp.data.vouchers });
            })
            .catch(console.error)
    };


    render() {
        const { vouchers } = this.state;
        return (
            <Card>
                <AppBar title="Vouchers" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                            {
                                vouchers.map((voucher, index) => (
                                    <TableRow key={voucher._id}>
                                        <TableRowColumn>
                                            <Link to={`/vouchers/details/${voucher._id}`}>
                                                <MenuItem>
                                                    {voucher.name}
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
        );
    };
};

export default VouchersMain;