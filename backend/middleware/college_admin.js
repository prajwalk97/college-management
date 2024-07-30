module.exports = function (req, res, next) {
  console.log(req.user)
  if (req.user.a_id) {
    next();
  } else {
    return res.status(400).send("Access Denied!");
  }
};
