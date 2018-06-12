function e(e) {
    var t = [];
    return e.forEach(function(e) {
        e.tagName;
        t.push(n(e));
    }), t.join("");
}

function n(n) {
    switch (n.tagName) {
      case "view":
        return "<view " + n.props.attribute + " >" + (n.children ? e(n.children) : "") + "</view>";

      case "image":
        return "<image " + n.props.attribute + "></image>";

      case "text":
        return "<text " + n.props.attribute + ">" + n.props.text + "</text>";

      case "input":
        return "<input  " + n.props.attribute + " auto-focus/>";

      case "button":
        return "<button " + n.props.attribute + ">" + n.props.text + "</button>";
    }
}

var t = require("fs"), r = (require("path"), ""), i = "";

t.readFile(__dirname + "/view.json", {
    flag: "r+",
    encoding: "utf8"
}, function(e, n) {
    e ? console.error(e) : JSON.parse(n).view.forEach(function(e) {
        o(e);
    });
}), t.watchFile("./view.json", function(e, n) {
    console.log("json有变化就执行"), t.readFile(__dirname + "/view.json", {
        flag: "r+",
        encoding: "utf8"
    }, function(e, n) {
        e ? console.error(e) : (r = "", i = "", s = [], s = JSON.parse(n), s.view.forEach(function(e) {
            o(e);
        }));
    });
});

var o = function(e) {
    e.tagName;
    r += n(e), i = "<view class=\"container\" >\n                <dialog id='dialog'\n                  title='q标题'\n                  content='我是小程序组件'\n                  cancelText='知道了'\n                  confirm='谢谢你'\n                  bind:cancelEvent=\"_cancel\"\n                  bind:confirmEvent=\"_confirm\">\n                </dialog>" + r + "</view>", 
    console.log(i), t.writeFile(__dirname + "/index.wxml", i, "utf8", function(e) {
        e ? console.error(e) : console.log("写入成功");
    });
};