const notFound = (req, res) =>{ 
    res.status(404).render('error', {status: 404, msg: "The page you’re looking for doesn’t exist."});
}

module.exports = notFound