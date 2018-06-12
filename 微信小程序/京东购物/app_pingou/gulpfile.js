function e() {
    var e = !0, s = !1, n = void 0;
    try {
        for (var i, r = y[Symbol.iterator](); !(e = (i = r.next()).done); e = !0) {
            var t = i.value;
            try {
                o.copySync(t, t.substring(1, t.length)), console.log(("" + t).green + " copy success!");
            } catch (e) {
                console.error(p.red(e));
            }
        }
    } catch (e) {
        s = !0, n = e;
    } finally {
        try {
            !e && r.return && r.return();
        } finally {
            if (s) throw n;
        }
    }
}

function s() {
    o.copy("./h5jump.js", "./common/h5jump.js");
}

function n() {
    var e = o.readJsonSync("./app.json").pages, s = !0, n = !1, i = void 0;
    try {
        for (var p, r = e[Symbol.iterator](); !(s = (p = r.next()).done); s = !0) {
            var t = p.value;
            0 != t.indexOf("pages/pingou") && 0 != t.indexOf("pages/pay") && 0 != t.indexOf("pages/order") && y.push("../" + t.substring(0, t.lastIndexOf("/")));
        }
    } catch (e) {
        n = !0, i = e;
    } finally {
        try {
            !s && r.return && r.return();
        } finally {
            if (n) throw i;
        }
    }
}

require("path");

var o = require("fs-extra"), i = require("gulp"), p = require("colors"), r = require("gulp-uglify-es").default, t = require("gulp-imagemin"), a = require("gulp-strip-comments"), c = require("gulp-postcss"), u = require("../common/css_function.js"), m = require("../common/css_mixins.js"), l = require("../common/css_variables.js"), g = require("postcss-scss"), f = require("gulp-rename"), d = require("del"), _ = require("run-sequence"), y = [ "../api", "../assets", "../bases", "../behaviors", "../common", "../components", "../libs", "../models/coupon", "../models/my", "../models/pay", "../models/pingou", "../pages/cart/components/switch-promotions", "../pages/cart/common", "../pages/common", "../pages/item/common", "../pages/item/detail/detail.css", "../pages/item/detail/detail_api.js", "../pages/item/api.js", "../pages/item/item_bean.js", "../pages/pingou", "../pages/pingou_second", "../pages/penny", "../pages/pay", "../pages/pay_second", "../pages/order", "../pages/base.js", "../pages/component.js", "../pages/page.js", "../pages/components/button", "../pages/components/guessyoulike", "../pages/components/modal", "../pages/components/pinbind", "../pages/components/pinbindnew", "../pages/components/sku_panel", "../pages/components/review", "../pages/components/shop", "../pages/components/specific", "../pages/components/recommend-tuan", "../pages/specialpay/grouppay", "../app.css", "../global.js", "../pages/union/" ], j = [ require("postcss-strip-inline-comments"), require("postcss-mixins")({
    mixins: m
}), require("postcss-extend"), require("postcss-simple-vars")({
    variables: l
}), require("postcss-calc"), require("postcss-nested"), require("postcss-color-function"), require("postcss-functions")({
    functions: u
}) ];

i.task("_clean", function() {
    return d([ "./api", "./assets", "./bases", "./behaviors", "./common", "./components", "./libs", "./models", "./pages" ], {
        force: !0
    });
}), i.task("_cleanCss", function() {
    return d([ "**/*.css" ], {
        force: !0
    });
}), i.task("wxss", function(e) {
    return i.src("**/*.css").pipe(c(j, {
        syntax: g
    })).on("error", e).pipe(f(function(e) {
        e.extname = ".wxss";
    })).pipe(i.dest("./"));
}), i.task("pack", function() {
    n(), e(), s();
}), i.task("_minify_js", function() {
    return i.src([ "**/*.js", "!gulpfile.js", "!app.js", "!h5jump.js" ]).pipe(r({
        compress: !1,
        mangle: !1
    })).pipe(i.dest("./"));
}), i.task("_minify_wxss", function() {
    return i.src("{*,!(node_modules)/**/*}.wxss").pipe(i.dest("./"));
}), i.task("_minify_json", function() {
    return i.src("{!(package|package-lock|project.config),!(node_modules)/**/*, !(app)}.json").pipe(i.dest("./"));
}), i.task("_minify_image", function() {
    return i.src("{*,!(node_modules)/**/*}{.png,.jpg,.gif}").pipe(t()).pipe(i.dest("./"));
}), i.task("_minify_wxs", function() {
    return i.src("{*,!(node_modules)/**/*}.wxs").pipe(i.dest("./"));
}), i.task("_minify_wxml", function() {
    return i.src("{*,!(node_modules)/**/*}.wxml").pipe(a()).pipe(i.dest("./"));
}), i.task("default", function() {
    return _("_clean", "pack", "wxss", "_cleanCss", [ "_minify_js", "_minify_wxss", "_minify_json", "_minify_image", "_minify_wxs", "_minify_wxml" ]);
});