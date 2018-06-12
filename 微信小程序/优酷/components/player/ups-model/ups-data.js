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
 * ups数据
 */ var UPSData = function() {
    function UPSData(data) {
        _classCallCheck(this, UPSData);
        for (var key in _defaultData.DefaultUPSData) {
            this["_" + key] = _defaultData.DefaultUPSData[key];
            _utils2.default.defineGetter(this, key);
        }
        if (data) {
            this._resetUpsData(data);
        }
    }
    /**
   * 重置数据
   * @param {Object} data 播放服务返回
   */    _createClass(UPSData, [ {
        key: "_resetUpsData",
        value: function _resetUpsData(data) {
            if (data.hasOwnProperty("ups_client_netip")) {
                this._clientIp = data.ups_client_netip;
            }
            if (data.hasOwnProperty("psid")) {
                this._psid = data.psid;
            }
            if (data.hasOwnProperty("pcad")) {
                this._isUpsLoadedAd = data.pcad;
            }
        }
    } ]);
    return UPSData;
}();

exports.default = UPSData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwcy1kYXRhLmpzIl0sIm5hbWVzIjpbIlVQU0RhdGEiLCJkYXRhIiwia2V5IiwiZGVmaW5lR2V0dGVyIiwiX3Jlc2V0VXBzRGF0YSIsImhhc093blByb3BlcnR5IiwiX2NsaWVudElwIiwidXBzX2NsaWVudF9uZXRpcCIsIl9wc2lkIiwicHNpZCIsIl9pc1Vwc0xvYWRlZEFkIiwicGNhZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFDQTs7O0lBR01BLE87QUFDSixtQkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLLElBQU1DLEdBQVgsaUNBQWtDO0FBQ2hDLGlCQUFTQSxHQUFULElBQWtCLDRCQUFlQSxHQUFmLENBQWxCO0FBQ0Esc0JBQU1DLFlBQU4sQ0FBbUIsSUFBbkIsRUFBeUJELEdBQXpCO0FBQ0Q7O0FBRUQsUUFBSUQsSUFBSixFQUFVO0FBQ1IsV0FBS0csYUFBTCxDQUFtQkgsSUFBbkI7QUFDRDtBQUNGO0FBQ0Q7Ozs7Ozs7O2tDQUljQSxJLEVBQU07QUFDbEIsVUFBSUEsS0FBS0ksY0FBTCxDQUFvQixrQkFBcEIsQ0FBSixFQUE2QztBQUMzQyxhQUFLQyxTQUFMLEdBQWlCTCxLQUFLTSxnQkFBdEI7QUFDRDtBQUNELFVBQUlOLEtBQUtJLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBSixFQUFpQztBQUMvQixhQUFLRyxLQUFMLEdBQWFQLEtBQUtRLElBQWxCO0FBQ0Q7QUFDRCxVQUFJUixLQUFLSSxjQUFMLENBQW9CLE1BQXBCLENBQUosRUFBaUM7QUFDL0IsYUFBS0ssY0FBTCxHQUFzQlQsS0FBS1UsSUFBM0I7QUFDRDtBQUNGOzs7Ozs7a0JBR1lYLE8iLCJmaWxlIjoidXBzLWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0VVBTRGF0YSB9IGZyb20gJy4vZGVmYXVsdC1kYXRhJztcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcbi8qKlxuICogdXBz5pWw5o2uXG4gKi9cbmNsYXNzIFVQU0RhdGEge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gRGVmYXVsdFVQU0RhdGEpIHtcbiAgICAgIHRoaXNbYF8ke2tleX1gXSA9IERlZmF1bHRVUFNEYXRhW2tleV07XG4gICAgICBVdGlscy5kZWZpbmVHZXR0ZXIodGhpcywga2V5KTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5fcmVzZXRVcHNEYXRhKGRhdGEpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6YeN572u5pWw5o2uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOaSreaUvuacjeWKoei/lOWbnlxuICAgKi9cbiAgX3Jlc2V0VXBzRGF0YShkYXRhKSB7XG4gICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ3Vwc19jbGllbnRfbmV0aXAnKSkge1xuICAgICAgdGhpcy5fY2xpZW50SXAgPSBkYXRhLnVwc19jbGllbnRfbmV0aXA7XG4gICAgfVxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdwc2lkJykpIHtcbiAgICAgIHRoaXMuX3BzaWQgPSBkYXRhLnBzaWQ7XG4gICAgfVxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdwY2FkJykpIHtcbiAgICAgIHRoaXMuX2lzVXBzTG9hZGVkQWQgPSBkYXRhLnBjYWQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVQU0RhdGE7XG4iXX0=