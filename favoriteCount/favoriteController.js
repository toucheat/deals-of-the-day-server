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