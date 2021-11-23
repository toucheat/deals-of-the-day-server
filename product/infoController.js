var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
var info = require('./info');

// 상품 정보 생성
router.post('/', function(req, res) {
    info.create( {
        name: req.body.name,
        lowPrice: req.body.lowPrice,
        picture: req.body.picture,
        discountRate: req.body.discountRate,
        addCount: req.body.addCount,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        shop: {
            elevenst: {
                price: req.body.elevenstPrice,
                link: req.body.elevenstLink
            },
            coupang: {
                price: req.body.coupangPrice,
                link: req.body.coupangLink
            }
        }
        },
        function(err, info) {
            if (err) return res.status(500).send("상품 정보 생성 실패.");
            res.status(200).send(info);
        });
});
// 상품 정보 전체 조회
router.get('/', function(req, res) {
    info.find( {}, function(err, info) {
        if (err) return res.status(500).send("상품 정보 전체 조회 실패.");
        res.status(200).send(info);
    });
});
// 상품 정보 조회
router.get('/:id', function(req, res) {
    info.findById(req.params.id, function (err, info) {
        if (err) return res.status(500).send("상품 정보 조회 실패");
        if (!info) return res.status(404).send("상품 정보 없음.");
        res.status(200).send(info);
    });
});
module.exports = router;