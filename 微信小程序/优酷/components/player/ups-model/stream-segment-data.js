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
 * 分片数据重构
 */ var StreamSegmentData = function() {
    function StreamSegmentData(index, data) {
        _classCallCheck(this, StreamSegmentData);
        for (var key in _defaultData.DefaultSegmentData) {
            this["_" + key] = _defaultData.DefaultSegmentData[key];
            _utils2.default.defineGetter(this, key);
        }
        this._index = index;
        if (data) {
            this._resetSegmentData(data);
        }
    }
    /**
   * 重置分片数据
   * @param {Object} data 播放服务返回
   */    _createClass(StreamSegmentData, [ {
        key: "_resetSegmentData",
        value: function _resetSegmentData(data) {
            if (data.hasOwnProperty("size")) {
                this._size = data.size;
            }
            if (data.hasOwnProperty("total_milliseconds_video")) {
                this._seconds = parseInt(data.total_milliseconds_video) / 1e3;
            }
            if (data.hasOwnProperty("cdn_url")) {
                this._src = data.cdn_url;
                if (data.cdn_url.indexOf("vali") === -1) {
                    var cdnArray = data.cdn_url.split("/");
                    cdnArray = cdnArray.splice(3, cdnArray.length - 3);
                    this._src = "https://vali.cp31.ott.cibntv.net/" + cdnArray.join("/");
                } else if (data.cdn_url.indexOf("http://") === 0) {
                    this._src = data.cdn_url.replace("http://", "https://");
                }
            }
            if (data.hasOwnProperty("cdn_backup")) {
                if (data.cdn_backup instanceof Array) {
                    if (data.cdn_backup.length > 0) this._backupURL = data.cdn_backup[0];
                }
            }
        }
    } ]);
    return StreamSegmentData;
}();

