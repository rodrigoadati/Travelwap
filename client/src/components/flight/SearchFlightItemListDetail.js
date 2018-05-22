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
import TextField from 'material-ui/TextField';

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
    text_voucher: {
        width: "100px"
    }
};

export default class SearchFlightItemListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightDetail: props.flightDetail,
            cookies: new Cookies(),
            open: false,
            voucherCode: '',
            voucherDiscount: '',
            voucherData: []
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
            type_id: this.state.flightDetail._id,
            type_name: 'Flight'
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
                this.getVoucher(this.state.voucherCode);
                this.handleOpenContact();
            }).catch(err => console.log(err));
        }
        else {
            this.handleOpen();
        }
    }


    //Send email to user
    sendEmail() {
        if(this.state.voucherData.length !== 0){
            let discountedPrice =  this.state.flightDetail.price * (this.state.voucherData[0].discount/100);
            
            this.setState({
                voucherCode: "TWNZ123",
                voucherDiscount: discountedPrice
            });
        }
        else {
            this.setState({
                voucherCode: 'none',
                voucherDiscount: 'none'
            });
        }

        let email = {
            to: 'travelwaps@gmail.com',
            subject: `Book:Flight | User:${this.state.cookies.get('username')} | UserId:${this.state.cookies.get('user_id')}`,
            text: `Flight: ${this.state.flightDetail._id}|${this.state.flightDetail.title} booked by the user ${this.state.cookies.get('username')}`,
            html: `<h3>Flight:</h3>
                   ${this.state.flightDetail._id}|${this.state.flightDetail.title} 
                   <h3>Booked By:</h3>
                   ${this.state.cookies.get('username')}
                   <h3>Price:</h3>
                   ${this.state.flightDetail.price}
                   <h3>Voucher:</h3>
                   ${this.state.voucherCode}
                   <h3>Discount:</h3>
                   ${this.state.voucherDiscount}`
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

    //Handles the change in the bookBy date
    handleChangeVoucher(e, voucher) {
        this.setState({
            voucherCode: voucher
        })
    }

    //Get the voucher data
    getVoucher(code) {
        axios.get('http://localhost:4000/voucher/getVoucher/code/' + code)
            .then(response => {
                console.log("data", response.data);
                if(response.data.length !== 0)
                    this.setState({ voucherData: response.data.voucher });

                this.sendEmail();                
            }).catch(err => console.log(err), this.sendEmail());
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
            <Link to='/SearchFlight'>
                <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.handleClose} />
            </Link>,
        ];

        return (
            <div className="SearchFlightItemListDetail">
                <div className="container">
                    <div className="detail-main">
                        <Tabs>
                            <Tab
                                label="Details"
                                buttonStyle={styles.tab}>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Airline
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {this.state.flightDetail.airline}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        From
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {this.state.flightDetail.departure}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Travel Dates
                                        </div>
                                    <div className="col-md-6 content-item">
                                        {this.formatDate(this.state.flightDetail.travelDate)}
                                    </div>
                                </div>
                                <div className="row row-align">
                                    <div className="col-md-6 main-text">
                                        Book By
                                    </div>
                                    <div className="col-md-6 content-item">
                                        {this.formatDate(this.state.flightDetail.bookBy)}
                                    </div>
                                </div>
                            </Tab>
                            <Tab
                                label="Book"
                                buttonStyle={styles.tab}>
                                <div className="row available-flights available-flights-tab">
                                    <Table>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn>FROM</TableHeaderColumn>
                                                <TableHeaderColumn>TO</TableHeaderColumn>
                                                <TableHeaderColumn>PRICE</TableHeaderColumn>
                                                <TableHeaderColumn>Flight Date</TableHeaderColumn>
                                                <TableHeaderColumn>OPTION</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>{this.state.flightDetail.departure}</TableRowColumn>
                                                <TableRowColumn>{this.state.flightDetail.destination}</TableRowColumn>
                                                <TableRowColumn>${this.state.flightDetail.price}</TableRowColumn>
                                                <TableRowColumn>{this.formatDate(this.state.flightDetail.travelDate)}</TableRowColumn>
                                                <TableRowColumn>
                                                    <TextField
                                                        type="text"
                                                        name="voucher"
                                                        value={this.state.voucher}
                                                        onChange={this.handleChangeVoucher.bind(this)}
                                                        floatingLabelText="Voucher"
                                                        style={styles.text_voucher}/>
                                                </TableRowColumn>
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
                    Please SignIn, to book a flight
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