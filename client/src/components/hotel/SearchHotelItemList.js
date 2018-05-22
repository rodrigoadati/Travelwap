import React, { Component } from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SearchHotelItemListDetail from "./SearchHotelItemListDetail";
import { Link } from "react-router-dom";

const customContentStyle = {
    width: '95%',
    maxWidth: 'none',
};

const styles = {
    btn_action: {
        color: "white",
        margin: "10px 10px",
        border: "2px solid #26d8ef"
    }
};

export default class SearchHotelItemList extends Component {
    constructor(props) {
        super();

        this.state = {
            item: props.item,
            open: false,
        }
    }

    //Open detail modal
    handleOpen = () => {
        this.setState({ open: true });
    };

    //Close detail modal
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        let detailImage = {
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.20) 100%), url(" + require("../../images/search/oceania.jpeg") + ")",
        }

        return (
            <div className="SearchHotelItemList">
                <div className="detail-content">
                    <div className="container">
                        <div className="row">
                            <div className="detail-list">
                                <div className="col-md-2 detail-list-image" style={detailImage}></div>
                                <div className="col-md-5 detail-list-content">
                                    <div className="detail-list-title">
                                        {this.state.item.title}
                                    </div>
                                    <div className="detail-list-description">
                                        {this.state.item.city} Accomodation
                                    </div>
                                </div>
                                <div className="col-md-5 detail-list-actions">
                                    <div className="detail-list-price">1 night for ${this.state.item.price}</div>
                                    <RaisedButton style={styles.btn_action} onClick={this.handleOpen} primary={true}>More</RaisedButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    title="Hotel Details"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                >
                    <SearchHotelItemListDetail hotelDetail={this.state.item} />
                </Dialog>
            </div>
        )
    }
}