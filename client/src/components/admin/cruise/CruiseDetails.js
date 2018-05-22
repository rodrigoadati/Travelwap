import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
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
        margin: '10px 350px',
        background: '#689F38'
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

export default class CruiseDetails extends Component {
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
                departureDate: new Date(),
                itinerary: []
            },
            itinerary: {
                day: '',
                date: new Date(),
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
        this.deleteCruise = this.deleteCruise.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearFieldsItinerary = this.clearFieldsItinerary.bind(this)
        this.handleChangeItinerary = this.handleChangeItinerary.bind(this);
    }

    componentWillMount() {
        this.getRegion();
    }
    
    componentDidMount() {
        let cruiseId = this.props.match.params.id;
        axios.get(`http://localhost:4000/cruise/get/${cruiseId}`)
            .then(resp => {
                this.setState({
                    cruiseData: resp.data.cruise
                })
            })
            .catch(console.error);

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

    //Handles the changes in the region field
    handleChangeRegion(e, index, region) {
        let cruiseData = this.state.cruiseData;
        cruiseData.region = region;

        this.setState({ cruiseData: cruiseData });
    };

    updatecruise(cruiseData) {
        let cruiseId = this.props.match.params.id;
        axios.post(`http://localhost:4000/cruise/update/${cruiseId}`,
            cruiseData)
            .then(resp => {
                this.handleOpen();
                console.log(resp);
            }).catch(err => console.log(err));
    }

    formatDate(date) {
        let formatDate = new Date(date);

        return (formatDate.toLocaleDateString());
    }

    deleteCruise() {
        let cruiseId = this.props.match.params.id;
        axios.delete(`http://localhost:4000/cruise/delete/${cruiseId}`)
            .then(resp => {
                console.log(resp);
                this.props.history.push('/cruiseAdmin');
            }).catch(err => console.log(err));
    }

    handleSubmitUpdate(e) {
        this.setState({ actionType: 'update', actionMsg: 'Cruise Package has been updated.' });
        this.updatecruise(this.state.cruiseData);
        e.preventDefault();
    }

    handleSubmitDelete(e) {
        this.setState({ actionType: 'delete', actionMsg: 'Are you sure you want to delete this Cruise Package?' });
        this.handleOpen();
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

    //Handles the Itinerary date
    handleChangeDate(e, date) {
        let itineraryData = this.state.itinerary;
        itineraryData.date = date;

        this.setState({
            itinerary: itineraryData
        })
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

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeItinerary(e) {
        let itineraryData = this.state.itinerary;
        itineraryData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            itinerary: itineraryData
        });
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

    handleOpenItinerary = () => {
        this.clearFieldsItinerary();
        this.setState({ openItinerary: true });
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

    incrementItinerary(e) {
        let selectedItem = e.slice();

        this.setState({
            selectedItinerary: selectedItem
        });
    }

    render() {
        const region = this.state.regions.map((region, i) => {
            return (
                <MenuItem key={i} value={region.name} primaryText={region.name} />
            )
        })
        const { cruiseData } = this.state;
        const actionType = this.state.actionType;
        const actionMsg = this.state.actionMsg;
        const actions = [
            <Link to='/adminCruise/'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} />
            </Link>,
        ];
        const actionsDelete = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton label="Yes" primary={true} onClick={this.deleteCruise} />
        ];
        return (
            <Card>
                <AppBar title="Cruise Package Details" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <ValidatorForm onSubmit={this.handleSubmitUpdate.bind(this)} style={styles.formStyle}>
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
                                        value={new Date(cruiseData.departureDate)}
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
                            <RaisedButton type="submit" label="Update Cruise Package" primary={true} style={styles.raisedButton}></RaisedButton>
                            <RaisedButton name="delete" label="Delete Cruise Package" secondary={true} style={styles.raisedButton} onClick={this.handleSubmitDelete.bind(this)}></RaisedButton>
                            <Dialog
                                title="Message"
                                actions={(actionType === 'update') ? actions : actionsDelete}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}>
                                {actionMsg}
                            </Dialog>
                        </div>
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
            </Card >
        )
    }
}





