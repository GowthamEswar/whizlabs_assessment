const jwt = require("jsonwebtoken");

const APP_SECRET = "our_app_secret";

const VerifyToken = async (req, res, next) => {
  console.log("req---->", req)
  const token = req.headers['authorization'];
  console.log("token---->", token)
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
  req.user = payload;



  next();
}; 

const VerifyUser = async (req, res, next) => {
  if (req.user.user_type !== 'SELLER') return res.status(403).json({ message: 'permission requried for authorization' });
  next();
};

module.exports = {
    VerifyToken,
    VerifyUser
}
