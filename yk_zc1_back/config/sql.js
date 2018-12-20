module.exports = {
    SELECT_ALL: "select * from shopping_all",
    //模糊搜索语句
    SELECT_LIKE: "select * from shopping_all where shopping_types like ?",
    //热门搜索语句
    SELECT_HOT: "select * from shopping_all where shopping_types=hot_search",
    //详情数据查询
    SELECT_DETAIL: "select * from shopping_detail where uid=?",

    //目前不用的语句，只是用来直接改变数据
    INSERT_ALL: "insert into shopping_all(uid,shopping_types,id) values(?,?,?)",
    INSERT_DETAIL: "insert into shopping_detail(cid,sale,price,credit,imgsrc,uid,description) values(?,?,?,?,?,?,?)",

}