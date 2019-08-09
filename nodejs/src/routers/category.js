const express = require('express');
const router = new express.Router();
const Category = require('../models/category')
const auth = require('../middleware/auth')

//添加文章分类
router.post('/cate', auth, async (req, res) => {
    try {
        console.log(req.body);
        
        let cate;
        if (req.body._id) {
            cate = await Category.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name });
        } else {
            cate = new Category(req.body);
            await cate.save();
        }

        res.status(201).send(cate)
    } catch (error) {
        res.status(400).send(error)
    }
})

//获取分类列表
router.get('/cate', async (req, res) => {
    try {
        const cateList = await Category.find({}).sort({createdAt:-1});
        res.send(cateList)

    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;
