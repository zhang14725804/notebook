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
 * 试看数据
 */ var TrialData = function() {
    function TrialData(data) {
        _classCallCheck(this, TrialData);
        for (var key in _defaultData.DefaultTrialData) {
            this["_" + key] = _defaultData.DefaultTrialData[key];
            _utils2.default.defineGetter(this, key);
        }
        if (data) {
            this._resetTrialData(data);
        }
    }
    /**
   * 重置专辑数据
   * @param {Object} data 播放服务返回
   */    _createClass(TrialData, [ {
        key: "_resetTrialData",
        value: function _resetTrialData(data) {
            var _time = 0;
            if (data.hasOwnProperty("type")) {
                this._type = data.type;
            }
            if (data.hasOwnProperty("note")) {
                this._note = data.note;
            }
            switch (this._type) {
              case "episodes":
              case "cannot":
                _time = 0;
                break;

              case "time":
              case "subscribe":
              case "h5":
              case "zhuanti":
                if (data.hasOwnProperty("time")) {
                    _time = data.time;
                }
                break;

              default:
                _time = 0;
                break;
            }
            this._time = _time;
        }
    } ]);
    return TrialData;
}();

exports.default = TrialData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyaWFsLWRhdGEuanMiXSwibmFtZXMiOlsiVHJpYWxEYXRhIiwiZGF0YSIsImtleSIsImRlZmluZUdldHRlciIsIl9yZXNldFRyaWFsRGF0YSIsIl90aW1lIiwiaGFzT3duUHJvcGVydHkiLCJfdHlwZSIsInR5cGUiLCJfbm90ZSIsIm5vdGUiLCJ0aW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUNBOzs7SUFHTUEsUztBQUNKLHFCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUssSUFBTUMsR0FBWCxtQ0FBb0M7QUFDbEMsaUJBQVNBLEdBQVQsSUFBa0IsOEJBQWlCQSxHQUFqQixDQUFsQjtBQUNBLHNCQUFNQyxZQUFOLENBQW1CLElBQW5CLEVBQXlCRCxHQUF6QjtBQUNEOztBQUVELFFBQUlELElBQUosRUFBVTtBQUNSLFdBQUtHLGVBQUwsQ0FBcUJILElBQXJCO0FBQ0Q7QUFDRjtBQUNEOzs7Ozs7OztvQ0FJZ0JBLEksRUFBTTtBQUNwQixVQUFJSSxRQUFRLENBQVo7QUFDQSxVQUFJSixLQUFLSyxjQUFMLENBQW9CLE1BQXBCLENBQUosRUFBaUM7QUFDL0IsYUFBS0MsS0FBTCxHQUFhTixLQUFLTyxJQUFsQjtBQUNEO0FBQ0QsVUFBSVAsS0FBS0ssY0FBTCxDQUFvQixNQUFwQixDQUFKLEVBQWlDO0FBQy9CLGFBQUtHLEtBQUwsR0FBYVIsS0FBS1MsSUFBbEI7QUFDRDs7QUFFRCxjQUFRLEtBQUtILEtBQWI7QUFDRSxhQUFLLFVBQUw7QUFDQSxhQUFLLFFBQUw7QUFDRUYsa0JBQVEsQ0FBUjtBQUNBO0FBQ0YsYUFBSyxNQUFMO0FBQ0EsYUFBSyxXQUFMO0FBQ0EsYUFBSyxJQUFMO0FBQ0EsYUFBSyxTQUFMO0FBQ0UsY0FBSUosS0FBS0ssY0FBTCxDQUFvQixNQUFwQixDQUFKLEVBQWlDO0FBQy9CRCxvQkFBUUosS0FBS1UsSUFBYjtBQUNEO0FBQ0Q7QUFDRjtBQUNFTixrQkFBUSxDQUFSO0FBQ0E7QUFmSjtBQWlCQSxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7Ozs7O2tCQUdZTCxTIiwiZmlsZSI6InRyaWFsLWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0VHJpYWxEYXRhIH0gZnJvbSAnLi9kZWZhdWx0LWRhdGEnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiDor5XnnIvmlbDmja5cbiAqL1xuY2xhc3MgVHJpYWxEYXRhIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIERlZmF1bHRUcmlhbERhdGEpIHtcbiAgICAgIHRoaXNbYF8ke2tleX1gXSA9IERlZmF1bHRUcmlhbERhdGFba2V5XTtcbiAgICAgIFV0aWxzLmRlZmluZUdldHRlcih0aGlzLCBrZXkpO1xuICAgIH1cblxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLl9yZXNldFRyaWFsRGF0YShkYXRhKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIOmHjee9ruS4k+i+keaVsOaNrlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSDmkq3mlL7mnI3liqHov5Tlm55cbiAgICovXG4gIF9yZXNldFRyaWFsRGF0YShkYXRhKSB7XG4gICAgbGV0IF90aW1lID0gMDtcbiAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XG4gICAgICB0aGlzLl90eXBlID0gZGF0YS50eXBlO1xuICAgIH1cbiAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnbm90ZScpKSB7XG4gICAgICB0aGlzLl9ub3RlID0gZGF0YS5ub3RlO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSAnZXBpc29kZXMnOlxuICAgICAgY2FzZSAnY2Fubm90JzpcbiAgICAgICAgX3RpbWUgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgY2FzZSAnc3Vic2NyaWJlJzpcbiAgICAgIGNhc2UgJ2g1JzpcbiAgICAgIGNhc2UgJ3podWFudGknOlxuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgndGltZScpKSB7XG4gICAgICAgICAgX3RpbWUgPSBkYXRhLnRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBfdGltZSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLl90aW1lID0gX3RpbWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYWxEYXRhO1xuIl19