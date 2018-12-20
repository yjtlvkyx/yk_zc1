let gulp = require("gulp"),
    sass = require("gulp-sass"),
    server = require("gulp-webserver"),
    babel = require("gulp-babel"),
    cleanCss = require("gulp-clean-css"),
    uglify = require("gulp-uglify");


//打包css
gulp.task("devSass", () => {
    return gulp.src("src/scss/*.scss")
        .pipe(sass()).pipe(cleanCss()).pipe(gulp.dest("src/css"));
})

//打包js
gulp.task("devJs", () => {
    return gulp.src("src/javascripts/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        })).pipe(uglify()).pipe(gulp.dest("src/js"));
})

//启动服务
gulp.task("server", () => {
    return gulp.src("src").pipe(server({
        port: 8844,
        proxies: [
            { source: "/shopping/selectall", target: "http://localhost:8024/shopping/selectall" },
            { source: "/shopping/selectlike", target: "http://localhost:8024/shopping/selectlike" },
            { source: "/shopping/selecthot", target: "http://localhost:8024/shopping/selecthot" },
            { source: "/shopping/selectdetail", target: "http://localhost:8024/shopping/selectdetail" },
        ]
    }))
})

//启动监听事件
gulp.task("watchSass", () => {
    return gulp.watch("src/scss/*.scss", gulp.series("devSass", "devJs", "server"))
})

//执行事件
gulp.task("default", gulp.series("devSass", "devJs", "server", "watchSass"))