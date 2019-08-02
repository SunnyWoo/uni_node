const express = require('express');
const router = new express.Router();
const request = require('request');

const auth = require("../middleware/auth")
const User = require('../models/user');

//用户登录
router.post('/users/login', async (req, res) => {
    try {
        //首先当前用户是否已经存在 如果不存在进行添加新用户 否则只修改tokens
        let user = await User.findOne({ open_id: req.body.open_id })
        console.log(user);
        if (!user) {
            user = new User(req.body)
            await user.save();
        }
        const token = await user.generateAuthToken();

        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error);
    }
});

//通过code 获取用户的open_id
router.get('/wechat/getOpenId', (req, res) => {
    request(`https://api.weixin.qq.com/sns/jscode2session?appid=${req.query.appid}&secret=${req.query.secret}&js_code=${req.query.code}&grant_type=authorization_code`, function (error, response, body) {
        if (error) {
            return res.status(500).send(error)
        }

        res.send(body);
    })
});

module.exports = router;