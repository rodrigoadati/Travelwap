import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
// import Proptypes from 'prop-types';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator, DateValidator } from 'react-material-ui-form-validator';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    appBar: {
        background: '#1B5E20'
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

class AddPackages extends Component {
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
            disableFlight: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentWillMount() {
        this.getRegion();
    }

    addPackages(packageData) {
        console.log(packageData);
        axios.request({
            method: 'post',
            url: 'http://localhost:4000/package/add/',
            data: packageData
        }).then(response => {
            if (response.data.success === false){
                alert(response.data.msg);
            }
            else
                this.handleOpen();
        }).catch(err => console.log(err));
    }

    handleSubmit(e) {
        this.addPackages(this.state.packageData);
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

    //Handles the changes in the region field
    handleChangeRegion(e, index, region) {
        let packageData = this.state.packageData;
        packageData.region = region;

        this.setState({ packageData: packageData });

        //Get cities data by region
        this.getFlight(region);
        this.setState({ disableFlight: false });
    };

    //Handles the changes in the flight field
    handleChangeFlight(e, index, flightId) {
        let packageData = this.state.packageData;
        packageData.flightId = flightId;

        this.setState({ packageData: packageData });
    };


    //Handles the change in the Expiry Date
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

    getFlight(region) {
        axios.get('http://localhost:4000/flight/getFlightsByRegion/' + region)
            .then(response => {
                this.setState({ flights: response.data.flights })
            }).catch(err => console.log(err));
    }

    render() {
        const { packageData } = this.state;
        const actions = [
            <Link to='/adminPackage/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];
        const region = this.state.regions.map((region, i) => {
            return (
                <MenuItem key={i} value={region.name} primaryText={region.name} />
            )
        })
        const flight = this.state.flights.map((flight, i) => {
            return (
                <MenuItem key={i} value={flight._id} primaryText={flight.title} />
            )
        })

        return (
            <Card>
                <AppBar title="Add Package Package" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <ValidatorForm onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>
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
                            value={packageData.expireDate}
                            onChange={this.handleChangeExpireDate.bind(this)}
                            shouldDisableDate={this.disablePrevDates(new Date())}
                            validators={['required']}
                            errorMessages={['you must pick a date']} />
                        <SelectValidator
                            floatingLabelText="Region"
                            name="region"
                            value={packageData.region}
                            onChange={this.handleChangeRegion.bind(this)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            floatingLabelFocusStyle={styles.text_color_focused}
                            floatingLabelStyle={styles.text_color}
                            labelStyle={styles.text_color}
                        >
                            {region}
                        </SelectValidator>
                        <SelectValidator
                            floatingLabelText="Flight"
                            name="flight"
                            value={packageData.flightId}
                            onChange={this.handleChangeFlight.bind(this)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            disabled={this.state.disableFlight}
                            floatingLabelFocusStyle={styles.text_color_focused}
                            floatingLabelStyle={styles.text_color}
                            labelStyle={styles.text_color}
                        >
                            {flight}
                        </SelectValidator>
                        <RaisedButton type="submit" label="Add Package" primary={true} style={styles.raisedButton}></RaisedButton>
                        <Dialog
                            title="Message"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}>
                            Package Package has been Added.
                        </Dialog>
                    </ValidatorForm>
                </CardText>
            </Card >
        )
    }
}

export default AddPackages;
