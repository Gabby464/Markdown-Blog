const express = require("express");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const article = require('./models/article')
// Async errors
require("express-async-errors");

// Load environment variables
dotenv.config();

// Import routes
const articleRouter = require("./routes/articles");

// Import middlewares
const connectDB = require("./db/connect");
const errorHandling = require("./middlewares/error-handling");
const notFound = require("./middlewares/not-found");

const app = express();

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Access all params from the article form
app.use("/articles", articleRouter);

// Home page route
app.get("/", async (req, res) => {
  const articles = await article.find({}).sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

// Error middleware
app.use(notFound);
app.use(errorHandling);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(5000, console.log("Server is listening on port 5000"));
};

start();
