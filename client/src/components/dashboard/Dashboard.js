import React,{useState,useEffect} from 'react';
import {Link,Outlet} from "react-router-dom";
import Sidebar from "./Sidebar.js"
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import axios from "axios";
import loader_book from "../../images/loader_book.gif";
import dashboard_img from "../../images/dashboard_img.svg";


const Dashboard = () => {
	let id = sessionStorage.getItem("id");
	const dispatch = useDispatch();
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState([]);

	const openNav = () => {
		setIsSideBarOpen(!isSideBarOpen);
	}

	const logout =()=>{
		localStorage.clear("favorites");
		sessionStorage.clear("id");
		dispatch(authActions.logout());
	}

	useEffect(() => {
    // Simulate loading time (API call, authentication check, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 1.5 seconds

    return () => clearTimeout(timer);
  	}, []);

	useEffect(() => {
		if(id){
			const fetchUser = async()=>{
				await axios.get(`${window.location.origin}/niko/v1/dashboard/user/${id}`)
				.then((response)=>{
					setUser(response.data);
				})
			}
			fetchUser(); 
		}
	},[])

	if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner">
        			<img src={loader_book} alt="loader" width="200"/>
        </div>
      </div>
    );
  }



	return (
	<>
		<div>
			<Sidebar isSideBarOpen={isSideBarOpen}/>
			<div id="main" style={{marginLeft: isSideBarOpen ? "250px" : "0"}}>
				<div id="dashboard_toggle_bar">
  					<button className="openbtn" onClick={openNav}>☰</button>
  					<div style={{display:"flex"}}>
  						<span className="openbtn" style={{textTransform:"capitalize",fontSize:"18px",fontFamily:"monospace"}}>{user.username}</span>
						<Link className="log_btn" id="dashboard_log_btn" to="/signin" onClick={logout}>LogOut</Link>
  					</div>
  			</div>  
  			<Outlet/>
  		
  		<div className="dashboard">
  			<div className="dashboard_wrapper">
  				<div className="dashboard_wrapper_text">
  					<p>If e-book readers were invented before print books, (petty things such as) the smell of ink would have been some people’s only reason for not abandoning e-books. <br/> <b>  — Mokokoma Mokhonoana</b>
  					</p>
  					<br/>
  					<Link className="log_btn" id="dashboard_log_btn" to="browse"><i className="bi bi-search"></i> Browse</Link>
  				</div>
  				<div className="dashboard_wrapper_img">
  					<img src={dashboard_img} alt="dashboard_image"/>
  				</div>
  			</div>
  		</div>

			</div>
		</div>

		
	</>
	)
}

export default Dashboard;