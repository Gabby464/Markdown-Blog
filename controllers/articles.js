const Article = require("../models/article");

//load new page

const loadNewView = (req, res) => {
  res.render("articles/new", { article: new Article() });
};
//load article by id (for editing)
const getArticleEdit = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
};

//show one article by slug

const showArticle = async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (!article) {
    throw new Error();
  }
  res.render("articles/show", { article: article });
};

//edit artice by id

const editArticle = async (req, res, next) => {
  req.article = await Article.findById(req.params.id);
  next();
};

// create new article

const createArticle = (req, res, next) => {
  req.article = new Article(), 
  next();
};

//delete

const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
};

module.exports = {
    loadNewView,
    getArticleEdit,
    showArticle,
    editArticle,
    createArticle,
    deleteArticle
}