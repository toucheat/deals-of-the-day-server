var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
const axios = require("axios");
const cheerio = require("cheerio");
var favorite = require('../favoriteCount/favorite');

router.get('/:id', function(req, res) {
  var favoriteCount = 0;  
  const getHtml = async () => {
      try {
        favorite.findOne({ pcode: req.params.id }, function(err, fav){
          if (err) return console.log(err);
          if (fav) favoriteCount = fav.favoriteCount;
        });
        return await axios.get("http://prod.danawa.com/info/?pcode=" + encodeURIComponent(req.params.id));
        } catch (error) {
          res.status(500).send("AXIOS GET FAILED");
        }
      };

      getHtml()
      .then(html => {
        let result = [];
        const $ = cheerio.load(html.data);
        
        const pname = $("h3.prod_tit").text();
        const price = $("em.prc_c").first().text();
        const img = $("div.photo_w > a > img").attr("src");
        
        result.push({
          pname,
          price,
          favoriteCount,
          img,
        });

        return result;
      })
      .then(ress => res.status(200).send(ress));
});

module.exports = router;