import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    appBar: {
        background: '#33691E'
    },
    formStyle: {
        padding: '20px',
        width: '30%'
    },
    raisedButton: {
        margin: '50px 20px',
        background: '#689F38'
    },
    textField: {
        width: '100%'
    }
};

class HotelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotelData: {
                title: '',
                description: '',
                region: '',
                city: '',
                price: '',
                propertyFeature: {
                    wifi: false,
                    bbq: false,
                    library: false,
                    bycicle: false,
                    dinning: false
                },
                roomFeature: {
                    airConditioning: false,
                    fan: false,
                    sharedFacilities: false,
                    dvd: false,
                    tv: false,
                    fridge: false
                }
            },
            open: false,
            regions: [],
            cities: []
        };

        this.deleteHotel = this.deleteHotel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFeatured = this.handleChangeFeatured.bind(this);
    }

    componentWillMount() {
        let hotelId = this.props.match.params.id;

        axios.get(`http://localhost:4000/hotel/get/${hotelId}`)
            .then(resp => {
                this.setState({
                    hotelData: resp.data.hotel
                });

                this.getRegion();
                this.getCities(resp.data.hotel.region);

            }).catch(console.error);
    };

    //Handles the changes in the region field
    handleChangeRegion(e, index, region) {
        let hotelData = this.state.hotelData;
        hotelData.region = region;

        this.setState({ hotelData: hotelData });

        //Get cities data by region
        this.getCities(region);
        this.setState({ disableCity: false });
    };

    handleChangeCity(e, index, city) {
        let hotelData = this.state.hotelData;
        hotelData.city = city;

        this.setState({ hotelData: hotelData });
    }

    updateCheckProperty(e, value) {
        let hotelData = this.state.hotelData;
        hotelData.propertyFeature[e.target.value] = value;

        this.setState({
            hotelData: hotelData
        })
    }

    updateCheckRoom(e, value) {
        let hotelData = this.state.hotelData;
        hotelData.roomFeature[e.target.value] = value;

        this.setState({
            hotelData: hotelData
        })
    }

    updatehotel(hotelData) {
        let hotelId = this.props.match.params.id;
        axios.post(`http://localhost:4000/hotel/update/${hotelId}`, hotelData)
            .then(resp => {
                this.handleOpen();
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

    deleteHotel() {
        let hotelId = this.props.match.params.id;
        axios.delete(`http://localhost:4000/hotel/delete/${hotelId}`)
            .then(resp => {
                this.props.history.push('/adminHotel');
            }).catch(err => console.log(err));
    }

    handleSubmitUpdate(e) {
        this.setState({ actionType: 'update', actionMsg: 'Hotel Package has been updated.' });
        this.updatehotel(this.state.hotelData);
        e.preventDefault();
    }

    handleSubmitDelete(e) {
        this.setState({ actionType: 'delete', actionMsg: 'Are you sure you want to delete this Hotel Package?' });
        this.handleOpen();
        e.preventDefault();
    }

    getFieldValue(target) {
        return target.type === 'checkbox' ? target.checked : target.value;
    }

    handleChange(e) {
        let hotelData = this.state.hotelData;
        hotelData[e.target.name] = this.getFieldValue(e.target);

        this.setState({
            hotelData: hotelData
        });
    }

    handleChangeFeatured(e) {
        let hotelData = this.state.hotelData;
        hotelData.featured = e.target.checked;
        this.setState({
            hotelData: hotelData
        })
    }

    handleChangeDate(e, expiry) {
        let hotelData = this.state.hotelData;
        hotelData.expiry = expiry;

        this.setState({
            hotelData: hotelData
        })
    }

    clearFields() {
        let hotelData = this.state.hotelData;
        hotelData.title = '';
        hotelData.description = '';
        hotelData.category = '';

        this.setState({
            hotelData: hotelData
        })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
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

    getCities(region) {
        axios.get('http://localhost:4000/city/getCitiesByRegion?region=' + region)
            .then(response => {
                this.setState({ cities: response.data })
            }).catch(err => console.log(err));
    }

    render() {
        const region = this.state.regions.map((region, i) => {
            return (
                <MenuItem key={i} value={region.name} primaryText={region.name} />
            )
        })
        const cities = this.state.cities.map((city, i) => {
            return (
                <MenuItem key={i} value={city.name} primaryText={city.name} />
            )
        })
        const { hotelData } = this.state;
        const actionType = this.state.actionType;
        const actionMsg = this.state.actionMsg;
        const actions = [
            <Link to='/adminHotel/'>
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
            <FlatButton label="Yes" primary={true} onClick={this.deleteHotel} />
        ];
        return (
            <Card>
                <AppBar title="Hotel Package Details" iconClassNameRight="muidocs-icon-navigation-expand-more" showMenuIconButton={false} style={styles.appBar} />
                <CardText>
                    <ValidatorForm onSubmit={this.handleSubmitUpdate.bind(this)} style={styles.formStyle}>
                        <Checkbox type="checkbox" label="Featured" name="featured"
                            checked={hotelData.featured} onClick={this.handleChangeFeatured}
                            style={styles.checkbox} />
                        <TextValidator type="text" name='title' value={hotelData.title} onChange={this.handleChange}
                            floatingLabelText="Title" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator name="description" value={hotelData.description} onChange={this.handleChange}
                            floatingLabelText="Description" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <SelectValidator
                            floatingLabelText="Region"
                            name="region"
                            value={hotelData.region}
                            onChange={this.handleChangeRegion.bind(this)}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            floatingLabelFocusStyle={styles.text_color_focused}
                            floatingLabelStyle={styles.text_color}
                            labelStyle={styles.text_color}
                        >
                            {region}
                        </SelectValidator>
                        <SelectValidator
                            floatingLabelText="City"
                            name="city"
                            value={hotelData.city}
                            onChange={this.handleChangeCity.bind(this)}
                            validators={['required']}
                            disabled={this.state.disableCity}
                            errorMessages={['this field is required']}
                            floatingLabelFocusStyle={styles.text_color_focused}
                            floatingLabelStyle={styles.text_color}
                            labelStyle={styles.text_color}
                        >
                            {cities}
                        </SelectValidator>
                        <TextValidator type="text" name="price" value={hotelData.price} onChange={this.handleChange}
                            floatingLabelText="Price per night" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <br />
                        <br />
                        <h4>Property Features</h4>
                        <Checkbox
                            label="Wi-Fi"
                            value="wifi"
                            checked={this.state.hotelData.propertyFeature.wifi}
                            onCheck={this.updateCheckProperty.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Barbecue Area"
                            value="bbq"
                            checked={this.state.hotelData.propertyFeature.bbq}
                            onCheck={this.updateCheckProperty.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Library"
                            value="library"
                            checked={this.state.hotelData.propertyFeature.library}
                            onCheck={this.updateCheckProperty.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Bicycle Area"
                            value="bicycle"
                            checked={this.state.hotelData.propertyFeature.bicycle}
                            onCheck={this.updateCheckProperty.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Dining Area"
                            value="dining"
                            checked={this.state.hotelData.propertyFeature.dining}
                            onCheck={this.updateCheckProperty.bind(this)}
                            style={styles.checkbox}
                        />
                        <br />
                        <h4>Room Features</h4>
                        <Checkbox
                            label="Air-conditioning"
                            value="airConditioning"
                            checked={this.state.hotelData.roomFeature.airConditioning}
                            onCheck={this.updateCheckRoom.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Fan"
                            value="fan"
                            checked={this.state.hotelData.roomFeature.fan}
                            onCheck={this.updateCheckRoom.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Shared Facilities"
                            value="sharedFacilities"
                            checked={this.state.hotelData.roomFeature.sharedFacilities}
                            onCheck={this.updateCheckRoom.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="DVD Player"
                            value="dvd"
                            checked={this.state.hotelData.roomFeature.dvd}
                            onCheck={this.updateCheckRoom.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="TV"
                            value="tv"
                            checked={this.state.hotelData.roomFeature.tv}
                            onCheck={this.updateCheckRoom.bind(this)}
                            style={styles.checkbox}
                        />
                        <Checkbox
                            label="Fridge"
                            value="fridge"
                            checked={this.state.hotelData.roomFeature.fridge}
                            onCheck={this.updateCheckRoom.bind(this)}
                            style={styles.checkbox}
                        />
                        <RaisedButton type="submit" label="Update Hotel Package" primary={true} style={styles.raisedButton}></RaisedButton>
                        <RaisedButton name="delete" label="Delete Hotel Package" secondary={true} style={styles.raisedButton} onClick={this.handleSubmitDelete.bind(this)}></RaisedButton>
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
            </Card >
        )
    }
}

export default HotelDetails;




