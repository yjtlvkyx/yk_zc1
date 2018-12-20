require(["./js/common/config.js"], () => {
    require(["shopMasks", "vue", "axios"], (masks, Vue, axios) => {
        console.log(Vue)


        //随便调用一下 遮罩层的内容
        masks();
    })
})