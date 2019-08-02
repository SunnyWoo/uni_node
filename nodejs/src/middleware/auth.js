const User = require('../models/user')
const jwt = require('jsonwebtoken')

//判断用户是否已经登录
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'sunnyreader')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = token
        next();
    } catch (error) {
        res.status(401).send({ error: 'Authenticating Failed!' })
    }
}

module.exports = auth;