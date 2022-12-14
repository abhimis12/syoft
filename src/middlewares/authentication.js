require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

module.exports = async (req, res, next) => {

  if (!req.headers?.authorization)
    return res
      .status(400)
      .send({ message: "Please provide a valid authorization token" });

  const bearerToken = req.headers.authorization;

  if (!bearerToken.startsWith("Bearer "))
    return res
      .status(400)
      .send({ message: "Please provide a valid authorization token" });

 
  const token = bearerToken.split(" ")[1];
  let user;
  try {
    user = await verifyToken(token); 
  } catch (err) {
    return res.status(401).send({ message: "The token is not valid" });
  }
 
  req.user = user.user;
  next();
};