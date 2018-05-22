import React, { Component } from "react";
import axios from "axios";
import './Home.css';
import Packages from './Packages';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
	/**********************/
	//FUNCTIONS
	/**********************/
	constructor() {
		super();

		this.state = {
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
					imagePath: require('../../images/tokyo.jpeg')
				},
				{
					title: "Manila",
					discount: "20%",
					type: "off",
					topic: "Travel to the biggest city in Philipines.",
					description: " Come to the amazing city of Manila and explore this amazing city",
					conditions: "* Conditions and restrictions apply.",
					color: "peter-river",
					imagePath: require('../../images/manila.jpeg')
				},
				{
					title: "Sao Paulo",
					discount: "40%",
					type: "off",
					topic: "Visit one of Brazil's biggest city.",
					description: " Complete pack with Hotel, Car rent and Flight for a cheap price",
					conditions: "* Conditions and restrictions apply.",
					color: "amethyst",
					imagePath: require('../../images/sao_paulo.jpg')
				},
				{
					title: "Pattaya",
					discount: "30%",
					type: "off",
					topic: "Visit Thailand's amazing city.",
					description: " Asia's largest beach resorts and the second most visited city in Thailand",
					conditions: "* Conditions and restrictions apply.",
					color: "emerald",
					imagePath: require('../../images/pattaya.jpg')
				},
			]
		}
	}

	/**********************/
	//TEMPLATE
	/**********************/
	render() {
		const packageItem = this.state.packages.map((packageItem, i) => {
			return (
				<Packages key={packageItem.id} item={packageItem} />
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
						<a href="#">
							<div className="col-lg-3 package-item package-animation-1">
								<h2>Portugal</h2>
								<div className="package-prefix">from</div>
								<div className="package-price"><small>$</small> 800</div>
								<div className="package-description">One way, fee may be applied</div>
								<div className="package-link">See more</div>
							</div>
						</a>
						<a href="#">
							<div className="col-lg-3 package-item package-animation-2">
								<h2>Spain</h2>
								<div className="package-prefix">from</div>
								<div className="package-price"><small>$</small> 300</div>
								<div className="package-description">One way, fee may be applied</div>
								<div className="package-link">See more</div>
							</div>
						</a>
						<a href="#">
							<div className="col-lg-3 package-item package-animation-3">
								<h2>Germany</h2>
								<div className="package-prefix">from</div>
								<div className="package-price"><small>$</small> 600</div>
								<div className="package-description">One way, fee may be applied</div>
								<div className="package-link">See more</div>
							</div>
						</a>
						<a href="#">
							<div className="col-lg-3 package-item package-animation-4">
								<h2>UK</h2>
								<div className="package-prefix">from</div>
								<div className="package-price"><small>$</small> 800</div>
								<div className="package-description">One way, fee may be applied</div>
								<div className="package-link">See more</div>
							</div>
						</a>
					</div>
					<div className="button-search">
						<button class="btnSearch hover">Search and Book<i class="ion-clipboard"></i></button>
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
								<a href="#">
									<div className="round-item flight-img"></div>
								</a>
								<div className="content-title">
									Arrivals and departures
									</div>
								<div className="content-description">
									For up to date flight status information. Book your flight now!
									</div>
								<a href="#">Find Flights</a>
							</div>
							<div className="col-lg-4 car-animation">
								<a href="#">
									<div className="round-item car-img"></div>
								</a>
								<div className="content-title">
									Rent and Pick-up
									</div>
								<div className="content-description">
									Find out about more about our amazing selection of vehicles
									</div>
								<a href="#">Find Cars</a>
							</div>
							<div className="col-lg-4 hotel-animation">
								<a href="#">
									<div className="round-item hotel-img"></div>
								</a>
								<div className="content-title">
									Book your stay
									</div>
								<div className="content-description">
									Amazing selection of hotels, search a wide variaty of available hotels across the globe
									</div>
								<a href="#">Find Hotels</a>
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
										<div class="card-back extra-content">
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
										<div class="card-back extra-content">
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
										<div class="card-back extra-content">
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