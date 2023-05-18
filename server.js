const express = require('express')
const app = express();
const articleRouter = require('./routes/articles');
const connectDB = require('./db/connect')
require('dotenv').config()
//set view engine
app.set('view engine', 'ejs')
app.use('/articles',articleRouter)
app.get('/', (req, res) => {
    const articles = [{
        title: 'test',
        createdAt: (new Date).toLocaleDateString(),
        description: 'test description'
    }]
    res.render('articles/index', {articles: articles})
})
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(5000, console.log('sever is listening on port 3000'))
    } catch (error) {
        console.log(error)
    }
}
start()