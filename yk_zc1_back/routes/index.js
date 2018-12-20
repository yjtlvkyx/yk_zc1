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

//模糊搜索内容
router.get('/shopping/selecthot', function(req, res, next) {
    let data = req.query.data;

    query(sql.SELECT_HOT, [], (err, wras) => {
        if (err) {
            console.log(err, "报错信息")
        } else {
            if (wras.length == 0) {
                res.send({ code: 0, wras: "您想要找寻的内容不存在" })
            } else {
                res.send({ code: 1, wras });
            }
        }
    })
});

//模糊搜索内容
router.get('/shopping/selectlike', function(req, res, next) {
    let data = req.query.data;

    query(sql.SELECT_LIKE, ["%" + data + "%"], (err, wras) => {
        if (err) {
            console.log(err, "报错信息")
        } else {
            if (wras.length == 0) {
                res.send({ code: 0, wras: "您想要找寻的内容不存在" })
            } else {
                res.send({ code: 1, wras });
            }
        }
    })
});

//模糊搜索后点进的页面数据查询
router.get('/shopping/selectdetail', function(req, res, next) {
    if (req.url == "/favicon.ico") {
        res.end("");
        return;
    };
    let { uid, type, page, count } = req.query;
    console.log(uid, type, typeof page, typeof count, "来走一次吧")
    page = typeof page == "object" ? 1 : page;
    count = typeof count == "object" ? 6 : count;
    query(sql.SELECT_DETAIL, [uid], (err, wras) => {
        if (err) {
            console.log(err, "报错信息")
        } else {
            if (wras.length == 0) {
                res.send({ code: 0, wras: "您想要找寻的内容不存在" })
            } else {
                //处理后的数据
                let shopping_data = typesDatas(wras, type);

                let pageAll = Math.ceil(shopping_data.length / count);
                //切割数据
                shopping_data = splitData(page, count, shopping_data);

                res.send({ code: 1, pageAll, wras: shopping_data });
            }
        }
    })

    //根据传递回来的类型排序处理数据
    function typesDatas(data, type) {
        if (type == "null") {
            console.log(33);
            return data;
        } else {
            console.log(44, type)
            let datas = data.sort(function(a, b) {
                return a[type] - b[type];
            });
            console.log(datas, "醉了");
            return datas;
        }
    }
});
//给总表添加可以模糊搜索的内容  //现在没用
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

//给详情页所要渲染的表添加内容  //现在没用
/*配置的参数
 *price价格
 *description商品描述
 *credit信用等级
 *imgsrc商品图片信息
 *sale销量
 *cid商品的id
 *uid商品种类的id，这个id在总表生成
 */
let credits = ["A", "B", "C", "D", "E", "F", "G"]
router.post("/shopping/detailadd", function(req, res, next) {
    let cid = uuid.v1(),
        sale = (Math.random() * 10).toFixed(1),
        price = (Math.random() * 10000 + 1).toFixed(2),
        credit = credits[Math.floor(Math.random() * 7)],
        { imgsrc, uid, description } = req.body;
    console.log(cid, sale, price, credit, imgsrc, uid, description)
    query(sql.INSERT_DETAIL, [cid, sale, price, credit, imgsrc, uid, description], (err, wras) => {
        if (err) console.log(err, "数据库错误");
        res.send({ code: 1, wras });
    })
})

//分页渲染的方法
function splitData(page, count, data) {
    let arr = [];
    for (let s = (page - 1) * count; s < page * count; s++) {
        if (s >= data.length - 1) {
            continue;
        } else {
            arr.push(data[s]);
        }
    }
    return arr;
}
module.exports = router;