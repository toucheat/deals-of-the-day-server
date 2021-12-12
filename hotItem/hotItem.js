var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
const axios = require("axios");
const cheerio = require("cheerio");

router.get('/', function(req, res) {
    const getHtml = async () => {
      try {
          return await axios.get("http://danawa.com");
        } catch (error) {
          res.status(500).send("AXIOS GET FAILED");
        }
      };

      getHtml()
      .then(html => {
        let result = [];
        const $ = cheerio.load(html.data);
        
        const list = $("ul.prod-list.swiper-slide > li").toArray();

        list.forEach((src) => {
          const name = $(src).find("a > span.prod-list__txt").text();
          const img = $(src).find("a > span.prod-list__thumb > img").attr("src");
          const link = $(src).find("a").attr("href");
          const price = $(src).find("a > span.prod-list__price > span.num").text();

          result.push({
            name,
            img,
            link,
            price,
        });

        });

        return result;
      })
      .then(ress => res.status(200).send(ress));
});

module.exports = router;