const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader) {
    if (authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }
    console.log("token =", token);
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      jwt.verify(token, process.env.JWT_SIGNING_KEY, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "user is not authorized" });
        }
        req.userId = decoded?.id;
      });
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
  } else {
    res
      .status(401)
      .json({ message: "user is not authorized or token missing" });
  }
  next();
};

module.exports = auth;

