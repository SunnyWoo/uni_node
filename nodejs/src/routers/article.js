const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Article = require('../models/article')
const multer = require('multer')

router.get('/articles', auth, async (req, res) => {
    try {
        const articles = await Article.find({}).limit(10).skip(req.body.skip);
        res.send(articles)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.post('/article/save', auth, async (req, res) => {
    console.log(req.body);

    try {
        const article = new Article(req.body);
        await article.save();

        res.status(201).send({ success: 1 })
    } catch (error) {
        res.status(500).send({ error: 'Save Failed!' })
    }
});


const upload = multer({
    dest: 'pictures',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('file extension is not allowed'))
        }
        cb(undefined, true)
    }
})

//图片上传
router.post('article/upload', upload.single('image'), (req, res) => {
    console.log(req.file);

}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})




module.exports = router;