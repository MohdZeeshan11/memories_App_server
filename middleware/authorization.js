// const jwt = require("jsonwebtoken");


// const auth = async (req, res, next) => {
//   console.log("--------------------------",req.headers);
//   try {
//     const token = req?.headers?.authorization?.split(" ")[1];
//     const isCustomAuth = token?.length;
//     console.log('length =',token?.length);
//     let decodedData;

//     if (token && isCustomAuth<500) {      
//       decodedData = jwt.verify(token, process.env.JWT_SIGNING_KEY);
//       req.userId = decodedData?.id;
//     } else {
//       decodedData = jwt.decode(token);

//       req.userId = decodedData?.sub;
//     }    
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = auth;
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/index')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const { id, username } = decoded
    // req.user = { id, username }
    req.user = decoded
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware

