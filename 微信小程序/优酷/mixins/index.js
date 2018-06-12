Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Mixin = function(_wepy$mixin) {
    _inherits(Mixin, _wepy$mixin);
    function Mixin() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Mixin);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mixin.__proto__ || Object.getPrototypeOf(Mixin)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.data = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Mixin, [ {
        key: "escape2Html",
        // 将特殊字符转成普通字符
        value: function escape2Html(str) {
            var arrEntities = {
                lt: "<",
                gt: ">",
                nbsp: " ",
                amp: "&",
                quot: '"'
            };
            return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
                return arrEntities[t];
            });
        }
        // 获取字符串长度
        }, {
        key: "getObjLength",
        value: function getObjLength(o) {
            var objLength = 0;
            for (var i in o) {
                objLength++;
            }
            return objLength;
        }
    } ]);
    return Mixin;
}(_wepy2.default.mixin);

exports.default = Mixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk1peGluIiwiZGF0YSIsIm1ldGhvZHMiLCJzdHIiLCJhcnJFbnRpdGllcyIsInJlcGxhY2UiLCJhbGwiLCJ0IiwibyIsIm9iakxlbmd0aCIsImkiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxJLEdBQU8sRSxRQUVQQyxPLEdBQVUsRTs7Ozs7OztBQUdWO2dDQUNZQyxHLEVBQUs7QUFDZixVQUFNQyxjQUFZLEVBQUMsTUFBSyxHQUFOLEVBQVUsTUFBSyxHQUFmLEVBQW1CLFFBQU8sR0FBMUIsRUFBOEIsT0FBTSxHQUFwQyxFQUF3QyxRQUFPLEdBQS9DLEVBQWxCO0FBQ0EsYUFBT0QsSUFBSUUsT0FBSixDQUFZLDJCQUFaLEVBQXdDLFVBQVNDLEdBQVQsRUFBYUMsQ0FBYixFQUFlO0FBQUMsZUFBT0gsWUFBWUcsQ0FBWixDQUFQO0FBQXVCLE9BQS9FLENBQVA7QUFDRDs7QUFFRDs7OztpQ0FDYUMsQyxFQUFHO0FBQ2QsVUFBSUMsWUFBWSxDQUFoQjtBQUNBLFdBQUssSUFBSUMsQ0FBVCxJQUFjRixDQUFkLEVBQWlCO0FBQ2ZDO0FBQ0Q7QUFDRCxhQUFPQSxTQUFQO0FBQ0Q7Ozs7RUFuQmdDLGVBQUtFLEs7O2tCQUFuQlgsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xyXG4gIGRhdGEgPSB7XHJcbiAgfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgfVxyXG5cclxuICAvLyDlsIbnibnmrorlrZfnrKbovazmiJDmma7pgJrlrZfnrKZcclxuICBlc2NhcGUySHRtbChzdHIpIHtcclxuICAgIGNvbnN0IGFyckVudGl0aWVzPXsnbHQnOic8JywnZ3QnOic+JywnbmJzcCc6JyAnLCdhbXAnOicmJywncXVvdCc6J1wiJ307XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYobHR8Z3R8bmJzcHxhbXB8cXVvdCk7L2lnLGZ1bmN0aW9uKGFsbCx0KXtyZXR1cm4gYXJyRW50aXRpZXNbdF07fSk7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIOiOt+WPluWtl+espuS4sumVv+W6plxyXG4gIGdldE9iakxlbmd0aChvKSB7XHJcbiAgICBsZXQgb2JqTGVuZ3RoID0gMFxyXG4gICAgZm9yIChsZXQgaSBpbiBvKSB7XHJcbiAgICAgIG9iakxlbmd0aCsrXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqTGVuZ3RoXHJcbiAgfVxyXG59XHJcbiJdfQ==