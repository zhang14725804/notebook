Component({
    properties: {
        datas: {
            type: Object,
            value: {}
        },
        visible: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        pjActive: "全部项目",
        parentId: "",
        spName: ""
    },
    methods: {
        onClose: function() {
            this.setData({
                visible: !1
            }), this.triggerEvent("closeProject");
        },
        onTapClassA: function(t) {
            var e = t.currentTarget.dataset;
            if (this.setData({
                pjActive: e.name,
                spName: "all"
            }), "全部项目" != e.name && this.setData({
                parentId: e.data.Id,
                spName: e.data.SpellName
            }), "全部项目" == e.name) return this.triggerEvent("changeProject", {
                id: "",
                name: "全部项目",
                SpellName: "all"
            }), this.setData({
                childs: [],
                visible: !1,
                parentId: ""
            });
            e.data && this.setData({
                childs: e.data.Childs
            });
        },
        tapAll: function(t) {
            var e = t.currentTarget.dataset.id;
            return this.setData({
                visible: !1
            }), this.triggerEvent("changeProject", {
                id: e,
                name: this.data.pjActive,
                SpellName: this.data.spName
            });
        },
        onTapClassB: function(t) {
            var e = t.currentTarget.dataset.data;
            return this.setData({
                visible: !1
            }), this.triggerEvent("changeProject", {
                id: e.Id,
                name: e.Name,
                SpellName: e.SpellName
            });
        }
    }
});