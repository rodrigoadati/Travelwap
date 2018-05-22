import React, { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';
import Dialog from 'material-ui/Dialog';
import { Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';

const styles = {
    text_color: {
        color: '#000000'
    },
    text_color_focused: {
        color: '#00bad4'
    }
};

export default class ResetPassword extends Component {
    /**************/
    /*FUNCTIONS*/
    /**************/
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            open: false
        }
    }

    //Handles changes in the form
    handleChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    //Submit the form with the password
    onSubmit(e) {
        this.resetPassword(this.props.match.params.id, this.state.password);
        e.preventDefault();
    }

    resetPassword(id, password) {
        axios.post(`http://localhost:4000/user/resetPassword/${id}/${password}`)
            .then(resp => {
                if (resp.data.success === true) {
                    this.handleOpen();
                }
                else {
                    alert('Could not change password');
                }

            }).catch(err => console.log(err));
    }

    //Handle the opening of the message 
    handleOpen = () => {
        this.setState({ open: true });
    };
    /**************/
    /*TEMPLATE*/
    /**************/
    render() {
        //Set message action button
        const actions = [
            <Link to='/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];

        return (
            <div className="ResetPassword">
                <ValidatorForm className="form-person" ref="form" onSubmit={this.onSubmit.bind(this)} onError={errors => console.log(errors)}>
                    <div className="row">
                        <div className="col-md-12" style={{ textAlign: "center" }}>
                            {/* PASSWORD */}
                            <TextValidator
                                floatingLabelText="Password"
                                onChange={this.handleChange.bind(this)}
                                name="password"
                                type="password"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                value={this.state.password}
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
                                label="Reset"
                                primary={true}
                                className="btn-wrap" />
                        </div>
                    </div>
                </ValidatorForm>

                {/* Message component */}
                <Dialog
                    title="Password Changed!"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    Password changed successfully.
                </Dialog>
            </div>
        )
    }
}