var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
var favorite = require('./favorite');
var User = require('../user/user');

//찜목록 추가
router.post('/', function(req, res) {
    var fav = {"pcode": req.body.pcode};
    User.findOneAndUpdate({ email: req.body.email }, { $addToSet: { favoriteList: fav }},
        function(err, user) {
            if (err) return res.status(500).send("업데이트 실패.");
            countUpdate(req.body.pcode);
            res.status(200).send("add success");
        });
});

//찜목록 삭제
router.delete('/', function(req, res) {
    var fav = {"pcode": req.body.pcode};
    User.findOneAndUpdate({ email: req.body.email }, { $pull: { favoriteList: fav }},
        function(err, user) {
            if (err) return res.status(500).send("업데이트 실패.");
            res.status(200).send("delete success");
        });
});

// 개별 쇼핑몰 별 찜목록 추가
router.post('/:mall', function(req, res) {
    var fav = { "mallName": req.body.mallName, "mallImg": req.body.mallImg, "link": req.body.link, "price": req.body.price, "shippingCost": req.body.shippingCost };
    User.findOneAndUpdate({ email: req.body.email }, { $addToSet: { mallList: fav }},
        function(err, user) {
            if (err) return res.status(500).send("업데이트 실패.");
            countUpdate(req.body.pcode);
            res.status(200).send("add success");
        });
});

// 개별 쇼핑몰 찜 목록 삭제
router.delete('/:mall', function(req, res) {
    var fav = {"link": req.body.link};
    User.findOneAndUpdate({ email: req.body.email }, { $pull: { mallList: fav }},
        function(err, user) {
            if (err) return res.status(500).send("업데이트 실패.");
            res.status(200).send("delete success");
        });
});

// pcode로 찜 된 횟수 조회
router.get('/:pcode', function(req, res) {
    favorite.findOne( { pcode: req.params.pcode }, function(err, users) {
        if (err) return res.status(500).send("favorite count 조회 실패.");
        res.status(200).send(users);
    });
});

//찜목록 전체 조회
router.get('/', function(req, res) {
    favorite.find( {}, function(err, users) {
        if (err) return res.status(500).send("favorite count 전체 조회 실패.");
        res.status(200).send(users);
    });
});

//찜한 횟수 증가 업데이트 함수
function countUpdate(pcode){
    favorite.findOneAndUpdate({ pcode: pcode }, { $inc: { favoriteCount: 1 }}, {upsert: true},
        function(err, user) {
            if (err) return console.log("업데이트 실패.");
        });
}

module.exports = router;