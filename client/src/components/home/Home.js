import React, { Component } from "react";
import axios from "axios";
import Packages from './Packages';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from "react-router-dom";
import './Home.css';

export default class Home extends Component {
	/**********************/
	//FUNCTIONS
	/**********************/
	constructor() {
		super();

		this.state = {
			flightData: [],
			packages:
			[
				{
					title: "Tokyo",
					discount: "15%",
					type: "off",
					topic: "Travel to west of Tokyo.",
					description: " Japan is an amazing country, with thousands of places to explore",
					conditions: "* Conditions and restrictions apply.",
					color: "alizarin",
					imagePath: require('../../images/tokyo.jpeg'),
					expire_date: '11/05/2017 10:55 AM'
				},
				{
					title: "Manila",
					discount: "20%",
					type: "off",
					topic: "Travel to the biggest city in Philipines.",
					description: " Come to the amazing city of Manila and explore this amazing city",
					conditions: "* Conditions and restrictions apply.",
					color: "peter-river",
					imagePath: require('../../images/manila.jpeg'),
					expire_date: '12/12/2017 10:55 AM'
				},
				{
					title: "Sao Paulo",
					discount: "40%",
					type: "off",
					topic: "Visit one of Brazil's biggest city.",
					description: " Complete pack with Hotel, Car rent and Flight for a cheap price",
					conditions: "* Conditions and restrictions apply.",
					color: "amethyst",
					imagePath: require('../../images/sao_paulo.jpg'),
					expire_date: '01/01/2018 10:55 AM'
				},
				{
					title: "Pattaya",
					discount: "30%",
					type: "off",
					topic: "Visit Thailand's amazing city.",
					description: " Asia's largest beach resorts and the second most visited city in Thailand",
					conditions: "* Conditions and restrictions apply.",
					color: "emerald",
					imagePath: require('../../images/pattaya.jpg'),
					expire_date: '02/11/2018 10:55 AM'
				},
			],
			packagesData: []
		}
	}

	/**********************/
	//FUNCTIONS
	/**********************/
	componentWillMount() {
		this.getFlights('Europe');
		this.getPackages();
	}

	getFlights(region) {
		axios.get('http://localhost:4000/flight/getFlightsByRegion/' + region)
			.then(response => {
				if (response.data.length !== 0) {
					this.setState({ flightData: response.data.flights })
				}
				else {
					alert('No flights available');
				}
			}).catch(err => console.log(err));
	}

	getPackages() {
		axios.get('http://localhost:4000/package/getAll/')
			.then(response => {
				if (response.data.length !== 0) {
					console.log(response);
					this.setState({ packagesData: response.data.packages})
				}
				else {
					console.log('no packages available')
				}
			}).catch(err => console.log(err));
	}

	/**********************/
	//TEMPLATE	
	/**********************/
	render() {
		const packageItem = this.state.packagesData.map((packageItem, i) => {
			return (
				<Packages key={packageItem._id} item={packageItem} />
			)
		})

		const flightItem = this.state.flightData.slice(0, 4).map((flightItem, i) => {
			return (
				<Link to={"/SearchFlightDetail/" + flightItem.region + "/" + "europe.jpeg"}>
					<div className={`col-lg-3 package-item package-animation-${i + 1}`}>
						<h2>{flightItem.destination}</h2>
						<div className="package-prefix">from</div>
						<div className="package-price"><small>$</small>{flightItem.price}</div>
						<div className="package-description">One way, fee may be applied</div>
						<div className="package-link">See more</div>
					</div>
				</Link>
			)
		})

		return (
			<div className="Home">
				{/* Packages */}
				<section className="section-showcase" id="showcase">
					<div className="container showcase-content">
						<div className="title">
							<strong>Europe on sale</strong> ends 1 Dec 2017
						</div>
					</div>
					<div className="row package-list">
						{flightItem}
					</div>
					<div className="button-search">
						<Link to='/SearchFlight' className="btnSearch hover">Search and Book<i className="ion-clipboard"></i></Link>
					</div>
				</section>
				{/* Special Offers */}
				<section className="section-showcase-second">
					<div className="container">
						<div className="Title">
							SPECIAL OFFER
						</div>
						<div className="row">
							{packageItem}
						</div>
					</div>
				</section>
				{/* Services */}
				<section className="section-showcase-third">
					<div className="container">
						<div className="row service-align">
							<div className="col-lg-4 flight-animation">
								<Link to={'/SearchFlight'}>
									<div className="round-item flight-img"></div>
								</Link>
								<div className="content-title">
									Arrivals and departures
									</div>
								<div className="content-description">
									For up to date flight status information. Book your flight now!
									</div>
								<Link to={'/SearchFlight'}>Find Flights</Link>
							</div>
							<div className="col-lg-4 car-animation">
								<Link to={'/SearchCruise'}>
									<div className="round-item car-img"></div>
								</Link>
								<div className="content-title">
									Book your trip
									</div>
								<div className="content-description">
									Find out about more about our amazing selection of cruises
									</div>
								<Link to={'/SearchCruise'}>Find Cruises</Link>
							</div>
							<div className="col-lg-4 hotel-animation">
								<Link to={'/SearchHotel'}>
									<div className="round-item hotel-img"></div>
								</Link>
								<div className="content-title">
									Book your stay
									</div>
								<div className="content-description">
									Amazing selection of hotels, search a wide variaty of available hotels across the globe
									</div>
								<Link to={'/SearchHotel'}>Find Hotels</Link>
							</div>
						</div>
					</div>
				</section>
				{/* EXTRA */}
				<section className="section-showcase-fourth">
					<div className="container">
						<div className="row extra-align">
							<div className="col-lg-4 event-animation cardBox">
								<a href="#">
									<div className="event-img card">
										<div className="card-front extra-content">
											EVENTS
										</div>
										<div className="card-back extra-content">
											New events just for you
										</div>
									</div>
								</a>
							</div>
							<div className="col-lg-4 wedding-animation cardBox">
								<a href="#">
									<div className="wedding-img card">
										<div className="card-front extra-content">
											WEDDING
										</div>
										<div className="card-back extra-content">
											Wedding and Honeymoon
										</div>
									</div>
								</a>
							</div>
							<div className="col-lg-4 unique-animation cardBox">
								<a href="#">
									<div className=" unique-img card">
										<div className="card-front extra-content">
											UNIQUE EXPERIENCE
										</div>
										<div className="card-back extra-content">
											A unique experience in your life
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}