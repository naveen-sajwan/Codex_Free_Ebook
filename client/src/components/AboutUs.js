import React from 'react';
import upload_sideimage from "../images/upload_sideimage.jpg"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AboutUs = () => {
	return (
		<div className="Abouts_wrapper">
			<div className="abouts_container">
				<div className="bg-text">
 						<p>About-Us</p>
				</div>
			</div>
			<div className="abouts_section margin_side">
				<div>
					<h1>About Us - CODEX</h1>
					<span><hr/></span>
					<h2>Welcome to CODEX – Your Ultimate Digital Reading Destination!</h2>
					 <p>At eBook Haven, we believe that great stories, knowledge, and inspiration should be accessible to everyone, anytime, anywhere. Founded in 2025, our mission is to provide book lovers with a vast collection of high-quality eBooks across genres—from bestsellers and classics to niche topics and self-improvement guides.</p>
				</div>
				<div className="section2_about_us">
					<div className="about_section_two_img">
					<LazyLoadImage
                		alt="Codex_img"
                		effect="blur"
                		wrapperProps={{
                			style: {transitionDelay: "0.7s"},
                		}}
                		src={upload_sideimage} 
              		/>
					</div>
 					<div className="about_section_two">
 					    <div>
 							<h2>Why Choose eBook Haven?</h2>
 							<h3>📖 Extensive Library</h3>
 							<p>Discover thousands of eBooks in fiction, non-fiction, business, science, romance, self-help, and more. We constantly update our collection to bring you the latest releases and timeless classics.</p>
 						</div>
 						<div>
 							<h3>💡 Affordable Reading</h3>
 							<p>We offer competitive pricing, exclusive discounts, and even free eBooks to make reading accessible to all. No more heavy books—just instant downloads at your fingertips!</p>
 						</div>
 						<div>
 							<h3>📱 Read Anywhere, Anytime</h3>
 							<p>Compatible with all devices—smartphones, tablets, eReaders, and desktops. Enjoy seamless reading with our user-friendly platform and customizable reading experience.</p>
 						</div>
 						 <div>
 							<h3>🌍 Eco-Friendly & Convenient</h3>
 							<p>By choosing eBooks, you’re helping reduce paper waste and supporting sustainable reading. Plus, carry an entire library in your pocket without the bulk!</p>
 						</div>
 					</div>
 				</div>
 				<div className="abouts_section_three">
 					<div>
 							<h3>🏢 Join Our Community</h3>
 							<p>We’re more than just an eBook store—we’re a community of readers. Follow us on social media for book recommendations, author interviews, and exclusive deals.</p>
 							<ul id="Abouts_links">
								<li><a href="https://www.google.com/"><i className="bi bi-facebook"></i></a></li>
								<li><a href="https://www.google.com/"><i className="bi bi-twitter-x"></i></a></li>
								<li><a href="https://www.google.com/"><i className="bi bi-linkedin"></i></a></li>
							</ul>
 							<p>Happy Reading!</p>
 							<p>– NAVEEN SAJWAN</p>
 					</div>
 				</div>

			</div>
		</div>
	)
}

export default AboutUs