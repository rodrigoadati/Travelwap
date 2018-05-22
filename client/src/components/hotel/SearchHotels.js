import React, { Component } from "react";
import SearchHotelItem from "./SearchHotelItem";
import axios from 'axios';
import "./Hotel.css";

export default class SearchHotels extends Component {
    constructor(props){
        super(props);

        this.state = {
            regions: []
        }
    }

    componentWillMount(){
        this.getRegion();
    }

    //Retrieve the list of regions availables for flights
    getRegion(){
        axios.get('http://localhost:4000/region/getAll')
            .then(response => {
                if (response.data.length !== 0) {
                    this.setState({ regions: response.data })
                }
                else {
                    alert('No region available');
                }
            }).catch(err => console.log(err));
    }

    render() {
        const region = this.state.regions.map((region, i) => {
			return (
				<SearchHotelItem item={region} />
			)
        })
        
        return (
            <div className="SearchHotel">
                <div className="hotel-main">
                    <div className="container">
                        <div className="row">
                            {region}
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}