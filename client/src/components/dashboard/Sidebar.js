import React from 'react'
import {Link,Outlet} from "react-router-dom";

const Sidebar = ({isSideBarOpen}) => {
	return (
		<div id="mySidebar" className="sidebar" style={{width: isSideBarOpen ? "250px" : "0"}}>
			<Link to="/dashboard"><i class="bi bi-house-door"></i> Dashboard</Link>
		  	<Link to="favorite"><i className="bi bi-heart"></i> Favorite</Link>
  			<Link to="upload"><i className="bi bi-upload"></i> Uploads</Link>
  			<Link to="browse"><i className="bi bi-search"></i> Browse</Link>
  			<Link to="recent-uploads"><i className="bi bi-arrow-clockwise"></i> Recently Added</Link>
  			<Link to="your-uploads"><i class="bi bi-box-arrow-in-down"></i> Uploaded Files</Link>
		</div>
	)
}

export default Sidebar