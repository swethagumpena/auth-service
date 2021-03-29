const service = require('../services/auth.service');

const authHandler = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = await service.authenticateService(token);
    if (userData) { res.status(200).send(userData); } else { res.status(401).json({ message: 'token  expired' }); }
    // res.status(200).send(userData);
  } catch (err) {
    res.status(401).send();
  }
};

module.exports = { authHandler };
