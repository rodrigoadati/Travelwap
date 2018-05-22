import React, { Component } from "react";
import SearchFlightItemList from "./SearchFlightItemList";
import axios from "axios";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';


export default class SearchFlightDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightList: [],
            cities: [],
            selectedCity: 0,
            filteredFlightList: []
        }
    }
    /******************/
    /*FUNCTION*/
    /******************/
    componentWillMount() {
        this.getFlights(this.props.match.params.name);
        this.getCities(this.props.match.params.name);
    }

    getFlights(region) {
        axios.get('http://localhost:4000/flight/getFlightsByRegion/' + region)
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ flightList: response.data.flights, filteredFlightList: response.data.flights })
                }
                else {
                    alert('No flights available');
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
        this.setState({ selectedCity: city, filteredFlightList: array});
        
        if(index === 0)
            this.resetFlightList();
    }

    filterList(filterText) {
        let updatedList = this.state.flightList;
        return updatedList.filter(function (item) {
            return item.destination === filterText;
        });
    }
    
    //Reset the filtered list
    resetFlightList() {        
        this.setState({ selectedCity:0, filteredFlightList: this.state.flightList});
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

        let items = this.state.filteredFlightList.map((item, i) => {
            return (
                <SearchFlightItemList key={item._id} item={item} />
            )
        });

        let divImage = {
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.20) 100%), url(" + require("../../images/search/" + this.props.match.params.image) + ")",
        }

        return (
            <div className="SearchFlightDetail">
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