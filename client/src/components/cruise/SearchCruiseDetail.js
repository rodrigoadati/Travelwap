import React, { Component } from "react";
import SearchCruiseItemList from "./SearchCruiseItemList";
import axios from "axios";

export default class SearchCruiseDetail extends Component {
    constructor(props) {
        super(props);
        
        this.state = {            
            cruiseList: []            
        }
    }
    /******************/
    /*FUNCTION*/
    /******************/
    componentWillMount(){
        this.getCruises(this.props.match.params.name);
    }

    getCruises(region){
        axios.get('http://localhost:4000/cruise/getCruisesByRegion/'+region)
        .then(response => {
            if (response.data.length !== 0) {
                this.setState({ cruiseList: response.data.cruises })
            }
            else {
                alert('No cruises available');
            }
        }).catch(err => console.log(err));
    }

    /******************/
    /*TEMPLATE*/
    /******************/
    render() {
        const items = this.state.cruiseList.map((item, i) => {
			return (
				<SearchCruiseItemList item={item} />
			)
        });

        let divImage = {
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.20) 100%), url(" + require("../../images/search/" + this.props.match.params.image) + ")",
        }

        return (
            <div className="SearchCruiseDetail">
                <div className="detail-main">
                    <div className="container">
                        <div className="row">
                            <div className="title">
                                {this.props.match.params.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="detail-image" style={divImage}></div>
                            {items}                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}