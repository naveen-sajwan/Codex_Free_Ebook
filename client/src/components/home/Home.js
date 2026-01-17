import React from 'react'
import Home_1 from "../../images/Home_1.png";
import Home_2 from "../../images/Home_2.png";
import Home_3 from "../../images/Home_3.png";
import Home_4 from "../../images/Home_4.png";
import Home_5 from "../../images/Home_5.png";
import upload_home from "../../images/upload_home.jpg";

import {infoboxes} from "./data.js";

const Home = () => {
	return (
	<>
		<div className="window_height">
		<div className="home_bg">
			<div className="header_center">
				<div>
					<section className="home_heading">
						<h2>Explore your favorite books 📚</h2>
					</section>
					<div className="Home_wrapper margin_side">
						<p>"You don’t see people getting pulled over by the police<br/> for reading ebooks on their smartphones."<br/><b className="">— Jason Merkoski</b></p>
					</div>
				</div>
			</div>
		</div>	

			<div className="home_section_three margin_side">
			{infoboxes.map((box)=>{
				return(
				<div key={box.id} className="info-box">
					<div className="icon"><i id={box.color} className={box.icon}></i></div>
					<div className="content">
						<p className="para_one">{box.para_one}</p>
						<p className="para_two">{box.para_two}</p>
					</div>
				</div>
			)})}
			</div>
			<div className="home_section_four">
				<div className="margin_side home_section_four_wrapper">
					<div className="home_section_four_image">
						<img src={upload_home} alt="upload_image"/>
					</div>
					<div className="home_section_four_content">
						<h2>Upload Files</h2>
						<hr/>
						<p>Upload Your PDF Documents</p>
						<p>Securely upload Ebooks, contracts, reports, or research papers, comics ,magazines etc. We support <strong>PDFs up to 10MB</strong> with encrypted transfers.</p>
						<div id="home_section_four_uploadbtn"><button>Upload here</button></div>
						
					</div>
				</div>
				
			</div>

			



		</div>
	</>
	)
}

export default Home