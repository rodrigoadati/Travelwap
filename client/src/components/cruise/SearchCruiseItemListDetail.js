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
    },
    table: {
        color: '#ffffff',
        width: '100%'
    }
};

export default class SearchCruiseItemListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cruiseDetail: props.cruiseDetail,
            cookies: new Cookies(),
            open: false
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
            type_id: this.state.cruiseDetail._id,
            type_name: 'Cruise'
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
            subject: `Book:Cruise | User:${this.state.cookies.get('username')} | UserId:${this.state.cookies.get('user_id')}`,
            text: `Cruise: ${this.state.cruiseDetail._id}|${this.state.cruiseDetail.title} booked by the user ${this.state.cookies.get('username')}`,
            html: `<h3>Cruise:</h3>
                   ${this.state.cruiseDetail._id}|${this.state.cruiseDetail.title} 
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
            <Link to='/SearchCruise'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];

        //Create the content of the table
        const itinerary = this.state.cruiseDetail.itinerary.map((item, i) => {
            return (
                <TableRow>
                    <TableRowColumn>{item.day}</TableRowColumn>
                    <TableRowColumn>{this.formatDate(item.date)}</TableRowColumn>
                    <TableRowColumn>{item.port}</TableRowColumn>
                    <TableRowColumn>{item.arrive}</TableRowColumn>
                    <TableRowColumn>{item.depart}</TableRowColumn>
                </TableRow>
            )
        });

        console.log(this.state.cruiseDetail.itinerary);

        return (
            <div className="SearchCruiseItemListDetail">
                <div className="container">
                    <div className="detail-main">
                        <Tabs>
                            <Tab
                                label="Details"
                                buttonStyle={styles.tab}>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Journey
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {this.state.cruiseDetail.journey}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Ship
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {this.state.cruiseDetail.ship}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Departure Date
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {this.formatDate(this.state.cruiseDetail.departureDate)}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-12 main-text">
                                        Itinerary
                                    </div>
                                    <div className="col-md-12 content-item">
                                        <Table style={styles.table}>
                                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                                <TableRow>
                                                    <TableHeaderColumn>Day</TableHeaderColumn>
                                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                                    <TableHeaderColumn>Port</TableHeaderColumn>
                                                    <TableHeaderColumn>Arrive</TableHeaderColumn>
                                                    <TableHeaderColumn>Depart</TableHeaderColumn>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody displayRowCheckbox={false}>
                                                {itinerary}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab
                                label="Book"
                                buttonStyle={styles.tab}>
                                <div className="row available-cruises available-cruises-tab">
                                    <Table>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn>SHIP</TableHeaderColumn>
                                                <TableHeaderColumn>DEPARTURE DATE</TableHeaderColumn>
                                                <TableHeaderColumn>PRICE</TableHeaderColumn>
                                                <TableHeaderColumn>OPTION</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>{this.state.cruiseDetail.ship}</TableRowColumn>
                                                <TableRowColumn>{this.formatDate(this.state.cruiseDetail.departureDate)}</TableRowColumn>
                                                <TableRowColumn>${this.state.cruiseDetail.price}</TableRowColumn>
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
                    Please SignIn, to book a cruise
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