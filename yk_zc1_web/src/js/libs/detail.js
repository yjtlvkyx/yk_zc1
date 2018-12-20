require(["../js/common/config.js"], function() {
    require(["axios", "bscroll"], function(axios, bscroll) {
        // let mainDetail = new bscroll(".main", {
        //     pullDownRefresh: {
        //         threshold: 50,
        //         stop: 50
        //     },
        //     pullUpLoad: {
        //         threshold: 50,
        //         stop: 50
        //     }
        // })
        // console.log(mainDetail)

        //构造函数用来渲染数据和刷新数据
        function Detail() {
            this.mainDetail = document.querySelector(".main-detail");
            this.headerTabs = document.querySelector(".tabs");
            this.type = null;
            this.page = 1;
            this.init();
        }

        //详情页的页面方法集合
        Detail.prototype = {
            constructor: Detail,
            //方法初始化
            init() {
                this.dataAxios("/shopping/selectdetail" + location.search + "&type=" + this.type);
                this.bindTypes();
                this.bscrollLoading();
                // this.bindTypes();
            },
            //请求数据
            dataAxios(url) {
                let _this = this;
                axios(url).then(function(data) {
                    let datas = data.data;
                    console.log(datas)
                    if (datas.code == 1) {
                        if (_this.page == 1) {
                            _this.mainDetail.innerHTML = _this.addShopping(datas.wras);
                        } else {
                            _this.mainDetail.innerHTML += _this.addShopping(datas.wras);
                        }
                    }
                })
            },
            //渲染数据的方法
            addShopping(data) {

                return data.map(element => {
                    return `<dl cid="${element.cid}">
                                <dt><img src="http://localhost:8024/images${element.imgsrc}" alt=""></dt>
                                <dd>
                                    <p class="description">${element.description}</p>
                                    <p><span class="price">$${element.price}</span><span class="sale">月销量${element.sale}.0万件</span><span class="credit">信用等级${element.credit}</span><i class="iconfont icon-gengduo"></i></p>
                                </dd>
                            </dl>`
                }).join("");
            },
            //点击切换类型,排序的标的
            bindTypes() {
                let _this = this;
                this.headerTabs.onclick = function(e) {
                    if (_this.hasClass(e.target, "all") || _this.hasClass(e.target, "changes")) {
                        _this.dataAxios("/shopping/selectdetail" + location.search + "&type=null");
                    } else {
                        console.log(e.target)
                        _this.type = e.target.id;
                        _this.dataAxios("/shopping/selectdetail" + location.search + "&type=" + _this.type + "&page=1&count=6");
                    }
                }
            },
            //判断元素是否有某个类名
            hasClass(ele, type) {
                console.log(ele.className.split(" "));
                ele.className.split(" ").some(element => {
                    if (type == element) {
                        return true;
                    } else {
                        return false;
                    }
                })
            },
            bscrollLoading() {
                let _this = this;
                let bscrolls = new bscroll(".main", {
                    pullDownRefresh: {
                        threshold: 50,
                        stop: 50
                    },
                    pullUpLoad: {
                        threshold: 50,
                        stop: 50
                    },
                    probetype: 2
                });

                bscrolls.on("pullingUp", () => {
                    console.log(44);
                    _this.page++;
                    setTimeout(() => {
                        _this.dataAxios("/shopping/selectdetail" + location.search + "&type=" + _this.type + "&page=" + _this.page);
                        bscrolls.refresh();
                        bscrolls.finishPullUp();
                    }, 2000);
                })
                bscrolls.on("pullingDown", () => {
                    console.log(55);
                    _this.page = 1;
                    _this.dataAxios("/shopping/selectdetail" + location.search + "&type=" + _this.type + "&page=" + _this.page);
                    bscrolls.refresh();
                    bscrolls.finishPullDown();
                })
            }
        }

        //实例化
        new Detail();
    })
})