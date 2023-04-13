module.exports = (req, res, next) => {
  if (req.method == "POST" && req.path == "/login") {
    if (req.body.user === "admin" && req.body.password === "123456789") {
      res.status(200).json({ role: "admin", name: "Иван Иванов" });
    } else if (req.body.user === "user" && req.body.password === "123456789") {
      res.status(200).json({ role: "user", name: "Петр Петров" });
    } else {
      res.status(400).json({ message: "wrong password" });
    }
  } else {
    next();
  }
};
