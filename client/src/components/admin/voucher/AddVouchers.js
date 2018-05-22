import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, DateValidator } from 'react-material-ui-form-validator';

const styles = {
    appBar: {
        background: '#EF6C00'
    },
    formStyle: {
        padding: '20px',
        width: '30%'
    },
    raisedButton: {
        margin: '50px',
        background: '#689F38'

    },
    textField: {
        width: '100%'
    }
};

class AddVouchers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voucherData: {
                name: '',
                code: '',
                discount: '',
                date_start: null,
                date_end: null
            }, open: false,
            actionType: '',
            actionMsg: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
    };

    formatDate(date) {
        let d = new Date(date),
            year = d.getFullYear(),
            month = ("0" + (d.getMonth() + 1)).slice(-2),
            day = ("0" + (d.getDate())).slice(-2);
        let dateFormat = year + '-' + month + '-' + day;
        return (dateFormat === null) ? null : new Date(dateFormat);
    }

    handleChangeDateStart(e, date_start) {
        let voucherData = this.state.voucherData;
        voucherData.date_start = date_start;

        this.setState({
            voucherData: voucherData
        })
    }

    handleChangeDateEnd(e, date_end) {
        let voucherData = this.state.voucherData;
        voucherData.date_end = date_end;

        this.setState({
            voucherData: voucherData
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    addVoucher(voucherData) {
        axios.post(`http://localhost:4000/voucher/add`,
            voucherData).then(resp => {
                this.handleOpen();
                console.log(resp);
            }).catch(err => console.log(err));
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChange(e) {
        let voucherData = this.state.voucherData;
        voucherData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            voucherData: voucherData
        });
    }

    handleSubmit(e) {
        this.setState({ actionType: 'update', actionMsg: 'Voucher has been Added.' });
        this.addVoucher(this.state.voucherData);
        e.preventDefault();
    }

    render() {
        let { voucherData } = this.state;
        let actionType = this.state.actionType;
        let actionMsg = this.state.actionMsg;
        let actions = [
            <Link to='/adminVoucher/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];
        return (
            <Card>
                <AppBar title="Add Vouchers" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText className="text-center">
                    <ValidatorForm onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>

                        <TextValidator type="text" name="name" value={voucherData.name} onChange={this.handleChange}
                            floatingLabelText="Name" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator type="text" name="code" value={voucherData.code} onChange={this.handleChange}
                            floatingLabelText="Code" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator type="text" name="discount" value={voucherData.discount} onChange={this.handleChange}
                            floatingLabelText="Discount" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <DateValidator type="text" mode="landscape" name="dateStart"
                            floatingLabelText="Start Date" value={voucherData.date_start} onChange={this.handleChangeDateStart}
                            validators={['required']} errorMessages={['you must pick a date']} />
                        <DateValidator type="text" mode="landscape" name="dateEnd"
                            floatingLabelText="End Date" value={voucherData.date_end} onChange={this.handleChangeDateEnd}
                            validators={['required']} errorMessages={['you must pick a date']} />

                        <RaisedButton type="submit" name="update" label="Add Voucher" primary={true} style={styles.raisedButton} ></RaisedButton>
                        <Dialog
                            title="Message"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}>
                            Voucher has been Added.
                        </Dialog>
                    </ValidatorForm>

                </CardText>
            </Card>
        );
    };
};

export default AddVouchers;