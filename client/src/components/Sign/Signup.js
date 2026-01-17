import React,{ useState } from 'react'
import axios from "axios";
import "./Signup.css"
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";


const Signup = () => {
	const history = useNavigate();
	const [inputs, setInputs] = useState({
		email:"",
		username:"",
		password:"",
	})

	const change = (e)=>{
		const {name,value} = e.target;
		setInputs({...inputs,[name]:value});
	}

	const submit = async(e) => {
		e.preventDefault();
		await axios.post(`${window.location.origin}/niko/v1/register`,inputs)
		.then((response)=>{
			console.log(response);
			if(response.data.msg === "Signed-Up Successfully"){
				toast.success(response.data.msg);
				setInputs({
					email:"",
					username:"",
					password:"",
				})
				history("/signin");
			}else{
				toast.error(response.data.msg)
			}
		});
	}
	return (
		<div className="signup_page">
		<div><h1>SIGN-UP</h1></div>
			<div className="container">
				<input type="email" name="email" placeholder="Enter Your Email..." onChange={change} value={inputs.email} required/>
				<input type="text" name="username" placeholder="Enter Your Username..." onChange={change} value={inputs.username} required/>
				<input type="password" name="password" placeholder="Enter Your Password..." onChange={change} value={inputs.password} required/>
				<button type="btn" onClick={submit}><b>Signup</b></button>
			</div>
		</div>
	)
}

export default Signup