import React from 'react'
import {Link} from "react-router-dom"
import NotFound from "../images/NotFound.png";
const Nopage = () => {
	return (
	<div className="no_page">
		<div>
			<div className="no_page_image">
				<img src={NotFound} alt="notFound"/>
			</div>
			<div className="no_page_details">
				<h2>PAGE NOT FOUND</h2>
				<p>We Looked everywhere for this page.</p>
				<p>Are You sure the Website Url is correct?</p>
				<p>Get in Touch with the site owner</p>
				<Link className="log_btn" to="/">Go Back Home</Link>
			</div>
		</div>
	</div>
	)
}

export default Nopage