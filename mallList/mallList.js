var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
const axios = require("axios");
const cheerio = require("cheerio");

router.get('/:id', function(req, res) {
    const getHtml = async () => {
      try {
          return await axios.get("http://prod.danawa.com/info/?pcode=" + encodeURIComponent(req.params.id));
        } catch (error) {
          res.status(500).send("AXIOS GET FAILED");
        }
      };

      getHtml()
      .then(html => {
        let result = [];
        const $ = cheerio.load(html.data);
        
        const list = $("tbody.high_list > tr").toArray();

        list.forEach((src) => {
          var mallInfo = $(src).find("td.mall > div.logo_over > a > img");
          var mallName = mallInfo.attr("alt");
          var mallImg = mallInfo.attr("src");

          if(mallName === undefined){
            mallName = $(src).find("td.mall > div.logo_over > a").text();
            mallImg = $(src).find("td.mall > div.logo_over > span").text();
          }

          const link = $(src).find("td.mall > div.logo_over > a").attr("href");

          const price = $(src).find("em.prc_t").text();

          const shippingCost = $(src).find("span.stxt.deleveryBaseSection").text();

          if(link.search("/ajax/") === -1){
            result.push({
              mallName,
              mallImg,
              link,
              price,
              shippingCost,
          });
          }
        });

        return result;
      })
      .then(ress => res.status(200).send(ress));
});

module.exports = router;