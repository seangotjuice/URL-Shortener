// const express = require("express");
// const router = express.Router();
// const Url = require("../Model/Url");

// // get input and render
// router.post("/", (req, res) => {
//   const { input } = req.body; // 使用者輸入string
//   Url.find()
//     .lean()
//     .then((data) => {
//       const [existUrl] = data.filter((u) => u.origUrl === input);
//       if (existUrl) {
//         // console.log("URL exist!");
//         const { shortUrl } = existUrl;
//         return res.render("new", { output: shortUrl });
//       }
//       // console.log("URL not exist");
//       const shortUrl = generateURL();
//       Url.create({ origUrl: input, shortUrl });
//       return res.render("new", { output: shortUrl });
//     })
//     .catch((err) => console.log(err));
// });

// module.exports = router;
