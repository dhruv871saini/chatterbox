import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;  // Extract token from cookies
    if (!token) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.id = decoded.userId;  // Attach the user ID to the request object
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default isAuthenticated;
