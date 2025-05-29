import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // Token ko header se uthao (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized, token missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User id or info request  attach to use later 
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};

export default authMiddleware;
