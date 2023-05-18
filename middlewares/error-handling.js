const errorHandling = (err, req, res, next) => {
  console.log(err)
  if (err.name === "ValidationError") {
    // console.log(err.properties);
    return res.status(400).render('articles/new', {article: req.body});
  }
  return res.status(500).render('error', {status: 500, msg: "Internal Server Error"});
};

module.exports = errorHandling;
