const jwt = require('jsonwebtoken');
const requireAuth = (req, res, next) => {
  const {jwt : token} = req.cookies
  try {
    if (jwt.verify(token, 'mern-secret'))
    next();

  } catch (error) {
    res.send("Incorrect Password")
    console.error(error)
  }
  
};

module.exports = { requireAuth };