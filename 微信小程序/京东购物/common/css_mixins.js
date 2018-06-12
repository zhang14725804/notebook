module.exports = {
    arrow: function(t, o) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "#666", e = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "8px", i = {
            content: '" "',
            display: "block",
            width: e,
            height: e,
            "border-top": "1px solid " + r,
            "border-left": "1px solid " + r,
            "transform-origin": "50%"
        };
        return "top" == o && (i.transform = "rotate(45deg)"), "bottom" == o && (i.transform = "rotate(-135deg)"), 
        "left" == o && (i.transform = "rotate(-45deg)"), "right" == o && (i.transform = "rotate(135deg)"), 
        i;
    },
    border: function(t) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "full", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "#e5e5e5", e = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, i = {
            content: '" "',
            position: "absolute",
            "z-index": 1,
            "pointer-events": "none",
            "background-color": r
        };
        return "top" == o && (i.height = "1px", i.left = 0, i.right = 0, i.top = 0), "bottom" == o && (i.height = "1px", 
        i.left = 0, i.right = 0, i.bottom = 0), "left" == o && (i.width = "1px", i.left = 0, 
        i.top = 0, i.bottom = 0), "right" == o && (i.width = "1px", i.right = 0, i.top = 0, 
        i.bottom = 0), "full" == o && (i.border = "1px solid #ddd", i.left = 0, i.right = 0, 
        i.top = 0, i.bottom = 0, i.background = "none", i["border-color"] = r, 0 != e && (i[" border-radius"] = e)), 
        i;
    }
};