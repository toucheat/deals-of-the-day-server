var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

router.get('/:id', function(req, res) {
    const getHtml = async () => {
        try {
          return await axios.get("http://search.danawa.com/dsearch.php?k1=" + req.params.id);
        } catch (error) {
          console.error(error);
        }
      };

      getHtml()
      .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.main_prodlist.main_prodlist_list.product_list").children(li.prod_item);
    
        $bodyList.each(function(i, elem) {
          ulList[i] = {
            url: $(this).find('p.prod_name a').attr('href'),
          };
        });
    
        const data = ulList.filter(n => n.title);
        return data;
      })
      .then(res => log(res));
});


module.exports = router;