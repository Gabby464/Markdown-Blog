const express = require("express");
const Article = require("../models/article");
const router = express.Router();

// router.get("/", async (req, res) => {
//   const articles = await Article.find({});
//   res.render("articles/index", { articles: articles });
// });

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (!article) {
    throw new Error();
  }
  res.render("articles/show", { article: article });
});

router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleandRedirect()
);

router.post(
  "/",
   (req, res, next) => {
    (req.article =  new Article()), 
    next();
  },
  saveArticleandRedirect("new")
);

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleandRedirect() {
  return async (req, res) => {
    const article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    await article.save();
    res.redirect(`/`);
  };
}
module.exports = router;
