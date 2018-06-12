Component({
    options: {
        multipleSlots: !0
    },
    relations: {
        "./jdText": {
            type: "child",
            linked: function(n) {},
            linkChanged: function(n) {},
            unlinked: function(n) {}
        },
        "./jdImage": {
            type: "child",
            linked: function(n) {},
            linkChanged: function(n) {},
            unlinked: function(n) {}
        },
        "./jdLine": {
            type: "child",
            linked: function(n) {},
            linkChanged: function(n) {},
            unlinked: function(n) {}
        },
        "./jdList": {
            type: "child",
            linked: function(n) {},
            linkChanged: function(n) {},
            unlinked: function(n) {}
        },
        "./jdSlider": {
            type: "child",
            linked: function(n) {},
            linkChanged: function(n) {},
            unlinked: function(n) {}
        },
        "./jdGrid": {
            type: "child",
            linked: function(n) {},
            linkChanged: function(n) {},
            unlinked: function(n) {}
        },
        "./jdContainer": {
            type: "child",
            linked: function(n) {},
            linkChanged: function(n) {},
            unlinked: function(n) {}
        }
    },
    properties: {
        thirdTemplates: {
            type: Object,
            value: ""
        }
    },
    attached: function() {
        this._initData();
    },
    data: {},
    methods: {
        _initData: function() {
            this.properties.thirdTemplates;
        },
        didClickFloorItem: function(n) {
            var i = {
                item: n
            }, t = {
                bubbles: !0,
                composed: !0
            };
            this.triggerEvent("clickTemplateItem", i, t);
        }
    }
});