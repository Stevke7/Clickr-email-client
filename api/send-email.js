const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,OPTIONS,PATCH,DELETE,POST,PUT"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);

	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}

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
