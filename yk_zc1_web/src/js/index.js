require(["./js/libs/config.js"], () => {
    require(["vue"], (Vue) => {
        console.log(Vue)

        //商品种类选择遮罩层的出现及消失
        let search = document.querySelector(".search"),
            shoppingMask = document.querySelector(".shopping-search-mask"),
            shopHeaderBack = document.querySelector(".shop-header"),
            shopMask = document.querySelector(".shop-header .ret");
        search.addEventListener("touchend", (e) => {
            shoppingMask.style.display = "block";
        });
        shopMask.addEventListener("touchend", () => {
            shoppingMask.style.display = "none";
        })

    })
})