import React,{ useState } from 'react'
import contact_image from "../images/contact_image.jpg"
import { toast } from 'react-toastify';
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ContactUs = () => {

	const [inputs,setInputs] = useState({
		name:"",
		email:"",
		message:"",
	});
	const [loading,setLoading] = useState(false)

	const handleChange = (e)=>{
		e.preventDefault();
		const {name,value} = e.target;
		setInputs({...inputs,[name]:value})	
	}

	const submit = async(e)=>{
		setLoading(true);	
		e.preventDefault()
		if (!inputs.name || !inputs.email || !inputs.message) {
    	toast.error("Please fill all input fields");
    	setLoading(false);
    	return;
  	}
		try{
			await axios.post(`${window.location.origin}/niko/v1/sendMail`,inputs)
			.then((response)=>{
				console.log(response);
				if(response.data.msg==="Email Sent Successfully"){
					toast.success(response.data.msg);
					return setInputs({
						name:"",
						email:"",
						message:""
					})
				}else{
					return toast.error(response.data.msg);
				}
			})
		}catch(error){
			console.error("Something Went Wrong");
		}finally{
			setLoading(false);
		}
	}

	return (
		<div className="Abouts_wrapper">
			<div className="abouts_container">
				<div className="bg-text">
 						<p>Contact-Us</p>
				</div>
			</div>
			<div className="abouts_section margin_side">
				<div>
					<h2>Welcome to CODEX – Your Ultimate Digital Reading Destination!</h2>
					 <p>We’d love to hear from you! Whether you have questions, feedback, or need support, our team is here to help.</p>
				</div>

				<div className="section2_about_us">
					<div className="about_section_two_img">
						<LazyLoadImage
                		alt="team_image"
                		effect="blur"
                		wrapperProps={{
                			style: {transitionDelay: "0.7s"},
                		}}
                		src={contact_image} 
              		/>
					</div>
 					<div className="about_section_two">
 						<h1 style={{marginTop:"0px"}}>Send Us a Message</h1>
 					   <form className="contact_form Contact_container">
 					   		<input type="text" name="name" placeholder="Enter-Your-Name..." onChange={handleChange} value={inputs.name} required/>
 					   		<input type="email" name="email" placeholder="Enter Your Email..." onChange={handleChange} value={inputs.email} required/>
 					   		<textarea name="message" placeholder="message..." rows="8" cols="10" onChange={handleChange} value={inputs.message} required/>
 					   		<button type="submit" style={{width:"100%"}} onClick={submit}>
 					   			{loading?<span className="loader_email"></span>:"submit"}
 					   		</button>
 					   </form>
 					   <hr style={{width:"100%",marginTop:"20px"}}/>
 					   <h2>Get in Touch</h2>
 					   <div className="Contact_details">
 					   <p>📞 Phone: +91 9899608494</p>
 					   <p>📩 Email: naveensajwan724@gmail.com</p>
 					   <p>🕒 Hours: Mon-Fri, 9 AM - 6 PM</p>
 					   </div>
 					</div>
 				</div>
			</div>
		</div>
	)
}

export default ContactUs;