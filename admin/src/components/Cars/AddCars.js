import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';

// import Proptypes from 'prop-types';

const styles = {
    appBar: {
        background: '#d32f2f'
    },
    formStyle: {
        padding: '20px'
    },
    raisedButton: {
        margin: '12px',
        background: '#689F38'
    },
    textField: {
        width: '800px'
    }
};

class AddCars extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carData: {
                title: '',
                description: '',
                category: '',
            }, open: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleChangeDate = this.handleChangeDate.bind(this);
        this.clearFields = this.clearFields.bind(this);
    };

    addCars(carData) {
        axios.post('http://localhost:4000/api/cars/',
            carData).then(resp => {
                this.handleOpen();
                console.log(resp);
            }).catch(err => console.log(err));
    }

    handleSubmit(e) {
        this.addCars(this.state.carData);
        e.preventDefault();
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChange(e) {
        let carData = this.state.carData;
        carData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            carData: carData
        });
    }

    // handleChangeDate(e, expiry) {
    //     let carData = this.state.carData;
    //     carData.expiry = expiry;

    //     this.setState({
    //         carData: carData
    //     })
    // }

    clearFields() {
        let carData = this.state.carData;
        carData.title = '';
        carData.description = '';
        carData.category = '';
        
        this.setState({
            carData: carData
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.clearFields();
        this.setState({ open: false });
    };

    render() {
        const { carData } = this.state;
        const actions = [
            <Link to='/cars/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];
        return (
            <Card>
                <AppBar title="Add Car Package" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <ValidatorForm onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>

                        <TextValidator  type="text" name='title' value={carData.title} onChange={this.handleChange}
                                    floatingLabelText="Title" style={styles.textField}
                                    validators={['required']} errorMessages={['this field is required']}/>
                        <TextValidator  name="description" value={carData.description} onChange={this.handleChange}
                                    floatingLabelText="Description" style={styles.textField}
                                    validators={['required']} errorMessages={['this field is required']}/>
                        <TextValidator  type="text" name="category" value={carData.airline} onChange={this.handleChange}
                                    floatingLabelText="Category" style={styles.textField}
                                    validators={['required']} errorMessages={['this field is required']}/>
                        <br />
                        <RaisedButton type="submit" label="Add Car Package" primary={true} style={styles.raisedButton}></RaisedButton>

                        <Dialog
                            title="Message"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}>
                            Car Package has been Added.
                        </Dialog>
                    </ValidatorForm>
                </CardText>
            </Card>
        )
    }
}

export default AddCars;
