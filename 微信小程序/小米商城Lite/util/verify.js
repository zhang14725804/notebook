function t(t, e) {
    return (t = new RegExp(t)).test(e);
}

module.exports = {
    isEmpty: function(t) {
        return "string" == typeof t && "" == t.trim();
    },
    checkPhoneNumber: function(e) {
        return !!t(/^1\d{10}$/, e);
    },
    checkMail: function(e) {
        return !!t(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, e);
    }
};