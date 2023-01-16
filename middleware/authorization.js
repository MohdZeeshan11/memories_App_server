const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // console.log('token not valid');
    res.status(400).json("user is not authorized")
    return;
  }

  const token = authHeader.split(' ')[1]
  console.log('token', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SIGNING_KEY)
    // console.log('inside try block');
    req.user = decoded
    next()
  } catch (error) {
    console.log('error = ',error);
    res.status(400).json("user is not authorized")
  }
}

module.exports = authenticationMiddleware

