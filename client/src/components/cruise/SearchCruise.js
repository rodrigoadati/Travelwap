import React, { Component } from "react";
import SearchCruiseItem from "./SearchCruiseItem";
import axios from 'axios';
import "./Cruise.css";

export default class SearchCruise extends Component {
    constructor(props){
        super(props);

        this.state = {
            regions: []
        }
    }

    componentWillMount(){
        this.getRegion();
    }

    //Retrieve the list of regions availables for cruises
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
				<SearchCruiseItem item={region} />
			)
        })
        
        return (
            <div className="SearchCruise">
                <div className="cruise-main">
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