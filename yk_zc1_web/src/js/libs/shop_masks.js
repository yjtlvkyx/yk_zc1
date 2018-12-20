define(["axios", "vue"], function(axios, Vue) {
    //遮罩层的内容
    function Masks() {
        this.search = document.querySelector(".search");
        this.shoppingMask = document.querySelector(".shopping-search-mask");
        this.shopHeaderBack = document.querySelector(".shop-header");
        this.shopMask = document.querySelector(".shop-header .ret");
        this.inp = document.querySelector("#shop-types-search");
        this.shopInpSearch = document.querySelector(".shop-input-search"),
            this.shopMainHot = document.querySelector(".shop-main-hot");
        this.init();
    }

    //遮罩层的内容事件
    Masks.prototype = {
        constructor: Masks,
        init() {
            this.hotSearch();
            this.bindEventToggle();
            this.bindAjax();
        },
        //遮罩层的显示隐藏
        bindEventToggle() {
            let _this = this;
            this.search.addEventListener("touchend", (e) => {
                _this.shoppingMask.style.display = "block";
            });
            this.shopMask.addEventListener("touchend", () => {
                _this.shoppingMask.style.display = "none";
            })
        },
        //热门搜索直接渲染
        hotSearch() {
            let _this = this;
            axios("/shopping/selectall").then(function(data) {
                console.log(data.data)
                _this.shopMainHot.innerHTML = _this.modeSearch(data.data);
                //渲染完数据获取出现的内容进行操作
                _this.bindChangeDetail();
            }).catch(function(err) {
                console.log(err, "报错信息")
            })
        },
        //点击出现的时候要顺便请求搜索内容渲染
        bindAjax() {
            let _this = this;
            this.inp.addEventListener("keyup", function(e) {
                if (e.keyCode == 32) {
                    console.log(_this.inp.value, "内容")
                    axios("/shopping/selectlike" + "?data=" + _this.inp.value).then(function(data) {
                        console.log(data.data)
                        _this.addShoppingTypes(data.data);
                        //渲染完数据获取出现的内容进行操作
                        _this.bindChangeDetail();
                    }).catch(function(err) {
                        console.log(err, "报错信息")
                    })
                }
            })
        },
        //处理请求回来的数据的方法
        addShoppingTypes(data) {
            if (data.code == 0) {
                console.log()
                this.shopInpSearch.innerHTML = `<p>${data.wras}</p>`
            } else if (data.code == 1) {
                //渲染模糊搜索到的内容的方法,有两个,一个是热门搜索,一个是输入搜索
                this.shopInpSearch.innerHTML = this.modeSearch(data);
            }
        },
        //处理输入搜索的方法
        modeSearch(data) {
            return data.wras.map(element => {
                return `<li id="${element.uid}">${element.shopping_types}</li>`
            }).join("");
        },
        //点击渲染的商品类型跳转商品内容详情页
        bindChangeDetail() {
            //输入搜索渲染的内容
            let lisInput = document.querySelector(".shop-input-search li"),
                lisHot = document.querySelector(".shop-main-hot li");
            lisInput.addEventListener("touchend", function(e) {
                if (e.target.tagName == "LI") {
                    console.log(55)
                    location.href = "http://localhost:8844/html/detail.html?uid=" + e.target.id + "&page=1&count=6";
                }
            })
        }
    }

    function masks() {
        return new Masks();
    }
    return masks;
})