const express = require("express");
const router = express.Router();

const {
  loadNewView,
  getArticleEdit,
  showArticle,
  editArticle,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");


router.get("/new", loadNewView);
router.get("/edit/:id", getArticleEdit);
router.get("/:slug", showArticle);
router.put("/:id", editArticle, saveArticleandRedirect()).delete("/:id", deleteArticle);
router.post("/", createArticle, saveArticleandRedirect());
router.delete("/:id", deleteArticle);

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
