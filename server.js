const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
	const { name, email, message } = req.body;
	require("dotenv").config();

	try {
		const transporter = nodemailer.createTransport({
			service: "Gmail", // This is email provider's SMTP,  Need to replace this when we create .clickr mail
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
		};

		await transporter.sendMail(mailOptions);
		res.status(200).send("Email sent succesfully!");
	} catch (error) {
		console.error(error);
		res.status(500).send("Failed to send email.");
	}
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
