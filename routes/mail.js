require("dotenv").config();
const router = require("express").Router();
const sendEmail = require("../middleware/emailService.js");

router.post("/sendMail",async(req,res)=>{
	const {name,email,message} = req.body;

	// Email to admin
	const adminMailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME,
      subject: `🆕 Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Received at: ${new Date().toLocaleString()}</p>
      `
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: '🎉We received your message!',
      html: `
        <h3>Thank you for contacting us!</h3>
        <p>We've received your message and will get back to you soon.</p>
        <p>Here's what you sent us:</p>
        <blockquote>${message}</blockquote>
        <p>If you have any further questions, please don't hesitate to reply to this email.</p>
        <p>Best regards,<br/>The Support Team</p>
      `
    };

	try{
		await sendEmail(adminMailOptions);
		await sendEmail(userMailOptions);
		res.status(200).json({msg: "Email Sent Successfully"})
	}catch(error){
		console.error(error);
		res.status(200).json({msg: "Error Sending Email"})
	}
});

module.exports = router;