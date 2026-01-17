import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<footer >
			<div className="margin_side">
				<section className="navbar_wrapper footer_wrapper">
					<div className="logo"><p>CODEX</p></div>
					<div className="navbar_log">
						<Link className="log_btn" to="/contact-us">Contact Now</Link>
					</div>
				</section>
				<hr/>
				<p className="subscribe_footer">Subscribe Our Newsletter And Get Offer</p>
				<div className="subscribe_form">
					<input type="text" placeholder="Your Email Address"/>
					<button>Subscribe</button>
				</div>
				<hr/>
				<div className="footer_copyright">
					<p>©Codex all rights reserved. Designed by Naveen Sajwan</p>
					<ul className="footer_links" id="footer_links_size">
						<li><a to="https://www.google.com/"><i className="bi bi-facebook"></i></a></li>
						<li><a to="https://www.google.com/"><i className="bi bi-twitter-x"></i></a></li>
						<li><a to="https://www.google.com/"><i className="bi bi-linkedin"></i></a></li>
					</ul>
				</div>	
			</div>
		</footer>
	)}

export default Footer;