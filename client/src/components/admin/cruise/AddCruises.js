import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, DateValidator, SelectValidator } from 'react-material-ui-form-validator';
import { Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const styles = {
    appBar: {
        background: '#d32f2f'
    },
    formStyle: {
        margin: '50px 100px',
        width: '100%',
    },
    raisedButton: {
        background: '#689F38',
        margin: '50px 350px'
    },
    textField: {
        width: '300px'
    },
    table_size: {
        width: '80%'
    },
    btn_footer: {
        margin: '40px 10px'
    }
};

export default class AddCruises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cruiseData: {
                title: '',
                description: '',
                region: '',
                ship: '',
                departingInfo: '',
                price: '',
                journey: '',
                departureDate: '',
                itinerary: []
            },
            itinerary: {
                day: '',
                date: '',
                port: '',
                arrive: '',
                depart: ''
            },
            regions: [],
            open: false,
            openItinerary: false,
            itineraries: [],
            selectedItinerary: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.clearFieldsItinerary = this.clearFieldsItinerary.bind(this)
        this.handleChangeItinerary = this.handleChangeItinerary.bind(this);
    };

    componentWillMount() {
        this.getRegion();
    }

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

    //Handles the changes in the region field
    handleChangeRegion(e, index, region) {
        let cruiseData = this.state.cruiseData;
        cruiseData.region = region;

        this.setState({ cruiseData: cruiseData });
    };

    addCruises(cruiseData) {
        axios.post('http://localhost:4000/cruise/add',
            cruiseData).then(resp => {
                this.handleOpen();
                console.log(resp);
            }).catch(err => console.log(err));
    }

    handleSubmit(e) {
        this.addCruises(this.state.cruiseData);
        e.preventDefault();
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChange(e) {
        let cruiseData = this.state.cruiseData;
        cruiseData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            cruiseData: cruiseData
        });
    }

    handleChangeItinerary(e) {
        let itineraryData = this.state.itinerary;
        itineraryData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            itinerary: itineraryData
        });
    }

    clearFields() {
        let cruiseData = this.state.cruiseData;
        cruiseData.title = '';
        cruiseData.description = '';
        cruiseData.category = '';

        this.setState({
            cruiseData: cruiseData
        })
    }

    clearFieldsItinerary() {
        let itineraryData = this.state.itinerary;
        itineraryData.day = '';
        itineraryData.date = '';
        itineraryData.port = '';
        itineraryData.arrive = '';
        itineraryData.depart = '';

        this.setState({
            itinerary: itineraryData
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleOpenItinerary = () => {
        this.clearFieldsItinerary();
        this.setState({ openItinerary: true });
    };

    handleClose = () => {
        this.clearFields();
        this.setState({ open: false });
    };

    handleCloseItinerary = () => {
        this.setState({ openItinerary: false });
    };

    //Handles the change in the Departure Date
    handleChangeDepartureDate(e, departureDate) {
        let cruiseData = this.state.cruiseData;
        cruiseData.departureDate = departureDate;

        this.setState({
            cruiseData: cruiseData
        })
    }

    //Handles the Itinerary date
    handleChangeDate(e, date) {
        let itineraryData = this.state.itinerary;
        itineraryData.date = date;

        this.setState({
            itinerary: itineraryData
        })
    }

    //Disable dates before the current date
    disablePrevDates(startDate) {
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    }

    //Open itinerary form
    openItinerary() {
        this.handleOpenItinerary();
    }

    //Include itinerary item to array
    addItinerary() {
        let newItinerary = {
            day: this.state.itinerary.day,
            date: this.state.itinerary.date,
            port: this.state.itinerary.port,
            arrive: this.state.itinerary.arrive,
            depart: this.state.itinerary.depart,
        }

        this.state.cruiseData.itinerary.push(newItinerary);
        this.handleCloseItinerary();
    }

    //Removes item from itinerary table
    // removeItinerary() {
    //     console.log(this.state.selectedItinerary);
    //     this.state.selectedItinerary.map((itineraryIndex, i) => {
    //         var newItinerary = this.state.cruiseData.itinerary.slice();
    //         newItinerary.splice(itineraryIndex, 1);
    //         this.setState({cruiseData: {itinerary: newItinerary}}); 
    //     });
    // }

    incrementItinerary(e) {
        let selectedItem = e.slice();

        this.setState({
            selectedItinerary: selectedItem
        });
    }

    //If the list changes load the list 
    returnItineraryList() {
        return this.state.cruiseData.itinerary.map((itinerary, i) => {
            return (
                <TableRow key={i} selected={this.state.selectedItinerary.indexOf(i) !== -1}>
                    <TableRowColumn>{itinerary.day}</TableRowColumn>
                    <TableRowColumn>{this.formatDate(itinerary.date)}</TableRowColumn>
                    <TableRowColumn>{itinerary.port}</TableRowColumn>
                    <TableRowColumn>{itinerary.arrive}</TableRowColumn>
                    <TableRowColumn>{itinerary.depart}</TableRowColumn>
                </TableRow>
            )
        })
    }

    //Format date to display in table
    formatDate(date) {
        let formatDate = new Date(date);

        return (formatDate.toLocaleDateString());
    }

    render() {
        const region = this.state.regions.map((region, i) => {
            return (
                <MenuItem key={i} value={region.name} primaryText={region.name} />
            )
        })
        const { cruiseData } = this.state;
        const actions = [
            <Link to='/adminCruise/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];
        return (
            <Card>
                <AppBar title="Add Cruise Package" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <ValidatorForm onSubmit={this.handleSubmit.bind(this)} style={styles.formStyle}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <TextValidator
                                        type="text"
                                        name='title'
                                        value={cruiseData.title}
                                        onChange={this.handleChange}
                                        floatingLabelText="Title"
                                        style={styles.textField}
                                        validators={['required']}
                                        errorMessages={['this field is required']} />
                                </div>
                                <div className="col-md-6">
                                    <TextValidator
                                        name="description"
                                        value={cruiseData.description}
                                        onChange={this.handleChange}
                                        floatingLabelText="Description"
                                        style={styles.textField}
                                        validators={['required']}
                                        errorMessages={['this field is required']} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <TextValidator
                                        type="text"
                                        name="ship"
                                        value={cruiseData.ship}
                                        onChange={this.handleChange}
                                        floatingLabelText="Ship"
                                        style={styles.textField}
                                        validators={['required']} errorMessages={['this field is required']} />
                                </div>
                                <div className="col-md-6">
                                    <TextValidator
                                        type="text"
                                        name="departingInfo"
                                        value={cruiseData.departingInfo}
                                        onChange={this.handleChange}
                                        floatingLabelText="Departing Info"
                                        style={styles.textField}
                                        validators={['required']} errorMessages={['this field is required']} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <TextValidator
                                        type="text"
                                        name="price"
                                        value={cruiseData.price}
                                        onChange={this.handleChange}
                                        floatingLabelText="Price"
                                        style={styles.textField}
                                        validators={['required']} errorMessages={['this field is required']} />
                                </div>
                                <div className="col-md-6">
                                    <TextValidator
                                        type="text"
                                        name="journey"
                                        value={cruiseData.journey}
                                        onChange={this.handleChange}
                                        floatingLabelText="Journey"
                                        style={styles.textField}
                                        validators={['required']} errorMessages={['this field is required']} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <DateValidator
                                        type="text"
                                        mode="landscape"
                                        name="departureDate"
                                        floatingLabelText="Departure Date"
                                        value={cruiseData.departureDate}
                                        onChange={this.handleChangeDepartureDate.bind(this)}
                                        shouldDisableDate={this.disablePrevDates(new Date())}
                                        validators={['required']}
                                        errorMessages={['you must pick a date']} />
                                </div>
                                <div className="col-md-6">
                                    <SelectValidator
                                        floatingLabelText="Region"
                                        name="region"
                                        value={cruiseData.region}
                                        onChange={this.handleChangeRegion.bind(this)}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        floatingLabelFocusStyle={styles.text_color_focused}
                                        floatingLabelStyle={styles.text_color}
                                        labelStyle={styles.text_color}
                                    >
                                        {region}
                                    </SelectValidator>
                                </div>
                            </div>
                            <br />
                            <br />
                            <Table style={styles.table_size} onRowSelection={this.incrementItinerary.bind(this)} multiSelectable={true}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Day</TableHeaderColumn>
                                        <TableHeaderColumn>Date</TableHeaderColumn>
                                        <TableHeaderColumn>Port</TableHeaderColumn>
                                        <TableHeaderColumn>Arrive</TableHeaderColumn>
                                        <TableHeaderColumn>Depart</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody >
                                    {this.returnItineraryList()}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableRowColumn>
                                            <RaisedButton
                                                type="button"
                                                label="Add"
                                                secondary={true}
                                                style={styles.btn_footer}
                                                onClick={this.openItinerary.bind(this)}>
                                            </RaisedButton>
                                            {/* <RaisedButton
                                                label="Delete"
                                                secondary={true}
                                                onClick={this.removeItinerary.bind(this)}
                                                style={styles.btn_footer}>
                                            </RaisedButton> */}
                                        </TableRowColumn>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            <br />
                            <br />
                            <RaisedButton type="submit" label="Add Cruise Package" primary={true} style={styles.raisedButton}></RaisedButton>
                        </div>
                        {/* SUCCESS MESSAGE */}
                        <Dialog
                            title="Message"
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}>
                            Cruise Package has been Added.
                        </Dialog>

                        {/* ITINERARY FORM */}
                        <Dialog
                            title="Add Itinerary"
                            modal={false}
                            open={this.state.openItinerary}
                            autoScrollBodyContent={true}
                            onRequestClose={this.handleCloseItinerary}>
                            <ValidatorForm onSubmit={this.addItinerary.bind(this)} style={styles.formStyle}>
                                <TextValidator
                                    type="text"
                                    name='day'
                                    value={this.state.itinerary.day}
                                    onChange={this.handleChangeItinerary}
                                    floatingLabelText="Day"
                                    style={styles.textField}
                                    validators={['required']}
                                    errorMessages={['this field is required']} />
                                <DateValidator
                                    type="text"
                                    mode="landscape"
                                    name="date"
                                    floatingLabelText="Date"
                                    value={this.state.itinerary.date}
                                    onChange={this.handleChangeDate.bind(this)}
                                    shouldDisableDate={this.disablePrevDates(new Date())}
                                    validators={['required']}
                                    errorMessages={['you must pick a date']} />
                                <TextValidator
                                    type="text"
                                    name='port'
                                    value={this.state.itinerary.port}
                                    onChange={this.handleChangeItinerary}
                                    floatingLabelText="Port"
                                    style={styles.textField}
                                    validators={['required']}
                                    errorMessages={['this field is required']} />
                                <br />
                                <TextValidator
                                    type="text"
                                    name='arrive'
                                    value={this.state.itinerary.arrive}
                                    onChange={this.handleChangeItinerary}
                                    floatingLabelText="Arrive"
                                    style={styles.textField} />
                                <br />
                                <TextValidator
                                    type="text"
                                    name='depart'
                                    value={this.state.itinerary.depart}
                                    onChange={this.handleChangeItinerary}
                                    floatingLabelText="Depart"
                                    style={styles.textField}
                                    validators={['required']}
                                    errorMessages={['this field is required']} />
                                <br />
                                <RaisedButton type="submit" label="Add" primary={true}></RaisedButton>
                            </ValidatorForm>
                        </Dialog>
                    </ValidatorForm>
                </CardText>
            </Card>
        )
    }
}
