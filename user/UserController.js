var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended:true }));
var User = require('./user');
// User 생성
router.post('/', function(req, res) {
    User.create( {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password
        },
        function(err, user) {
            if (err) return res.status(500).send("User 생성 실패.");
            res.status(200).send(user);
        });
});

//로그인 여부
router.post('/:login', function(req, res) {
    User.findOne( { email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) return res.status(500).send("쿼리 실패");
        if (!user) return res.status(404).send("로그인 실패");
        res.status(200).send(user);
    });
});

// User 전체 조회
router.get('/', function(req, res) {
    User.find( {}, function(err, users) {
        if (err) return res.status(500).send("User 전체 조회 실패.");
        res.status(200).send(users);
    });
});
// User 이메일로 찾기
router.get('/:email', function(req, res) {
    User.findOne( { email: req.params.email }, function (err, user) {
        if (err) return res.status(500).send("이메일 조회 실패");
        if (!user) return res.status(404).send("매치되는 이메일 없음.");
        res.status(200).send(user);
    });
});
// User 삭제
router.delete('/:id', function (req, res) {
    User.findOneAndDelete( { email: req.params.id }, function (err, user) {
        if (err) return res.status(500).send("User 삭제 실패");
        res.status(200).send("User "+ user.name +" 삭제됨.");
    });
});
// User 수정
router.put('/:id', function (req, res) {    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("User 수정 실패.");
        res.status(200).send(user);
    });
});
module.exports = router;