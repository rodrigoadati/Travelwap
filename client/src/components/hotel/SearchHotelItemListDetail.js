import React, { Component } from "react";
import { Tabs, Tab } from 'material-ui/Tabs';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Cookies from "universal-cookie";
import history from "../history";
import axios from "axios";
import Dialog from 'material-ui/Dialog';
import { Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    tab: {
        border: '2px solid #17aacf'
    },
    book: {
        color: "white",
        border: "2px solid #26d8ef"
    }
};

export default class SearchHotelItemListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelDetail: props.hotelDetail,
            cookies: new Cookies(),
            open: false,
            propertyFeature: [],
            roomFeature: []
        };
    }

    formatDate(date) {
        let formatDate = new Date(date);

        return (formatDate.toLocaleDateString());
    }

    setBooking() {
        let book = {
            user_id: this.state.cookies.get('user_id'),
            username: this.state.cookies.get('username'),
            type_id: this.state.hotelDetail._id,
            type_name: 'Hotel'
        }

        return book;
    }

    //Add data of the booking
    book() {
        if (this.state.cookies.get('user_id') !== undefined) {
            let newBook = this.setBooking();

            axios.request({
                method: 'post',
                url: 'http://localhost:4000/book/add',
                data: newBook
            }).then(response => {
                this.sendEmail();
                this.handleOpenContact();
            }).catch(err => console.log(err));
        }
        else {
            this.handleOpen();
        }
    }

     //Send email to user
	sendEmail() {
        let email = {
            to: 'travelwaps@gmail.com',
            subject: `Book:Hotel | User:${this.state.cookies.get('username')} | UserId:${this.state.cookies.get('user_id')}`,
            text: `Hotel: ${this.state.hotelDetail._id}|${this.state.hotelDetail.title} booked by the user ${this.state.cookies.get('username')}`,
            html: `<h3>Hotel:</h3>
                   ${this.state.hotelDetail._id}|${this.state.hotelDetail.title} 
                   <h3>Booked By:</h3>
                   ${this.state.cookies.get('username')}` 
        }

		axios.request({
			method: 'post',
			url: 'http://localhost:4000/email/send/',
			data: email
		}).then(response => {
		}).catch(err => console.log(err));
    }

    //Handle the opening of the message 
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleOpenContact = () => {
        this.setState({ openContact: true });
    }

    //Handle the closing of the message 
    handleClose = () => {
        this.setState({ open: false, openContact: false });
    };

    CreatePropertyFeatureList() {
        let propertyFeature = [];

        if (this.state.hotelDetail.propertyFeature.wifi === true) {
            propertyFeature.push("Wifi");
        }
        if (this.state.hotelDetail.propertyFeature.bbq === true) {
            propertyFeature.push("Barbecue Area");
        }
        if (this.state.hotelDetail.propertyFeature.library === true) {
            propertyFeature.push("Library");
        }
        if (this.state.hotelDetail.propertyFeature.bycicle === true) {
            propertyFeature.push("Bycicle Area");
        }
        if (this.state.hotelDetail.propertyFeature.dinning === true) {
            propertyFeature.push("Dinning Area");
        }

        return propertyFeature;
    }

    CreateRoomFeatureList() {
        let roomFeature = [];

        if (this.state.hotelDetail.roomFeature.airConditioning === true) {
            roomFeature.push("Air Conditioning");
        }
        if (this.state.hotelDetail.roomFeature.fan === true) {
            roomFeature.push("Fan");
        }
        if (this.state.hotelDetail.roomFeature.sharedFacilities === true) {
            roomFeature.push("Shared Facilities");
        }
        if (this.state.hotelDetail.roomFeature.dvd === true) {
            roomFeature.push("DVD");
        }
        if (this.state.hotelDetail.roomFeature.tv === true) {
            roomFeature.push("TV");
        }
        if (this.state.hotelDetail.roomFeature.fridge === true) {
            roomFeature.push("Fridge");
        }

        return roomFeature;
    }

    render() {
        //Set message action button
        const actions = [
            <Link to='/Login'>
                <FlatButton label="Sign In" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
            <FlatButton label="Cancel" primary={true} keyboardFocused={true} onClick={this.handleClose} />
        ];

        //Set message action button
        const actionsContact = [
            <Link to='/SearchHotel'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];

        //Create the list property feature list
        const propertyList = this.CreatePropertyFeatureList().map((item, i) => {
            return (
                <p>{item}</p>
            )
        });

        //Create the list room feature list
        const roomList = this.CreateRoomFeatureList().map((item, i) => {
            return (
                <p>{item}</p>
            )
        });

        return (
            <div className="SearchHotelItemListDetail">
                <div className="container">
                    <div className="detail-main">
                        <Tabs>
                            <Tab
                                label="Details"
                                buttonStyle={styles.tab}>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Description
                                    </div>
                                    <div className="col-md-6">
                                        {this.state.hotelDetail.description}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Property Feature
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {propertyList}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Room Feature
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {roomList}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        City
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {this.state.hotelDetail.city}
                                    </div>
                                </div>
                            </Tab>
                            <Tab
                                label="Book"
                                buttonStyle={styles.tab}>
                                <div className="row available-hotels available-hotels-tab">
                                    <Table>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn>CITY</TableHeaderColumn>
                                                <TableHeaderColumn>PRICE</TableHeaderColumn>
                                                <TableHeaderColumn>OPTION</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>{this.state.hotelDetail.city}</TableRowColumn>
                                                <TableRowColumn>${this.state.hotelDetail.price}</TableRowColumn>
                                                <TableRowColumn><RaisedButton style={styles.book} onClick={this.book.bind(this)} primary={true}>Book</RaisedButton></TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>

                {/* Message component */}
                <Dialog
                    title="Please SignIn!"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    Please SignIn, to book a hotel
                </Dialog>

                <Dialog
                    title="Thank you!"
                    actions={actionsContact}
                    modal={true}
                    open={this.state.openContact}
                    onRequestClose={this.handleClose}>
                    Thank you! We will get in contact soon
                </Dialog>
            </div >
        )
    }
}