exports.default = StreamSegmentData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmVhbS1zZWdtZW50LWRhdGEuanMiXSwibmFtZXMiOlsiU3RyZWFtU2VnbWVudERhdGEiLCJpbmRleCIsImRhdGEiLCJrZXkiLCJkZWZpbmVHZXR0ZXIiLCJfaW5kZXgiLCJfcmVzZXRTZWdtZW50RGF0YSIsImhhc093blByb3BlcnR5IiwiX3NpemUiLCJzaXplIiwiX3NlY29uZHMiLCJwYXJzZUludCIsInRvdGFsX21pbGxpc2Vjb25kc192aWRlbyIsIl9zcmMiLCJjZG5fdXJsIiwiaW5kZXhPZiIsImNkbkFycmF5Iiwic3BsaXQiLCJzcGxpY2UiLCJsZW5ndGgiLCJqb2luIiwicmVwbGFjZSIsImNkbl9iYWNrdXAiLCJBcnJheSIsIl9iYWNrdXBVUkwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBQ0E7OztJQUdNQSxpQjtBQUNKLDZCQUFZQyxLQUFaLEVBQW1CQyxJQUFuQixFQUF5QjtBQUFBOztBQUN2QixTQUFLLElBQU1DLEdBQVgscUNBQXNDO0FBQ3BDLGlCQUFTQSxHQUFULElBQWtCLGdDQUFtQkEsR0FBbkIsQ0FBbEI7QUFDQSxzQkFBTUMsWUFBTixDQUFtQixJQUFuQixFQUF5QkQsR0FBekI7QUFDRDtBQUNELFNBQUtFLE1BQUwsR0FBY0osS0FBZDtBQUNBLFFBQUlDLElBQUosRUFBVTtBQUNSLFdBQUtJLGlCQUFMLENBQXVCSixJQUF2QjtBQUNEO0FBQ0Y7QUFDRDs7Ozs7Ozs7c0NBSWtCQSxJLEVBQU07QUFDdEIsVUFBSUEsS0FBS0ssY0FBTCxDQUFvQixNQUFwQixDQUFKLEVBQWlDO0FBQy9CLGFBQUtDLEtBQUwsR0FBYU4sS0FBS08sSUFBbEI7QUFDRDtBQUNELFVBQUlQLEtBQUtLLGNBQUwsQ0FBb0IsMEJBQXBCLENBQUosRUFBcUQ7QUFDbkQsYUFBS0csUUFBTCxHQUFnQkMsU0FBU1QsS0FBS1Usd0JBQWQsSUFBMEMsSUFBMUQ7QUFDRDtBQUNELFVBQUlWLEtBQUtLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBSixFQUFvQztBQUNsQyxhQUFLTSxJQUFMLEdBQVlYLEtBQUtZLE9BQWpCO0FBQ0EsWUFBSVosS0FBS1ksT0FBTCxDQUFhQyxPQUFiLENBQXFCLE1BQXJCLE1BQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDdkMsY0FBSUMsV0FBV2QsS0FBS1ksT0FBTCxDQUFhRyxLQUFiLENBQW1CLEdBQW5CLENBQWY7QUFDQUQscUJBQVdBLFNBQVNFLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJGLFNBQVNHLE1BQVQsR0FBa0IsQ0FBckMsQ0FBWDtBQUNBLGVBQUtOLElBQUwsR0FBWSxzQ0FBc0NHLFNBQVNJLElBQVQsQ0FBYyxHQUFkLENBQWxEO0FBQ0QsU0FKRCxNQUlPLElBQUlsQixLQUFLWSxPQUFMLENBQWFDLE9BQWIsQ0FBcUIsU0FBckIsTUFBb0MsQ0FBeEMsRUFBMkM7QUFDaEQsZUFBS0YsSUFBTCxHQUFZWCxLQUFLWSxPQUFMLENBQWFPLE9BQWIsQ0FBcUIsU0FBckIsRUFBZ0MsVUFBaEMsQ0FBWjtBQUNEO0FBQ0Y7QUFDRCxVQUFJbkIsS0FBS0ssY0FBTCxDQUFvQixZQUFwQixDQUFKLEVBQXVDO0FBQ3JDLFlBQUlMLEtBQUtvQixVQUFMLFlBQTJCQyxLQUEvQixFQUFzQztBQUNwQyxjQUFJckIsS0FBS29CLFVBQUwsQ0FBZ0JILE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDLEtBQUtLLFVBQUwsR0FBa0J0QixLQUFLb0IsVUFBTCxDQUFnQixDQUFoQixDQUFsQjtBQUNqQztBQUNGO0FBQ0Y7Ozs7OztrQkFHWXRCLGlCIiwiZmlsZSI6InN0cmVhbS1zZWdtZW50LWRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0U2VnbWVudERhdGEgfSBmcm9tICcuL2RlZmF1bHQtZGF0YSc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscyc7XG4vKipcbiAqIOWIhueJh+aVsOaNrumHjeaehFxuICovXG5jbGFzcyBTdHJlYW1TZWdtZW50RGF0YSB7XG4gIGNvbnN0cnVjdG9yKGluZGV4LCBkYXRhKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gRGVmYXVsdFNlZ21lbnREYXRhKSB7XG4gICAgICB0aGlzW2BfJHtrZXl9YF0gPSBEZWZhdWx0U2VnbWVudERhdGFba2V5XTtcbiAgICAgIFV0aWxzLmRlZmluZUdldHRlcih0aGlzLCBrZXkpO1xuICAgIH1cbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLl9yZXNldFNlZ21lbnREYXRhKGRhdGEpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6YeN572u5YiG54mH5pWw5o2uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOaSreaUvuacjeWKoei/lOWbnlxuICAgKi9cbiAgX3Jlc2V0U2VnbWVudERhdGEoZGF0YSkge1xuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdzaXplJykpIHtcbiAgICAgIHRoaXMuX3NpemUgPSBkYXRhLnNpemU7XG4gICAgfVxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCd0b3RhbF9taWxsaXNlY29uZHNfdmlkZW8nKSkge1xuICAgICAgdGhpcy5fc2Vjb25kcyA9IHBhcnNlSW50KGRhdGEudG90YWxfbWlsbGlzZWNvbmRzX3ZpZGVvKSAvIDEwMDA7XG4gICAgfVxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdjZG5fdXJsJykpIHtcbiAgICAgIHRoaXMuX3NyYyA9IGRhdGEuY2RuX3VybDtcbiAgICAgIGlmIChkYXRhLmNkbl91cmwuaW5kZXhPZigndmFsaScpID09PSAtMSkge1xuICAgICAgICBsZXQgY2RuQXJyYXkgPSBkYXRhLmNkbl91cmwuc3BsaXQoJy8nKTtcbiAgICAgICAgY2RuQXJyYXkgPSBjZG5BcnJheS5zcGxpY2UoMywgY2RuQXJyYXkubGVuZ3RoIC0gMyk7XG4gICAgICAgIHRoaXMuX3NyYyA9ICdodHRwczovL3ZhbGkuY3AzMS5vdHQuY2libnR2Lm5ldC8nICsgY2RuQXJyYXkuam9pbignLycpO1xuICAgICAgfSBlbHNlIGlmIChkYXRhLmNkbl91cmwuaW5kZXhPZignaHR0cDovLycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuX3NyYyA9IGRhdGEuY2RuX3VybC5yZXBsYWNlKCdodHRwOi8vJywgJ2h0dHBzOi8vJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdjZG5fYmFja3VwJykpIHtcbiAgICAgIGlmIChkYXRhLmNkbl9iYWNrdXAgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZiAoZGF0YS5jZG5fYmFja3VwLmxlbmd0aCA+IDApIHRoaXMuX2JhY2t1cFVSTCA9IGRhdGEuY2RuX2JhY2t1cFswXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RyZWFtU2VnbWVudERhdGE7XG4iXX0=