function _classCallCheck(e, o) {
    if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var MessageStore = function e() {
    _classCallCheck(this, e), this.localUnknownOfflines = [], this.localUnknownComCount = 0, 
    this.localKnownComCount = 0, this.localReadComCount = 0;
}, messageStore = new MessageStore();

exports.default = messageStore;