import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator, DateValidator } from 'react-material-ui-form-validator';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    appBar: {
        background: '#33691E'
    },
    formStyle: {
        padding: '20px',
        width: '30%'
    },
    raisedButton: {
        margin: '50px 20px',
        background: '#689F38'
    },
    textField: {
        width: '100%'
    }
};

class PackageDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            packageData: {
                title: '',
                discount: '',
                topic: '',
                description: '',
                image: '',
                flightId: '',
                expireDate: null
            },
            open: false,
            regions: [],
            flights: [],
            cities: []
        };

        this.deletePackage = this.deletePackage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        let packageId = this.props.match.params.id;

        axios.get(`http://localhost:4000/package/get/${packageId}`)
            .then(resp => {
                this.setState({
                    packageData: resp.data.package
                });

                this.getRegion();
                this.getFlight(resp.data.package.region);

            }).catch(console.error);
    };

    //Handles the changes in the region field
    handleChangeRegion(e, index, region) {
        let packageData = this.state.packageData;
        packageData.region = region;

        this.setState({ packageData: packageData });

        //Get cities data by region
        this.getCities(region);
        this.setState({ disableCity: false });
    };

    handleChangeFlight(e, index, flightId) {
        let packageData = this.state.packageData;
        packageData.flightId = flightId;

        this.setState({ packageData: packageData });
    }

    formatDate(date) {
        let d = new Date(date),
            year = d.getFullYear(),
            month = ("0" + (d.getMonth() + 1)).slice(-2),
            day = ("0" + (d.getDate())).slice(-2);
        let dateFormat = year + '-' + month + '-' + day;
        return (dateFormat === null) ? null : new Date(dateFormat);
    }

    deletePackage() {
        let packageId = this.props.match.params.id;
        axios.delete(`http://localhost:4000/package/delete/${packageId}`)
            .then(resp => {
                this.props.history.push('/adminPackage');
            }).catch(err => console.log(err));
    }

    updatePackage(packageData) {
        let packageId = this.props.match.params.id;
        axios.post(`http://localhost:4000/package/update/${packageId}`,
            packageData)
            .then(resp => {
                this.handleOpen();
            }).catch(err => console.log(err));
    }

    handleSubmitUpdate(e) {
        this.setState({ actionType: 'update', actionMsg: 'Package Package has been updated.' });
        this.updatePackage(this.state.packageData);
        e.preventDefault();
    }

    handleSubmitDelete(e) {
        this.setState({ actionType: 'delete', actionMsg: 'Are you sure you want to delete this Package Package?' });
        this.handleOpen();
        e.preventDefault();
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChange(e) {
        let packageData = this.state.packageData;
        packageData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            packageData: packageData
        });
    }

    handleChangeExpireDate(e, expireDate) {
        let packageData = this.state.packageData;
        packageData.expireDate = expireDate;

        this.setState({
            packageData: packageData
        })
    }

    disablePrevDates(startDate) {
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    getRegion() {
        axios.get('http://localhost:4000/region/getAll')
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ regions: response.data })
                }
                else {
                    alert('Region not found');
                }
            }).catch(err => console.log(err));
    }

    render() {
        const { packageData } = this.state;
        const actionType = this.state.actionType;
        const actionMsg = this.state.actionMsg;
        const actions = [
            <Link to='/adminPackage/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} />
            </Link>,
        ];
        const actionsDelete = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton label="Yes" primary={true} onClick={this.deletePackage} />
        ];
        return (
            <Card>
                <AppBar title="Package Package Details" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <ValidatorForm onSubmit={this.handleSubmitUpdate.bind(this)} style={styles.formStyle}>
                        <TextValidator
                            type="text"
                            name='title'
                            value={packageData.title}
                            onChange={this.handleChange}
                            floatingLabelText="Title"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <TextValidator
                            type="text"
                            name='discount'
                            value={packageData.discount}
                            onChange={this.handleChange}
                            floatingLabelText="Discount"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <TextValidator
                            type="text"
                            name='topic'
                            value={packageData.topic}
                            onChange={this.handleChange}
                            floatingLabelText="Topic"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <TextValidator
                            type="text"
                            name='description'
                            value={packageData.description}
                            onChange={this.handleChange}
                            floatingLabelText="Description"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <TextValidator
                            type="text"
                            name='image'
                            value={packageData.image}
                            onChange={this.handleChange}
                            floatingLabelText="Image"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <DateValidator
                            type="text"
                            mode="landscape"
                            name="expireDate"
                            floatingLabelText="Expire Date"
                            value={new Date(packageData.expireDate)}
                            onChange={this.handleChangeExpireDate.bind(this)}
                            shouldDisableDate={this.disablePrevDates(new Date())}
                            validators={['required']}
                            errorMessages={['you must pick a date']} />
                        <RaisedButton type="submit" label="Update Package Package" primary={true} style={styles.raisedButton}></RaisedButton>
                        <RaisedButton name="delete" label="Delete Package Package" secondary={true} style={styles.raisedButton} onClick={this.handleSubmitDelete.bind(this)}></RaisedButton>
                        <Dialog
                            title="Message"
                            actions={(actionType === 'update') ? actions : actionsDelete}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}>
                            {actionMsg}
                        </Dialog>
                    </ValidatorForm>
                </CardText>
            </Card >
        )
    }
}

export default PackageDetails;




