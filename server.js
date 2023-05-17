const express = require('express')
const app = express();
const articleRouter = require('./routes/articles')
//set view engine
app.set('view engine', 'ejs')
app.use('/articles',articleRouter)
app.get('/', (req, res) => {
    const articles = [{
        title: 'test',
        createdAt: Date.now(),
        description: 'test description'
    }]
    res.render('index', {articles: 'Hello home'})
})
app.listen(5000)