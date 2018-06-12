Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

var _wepy = require("./../../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _mixins = require("./../../mixins/index.js");

var _mixins2 = _interopRequireDefault(_mixins);

var _defaultData = require("./../../config/default-data.js");

var _defaultData2 = _interopRequireDefault(_defaultData);

var _API = require("./../../API/index.js");

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

var swiperLayer = function(_wepy$component) {
    _inherits(swiperLayer, _wepy$component);
    function swiperLayer() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, swiperLayer);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = swiperLayer.__proto__ || Object.getPrototypeOf(swiperLayer)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            CompontentData: Object
        }, _this.mixins = [ _mixins2.default ], _this.data = {
            indicatorDots: true,
            autoplay: false,
            interval: 3e3,
            duration: 1e3,
            indicatorColor: "rgba(255, 255, 255, 0.14)",
            indicatorActiveColor: "rgba(255, 255, 255, 0.8)",
            referSpm: ""
        }, _this.methods = {
            jumpToPlay: function jumpToPlay(data) {
                this.$emit("NavigateToPlay", data);
            },
            onSlideChangeEnd: function onSlideChangeEnd(CompontentData, e) {
                var _index = parseInt(e.detail.current);
                var _spmConfig = _defaultData2.default.SPM_CONFIG.index;
                // 发送模块日志
                                var _data = {};
                var _modules = CompontentData[_index];
                _data.title = _modules.title;
                _data.url = _spmConfig.page;
                _data.spm = _modules.spm;
                _data.referUrl = _spmConfig.page;
                _data.referSpm = this.referSpm;
                this.referSpm = _data.spm;
                (0, _API.sendGoldLog)(_data);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return swiperLayer;
}(_wepy2.default.component);

exports.default = swiperLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlckxheWVyLmpzIl0sIm5hbWVzIjpbInN3aXBlckxheWVyIiwicHJvcHMiLCJDb21wb250ZW50RGF0YSIsIk9iamVjdCIsIm1peGlucyIsImRhdGEiLCJpbmRpY2F0b3JEb3RzIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiaW5kaWNhdG9yQ29sb3IiLCJpbmRpY2F0b3JBY3RpdmVDb2xvciIsInJlZmVyU3BtIiwibWV0aG9kcyIsImp1bXBUb1BsYXkiLCIkZW1pdCIsIm9uU2xpZGVDaGFuZ2VFbmQiLCJlIiwiX2luZGV4IiwicGFyc2VJbnQiLCJkZXRhaWwiLCJjdXJyZW50IiwiX3NwbUNvbmZpZyIsIlNQTV9DT05GSUciLCJpbmRleCIsIl9kYXRhIiwiX21vZHVsZXMiLCJ0aXRsZSIsInVybCIsInBhZ2UiLCJzcG0iLCJyZWZlclVybCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLEssR0FBUTtBQUNOQyxzQkFBZ0JDO0FBRFYsSyxRQUdSQyxNLEdBQVMsa0IsUUFFVEMsSSxHQUFPO0FBQ0xDLHFCQUFlLElBRFY7QUFFTEMsZ0JBQVUsS0FGTDtBQUdMQyxnQkFBVSxJQUhMO0FBSUxDLGdCQUFVLElBSkw7QUFLTEMsaURBTEs7QUFNTEMsc0RBTks7QUFPTEMsZ0JBQVU7QUFQTCxLLFFBU1BDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR1QsSUFESCxFQUNTO0FBQ2YsYUFBS1UsS0FBTCxDQUFXLGdCQUFYLEVBQTZCVixJQUE3QjtBQUNELE9BSE87QUFJUlcsc0JBSlEsNEJBSVNkLGNBSlQsRUFJeUJlLENBSnpCLEVBSTRCO0FBQ2xDLFlBQU1DLFNBQVNDLFNBQVNGLEVBQUVHLE1BQUYsQ0FBU0MsT0FBbEIsQ0FBZjtBQUNBLFlBQU1DLGFBQWEsc0JBQWFDLFVBQWIsQ0FBd0JDLEtBQTNDOztBQUVBO0FBQ0EsWUFBTUMsUUFBUSxFQUFkO0FBQ0EsWUFBTUMsV0FBV3hCLGVBQWVnQixNQUFmLENBQWpCO0FBQ0FPLGNBQU1FLEtBQU4sR0FBY0QsU0FBU0MsS0FBdkI7QUFDQUYsY0FBTUcsR0FBTixHQUFZTixXQUFXTyxJQUF2QjtBQUNBSixjQUFNSyxHQUFOLEdBQVlKLFNBQVNJLEdBQXJCO0FBQ0FMLGNBQU1NLFFBQU4sR0FBaUJULFdBQVdPLElBQTVCO0FBQ0FKLGNBQU1iLFFBQU4sR0FBaUIsS0FBS0EsUUFBdEI7QUFDQSxhQUFLQSxRQUFMLEdBQWdCYSxNQUFNSyxHQUF0QjtBQUNBLDhCQUFZTCxLQUFaO0FBQ0Q7QUFsQk8sSzs7OztFQWY2QixlQUFLTyxTOztrQkFBekJoQyxXIiwiZmlsZSI6InN3aXBlckxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBtaXhpbiBmcm9tICdAL21peGlucyc7XG5pbXBvcnQgREVGQVVMVF9EQVRBIGZyb20gJ0AvY29uZmlnL2RlZmF1bHQtZGF0YSc7XG5pbXBvcnQgeyBzZW5kR29sZExvZyB9IGZyb20gJ0AvQVBJLyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzd2lwZXJMYXllciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgQ29tcG9udGVudERhdGE6IE9iamVjdFxuICB9O1xuICBtaXhpbnMgPSBbbWl4aW5dO1xuXG4gIGRhdGEgPSB7XG4gICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgaW50ZXJ2YWw6IDMwMDAsXG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgaW5kaWNhdG9yQ29sb3I6IGByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTQpYCxcbiAgICBpbmRpY2F0b3JBY3RpdmVDb2xvcjogYHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KWAsXG4gICAgcmVmZXJTcG06ICcnXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAganVtcFRvUGxheShkYXRhKSB7XG4gICAgICB0aGlzLiRlbWl0KCdOYXZpZ2F0ZVRvUGxheScsIGRhdGEpO1xuICAgIH0sXG4gICAgb25TbGlkZUNoYW5nZUVuZChDb21wb250ZW50RGF0YSwgZSkge1xuICAgICAgY29uc3QgX2luZGV4ID0gcGFyc2VJbnQoZS5kZXRhaWwuY3VycmVudCk7XG4gICAgICBjb25zdCBfc3BtQ29uZmlnID0gREVGQVVMVF9EQVRBLlNQTV9DT05GSUcuaW5kZXg7XG5cbiAgICAgIC8vIOWPkemAgeaooeWdl+aXpeW/l1xuICAgICAgY29uc3QgX2RhdGEgPSB7fTtcbiAgICAgIGNvbnN0IF9tb2R1bGVzID0gQ29tcG9udGVudERhdGFbX2luZGV4XTtcbiAgICAgIF9kYXRhLnRpdGxlID0gX21vZHVsZXMudGl0bGU7XG4gICAgICBfZGF0YS51cmwgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgICBfZGF0YS5zcG0gPSBfbW9kdWxlcy5zcG07XG4gICAgICBfZGF0YS5yZWZlclVybCA9IF9zcG1Db25maWcucGFnZTtcbiAgICAgIF9kYXRhLnJlZmVyU3BtID0gdGhpcy5yZWZlclNwbTtcbiAgICAgIHRoaXMucmVmZXJTcG0gPSBfZGF0YS5zcG07XG4gICAgICBzZW5kR29sZExvZyhfZGF0YSk7XG4gICAgfVxuICB9O1xufVxuIl19