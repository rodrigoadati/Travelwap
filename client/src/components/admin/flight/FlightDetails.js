import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator, DateValidator } from 'react-material-ui-form-validator';

const styles = {
    appBar: {
        background: '#3F51B5'
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

class FlightDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightData: {
                title: '',
                description: '',
                airline: '',
                departure: '',
                price: '',
                region: '',
                destination: '',
                travelDate: new Date(),
                bookBy: new Date(),
                featured: false,
            }, open: false,
            actionType: '',
            actionMsg: '',
            regions: [],
            cities: []
        };
        this.deleteFlight = this.deleteFlight.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFeatured = this.handleChangeFeatured.bind(this);
    }

    componentDidMount() {
        let flightId = this.props.match.params.id;
        axios.get(`http://localhost:4000/flight/get/${flightId}`)
            .then(resp => {
                this.setState({
                    flightData: resp.data.flight
                })

                this.getRegion();
                this.getCities(resp.data.flight.region);
            })
            .catch(console.error);

        // custom rule for validation
        ValidatorForm.addValidationRule('isDateValid', (value) => {
            if (value > this.state.flightData.travelDate) {
                return false;
            }
            return true;
        });
    };

    //Handles the changes in the region field
    handleChangeRegion(e, index, region) {
        let hotelData = this.state.hotelData;
        hotelData.region = region;

        this.setState({ hotelData: hotelData });

        //Get cities data by region
        this.getCities(region);
        this.setState({ disableCity: false });
    };

    handleChangeCity(e, index, city) {
        let hotelData = this.state.hotelData;
        hotelData.city = city;

        this.setState({ hotelData: hotelData });
    }

    //Handles the changes in the region field
    handleChangeRegion(e, index, region) {
        let flightData = this.state.flightData;
        flightData.region = region;

        this.setState({ flightData: flightData });

        //Get cities data by region
        this.getCities(region);
        this.setState({ disableCity: false });
    };

    //Handles the changes in the region field
    handleChangeDestination(e, index, destination) {
        let flightData = this.state.flightData;
        flightData.destination = destination;

        this.setState({ flightData: flightData });
    };

    //Handles the change in the Trave Date
    handleChangeTravelDate(e, travelDate) {
        let flightData = this.state.flightData;
        flightData.travelDate = travelDate;

        this.setState({
            flightData: flightData
        })
    }

    //Handles the change in the bookBy date
    handleChangeBookBy(e, bookBy) {
        let flightData = this.state.flightData;
        flightData.bookBy = bookBy;

        this.setState({
            flightData: flightData
        })
    }

    handleChangeFeatured(e) {
        let flightData = this.state.flightData;
        flightData.featured = e.target.checked;
        this.setState({
            flightData: flightData
        })
    }

    updateflight(flightData) {
        let flightId = this.props.match.params.id;
        axios.post(`http://localhost:4000/flight/update/${flightId}`,
            flightData)
            .then(resp => {
                this.handleOpen();
            }).catch(err => console.log(err));
    }

    deleteFlight() {
        let flightId = this.props.match.params.id;
        axios.delete(`http://localhost:4000/flight/delete/${flightId}`)
            .then(resp => {
                this.props.history.push('/adminFlight');
            }).catch(err => console.log(err));
    }

    handleSubmitUpdate(e) {
        this.setState({ actionType: 'update', actionMsg: 'Flight Package has been updated.' });
        this.updateflight(this.state.flightData);
        e.preventDefault();
    }

    handleSubmitDelete(e) {
        this.setState({ actionType: 'delete', actionMsg: 'Are you sure you want to delete this Flight Package?' });
        this.handleOpen();
        e.preventDefault();
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChange(e) {
        let flightData = this.state.flightData;
        flightData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            flightData: flightData
        });
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

    getCities(region) {
        axios.get('http://localhost:4000/city/getCitiesByRegion?region=' + region)
            .then(response => {
                this.setState({ cities: response.data })
            }).catch(err => console.log(err));
    }

    disablePrevDates(startDate) {
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    }


    render() {
        const region = this.state.regions.map((region, i) => {
            return (
                <MenuItem key={i} value={region.name} primaryText={region.name} />
            )
        })
        const cities = this.state.cities.map((city, i) => {
            return (
                <MenuItem key={i} value={city.name} primaryText={city.name} />
            )
        })

        const { flightData } = this.state;
        const actionType = this.state.actionType;
        const actionMsg = this.state.actionMsg;
        const actions = [
            <Link to='/adminFlight/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];
        const actionsDelete = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton label="Yes" primary={true} onClick={this.deleteFlight} />
        ];

        return (
            <Card>
                <AppBar title="Flight Package Details" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <ValidatorForm onSubmit={this.handleSubmitUpdate.bind(this)} style={styles.formStyle}>
                        <Checkbox type="checkbox" label="Featured" name="featured"
                            checked={flightData.featured} onClick={this.handleChangeFeatured}
                            style={styles.checkbox} />
                        <TextValidator
                            type="text"
                            name='title'
                            value={flightData.title}
                            onChange={this.handleChange}
                            floatingLabelText="Title"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <TextValidator
                            name="description"
                            value={flightData.description}
                            onChange={this.handleChange}
                            floatingLabelText="Description"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <TextValidator
                            type="text"
                            name="airline"
                            value={flightData.airline}
                            onChange={this.handleChange}
                            floatingLabelText="Airline"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <TextValidator
                            type="text"
                            name="departure"
                            value={flightData.departure}
                            onChange={this.handleChange}
                            floatingLabelText="Departure"
                            style={styles.textField}
                            validators={['required']}
                            errorMessages={['this field is required']} />
                        <TextValidator
                            type="text"
                            name="price"
                            value={flightData.price}
                            onChange={this.handleChange}
                            floatingLabelText="Price"
                            style={styles.textField}
                            validators={['required', 'matchRegexp:^[0-9]+$']}
                            errorMessages={['this field is required', 'this field should be a number']} />
                        <SelectValidator
                            floatingLabelText="Region"
                            name="region"
                            value={flightData.region}
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
                            floatingLabelText="Destination"
                            name="destination"
                            value={flightData.destination}
                            onChange={this.handleChangeDestination.bind(this)}
                            validators={['required']}
                            disabled={this.state.disableCity}
                            errorMessages={['this field is required']}
                            floatingLabelFocusStyle={styles.text_color_focused}
                            floatingLabelStyle={styles.text_color}
                            labelStyle={styles.text_color}
                        >
                            {cities}
                        </SelectValidator>

                        <DateValidator
                            type="text"
                            mode="landscape"
                            name="traveDate"
                            floatingLabelText="Travel Date"
                            value={new Date(flightData.travelDate)}
                            onChange={this.handleChangeTravelDate.bind(this)}
                            shouldDisableDate={this.disablePrevDates(new Date())}
                            validators={['required']}
                            errorMessages={['you must pick a date']} />
                        <DateValidator
                            type="text"
                            mode="landscape"
                            name="bookBy"
                            floatingLabelText="Book By"
                            value={new Date(flightData.bookBy)}
                            onChange={this.handleChangeBookBy.bind(this)}
                            shouldDisableDate={this.disablePrevDates(new Date())}
                            validators={['required', 'isDateValid']}
                            errorMessages={['you must pick a date', 'Invalid Date']} />
                        <RaisedButton type="submit" name="update" label="Update Flight Package" primary={true} style={styles.raisedButton}></RaisedButton>
                        <RaisedButton name="delete" label="Delete Flight Package" secondary={true} style={styles.raisedButton} onClick={this.handleSubmitDelete.bind(this)}></RaisedButton>
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
            </Card>
        )
    }
}

export default FlightDetails;




