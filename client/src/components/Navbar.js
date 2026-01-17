import React,{useState,useEffect} from 'react'
import 'animate.css';
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../store";

const Navbar = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state)=> state.isLoggedIn);
	const logout =()=>{
		localStorage.clear("favorites");
		sessionStorage.clear("id");
		dispatch(authActions.logout());
	}
	
	const [isOpen, setIsOpen] = useState(false);


	useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

	useEffect(() => {
    	document.body.style.overflow = isOpen ? "hidden" : "auto";
  	},[isOpen]);

	return (
		<nav className={`${isOpen ? "open" : ""}`}>
			<div className="navbar_wrapper margin_side">
				<div><h1><Link className="logo" to="/">CODEX</Link></h1></div>
				<div className={`navbar_under_wrapper ${isOpen ? "navbar_under_wrapper_open" : ""}`}>
					<ul className={`navbar_links ${isOpen ? "navbar_links_open" : ""}`}>
						<li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
						<li><Link to="/about-us" onClick={() => setIsOpen(false)}>About-Us</Link></li>
						<li><Link to="/contact-us" onClick={() => setIsOpen(false)}>Contact-Now</Link></li>
						<li><Link to="/Browse" onClick={() => setIsOpen(false)}>Browse</Link></li>
						<li><Link to="/recent-uploads" onClick={() => setIsOpen(false)}>Recently Added</Link></li>
					</ul>

				<div className={`navbar_log ${isOpen ? "navbar_log_open" : ""}`}>
				{!isLoggedIn && <>
					<Link className="log_btn" to="/signup" onClick={() => setIsOpen(false)}>SignUp</Link>
					<Link className="log_btn" to="/signin" onClick={() => setIsOpen(false)}>SignIn</Link>
				</>}

				{isLoggedIn && <>
					<Link className="log_btn" to="/signin" onClick={logout}>LogOut</Link>
				</>}

				</div>
			</div>

				{/* Hamburger Icon */}
        		<div className={`hamburger ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          			<span></span>
          			<span></span>
          			<span></span>
        		</div>

			</div>
		</nav>
	)
}

export default Navbar