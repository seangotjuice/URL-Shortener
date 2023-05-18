const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Url = require("./Model/Url");
const { generateURL } = require("./generate.js");

// mongoose 連線
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

const app = express();

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" })); // handlebars
app.set("view engine", "hbs"); // handlebars
app.use(express.urlencoded({ extended: true })); // body-parser拿表單資料

///////////////////////////////////////////////

// home
app.get("/", (req, res) => {
  res.render("index");
});

// get input and render
app.post("/generate", (req, res) => {
  const { input } = req.body; // 使用者輸入string
  Url.find()
    .lean()
    .then((data) => {
      const [existUrl] = data.filter((u) => u.origUrl === input);
      if (existUrl) {
        // console.log("URL exist!");
        const { shortUrl } = existUrl;
        return res.render("new", { output: shortUrl });
      }
      // console.log("URL not exist");
      const shortUrl = generateURL();
      Url.create({ origUrl: input, shortUrl });
      return res.render("new", { output: shortUrl });
    })
    .catch((err) => console.log(err));
});

// redirect to origURL
app.get("/:shortUrl", (req, res) => {
  const shortUrl = req.params;
  Url.find({})
    .lean()
    .then((data) => {
      const [target] = data.filter(
        (d) => d.shortUrl === "http://127.0.0.1:3000/" + shortUrl.shortUrl
      );
      return res.redirect(target.origUrl);
    })
    .catch((err) => console.log(err));
});

/////////////////////////////////////////////
app.listen(3000, (req, res) => {
  console.log("app is running on 3000");
});
