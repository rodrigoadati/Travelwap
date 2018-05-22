import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator } from 'react-material-ui-form-validator';

const styles = {
    appBar: {
        background: '#33691E'
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
                    bicycle: false,
                    dining: false
                },
                roomFeature: {
                    airConditioning: false,
                    fan: false,
                    sharedFacilities: false,
                    dvd: false,
                    tv: false,
                    fridge: false
                },
                featured: false,
            },
            open: false,
            actionType: '',
            actionMsg: ''
        };

        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePropertyFeature = this.handleChangePropertyFeature.bind(this);
        this.handleChangeRoomFeature = this.handleChangeRoomFeature.bind(this);
        this.handleChangeFeatured = this.handleChangeFeatured.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
        // this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentDidMount() {
        let hotelId = this.props.match.params.id;
        axios.get(`http://localhost:4000/hotel/get/${hotelId}`)
            .then(resp => {
                let hotelResp = {
                    title: resp.data.hotel.title,
                    description: resp.data.hotel.description,
                    region: resp.data.hotel.region,
                    city: resp.data.hotel.city,
                    price: resp.data.hotel.price,
                    propertyFeature: {
                        wifi: resp.data.hotel.propertyFeature.wifi,
                        bbq: resp.data.hotel.propertyFeature.bbq,
                        library: resp.data.hotel.propertyFeature.library,
                        bicycle: resp.data.hotel.propertyFeature.bicycle,
                        dining: resp.data.hotel.propertyFeature.dining
                    },
                    roomFeature: {
                        airConditioning: resp.data.hotel.roomFeature.airConditioning,
                        fan: resp.data.hotel.roomFeature.fan,
                        sharedFacilities: resp.data.hotel.roomFeature.sharedFacilities,
                        dvd: resp.data.hotel.roomFeature.dvd,
                        tv: resp.data.hotel.roomFeature.tv,
                        fridge: resp.data.hotel.roomFeature.fridge
                    },
                    featured: resp.data.hotel.featured
                }
                this.setState({
                    hotelData: hotelResp
                })
                console.log(this.state.hotelData)
            })
            .catch(console.error);

    };

    updatehotel(hotelData) {
        let hotelId = this.props.match.params.id;
        axios.post(`http://localhost:4000/hotel/update/${hotelId}`,
            hotelData)
            .then(resp => {
                this.handleOpen();
                console.log(resp);
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
                console.log(resp);
                this.props.history.push('/hotels');
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

    // handleChangeDate(e, expiry) {
    //     let hotelData = this.state.hotelData;
    //     hotelData.expiry = expiry;

    //     this.setState({
    //         hotelData: hotelData
    //     })
    // }

    // clearFields() {
    //     let hotelData = this.state.hotelData;
    //     hotelData.title = '';
    //     hotelData.description = '';
    //     hotelData.category = '';

    //     this.setState({
    //         hotelData: hotelData
    //     })
    // }

    handleChangePropertyFeature(e) {
        let propertyFeature = this.state.hotelData.propertyFeature;
        propertyFeature[e.target.name] = e.target.checked;
        this.setState({
            propertyFeature: propertyFeature
        })
    }

    handleChangeRoomFeature(e) {
        let roomFeature = this.state.hotelData.roomFeature;
        roomFeature[e.target.name] = e.target.checked;
        this.setState({
            roomFeature: roomFeature
        })
    }

    handleChangeFeatured(e) {
        let hotelData = this.state.hotelData;
        hotelData.featured = e.target.checked;
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

    render() {
        const { hotelData } = this.state;
        const actionType = this.state.actionType;
        const actionMsg = this.state.actionMsg;
        const actions = [
            <Link to='/hotels/'>
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

                        <TextValidator type="text" name='title' value={hotelData.title} onChange={this.handleChange}
                            floatingLabelText="Title" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator name="description" value={hotelData.description} onChange={this.handleChange}
                            floatingLabelText="Description" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator type="text" name="region" value={hotelData.region} onChange={this.handleChange}
                            floatingLabelText="Region" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator type="text" name="city" value={hotelData.city} onChange={this.handleChange}
                            floatingLabelText="City" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <TextValidator type="text" name="price" value={hotelData.price} onChange={this.handleChange}
                            floatingLabelText="Price" style={styles.textField}
                            validators={['required']} errorMessages={['this field is required']} />
                        <h3>Property Features</h3>
                        <Checkbox type="checkbox" label="Wifi" name="wifi"
                            checked={hotelData.propertyFeature.wifi} onClick={this.handleChangePropertyFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Bbq" name="bbq"
                            checked={hotelData.propertyFeature.bbq} onClick={this.handleChangePropertyFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Library" name="library"
                            checked={hotelData.propertyFeature.library} onClick={this.handleChangePropertyFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Bicycle" name="bicycle"
                            checked={hotelData.propertyFeature.bicycle} onClick={this.handleChangePropertyFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Dining" name="dining"
                            checked={hotelData.propertyFeature.dining} onClick={this.handleChangePropertyFeature} style={styles.checkbox} />
                        <h3>Room Features</h3>
                        <Checkbox type="checkbox" label="Air Conditioning" name="airConditioning"
                            checked={hotelData.roomFeature.airConditioning} onClick={this.handleChangeRoomFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Fan" name="fan"
                            checked={hotelData.roomFeature.fan} onClick={this.handleChangeRoomFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Shared Facilities" name="sharedFacilities"
                            checked={hotelData.roomFeature.sharedFacilities} onClick={this.handleChangeRoomFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Dvd" name="dvd"
                            checked={hotelData.roomFeature.dvd} onClick={this.handleChangeRoomFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Tv" name="tv"
                            checked={hotelData.roomFeature.tv} onClick={this.handleChangeRoomFeature} style={styles.checkbox} />
                        <Checkbox type="checkbox" label="Fridge" name="fridge"
                            checked={hotelData.roomFeature.fridge} onClick={this.handleChangeRoomFeature} style={styles.checkbox} />
                        <h3>Featured</h3>
                        <Checkbox type="checkbox" label="Featured" name="featured"
                            checked={hotelData.featured} onClick={this.handleChangeFeatured} style={styles.checkbox} />
                        <RaisedButton type="submit" label="Update Hotel Package" primary={true} style={styles.raisedButton}></RaisedButton>
                        <RaisedButton name="delete" label="Delete Car Package" secondary={true} style={styles.raisedButton} onClick={this.handleSubmitDelete.bind(this)}></RaisedButton>
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

export default HotelDetails;




