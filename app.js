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
  Url.find({})
    .lean()
    .then((data) => {
      const [existUrl] = data.filter((u) => u.origUrl === input);
      // console.log("existUrl為", existUrl); // {ori:, short:,...}

      if (existUrl) {
        // console.log("URL exisist!");
        const { shortUrl } = existUrl;
        console.log("已有shortUrl是", shortUrl);

        return res.render("new", { output: shortUrl });
      }
      // console.log("URL not exist");
      // const shortUrl = "create new one";
      const shortUrl = generateURL();
      console.log("新增shortUrl是", shortUrl);
      Url.create({ origUrl: input, shortUrl });
      return res.render("new", { output: shortUrl });
    })
    .catch((err) => console.log(err));
});
// render output
app.get("/:shortUrl", (req, res) => {
  const shortUrl = req.params;
  console.log("shortUrl", shortUrl); // 取得"/"後面的字串
  Url.find({})
    .lean()
    .then((data) => {
      console.log(data);
      const [target] = data.filter(
        (d) => d.shortUrl === "http://127.0.0.1:3000/" + shortUrl.shortUrl
      );
      console.log(target);
      const targetUrl = target.origUrl;
      console.log(targetUrl);
      return res.redirect(targetUrl);
    });
});

/////////////////////////////////////////////
app.listen(3000, (req, res) => {
  console.log("app is running on 3000");
});
