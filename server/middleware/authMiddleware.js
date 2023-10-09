const jwt = require('jsonwebtoken');

authenticateToken=(req, res, next)=> {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'token not foud' });
  }

  jwt.verify(token, 'KEYBUYCARS', (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user.userId;
    req.role = user.role;

    console.log(user) 
    next();
  });
}

module.exports = {authenticateToken};
