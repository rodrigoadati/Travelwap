import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="nb-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="about">
                                    <img src="images/logo.png" className="img-responsive center-block" alt="" />
                                    <div className="social-media">
                                        <ul className="list-inline">
                                            <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-google-plus"></i></a></li>
                                            <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-linkedin"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-info-single">
                                    <h2 className="title">Help Center</h2>
                                    <ul className="list-unstyled">
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> How to Pay</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> FAQ's</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Sitemap</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Delivery Info</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-info-single">
                                    <h2 className="title">Customer information</h2>
                                    <ul className="list-unstyled">
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> About Us</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> FAQ's</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Sell Your Items</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Contact Us</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> RSS</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-info-single">
                                    <h2 className="title">Security & privacy</h2>
                                    <ul className="list-unstyled">
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Terms Of Use</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Privacy Policy</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Return / Refund Policy</a></li>
                                        <li><a href="http://www.nextbootstrap.com/" title=""><i className="fa fa-angle-double-right"></i> Store Locations</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6">
                                <div className="footer-info-single">
                                    <h2 className="title">Payment</h2>
                                    <p>Sample HTML page with Twitter's Bootstrap. Code example of Easy Sticky Footer using HTML, Javascript, jQuery, and CSS. This bootstrap tutorial covers all the major elements of responsive</p>

                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="copyright">
                        Copyright © 2017. Travelwap
                    </section>
                </footer>
            </div>
        );
    }
}