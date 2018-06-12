getApp();

Page({
    data: {
        piwikSource: "",
        imagePath: getApp().globalData.imagePath,
        phonetype: "我是iphone机主",
        radioValues: [ {
            value: "我是iphone机主",
            labelClass: "selected"
        }, {
            value: "我是Android机主",
            labelClass: ""
        } ]
    },
    handleOnTapRadio: function(a) {
        var e = this, l = a.target.dataset.index, t = e.data.radioValues[l].value;
        e.data.radioValues.forEach(function(a, e) {
            a.labelClass = "";
        }), e.data.radioValues[l].labelClass = "selected", e.setData({
            phonetype: t,
            radioValues: e.data.radioValues
        });
    }
});