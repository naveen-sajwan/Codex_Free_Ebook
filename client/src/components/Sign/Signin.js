import React,{ useState,useEffect} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import "./Signup.css";
import female from "../../images/female.jpg"


const Signin = () => {

	const dispatch = useDispatch();
	const history = useNavigate();

	const [loading,setLoading] = useState(false)
	const [inputs,setInputs] = useState({
		email:"",
		password:"",
	})
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

	const change = (e) => {
		e.preventDefault();
		const {name,value} = e.target;
		setInputs({...inputs,[name]:value})		
	}

	const submit = async(e)=>{
		setLoading(true)
			e.preventDefault();
			await axios.post(`${window.location.origin}/niko/v1/sign-in`,inputs)
			.then((response)=>{
				if(response.data.msg === "Signed-In Successfully"){
					toast.success(response.data.msg);
					sessionStorage.setItem("id",response.data.others._id);
					dispatch(authActions.login());
					setInputs({
						email:"",
						password:"",
					})
					history("/dashboard");
				}else{
					toast.error(response.data.msg)
				}
		})
		setLoading(false);	
	}

	return (
		<div className="signin_page">
			<div className="sigin_wrapper">
				<div className="sign_in_form container">	
					<div className="sign_in_inner">
						<p style={{textAlign:'center',fontSize:'15px',fontFamily:'Comfortaa,sansSerif',marginTop:'1.25rem'}}>Sign in or<Link to="/signup"> Create an account</Link>
						</p>
					</div>
					<input type="email" name="email" placeholder="Enter Your Email..." onChange={change} value={inputs.email} required/>
					<input type="password" name="password" placeholder="Enter Your Password..." onChange={change} value={inputs.password} required/>
					<button type="btn" onClick={submit}>
			 		<b>{loading ? "Signing":"Signin"}</b>
			 	</button>
				</div>

				<div className="sign_bg">
					<div className="inner_sign_bg">
						<div style={{position:'relative'}}>
							<img className="inner_sign_img" src={female} alt="female_image"/>
						</div>
						<div>
							<p>"It's time we moved beyond passwords, which are too often reused, weak, or compromised. Simpler identity protection is needed so we, as humans, don't just pick a random string of characters that we will never remember!"</p>
						</div>
						<div>
							<p>- Drew Perry</p>
						</div>
					</div>
				</div>
			
			</div>
		</div>
	)
}

export default Signin