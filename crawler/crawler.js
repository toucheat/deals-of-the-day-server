var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

router.get('/:id', function(req, res) {
    const getHtml = async () => {
      log(req.params.id);
      try {
          return await axios.get("http://search.danawa.com/dsearch.php?k1=" + encodeURIComponent(req.params.id));
        } catch (error) {
          console.error(error);
        }
      };

      getHtml()
      .then(html => {
        let result = [];
        const $ = cheerio.load(html.data);
        
        const list = $("#productListArea > div.main_prodlist.main_prodlist_list > ul.product_list > li").toArray();

        list.forEach((src) => {
          const select = $(src).find("div.prod_main_info > div.prod_info > p.prod_name > a");
          const name = select.text();
          const link = select.attr("href");
          var price = $(src).find("div.prod_main_info > div.prod_pricelist > ul > li > p.price_sect > a").first().text();
          if(price === ""){
            price = $(src).find("div.top5_price > em.num_c").first().text() + "원";
          }
          const img = $(src).find("div.thumb_image > a > img").first().attr("src");

          if(name !== ""){
            if(link.search("/ajax/") === -1){
              if(link.search("pcode=") !== -1)
              result.push({
                name,
                link,
                price,
                img,
              });
            }
          }
        });

        return result;
      })
      .then(ress => res.status(200).send(ress));
});

module.exports = router;