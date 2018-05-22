import React, { Component } from "react";
import SearchHotelItemList from "./SearchHotelItemList";
import axios from "axios";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

export default class SearchHotelDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotelList: [],
            cities: [],
            selectedCity: 0,
            filteredHotelList: []
        }
    }
    /******************/
    /*FUNCTION*/
    /******************/
    componentWillMount() {
        this.getHotels(this.props.match.params.name);
        this.getCities(this.props.match.params.name);
    }

    getHotels(region) {
        axios.get('http://localhost:4000/hotel/getHotelsByRegion/' + region)
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ hotelList: response.data.hotels, filteredHotelList: response.data.hotels })
                }
                else {
                    alert('No hotels available');
                }
            }).catch(err => console.log(err));
    }

    getCities(region) {
        axios.get('http://localhost:4000/city/getCitiesByRegion?region=' + region)
            .then(response => {
                this.setState({ cities: response.data })
            }).catch(err => console.log(err));
    }

    handleChangeCity(e, index, city) {
        let array = this.filterList(city);
        this.setState({ selectedCity: city, filteredHotelList: array });

        if (index === 0)
            this.resetHotelList();
    }

    filterList(filterText) {
        let updatedList = this.state.hotelList;
        return updatedList.filter(function (item) {
            return item.city === filterText;
        });
    }

    //Reset the filtered list
    resetHotelList() {
        this.setState({ selectedCity: 0, filteredHotelList: this.state.hotelList });
    }

    /******************/
    /*TEMPLATE*/
    /******************/
    render() {
        const cities = this.state.cities.map((city, i) => {
            return (
                <MenuItem key={i} value={city.name} primaryText={city.name} />
            )
        });

        const items = this.state.filteredHotelList.map((item, i) => {
            return (
                <SearchHotelItemList key={item._id} item={item} />
            )
        });

        let divImage = {
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.20) 100%), url(" + require("../../images/search/" + this.props.match.params.image) + ")",
        }

        return (
            <div className="SearchHotelDetail">
                <div className="detail-main">
                    <div className="container">
                        <div className="row">
                            <div className="title">
                                {this.props.match.params.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="detail-image" style={divImage}></div>
                            <Toolbar>
                                <ToolbarGroup firstChild={true}>
                                    <DropDownMenu value={this.state.selectedCity} onChange={this.handleChangeCity.bind(this)}>
                                        <MenuItem value={0} primaryText="All Cities" />
                                        {cities}
                                    </DropDownMenu>
                                </ToolbarGroup>
                            </Toolbar>
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}