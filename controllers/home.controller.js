const jwt = require("jsonwebtoken");

const dashboard = (req, res) => {
	jwt.verify(req.token, process.env.secret_key, (err, authorizedUser) => {
		if (err) {
			return res.status(403).send({ msg: err.message });
		} else {
			res.status(200).send({
				msg: "successfully logged in",
				authorizedUser,
			});
		}
	});
};

const checkToken = (req, res, next) => {
	const header = req.headers["authorization"];

	if (typeof header !== "undefined") {
		const bearer = header.split(" ");
		const token = bearer[1];

		req.token = token;
		next();
	} else {
		return res
			.status(403)
			.send({ msg: "No token found... So no access granted" });
	}
};

module.exports = {
	dashboard,
	checkToken,
};
