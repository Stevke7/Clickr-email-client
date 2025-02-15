const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (req, res) => {
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
			text: `You have received a message from ${name} (${email}):\n\n${message}`,
			replyTo: email,
		};

		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: "Email sent successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to send email." });
	}
};
