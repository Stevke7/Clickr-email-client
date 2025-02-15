const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { name, email, message } = req.body;

	try {
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		const mailOptions = {
			from: email,
			to: process.env.USER,
			subject: `Message from ${name}`,
			text: message,
			replyTo: email,
			subject: `Message from ${name}`,
			text: `You have received a message from ${name} (${email}):\n\n${message}`,
		};

		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: "Email sent successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to send email." });
	}
}

// const app = express();

// // CORS configuration (Essential!)
// const allowedOrigins = [process.env.ALLOWED_ORIGIN]; // Get allowed origin from env variable

// if (!allowedOrigins[0]) {
// 	console.error("ALLOWED_ORIGIN environment variable is not set!");
// 	process.exit(1); // Exit if the variable isn't set
// }

// app.use(
// 	cors({
// 		origin: function (origin, callback) {
// 			if (!origin || allowedOrigins.includes(origin)) {
// 				// Allow requests with no origin (like Postman)
// 				callback(null, true);
// 			} else {
// 				callback(new Error("Not allowed by CORS"));
// 			}
// 		},
// 	})
// );

//Middleware
// app.use(bodyParser.json());

// app.post("/send-email", async (req, res) => {
// 	const { name, email, message } = req.body;

// 	try {
// 		const transporter = nodemailer.createTransport({
// 			service: "Gmail",
// 			auth: {
// 				user: process.env.USER,
// 				pass: process.env.PASS,
// 			},
// 		});

// 		const mailOptions = {
// 			from: email,
// 			to: process.env.USER,
// 			subject: `Message from ${name}`,
// 			text: message,
// 			replyTo: email,
// 			subject: `Message from ${name}`,
// 			text: `You have received a message from ${name} (${email}):\n\n${message}`,
// 		};

// 		await transporter.sendMail(mailOptions);
// 		res.status(200).json({ message: "Email sent successfully!" }); // Send JSON response
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: "Failed to send email." }); // Send JSON error response
// 	}
// });

// const PORT = process.env.PORT || 3001; // Use environment variable for port
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
