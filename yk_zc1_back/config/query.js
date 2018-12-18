let mysql = require("mysql"),
    config = require("./config");

let connection = mysql.createPool(config);

module.exports = function(sql, query, fn) {
    fn = fn ? fn : query;
    query = query || [];
    connection.getConnection((err, connect) => {
        if (err) {
            fn(err, "链接数据库报错");
        } else {
            connect.query(sql, query, (err, results) => {
                connect.release()
                callbackSql(err, results)
            })
        }
    })

    function callbackSql(err, results) {
        if (err) {
            fn(err, "获取数据报错")
        } else {
            fn(null, results)
        }
    }
}