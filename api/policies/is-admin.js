module.exports = async function (req, res, proceed) {
  if (!req.me || !req.me.isAdmin) {
    return res.forbidden();
  }

  return proceed();
};
