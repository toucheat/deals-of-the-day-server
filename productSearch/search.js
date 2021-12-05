var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
const axios = require("axios");
const cheerio = require("cheerio");

router.get('/:id', function(req, res) {
    const getHtml = async () => {
      try {
          return await axios.get("http://search.danawa.com/dsearch.php?k1=" + encodeURIComponent(req.params.id));
        } catch (error) {
          res.status(500).send("AXIOS GET FAILED");
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

          var link = select.attr("href") + '';
          var pcodeSplit = link.split('=');
          if(pcodeSplit[1] !== undefined){
            var pcode = pcodeSplit[1].split('&');
            pcode = pcode[0];
          }

          var price = $(src).find("div.prod_main_info > div.prod_pricelist > ul > li > p.price_sect > a").first().text();
          if(price === ""){
            price = $(src).find("div.top5_price > em.num_c").first().text() + "원";
          }
          var img = $(src).find("div.thumb_image > a > img").attr("src");

          if(img === undefined){
            img = $(src).find("div.thumb_image > a > img").attr("data-original");
          }

          if(name !== ""){
            if(link.search("/ajax/") === -1){
              if(link.search("pcode=") !== -1)
              result.push({
                name,
                pcode,
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