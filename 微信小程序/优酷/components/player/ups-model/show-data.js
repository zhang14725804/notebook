Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _defaultData = require("./default-data.js");

var _utils = require("./utils.js");

var _utils2 = _interopRequireDefault(_utils);

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

/**
 * 剧集数据重构
 */ var ShowData = function() {
    function ShowData(data) {
        _classCallCheck(this, ShowData);
        for (var key in _defaultData.DefaultShowData) {
            this["_" + key] = _defaultData.DefaultShowData[key];
            _utils2.default.defineGetter(this, key);
        }
        if (data) {
            this._resetShowData(data);
        }
    }
    /**
   * 重置专辑数据
   * @param {Object} data 播放服务返回
   */    _createClass(ShowData, [ {
        key: "_resetShowData",
        value: function _resetShowData(data) {
            if (data.hasOwnProperty("id")) {
                this._id = data.id;
            }
            if (data.hasOwnProperty("encodeid")) {
                this._encodeId = data.encodeid;
            }
            if (data.hasOwnProperty("title")) {
                this._title = data.title;
            }
            if (data.hasOwnProperty("show_thumburl_big_jpg")) {
                this._showCoverURL = data.show_thumburl_big_jpg;
            }
        }
    } ]);
    return ShowData;
}();

exports.default = ShowData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3ctZGF0YS5qcyJdLCJuYW1lcyI6WyJTaG93RGF0YSIsImRhdGEiLCJrZXkiLCJkZWZpbmVHZXR0ZXIiLCJfcmVzZXRTaG93RGF0YSIsImhhc093blByb3BlcnR5IiwiX2lkIiwiaWQiLCJfZW5jb2RlSWQiLCJlbmNvZGVpZCIsIl90aXRsZSIsInRpdGxlIiwiX3Nob3dDb3ZlclVSTCIsInNob3dfdGh1bWJ1cmxfYmlnX2pwZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFDQTs7O0lBR01BLFE7QUFDSixvQkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLLElBQU1DLEdBQVgsa0NBQW1DO0FBQ2pDLGlCQUFTQSxHQUFULElBQWtCLDZCQUFnQkEsR0FBaEIsQ0FBbEI7QUFDQSxzQkFBTUMsWUFBTixDQUFtQixJQUFuQixFQUF5QkQsR0FBekI7QUFDRDs7QUFFRCxRQUFJRCxJQUFKLEVBQVU7QUFDUixXQUFLRyxjQUFMLENBQW9CSCxJQUFwQjtBQUNEO0FBQ0Y7QUFDRDs7Ozs7Ozs7bUNBSWVBLEksRUFBTTtBQUNuQixVQUFJQSxLQUFLSSxjQUFMLENBQW9CLElBQXBCLENBQUosRUFBK0I7QUFDN0IsYUFBS0MsR0FBTCxHQUFXTCxLQUFLTSxFQUFoQjtBQUNEO0FBQ0QsVUFBSU4sS0FBS0ksY0FBTCxDQUFvQixVQUFwQixDQUFKLEVBQXFDO0FBQ25DLGFBQUtHLFNBQUwsR0FBaUJQLEtBQUtRLFFBQXRCO0FBQ0Q7QUFDRCxVQUFJUixLQUFLSSxjQUFMLENBQW9CLE9BQXBCLENBQUosRUFBa0M7QUFDaEMsYUFBS0ssTUFBTCxHQUFjVCxLQUFLVSxLQUFuQjtBQUNEO0FBQ0QsVUFBSVYsS0FBS0ksY0FBTCxDQUFvQix1QkFBcEIsQ0FBSixFQUFrRDtBQUNoRCxhQUFLTyxhQUFMLEdBQXFCWCxLQUFLWSxxQkFBMUI7QUFDRDtBQUNGOzs7Ozs7a0JBR1liLFEiLCJmaWxlIjoic2hvdy1kYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVmYXVsdFNob3dEYXRhIH0gZnJvbSAnLi9kZWZhdWx0LWRhdGEnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiDliafpm4bmlbDmja7ph43mnoRcbiAqL1xuY2xhc3MgU2hvd0RhdGEge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gRGVmYXVsdFNob3dEYXRhKSB7XG4gICAgICB0aGlzW2BfJHtrZXl9YF0gPSBEZWZhdWx0U2hvd0RhdGFba2V5XTtcbiAgICAgIFV0aWxzLmRlZmluZUdldHRlcih0aGlzLCBrZXkpO1xuICAgIH1cblxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLl9yZXNldFNob3dEYXRhKGRhdGEpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6YeN572u5LiT6L6R5pWw5o2uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOaSreaUvuacjeWKoei/lOWbnlxuICAgKi9cbiAgX3Jlc2V0U2hvd0RhdGEoZGF0YSkge1xuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICB0aGlzLl9pZCA9IGRhdGEuaWQ7XG4gICAgfVxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdlbmNvZGVpZCcpKSB7XG4gICAgICB0aGlzLl9lbmNvZGVJZCA9IGRhdGEuZW5jb2RlaWQ7XG4gICAgfVxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCd0aXRsZScpKSB7XG4gICAgICB0aGlzLl90aXRsZSA9IGRhdGEudGl0bGU7XG4gICAgfVxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdzaG93X3RodW1idXJsX2JpZ19qcGcnKSkge1xuICAgICAgdGhpcy5fc2hvd0NvdmVyVVJMID0gZGF0YS5zaG93X3RodW1idXJsX2JpZ19qcGc7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNob3dEYXRhO1xuIl19