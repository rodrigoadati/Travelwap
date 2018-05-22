import React, { Component } from 'react';
import axios from 'axios';
import './Person.css';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, DateValidator, SelectValidator } from 'react-material-ui-form-validator';
import MenuItem from "material-ui/MenuItem";
import Dialog from 'material-ui/Dialog';
import { Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';

const styles = {
    text_color: {
        color:'#ffffff'
    },
    text_color_focused:{
        color:'#00bad4'
    }
};

export default class AddPerson extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            person: {
                name: '',
                email: '',
                country: '',
                date_of_birth: new Object(),
                phone: '',
                username: '',
                password: '',
                confirmPassword: ''
            },
            message: {
                title: '',
                text: ''
            },
            open: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
    }

    /**********************/
    //FUNCTIONS
    /**********************/
    componentWillMount() {
        this.getCountries();

        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.person.password) {
                return false;
            }
            return true;
        });
    }

    //Retrieve the list of countries
    getCountries() {
        axios.get('http://localhost:4000/country/getAll')
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ countries: response.data })
                }
                else {
                    alert('Username or password invalid!');
                }
            }).catch(err => console.log(err));
    }

    //Add data of the person 
    addPerson(person) {
        axios.request({
            method: 'post',
            url: 'http://localhost:4000/person/add',
            data: person
        }).then(response => {
            this.handleOpen();
        }).catch(err => console.log(err));
    }

    //Submit the form with the information of the person
    onSubmit(e) {
        this.addPerson(this.state.person);
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
        
        this.setState({person: personData});
    };

    //Handle the opening of the message 
    handleOpen = () => {
        this.setState({ open: true });
    };

    //Handle the closing of the message 
    handleClose = () => {
        this.setState({ open: false });
    };

    /**********************/
    //TEMPLATE
    /**********************/
    render() {
        const countryOptions = this.state.countries.map((country, i) => {
            return (
                <MenuItem key={i} value={country.name} primaryText={country.name}/>
            )
        })

        //Set message action button
        const actions = [
            <Link to='/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];

        return (
            <div className="Person">
                <div className="container">
                    <div className="main">
                        <div className="main-login main-center">
                            <h5>Register to our website to book your trip.</h5>
                            <ValidatorForm className="form-person" ref="form" onSubmit={this.onSubmit.bind(this)} onError={errors => console.log(errors)}>
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
                                            value={this.state.person.date_of_birth}
                                            onChange={this.handleChangeDate}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            openToYearSelection={true} 
                                            floatingLabelFocusStyle={styles.text_color_focused}
                                            floatingLabelStyle={styles.text_color}
                                            inputStyle={styles.text_color}/>
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
                                        {/* USERNAME */}
                                        <TextValidator
                                            floatingLabelText="Username"
                                            onChange={this.handleChange}
                                            name="username"
                                            value={this.state.person.username}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            floatingLabelFocusStyle={styles.text_color_focused}
                                            floatingLabelStyle={styles.text_color}
                                            inputStyle={styles.text_color}
                                        />
                                    </div>    
                                </div>   
                                <div className="row">
                                    <div className="col-md-6"> 
                                        {/* PASSWORD */}
                                        <TextValidator
                                            floatingLabelText="Password"
                                            onChange={this.handleChange}
                                            name="password"
                                            type="password"
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            value={this.state.person.password}
                                            floatingLabelFocusStyle={styles.text_color_focused}
                                            floatingLabelStyle={styles.text_color}
                                            inputStyle={styles.text_color}
                                        />
                                    </div>    
                                    <div className="col-md-6"> 
                                        {/* CONFIRM PASSWORD */}
                                        <TextValidator
                                            floatingLabelText="Repeat password"
                                            onChange={this.handleChange}
                                            name="confirmPassword"
                                            type="password"
                                            validators={['isPasswordMatch', 'required']}
                                            errorMessages={['password mismatch', 'this field is required']}
                                            value={this.state.person.confirmPassword}
                                            floatingLabelFocusStyle={styles.text_color_focused}
                                            floatingLabelStyle={styles.text_color}
                                            inputStyle={styles.text_color}
                                        />
                                    </div>    
                                </div>    
                                <div className="row center-button">
                                    <div className="col-md-12">  
                                        <RaisedButton
                                            type="submit"
                                            color="primary"
                                            label="Register"
                                            primary={true} 
                                            className="btn-wrap"/>
                                    </div>        
                                </div>        
                            </ValidatorForm>
                        </div>
                    </div>
                </div>

                {/* Message component */}
                <Dialog
                    title="REGISTERED!"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    Your Account has been created successfully.
                </Dialog>
            </div>
        )
    }
}