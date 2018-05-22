import React, { Component } from "react";
import axios from 'axios';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, DateValidator, SelectValidator } from 'react-material-ui-form-validator';
import MenuItem from "material-ui/MenuItem";
import "./Flight.css";

const styles = {
    text_color: {
        color: '#ffffff'
    },
    text_color_focused: {
        color: '#00bad4'
    },
    input_size:{
        width: '200px'
    }
};

export default class Flight extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            flight: {
                flight_type: '',
                from: '',
                to: '',
                date_leave: new Object,
                date_return: new Object,
                number_adults: 0,
                number_children: 0,
                number_infants: 0,
                service_class: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    }

    /**********************/
    //FUNCTIONS
    /**********************/
    componentWillMount() {
        this.getCountries();

        // custom validation rule'
        ValidatorForm.addValidationRule('isCountrySame', (value) => {
            if (value !== this.state.person.password) {
                return false;
            }
            return true;
        });
    }

    getCountries() {
        axios.get('http://localhost:4000/country/getAll')
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ countries: response.data })
                }
                else {
                    alert('Could not retrieve data!');
                }
            }).catch(err => console.log(err));
    }

    onSubmit(e) {
        // this.addPerson(this.state.person);
        e.preventDefault();
    }

    disablePrevDates(startDate) {
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChangeDropdown(e, index, from) {
        console.log(e);
        console.log(index);
        
        let flightData = this.state.flight;
        flightData.from = from;

        this.setState({ flight: flightData });
    };

    handleChange(e) {
        let flightData = this.state.flight;
        flightData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            flight: flightData
        });
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

        const items = [];
        for (let i = 1; i <= 10; i++) {
            items.push(<MenuItem value={i} key={i} primaryText={i} />);
        }

        const startDate = new Date();

        return (
            <div className="flight">
                <div className="main">
                    <div className="container main-container">
                        <div className="row">
                            <div className="title">
                                Search for Flights
                            </div>
                        </div>
                        <ValidatorForm className="form-fligh" ref="form" onSubmit={this.onSubmit.bind(this)} onError={errors => console.log(errors)}>
                            <div className="row flight-space">
                                <RadioButtonGroup defaultSelected="return" name="type" style={{ display: 'flex' }}>
                                    <RadioButton
                                        value="return"
                                        label="Return Trip"
                                        className="col-md-6"
                                        labelStyle={{ color: 'white' }} />
                                    <RadioButton
                                        value="oneway"
                                        label="One-way Trip"
                                        className="col-md-6"
                                        labelStyle={{ color: 'white' }} />
                                </RadioButtonGroup>
                            </div>
                            <div className="row flight-space">
                                <div className="col-md-6">
                                    <SelectValidator
                                        floatingLabelText="From"
                                        name="from"
                                        value={this.state.flight.from}
                                        onChange={this.handleChangeDropdown}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                    >
                                        {countryOptions}
                                    </SelectValidator>
                                </div>
                                <div className="col-md-6">
                                    <SelectValidator
                                        floatingLabelText="To"
                                        name="to"
                                        value={this.state.flight.to}
                                        onChange={this.handleChange}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                    >
                                        {countryOptions}
                                    </SelectValidator>
                                </div>
                            </div>
                            <div className="row flight-space">
                                <div className="col-md-6">
                                    <DateValidator
                                        type="text"
                                        mode="landscape"
                                        name="date_leave"
                                        floatingLabelText="Leave On"
                                        value={this.state.flight.date_leave}
                                        onChange={this.handleChangeDate}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        openToYearSelection={false}
                                        shouldDisableDate={this.disablePrevDates(startDate)}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                        inputStyle={styles.text_color} />
                                </div>
                                <div className="col-md-6">
                                    <DateValidator
                                        type="text"
                                        mode="landscape"
                                        name="date_return"
                                        floatingLabelText="Return On"
                                        value={this.state.flight.date_return}
                                        onChange={this.handleChangeDate}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        openToYearSelection={false}
                                        shouldDisableDate={this.disablePrevDates(startDate)}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                        inputStyle={styles.text_color} />
                                </div>
                            </div>
                            <div className="row flight-space">
                                <div className="col-md-4">
                                    <SelectValidator
                                        floatingLabelText="Adults"
                                        name="number_adults"
                                        value={this.state.flight.number_adults}
                                        onChange={this.handleChange}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        autoWidth={true}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                        style={styles.input_size}
                                    >
                                        {items}
                                    </SelectValidator>
                                </div>
                                <div className="col-md-4">
                                    <SelectValidator
                                        floatingLabelText="Children(2-11 years old)"
                                        name="number_children"
                                        value={this.state.flight.number_adults}
                                        onChange={this.handleChange}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        autoWidth={true}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                        style={styles.input_size}
                                    >
                                        {items}
                                    </SelectValidator>
                                </div>
                                <div className="col-md-4">
                                    <SelectValidator
                                        floatingLabelText="Infant(0-23 months old)"
                                        name="number_infant"
                                        value={this.state.flight.number_adults}
                                        onChange={this.handleChange}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        autoWidth={true}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                        style={styles.input_size}
                                    >
                                        {items}
                                    </SelectValidator>
                                </div>
                            </div>
                            <div className="row flight-space">
                                <div className="col-md-12">
                                    <SelectValidator
                                        floatingLabelText="Service Class"
                                        name="service_class"
                                        value={this.state.flight.service_class}
                                        onChange={this.handleChange}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                    >
                                        <MenuItem key={1} value="economy" primaryText="Economy-Lowest" />
                                        <MenuItem key={2} value="premium" primaryText="Premium Economy" />
                                        <MenuItem key={3} value="business" primaryText="Business Class" />
                                    </SelectValidator>
                                </div>
                            </div>
                        </ValidatorForm>
                    </div>
                </div>
            </div>
        )
    }
}