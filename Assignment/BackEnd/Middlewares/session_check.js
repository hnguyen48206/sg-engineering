function checkSession(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Not Authenticated");
  }
  const session = global.sessions[token];
  if (!session || new Date() > new Date(session.expiresAt)) {
    return res.status(401).send("Session expired or invalid");
  }
  // Add user ID/ user name to request object for further use
  req.userId = session.userId;
  req.username = session.username;
  next();
}
module.exports = checkSession;
