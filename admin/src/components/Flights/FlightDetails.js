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

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, DateValidator } from 'react-material-ui-form-validator';

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
                region: '',
                travelDate: null,
                bookBy: null,
                featured: false,
            }, open: false,
            actionType: '',
            actionMsg: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTravelDate = this.handleChangeTravelDate.bind(this);
        this.handleChangeBookBy = this.handleChangeBookBy.bind(this);
        this.handleChangeFeatured = this.handleChangeFeatured.bind(this);
        this.deleteFlight = this.deleteFlight.bind(this);
    }

    componentDidMount() {
        let flightId = this.props.match.params.id;
        axios.get(`http://localhost:4000/flight/get/${flightId}`)
            .then(resp => {
                let flightResp = {
                    title: resp.data.flight.title,
                    description: resp.data.flight.description,
                    airline: resp.data.flight.airline,
                    departure: resp.data.flight.departure,
                    region: resp.data.flight.region,
                    travelDate: this.formatDate(resp.data.flight.travelDate),
                    bookBy: this.formatDate(resp.data.flight.bookBy),
                    featured: resp.data.flight.featured
                }
                this.setState({
                    flightData: flightResp
                })
                console.log(this.state.flightData)
            })
            .catch(console.error);

    };

    updateflight(flightData) {
        let flightId = this.props.match.params.id;
        axios.post(`http://localhost:4000/flight/update/${flightId}`,
            flightData)
            .then(resp => {
                this.handleOpen();
                console.log(resp);
            }).catch(err => console.log(err));
    }

    deleteFlight() {
        let flightId = this.props.match.params.id;
        axios.delete(`http://localhost:4000/flight/delete/${flightId}`)
            .then(resp => {
                console.log(resp);
                this.props.history.push('/flights');
            }).catch(err => console.log(err));
    }

    formatDate(date) {
        let d = new Date(date),
            year = d.getFullYear(),
            month = ("0" + (d.getMonth() + 1)).slice(-2),
            day = ("0" + (d.getDate())).slice(-2);
        let dateFormat = year + '-' + month + '-' + day;
        return (dateFormat === null) ? null : new Date(dateFormat);
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
        const actionType = this.state.actionType;
        const actionMsg = this.state.actionMsg;
        const actions = [
            <Link to='/flights/'>
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




