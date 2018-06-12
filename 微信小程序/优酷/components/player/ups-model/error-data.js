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
 * 错误数据重构
 */ var ErrorData = function() {
    function ErrorData(data) {
        _classCallCheck(this, ErrorData);
        for (var key in _defaultData.DefaultErrorData) {
            this["_" + key] = _defaultData.DefaultErrorData[key];
            _utils2.default.defineGetter(this, key);
        }
        if (data) {
            this._resetErrorData(data);
        }
    }
    /**
   * 重置专辑数据
   * @param {Object} data 播放服务返回
   */    _createClass(ErrorData, [ {
        key: "_resetErrorData",
        value: function _resetErrorData(data) {
            if (data.hasOwnProperty("code")) {
                this._code = data.code;
            }
            if (data.hasOwnProperty("link")) {
                this._link = data.link;
            }
            if (data.hasOwnProperty("note")) {
                this._note = data.note;
            }
        }
    } ]);
    return ErrorData;
}();

exports.default = ErrorData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9yLWRhdGEuanMiXSwibmFtZXMiOlsiRXJyb3JEYXRhIiwiZGF0YSIsImtleSIsImRlZmluZUdldHRlciIsIl9yZXNldEVycm9yRGF0YSIsImhhc093blByb3BlcnR5IiwiX2NvZGUiLCJjb2RlIiwiX2xpbmsiLCJsaW5rIiwiX25vdGUiLCJub3RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUNBOzs7SUFHTUEsUztBQUNKLHFCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUssSUFBTUMsR0FBWCxtQ0FBb0M7QUFDbEMsaUJBQVNBLEdBQVQsSUFBa0IsOEJBQWlCQSxHQUFqQixDQUFsQjtBQUNBLHNCQUFNQyxZQUFOLENBQW1CLElBQW5CLEVBQXlCRCxHQUF6QjtBQUNEOztBQUVELFFBQUlELElBQUosRUFBVTtBQUNSLFdBQUtHLGVBQUwsQ0FBcUJILElBQXJCO0FBQ0Q7QUFDRjtBQUNEOzs7Ozs7OztvQ0FJZ0JBLEksRUFBTTtBQUNwQixVQUFJQSxLQUFLSSxjQUFMLENBQW9CLE1BQXBCLENBQUosRUFBaUM7QUFDL0IsYUFBS0MsS0FBTCxHQUFhTCxLQUFLTSxJQUFsQjtBQUNEO0FBQ0QsVUFBSU4sS0FBS0ksY0FBTCxDQUFvQixNQUFwQixDQUFKLEVBQWlDO0FBQy9CLGFBQUtHLEtBQUwsR0FBYVAsS0FBS1EsSUFBbEI7QUFDRDtBQUNELFVBQUlSLEtBQUtJLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBSixFQUFpQztBQUMvQixhQUFLSyxLQUFMLEdBQWFULEtBQUtVLElBQWxCO0FBQ0Q7QUFDRjs7Ozs7O2tCQUdZWCxTIiwiZmlsZSI6ImVycm9yLWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0RXJyb3JEYXRhIH0gZnJvbSAnLi9kZWZhdWx0LWRhdGEnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiDplJnor6/mlbDmja7ph43mnoRcbiAqL1xuY2xhc3MgRXJyb3JEYXRhIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIERlZmF1bHRFcnJvckRhdGEpIHtcbiAgICAgIHRoaXNbYF8ke2tleX1gXSA9IERlZmF1bHRFcnJvckRhdGFba2V5XTtcbiAgICAgIFV0aWxzLmRlZmluZUdldHRlcih0aGlzLCBrZXkpO1xuICAgIH1cblxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLl9yZXNldEVycm9yRGF0YShkYXRhKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOmHjee9ruS4k+i+keaVsOaNrlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSDmkq3mlL7mnI3liqHov5Tlm55cbiAgICovXG4gIF9yZXNldEVycm9yRGF0YShkYXRhKSB7XG4gICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2NvZGUnKSkge1xuICAgICAgdGhpcy5fY29kZSA9IGRhdGEuY29kZTtcbiAgICB9XG4gICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2xpbmsnKSkge1xuICAgICAgdGhpcy5fbGluayA9IGRhdGEubGluaztcbiAgICB9XG4gICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ25vdGUnKSkge1xuICAgICAgdGhpcy5fbm90ZSA9IGRhdGEubm90ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JEYXRhO1xuIl19