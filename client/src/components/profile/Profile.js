import React, { Component } from "react";
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, DateValidator, SelectValidator } from 'react-material-ui-form-validator';
import MenuItem from "material-ui/MenuItem";
import Dialog from 'material-ui/Dialog';
import { Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Cookies from "universal-cookie";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Divider from 'material-ui/Divider';

const styles = {
    text_color: {
        color: '#ffffff'
    },
    text_color_focused: {
        color: '#00bad4'
    }
};

export default class Profile extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            cookies: new Cookies(),
            person: {
                name: '',
                email: '',
                country: '',
                date_of_birth: new Date(),
                phone: '',
            },
            message: {
                title: '',
                text: ''
            },
            open: false,
            flights: [],
            cruises: [],
            hotels: []
        }
    }

    handleChange = this.handleChange.bind(this);
    handleChangeCountry = this.handleChangeCountry.bind(this);
    handleChangeDate = this.handleChangeDate.bind(this);

    /**********************/
    //FUNCTIONS
    /**********************/
    componentWillMount() {
        this.getCountries();
        this.getFlight();
        this.getHotel();
        this.getCruise();
    }

    //Retrieve the list of countries
    getCountries() {
        axios.get('http://localhost:4000/country/getAll')
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ countries: response.data });
                    this.getPerson();
                }
                else {
                    alert('Could not retrieve region list');
                }
            }).catch(err => console.log(err));
    }

    getPerson() {
        axios.get('http://localhost:4000/person/getUserId/' + this.state.cookies.get('email'))
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ person: response.data.person[0] })
                }
                else {
                    alert('Could not get personal information');
                }
            }).catch(err => console.log(err));
    }

    getFlight() {
        axios.get('http://localhost:4000/book/getUserFlight/' + this.state.cookies.get('username'))
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ flights: response.data })
                }
                else {
                    alert('Could not flight list');
                }
            }).catch(err => console.log(err));
    }

    getHotel() {
        axios.get('http://localhost:4000/book/getUserHotel/' + this.state.cookies.get('username'))
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ hotels: response.data })
                }
                else {
                    alert('Could not hotel list');
                }
            }).catch(err => console.log(err));
    }

    getCruise() {
        axios.get('http://localhost:4000/book/getUserCruise/' + this.state.cookies.get('username'))
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ cruises: response.data })
                }
                else {
                    alert('Could not cruise list');
                }
            }).catch(err => console.log(err));
    }

    //Update person data
    updatePerson(personData) {
        axios.post(`http://localhost:4000/person/update/${personData._id}`, personData)
            .then(resp => {
                this.handleOpen();
            }).catch(err => console.log(err));
    }

    //Submit the form with the information of the person
    onSubmit(e) {
        this.updatePerson(this.state.person);
        e.preventDefault();
    }

    //Retrieve data from the target field
    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    //Handles changes in the form
    handleChange(e) {
        let personData = this.state.person;
        personData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            person: personData
        });
    }

    //Handle changes in the date field
    handleChangeDate(e, date) {
        let personData = this.state.person;
        personData.date_of_birth = date;

        this.setState({
            person: personData
        })
    }

    //Handles the changes in the country field
    handleChangeCountry(e, index, country) {
        let personData = this.state.person;
        personData.country = country;

        this.setState({ person: personData });
    };

    //Handle the opening of the message 
    handleOpen = () => {
        this.setState({ open: true });
    };

    //Handle the closing of the message 
    handleClose = () => {
        this.setState({ open: false });
    };

    formatDate(date) {
        let formatDate = new Date(date);

        return (formatDate.toLocaleDateString());
    }

    /**********************/
    //TEMPLATE
    /**********************/
    render() {

        const countryOptions = this.state.countries.map((country, i) => {
            return (
                <MenuItem key={i} value={country.name} primaryText={country.name} />
            )
        })

        const flightList = this.state.flights.map((flight, i) => {
            return (
                <TableRow key={i}>
                    <TableRowColumn>{flight.flightDetails[0].airline}</TableRowColumn>
                    <TableRowColumn>{flight.flightDetails[0].departure}</TableRowColumn>
                    <TableRowColumn>{flight.flightDetails[0].destination}</TableRowColumn>
                    <TableRowColumn>{this.formatDate(flight.flightDetails[0].travelDate)}</TableRowColumn>
                    <TableRowColumn>{flight.flightDetails[0].price}</TableRowColumn>
                    <TableRowColumn>Pending</TableRowColumn>
                </TableRow>
            )
        })

        const hotelList = this.state.hotels.map((hotel, i) => {
            return (
                <TableRow key={i}>
                    <TableRowColumn>{hotel.hotelDetails[0].title}</TableRowColumn>
                    <TableRowColumn>{hotel.hotelDetails[0].region}</TableRowColumn>
                    <TableRowColumn>{hotel.hotelDetails[0].city}</TableRowColumn>
                    <TableRowColumn>{hotel.hotelDetails[0].price}</TableRowColumn>
                    <TableRowColumn>Pending</TableRowColumn>
                </TableRow>
            )
        })

        const cruiseList = this.state.cruises.map((cruise, i) => {
            return (
                <TableRow key={i}>
                    <TableRowColumn>{cruise.cruiseDetails[0].title}</TableRowColumn>
                    <TableRowColumn>{cruise.cruiseDetails[0].ship}</TableRowColumn>
                    <TableRowColumn>{this.formatDate(cruise.cruiseDetails[0].departureDate)}</TableRowColumn>
                    <TableRowColumn>{cruise.cruiseDetails[0].price}</TableRowColumn>
                    <TableRowColumn>Pending</TableRowColumn>
                </TableRow>
            )
        })


        //Set message action button
        const actions = [
            <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
        ];

        return (
            <div className="Profile" >
                <div className="container">
                    <div className="main">
                        <Tabs>
                            <Tab
                                label="Details"
                                buttonStyle={styles.tab}>

                                <ValidatorForm className="form-person" ref="form" onSubmit={this.onSubmit.bind(this)} onError={errors => console.log(errors)}>
                                    <div className="main-login main-center">
                                        <div className="row">
                                            <div className="col-md-6">
                                                {/* NAME */}
                                                <TextValidator
                                                    floatingLabelText="Name"
                                                    onChange={this.handleChange}
                                                    name="name"
                                                    value={this.state.person.name}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                    floatingLabelFocusStyle={styles.text_color_focused}
                                                    floatingLabelStyle={styles.text_color}
                                                    inputStyle={styles.text_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                {/* EMAIL */}
                                                <TextValidator
                                                    floatingLabelText="Email"
                                                    onChange={this.handleChange}
                                                    name="email"
                                                    value={this.state.person.email}
                                                    validators={['required', 'isEmail']}
                                                    errorMessages={['this field is required', 'email is not valid']}
                                                    floatingLabelFocusStyle={styles.text_color_focused}
                                                    floatingLabelStyle={styles.text_color}
                                                    inputStyle={styles.text_color}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <SelectValidator
                                                    floatingLabelText="Country"
                                                    name="country"
                                                    value={this.state.person.country}
                                                    onChange={this.handleChangeCountry}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                    floatingLabelFocusStyle={styles.text_color_focused}
                                                    floatingLabelStyle={styles.text_color}
                                                    labelStyle={styles.text_color}
                                                >
                                                    {countryOptions}
                                                </SelectValidator>
                                            </div>
                                            <div className="col-md-6">
                                                {/* DATE OF BIRTH */}
                                                <DateValidator
                                                    type="text"
                                                    mode="landscape"
                                                    name="date_of_birth"
                                                    floatingLabelText="Date of birth"
                                                    value={new Date(this.state.person.date_of_birth)}
                                                    onChange={this.handleChangeDate}
                                                    validators={['required']}
                                                    errorMessages={['this field is required']}
                                                    openToYearSelection={true}
                                                    floatingLabelFocusStyle={styles.text_color_focused}
                                                    floatingLabelStyle={styles.text_color}
                                                    inputStyle={styles.text_color} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                {/* PHONE */}
                                                <TextValidator
                                                    floatingLabelText="Phone"
                                                    onChange={this.handleChange}
                                                    name="phone"
                                                    value={this.state.person.phone}
                                                    validators={['required', 'matchRegexp:^[0-9]+$']}
                                                    errorMessages={['this field is required', 'Phone should be a number']}
                                                    floatingLabelFocusStyle={styles.text_color_focused}
                                                    floatingLabelStyle={styles.text_color}
                                                    inputStyle={styles.text_color}
                                                />
                                            </div>
                                            <div className="col-md-6">

                                            </div>
                                        </div>
                                        <div className="row center-button">
                                            <div className="col-md-12">
                                                <RaisedButton
                                                    type="submit"
                                                    color="primary"
                                                    label="Update"
                                                    primary={true}
                                                    className="btn-wrap" />
                                            </div>
                                        </div>
                                    </div>
                                </ValidatorForm>
                            </Tab>
                            <Tab
                                label="Booking"
                                buttonStyle={styles.tab}>
                                <h3>Flights</h3>
                                <Table style={styles.table_size}>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Airline</TableHeaderColumn>
                                            <TableHeaderColumn>Departure</TableHeaderColumn>
                                            <TableHeaderColumn>Destination</TableHeaderColumn>
                                            <TableHeaderColumn>Travel Date</TableHeaderColumn>
                                            <TableHeaderColumn>Price</TableHeaderColumn>
                                            <TableHeaderColumn>Status</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {flightList}
                                    </TableBody>
                                </Table>
                                <Divider />
                                <h3>Hotels</h3>
                                <Table style={styles.table_size}>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Title</TableHeaderColumn>
                                            <TableHeaderColumn>Region</TableHeaderColumn>
                                            <TableHeaderColumn>City</TableHeaderColumn>
                                            <TableHeaderColumn>Price</TableHeaderColumn>
                                            <TableHeaderColumn>Status</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {hotelList}
                                    </TableBody>
                                </Table>
                                <Divider />
                                <h3>Cruise</h3>
                                <Table style={styles.table_size}>
                                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                        <TableRow>
                                            <TableHeaderColumn>Title</TableHeaderColumn>
                                            <TableHeaderColumn>Ship</TableHeaderColumn>
                                            <TableHeaderColumn>Departure Date</TableHeaderColumn>
                                            <TableHeaderColumn>Price</TableHeaderColumn>
                                            <TableHeaderColumn>Status</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody displayRowCheckbox={false}>
                                        {cruiseList}
                                    </TableBody>
                                </Table>
                            </Tab>
                        </Tabs>
                    </div>
                </div>

                {/* Message component */}
                <Dialog
                    title="Information Updated"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose} >
                    Your information has been updated successfully.
                </Dialog>
            </div>
        )
    }
}