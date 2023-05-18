const express = require("express");

//async errors
require("express-async-errors");

const app = express();
const articleRouter = require("./routes/articles");
const connectDB = require("./db/connect");
const errorHandling = require("./middlewares/error-handling");
const notFound = require("./middlewares/not-found");
require("dotenv").config();

//set view engine
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
//access all params from the article form
app.use("/articles", articleRouter);
app.get("/", (req, res) => {
    const articles = [
      {
        title: "test",
        createdAt: new Date().toLocaleDateString(),
        description: "test description",
      },
    ];
    res.render("articles/index", { articles: articles });
  });
//error middleware
app.use(notFound)
app.use(errorHandling);


const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(5000, console.log("sever is listening on port 3000"));
};
start();
