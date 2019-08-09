const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Article = require('../models/article')
const multer = require('multer')


const upload = multer({
    dest: 'pictures',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/article/picture/upload', auth, upload.single('image'), async (req, res) => {
    res.send({ path: req.file.path })
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/articles', auth, async (req, res) => {
    try {
        let params = {};
        if (req.query.title) {
            let query = new RegExp(req.query.title, 'i');
            params.$or = [{ title: query }];
        }
        if (req.query.cate_id) {
            params.cate_id = req.query.cate_id;
        }

        const articles = await Article.find(params).limit(4).skip(parseInt(req.query.skip) * 4);
        res.send(articles)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/article/:id', auth, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.send(article)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});



router.post('/article/save/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const article = await Article.findByIdAndUpdate(_id, req.body);
        res.send({ success: 1 })
    } catch (error) {
        res.status(500).send({ error: 'Save Failed!' })
    }
});

router.post('/article/save', auth, async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();

        res.status(201).send({ success: 1 })
    } catch (error) {
        res.status(500).send({ error: 'Save Failed!' })
    }
});

module.exports = router;