module.exports = function(t) {
    if ("string" != typeof t) return t;
    t && (t = t.trim());
    t && /^(data|QZOutputJson)=/.test(t) && (t = t.replace(/^(data|QZOutputJson)=/, "").replace(/;?$/, ""));
    try {
        return JSON.parse(t);
    } catch (t) {
        throw new Error("parse jsonp body failed");
    }
};