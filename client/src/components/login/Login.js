import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import history from "../history";
import { Link } from "react-router-dom";
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import './Login.css';

const styles = {
    text_color: {
        color: '#ffffff'
    },
    text_color_focused: {
        color: '#00bad4'
    },
    text_email: {
        width: '100%',
        color: '#000000'
    },
    btn_submit: {
        width: '100%',
        height: '50%',
    }
};

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            cookies: new Cookies(),
            login: {
                username: '',
                password: ''
            },
            toogleBtn: false,
            recoverPassword: 'pr-wrap',
            open: false,
            emailInput: ''
        };

        this.handleChange = this.handleChange.bind(this);

    }

    /**********************/
    //FUNCTIONS
    /**********************/
    login(login) {
        axios.request({
            method: 'get',
            url: 'http://localhost:4000/user/login?username=' + login.username + '&password=' + login.password,
            data: login
        }).then(response => {
            //User found
            if (response.data.length !== 0) {
                //Add information of the user to cookie
                this.state.cookies.set('user_id', response.data[0]._id, { path: '/' });
                this.state.cookies.set('username', response.data[0].username, { path: '/' });
                this.state.cookies.set('email', response.data[0].personDetails[0].email, { path: '/' });
                this.state.cookies.set('role', response.data[0].role, { path: '/' });

                //Redirects the user to home page
                if (response.data[0].role === 'user')
                    history.push('/');
                else
                    history.push('/admin');
            }
            else {
                this.handleOpen();
            }
        }).catch(err => console.log(err));
    }

    //Submit the login of the user
    onSubmit(e) {
        this.login(this.state.login);
        e.preventDefault();
    }

    //Displays the modal to recover the password
    RecoverPassword() {
        if (this.state.toogleBtn === false)
            this.setState({ recoverPassword: "pr-wrap" });
        else
            this.setState({ recoverPassword: "show-pass-reset" });

        //Change the state of the button
        this.setState({ toogleBtn: !this.state.toogleBtn });
    }

    sendEmail(){
        this.sendLinktoUser(this.state.emailInput);
    }

    //Get user id
    sendLinktoUser(email) {
        axios.get('http://localhost:4000/person/getUserId/' + email)
            .then(response => {
                    console.log(response.data.person);
                if (response.data.length !== 0) {
                    let email = {
                        to: this.state.emailInput,
                        subject: 'Recover Password',
                        text: 'Password: ',
                        html: `Please access the following link to reset your password: 
                               <a href='http://localhost:3000/resetPassword/${response.data.person[0]._id}'>Reset Password</a>`
                    }

                    axios.request({
                        method: 'post',
                        url: 'http://localhost:4000/email/send/',
                        data: email
                    }).then(response => {
                    }).catch(err => console.log(err));

                    alert('Email sent, please check your email');
                }
                else {
                    alert('Email not found');
                }
            }).catch(err => console.log(err));
    }

    //Handle changes in the form
    handleChange(e) {
        let loginData = this.state.login;
        loginData[e.target.name] = e.target.value;

        this.setState({
            login: loginData
        });
    }

    //Handle change in the recover email input
    handleChangeEmail(e) {
        let input = e.target.value;

        this.setState({
            emailInput: input
        });
    }

    //Open modal
    handleOpen = () => {
        this.setState({ open: true });
    };

    //Close modal
    handleClose = () => {
        this.setState({ open: false });
    };

    /**********************/
    //TEMPLATE
    /**********************/
    render() {
        //Set message action button
        const actions = [
            <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
        ];

        return (
            <div className="Login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* Recover password */}
                            <div className={this.state.recoverPassword}>
                                <div className="pass-reset">
                                    <ValidatorForm className="form-person" ref="form" onSubmit={this.sendEmail.bind(this)} onError={errors => console.log(errors)}>
                                        <label>
                                            Enter the email you signed up with</label>
                                        <TextValidator
                                            floatingLabelText="Email"
                                            onChange={this.handleChangeEmail.bind(this)}
                                            name="email"
                                            value={this.state.emailInput}
                                            validators={['required', 'isEmail']}
                                            errorMessages={['this field is required', 'email is not valid']}
                                            style={styles.text_email}
                                        />
                                        <RaisedButton
                                            type="submit"
                                            label="Submit"
                                            primary={true}
                                            style={styles.btn_submit}
                                        />
                                    </ValidatorForm>
                                </div>
                            </div>
                            <div className="wrap">
                                <p className="form-title">Sign In</p>
                                <form className="login" onSubmit={this.onSubmit.bind(this)}>
                                    <TextField
                                        id="username"
                                        floatingLabelText="Username"
                                        type="text"
                                        name="username"
                                        margin="normal"
                                        onChange={this.handleChange}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                        inputStyle={styles.text_color}
                                    />
                                    <TextField
                                        id="password"
                                        floatingLabelText="Password"
                                        type="password"
                                        name="password"
                                        margin="normal"
                                        onChange={this.handleChange}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                        inputStyle={styles.text_color}
                                    />
                                    <input type="submit" value="Sign In" className="btn btn-success btn-sm" />
                                    <div className="remember-forgot">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="checkbox">
                                                    <label>
                                                        <Link to={'/person/add'}>Create account</Link>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 forgot-pass-content">
                                                <a href="#" onClick={this.RecoverPassword.bind(this)} className="forgot-pass">Forgot Password</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message component */}
                <Dialog
                    title="Warning"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    Username or password invalid!
                </Dialog>
            </div>
        );
    }
}
