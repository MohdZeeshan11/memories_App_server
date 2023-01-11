const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
  console.log("--------------------------",req.headers);
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const isCustomAuth = token?.length;
    console.log('length =',token?.length);
    let decodedData;

    if (token && isCustomAuth<500) {      
      decodedData = jwt.verify(token, process.env.JWT_SIGNING_KEY);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;

