const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization');

        if(!token) return res.status(403).send('Access Denied');

        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.ACCESSTOKEN);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(500).json({ message: 'User does not exist.'});
    }
};

module.exports = { validateToken };