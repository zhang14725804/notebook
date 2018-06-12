function e(e) {
    for (var t = {}, r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
    return t;
}

function t(e) {
    return e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "");
}

function r(e) {
    return e.replace(/\n+/g, "").replace(/<!--.*?-->/gi, "").replace(/\/\*.*?\*\//gi, "").replace(/[ ]+</gi, "<");
}

function s(e) {
    var t = [];
    if (0 == n.length || !i) return (d = {}).node = "text", d.text = e, s = [ d ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var r = new RegExp("[:]"), s = e.split(r), a = 0; a < s.length; a++) {
        var l = s[a], d = {};
        i[l] ? (d.node = "element", d.tag = "emoji", d.text = i[l], d.baseSrc = o) : (d.node = "text", 
        d.text = l), t.push(d);
    }
    return t;
}

var a = "https", n = "", o = "", i = {}, l = require("./wxDiscode.js"), d = require("./htmlparser.js"), c = (e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
e("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), u = e("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), p = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
e("wxxxcode-style,script,style,view,scroll-view,block");

module.exports = {
    html2json: function(e, n, o) {
        e = r(e = t(e)), e = (e = l.strDiscode(e)).replace(/\B\s*=\s*(""|'')/g, "");
        var i = [], g = {
            node: n,
            nodes: [],
            images: [],
            imageUrls: []
        }, m = 0;
        return d(e, {
            start: function(e, t, r) {
                var s = {
                    node: "element",
                    tag: e
                };
                if (0 === i.length ? (s.index = m.toString(), m += 1) : (void 0 === (b = i[0]).nodes && (b.nodes = []), 
                s.index = b.index + "." + b.nodes.length), c[e] ? s.tagType = "block" : u[e] ? s.tagType = "inline" : p[e] && (s.tagType = "closeSelf"), 
                0 !== t.length && (s.attr = t.reduce(function(e, t) {
                    var r = t.name, a = t.value;
                    return "class" == r && (console.dir(a), s.classStr = a), "style" == r && (s.styleStr = a), 
                    a.match(/ /) && (a = a.split(" ")), e[r] ? Array.isArray(e[r]) ? e[r].push(a) : e[r] = [ e[r], a ] : e[r] = a, 
                    e;
                }, {})), "img" === s.tag) {
                    s.imgIndex = g.images.length;
                    var d = s.attr.src;
                    "" == d[0] && d.splice(0, 1), d = l.urlToHttpUrl(d, a), s.attr.src = d, s.from = n, 
                    s.useScale = o, g.images.push(s), g.imageUrls.push(d);
                }
                if ("font" === s.tag) {
                    var f = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], h = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    s.attr.style || (s.attr.style = []), s.styleStr || (s.styleStr = "");
                    for (var v in h) if (s.attr[v]) {
                        var x = "size" === v ? f[s.attr[v] - 1] : s.attr[v];
                        s.attr.style.push(h[v]), s.attr.style.push(x), s.styleStr += h[v] + ": " + x + ";";
                    }
                }
                if ("source" === s.tag && (g.source = s.attr.src), r) {
                    var b = i[0] || g;
                    void 0 === b.nodes && (b.nodes = []), b.nodes.push(s);
                } else i.unshift(s);
            },
            end: function(e) {
                var t = i.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && g.source && (t.attr.src = g.source, 
                delete result.source), 0 === i.length) g.nodes.push(t); else {
                    var r = i[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e,
                    textArray: s(e)
                };
                if (0 === i.length) g.nodes.push(t); else {
                    var r = i[0];
                    void 0 === r.nodes && (r.nodes = []), t.index = r.index + "." + r.nodes.length, 
                    r.nodes.push(t);
                }
            },
            comment: function(e) {}
        }), g;
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", r = arguments[2];
        n = e, o = t, i = r;
    }
};