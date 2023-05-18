const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.get("/", async (req, res) => {
    const articles = await Article.find({});
    console.log(articles)
    res.render("articles/index", { articles: articles});
});

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    throw new Error();
  }
  console.log("working");
  res.render("articles/show", { article: article });
});

router.post("/", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  await article.save();
  res.redirect(`/articles/${article.id}`);
});
module.exports = router;
