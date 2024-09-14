const prisma = require("../prisma/prisma");
const { verifyToken } = require("./tokenization");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "No token, authorization denied" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = await prisma.findUnique({
      omit: { password: true },
      where: { id: decoded.id },
    });
    // .select("-password");
    if (!req.user) {
      return res.status(401).send({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = authenticate;


// The creative power of the mind