var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');

router.get('/', function(req, res) {
    (async() => {
        result = [];

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://danawa.com');
        await autoScroll(page);
        const content = await page.content();
        const $ = cheerio.load(content);
        const lists = $("#top100_0 > div.main-top100__right.swiper-container.swiper-container-fade.swiper-container-initialized.swiper-container-horizontal > div.swiper-wrapper > ul.prod-list.swiper-slide.swiper-slide-active > li");
        lists.each((index, list) => {
          const select = $(list).find("a");
          const name = select.find("span.prod-list__txt").text();
          const price = select.find("span.prod-list__price").text();
          const img = select.find("span.prod-list__thumb > img").attr("src");
          const link = select.attr("href");
          const pcodeSplit = link.split('=');
          const pcode = pcodeSplit[1];
          result.push({
              name,
              price,
              img,
              pcode
          });
        });
        browser.close();
        return result;
      })().then(ress => res.status(200).send(ress));

      async function autoScroll(page){
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                var totalHeight = 0;
                var distance = 3500;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
    
                    if(totalHeight >= scrollHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
});

module.exports = router;