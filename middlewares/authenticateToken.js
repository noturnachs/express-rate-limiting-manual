const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  const token = request.cookies.token;

  if (!token) {
    return response.status(403).json({ message: "Unauthorized access 1" });
  }

  jwt.verify(token, "12345678", (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Unauthorized access 2" });
    }

    request.user = user;
    next();
  });
};

module.exports = authenticateToken;
