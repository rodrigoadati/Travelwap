import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, DateValidator } from 'react-material-ui-form-validator';

// import Proptypes from 'prop-types';

const styles = {
    appBar: {
        background: '#3F51B5'
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
    },
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

class AddFlights extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightData: {
                title: '',
                description: '',
                airline: '',
                departure: '',
                region: '',
                travelDate: null,
                bookBy: null,
                featured: false
            }, open: false

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTravelDate = this.handleChangeTravelDate.bind(this);
        this.handleChangeBookBy = this.handleChangeBookBy.bind(this);
        this.handleChangeFeatured = this.handleChangeFeatured.bind(this);
    };

    addFlights(flightData) {
        axios.post('http://localhost:4000/flight/add',
            flightData).then(resp => {
                this.handleOpen();
                console.log(resp);
            }).catch(err => console.log(err));
    }

    handleSubmit(e) {
        this.addFlights(this.state.flightData);
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

    handleChangeTravelDate(e, travelDate) {
        let flightData = this.state.flightData;
        flightData.travelDate = travelDate;

        this.setState({
            flightData: flightData
        })
    }

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

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { flightData } = this.state;
        const actions = [
            <Link to='/flights/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];
        return (
            <Card>
                <AppBar title="Add Flight Package" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <ValidatorForm onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>

                        <TextValidator type="text" name='title' value={flightData.title} onChange={this.handleChange}
                            floatingLabelText="Title" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator name="description" value={flightData.description} onChange={this.handleChange}
                            floatingLabelText="Description" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator type="text" name="airline" value={flightData.airline} onChange={this.handleChange}
                            floatingLabelText="Airline" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator type="text" name="departure" value={flightData.departure} onChange={this.handleChange}
                            floatingLabelText="Departure" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator type="text" name="region" value={flightData.region} onChange={this.handleChange}
                            floatingLabelText="Region" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <DateValidator type="text" mode="landscape" name="travelDate"
                            floatingLabelText="Travel Date" value={flightData.travelDate} onChange={this.handleChangeTravelDate}
                            validators={['required']} errorMessages={['you must pick a date']} />
                        <DateValidator type="text" mode="landscape" name="bookBy"
                            floatingLabelText="Book By" value={flightData.bookBy} onChange={this.handleChangeBookBy}
                            validators={['required']} errorMessages={['you must pick a date']} />
                        <Checkbox type="checkbox" label="Featured" name="featured"
                            checked={flightData.featured} onClick={this.handleChangeFeatured} style={styles.checkbox} />
                        <RaisedButton type="submit" label="Add Flight Package" primary={true} style={styles.raisedButton}></RaisedButton>

                        <Dialog
                            title="Message"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}>
                            Flight Package has been Added.
                        </Dialog>
                    </ValidatorForm>

                </CardText>
            </Card>
        )
    }
}

export default AddFlights;


