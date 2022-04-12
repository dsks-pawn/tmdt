var express = require('express');
var router = express.Router();

router.use("/Shopee", require(__dirname + "/shopee"))

router.get('/', async (req, res) => {
    res.render("index", { title: "Crawl Ecommerce" });
});

module.exports = router;

