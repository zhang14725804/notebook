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

var _wepy = require("./../../npm/wepy/lib/wepy.js");

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

var update = function(_wepy$component) {
    _inherits(update, _wepy$component);
    function update() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, update);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = update.__proto__ || Object.getPrototypeOf(update)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.data = {
            circleClass: null,
            showCircleAnim: false
        }, _this.props = {
            componentId: String
        }, _this.methods = {
            addAnim: function addAnim(componentId) {
                this.$emit("UPDATE_COMPONENT", {
                    componentId: componentId
                });
                var self = this;
                var clearTime = void 0;
                if (!this.showCircleAnim) {
                    clearTimeout(clearTime);
                    this.circleClass = "acircle";
                    clearTime = setTimeout(function() {
                        self.circleClass = "";
                        self.$apply();
                    }, 600);
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(update, [ {
        key: "onLoad",
        value: function onLoad() {}
    } ]);
    return update;
}(_wepy2.default.component);

exports.default = update;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJ1cGRhdGUiLCJkYXRhIiwiY2lyY2xlQ2xhc3MiLCJzaG93Q2lyY2xlQW5pbSIsInByb3BzIiwiY29tcG9uZW50SWQiLCJTdHJpbmciLCJtZXRob2RzIiwiYWRkQW5pbSIsIiRlbWl0Iiwic2VsZiIsImNsZWFyVGltZSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCIkYXBwbHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSSxHQUFPO0FBQ0xDLG1CQUFhLElBRFI7QUFFTEMsc0JBQWdCO0FBRlgsSyxRQUlQQyxLLEdBQVE7QUFDTkMsbUJBQWFDO0FBRFAsSyxRQUdSQyxPLEdBQVU7QUFDUkMsYUFEUSxtQkFDQUgsV0FEQSxFQUNhO0FBQ25CLGFBQUtJLEtBQUwsQ0FBVyxrQkFBWCxFQUErQixFQUFFSixhQUFhQSxXQUFmLEVBQS9CO0FBQ0EsWUFBTUssT0FBTyxJQUFiO0FBQ0EsWUFBSUMsa0JBQUo7QUFDQSxZQUFJLENBQUMsS0FBS1IsY0FBVixFQUEwQjtBQUN4QlMsdUJBQWFELFNBQWI7QUFDQSxlQUFLVCxXQUFMLEdBQW1CLFNBQW5CO0FBQ0FTLHNCQUFZRSxXQUFXLFlBQVc7QUFDaENILGlCQUFLUixXQUFMLEdBQW1CLEVBQW5CO0FBQ0FRLGlCQUFLSSxNQUFMO0FBQ0QsV0FIVyxFQUdULEdBSFMsQ0FBWjtBQUlEO0FBQ0Y7QUFiTyxLOzs7Ozs2QkFlRCxDQUFFOzs7O0VBdkJ1QixlQUFLQyxTOztrQkFBcEJmLE0iLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdXBkYXRlIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBkYXRhID0ge1xuICAgIGNpcmNsZUNsYXNzOiBudWxsLFxuICAgIHNob3dDaXJjbGVBbmltOiBmYWxzZVxuICB9O1xuICBwcm9wcyA9IHtcbiAgICBjb21wb25lbnRJZDogU3RyaW5nXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgYWRkQW5pbShjb21wb25lbnRJZCkge1xuICAgICAgdGhpcy4kZW1pdCgnVVBEQVRFX0NPTVBPTkVOVCcsIHsgY29tcG9uZW50SWQ6IGNvbXBvbmVudElkIH0pO1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgY2xlYXJUaW1lO1xuICAgICAgaWYgKCF0aGlzLnNob3dDaXJjbGVBbmltKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChjbGVhclRpbWUpO1xuICAgICAgICB0aGlzLmNpcmNsZUNsYXNzID0gJ2FjaXJjbGUnO1xuICAgICAgICBjbGVhclRpbWUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuY2lyY2xlQ2xhc3MgPSAnJztcbiAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICB9LCA2MDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgb25Mb2FkKCkge31cbn1cbiJdfQ==