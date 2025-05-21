const User = require("../models/admin");

const isAdmin = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Forbidden: Admin access required" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = isAdmin;