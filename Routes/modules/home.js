// const express = require("express");
// const router = express.Router();
// const Url = require("../Model/Url");

// // home
// router.get("/", (req, res) => {
//   res.render("index");
// });

// // redirect to origURL
// router.get("/:shortUrl", (req, res) => {
//   const shortUrl = req.params;
//   Url.find({})
//     .lean()
//     .then((data) => {
//       const [target] = data.filter(
//         (d) => d.shortUrl === "http://127.0.0.1:3000/" + shortUrl.shortUrl
//       );
//       return res.redirect(target.origUrl);
//     })
//     .catch((err) => console.log(err));
// });

// module.exports = router;
