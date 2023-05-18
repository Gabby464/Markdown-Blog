const express = require('express');
const Article = require('../models/article')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {text: 'Hello Articles'})
});

router.get('/new',(req, res) => {
    res.render('articles/new');
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    await article.save();
    res.redirect(`/aritcles/${article.id}`)
})
module.exports = router