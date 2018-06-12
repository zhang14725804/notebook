var t = require("../../../../bases/component"), s = require("../../detail/detail_api");

new t({
    properties: {
        skuId: String
    },
    data: {
        answerList: []
    },
    ready: function() {
        var t = this.data.skuId;
        this.init(t);
    },
    methods: {
        init: function(t) {
            var i = this;
            console.log("查看类目id"), console.log(t), s.getAnswerList(t).then(function(t) {
                var s = t;
                i.setData({
                    answerList: s
                });
            });
        },
        gotoAnswerList: function() {
            var t = "https://wqs.jd.com/faqs/index.html?productId=" + this.data.skuId;
            this.$goto("/pages/h5/index", {
                url: t
            }), this.$report("DETAIL_ANSWER_LIST");
        }
    }
});