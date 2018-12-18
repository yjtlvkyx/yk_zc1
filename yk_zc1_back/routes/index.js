var express = require('express');
var router = express.Router();
let query = require("../config/query"),
    sql = require("../config/sql"),
    uuid = require("node-uuid");

/* GET home page. */
router.get('/shopping/selectall', function(req, res, next) {
    query(sql.SELECT_ALL, [], (err, wras) => {
        if (err) {
            console.log(err, "报错信息")
        } else {
            res.send({ code: 1, wras });
        }
    })
});

//给总表添加可以模糊搜索的内容
router.post('/shopping/addall', function(req, res, next) {
    let uid = uuid.v1(),
        { shopping_types } = req.body,
        id = Math.floor(Math.random() * 9000 + 1000);
    query(sql.INSERT_ALL, [uid, shopping_types, id], (err, wras) => {
        if (err) {
            console.log(err, "报错信息")
        } else {
            res.send({ code: 1, msg: "添加成功" });
        }
    })
});
module.exports = router;