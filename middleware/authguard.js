const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).send({
            msg:"No token, authorization denied"
        })
    }
   // Verify token
  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    req.currentuser = decoded;
    next()
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};