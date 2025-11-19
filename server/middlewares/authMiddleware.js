import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Missing authentication token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);

    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token.",
    });
  }
};

export default protect;
