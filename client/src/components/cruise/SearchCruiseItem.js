import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SearchCruiseItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
        }
    }

    render() {

        let divImage = {
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.20) 100%), url(" + require("../../images/search/" + this.state.item.nameImage) +  ")",
        }

        return (
            <div className="SearchCruiseItem">
                <Link to={"/SearchCruiseDetail/"+this.state.item.name+"/"+this.state.item.nameImage}>
                    <div className="col-md-4 search-item" style={divImage}>
                        <div className="search-text">
                            {this.state.item.name}
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}