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

var _upsData = require("./ups-data.js");

var _upsData2 = _interopRequireDefault(_upsData);

var _errorData = require("./error-data.js");

var _errorData2 = _interopRequireDefault(_errorData);

var _videoData = require("./video-data.js");

var _videoData2 = _interopRequireDefault(_videoData);

var _trialData = require("./trial-data.js");

var _trialData2 = _interopRequireDefault(_trialData);

var _showData = require("./show-data.js");

var _showData2 = _interopRequireDefault(_showData);

var _streamsData = require("./streams-data.js");

var _streamsData2 = _interopRequireDefault(_streamsData);

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
 * ups接口返回数据
 * @author
 */ var PlayListData = function() {
    function PlayListData(data) {
        _classCallCheck(this, PlayListData);
        if (!data) {
            return null;
        }
        // 原始数据
                this._playlistData = data;
        this._upsData = new _upsData2.default(data.ups);
        if (data.error) {
            this._isError = true;
        }
        this._errorData = new _errorData2.default(data.error);
        this._videoData = new _videoData2.default(data.video, data.trial);
        // 可选
                this._showData = new _showData2.default(data.show);
        this._trialData = new _trialData2.default(data.trial);
        // 视频流
                this._streamsData = new _streamsData2.default(data.stream, data.dvd);
        for (var key in _defaultData.DefaultPlayListData) {
            _utils2.default.defineGetter(this, key);
        }
    }
    /**
   * 获取原始数据
   */    _createClass(PlayListData, [ {
        key: "getMediaStreamData",
        /**
     * 获取语言清晰度列表
     * @param {String} type
     */
        value: function getMediaStreamData() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "flv";
            return this._streamsData.getMediaStreamData(type);
        }
        /**
     * 根据语言清晰度,获取视频数据
     */    }, {
        key: "getStreamByQuality",
        value: function getStreamByQuality(lang, quality) {
            return this._streamsData.getStreamByQuality(lang, quality);
        }
    }, {
        key: "playlistData",
        get: function get() {
            return this._playlistData;
        }
        /**
     * 获取视频流数据
     */    }, {
        key: "streamsData",
        get: function get() {
            return this._streamsData.streamData;
        }
    } ]);
    return PlayListData;
}();

exports.default = PlayListData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlBsYXlMaXN0RGF0YSIsImRhdGEiLCJfcGxheWxpc3REYXRhIiwiX3Vwc0RhdGEiLCJ1cHMiLCJlcnJvciIsIl9pc0Vycm9yIiwiX2Vycm9yRGF0YSIsIl92aWRlb0RhdGEiLCJ2aWRlbyIsInRyaWFsIiwiX3Nob3dEYXRhIiwic2hvdyIsIl90cmlhbERhdGEiLCJfc3RyZWFtc0RhdGEiLCJzdHJlYW0iLCJkdmQiLCJrZXkiLCJkZWZpbmVHZXR0ZXIiLCJ0eXBlIiwiZ2V0TWVkaWFTdHJlYW1EYXRhIiwibGFuZyIsInF1YWxpdHkiLCJnZXRTdHJlYW1CeVF1YWxpdHkiLCJzdHJlYW1EYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFDOzs7O0FBQ0Q7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUNBOzs7O0lBSU1BLFk7QUFDSix3QkFBWUMsSUFBWixFQUFrQjtBQUFBOztBQUNoQixRQUFJLENBQUNBLElBQUwsRUFBVztBQUNULGFBQU8sSUFBUDtBQUNEOztBQUVEO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQkQsSUFBckI7O0FBRUEsU0FBS0UsUUFBTCxHQUFnQixzQkFBWUYsS0FBS0csR0FBakIsQ0FBaEI7O0FBRUEsUUFBSUgsS0FBS0ksS0FBVCxFQUFnQjtBQUNkLFdBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRDtBQUNELFNBQUtDLFVBQUwsR0FBa0Isd0JBQWNOLEtBQUtJLEtBQW5CLENBQWxCOztBQUVBLFNBQUtHLFVBQUwsR0FBa0Isd0JBQWNQLEtBQUtRLEtBQW5CLEVBQTBCUixLQUFLUyxLQUEvQixDQUFsQjtBQUNBO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQix1QkFBYVYsS0FBS1csSUFBbEIsQ0FBakI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLHdCQUFjWixLQUFLUyxLQUFuQixDQUFsQjtBQUNBO0FBQ0EsU0FBS0ksWUFBTCxHQUFvQiwwQkFBZ0JiLEtBQUtjLE1BQXJCLEVBQTZCZCxLQUFLZSxHQUFsQyxDQUFwQjtBQUNBLFNBQUssSUFBTUMsR0FBWCxzQ0FBdUM7QUFDckMsc0JBQU1DLFlBQU4sQ0FBbUIsSUFBbkIsRUFBeUJELEdBQXpCO0FBQ0Q7QUFDRjtBQUNEOzs7Ozs7OztBQVlBOzs7O3lDQUlpQztBQUFBLFVBQWRFLElBQWMsdUVBQVAsS0FBTzs7QUFDL0IsYUFBTyxLQUFLTCxZQUFMLENBQWtCTSxrQkFBbEIsQ0FBcUNELElBQXJDLENBQVA7QUFDRDtBQUNEOzs7Ozs7dUNBR21CRSxJLEVBQU1DLE8sRUFBUztBQUNoQyxhQUFPLEtBQUtSLFlBQUwsQ0FBa0JTLGtCQUFsQixDQUFxQ0YsSUFBckMsRUFBMkNDLE9BQTNDLENBQVA7QUFDRDs7O3dCQXJCa0I7QUFDakIsYUFBTyxLQUFLcEIsYUFBWjtBQUNEO0FBQ0Q7Ozs7Ozt3QkFHa0I7QUFDaEIsYUFBTyxLQUFLWSxZQUFMLENBQWtCVSxVQUF6QjtBQUNEOzs7Ozs7a0JBZ0JZeEIsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIu+7v2ltcG9ydCBVc2VEYXRhIGZyb20gJy4vdXBzLWRhdGEnO1xuaW1wb3J0IEVycm9yRGF0YSBmcm9tICcuL2Vycm9yLWRhdGEnO1xuaW1wb3J0IFZpZGVvRGF0YSBmcm9tICcuL3ZpZGVvLWRhdGEnO1xuaW1wb3J0IFRyaWFsRGF0YSBmcm9tICcuL3RyaWFsLWRhdGEnO1xuaW1wb3J0IFNob3dEYXRhIGZyb20gJy4vc2hvdy1kYXRhJztcbmltcG9ydCBTdHJlYW1zRGF0YSBmcm9tICcuL3N0cmVhbXMtZGF0YSc7XG5pbXBvcnQgeyBEZWZhdWx0UGxheUxpc3REYXRhIH0gZnJvbSAnLi9kZWZhdWx0LWRhdGEnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuLyoqXG4gKiB1cHPmjqXlj6Pov5Tlm57mlbDmja5cbiAqIEBhdXRob3JcbiAqL1xuY2xhc3MgUGxheUxpc3REYXRhIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8g5Y6f5aeL5pWw5o2uXG4gICAgdGhpcy5fcGxheWxpc3REYXRhID0gZGF0YTtcblxuICAgIHRoaXMuX3Vwc0RhdGEgPSBuZXcgVXNlRGF0YShkYXRhLnVwcyk7XG5cbiAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgdGhpcy5faXNFcnJvciA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2Vycm9yRGF0YSA9IG5ldyBFcnJvckRhdGEoZGF0YS5lcnJvcik7XG5cbiAgICB0aGlzLl92aWRlb0RhdGEgPSBuZXcgVmlkZW9EYXRhKGRhdGEudmlkZW8sIGRhdGEudHJpYWwpO1xuICAgIC8vIOWPr+mAiVxuICAgIHRoaXMuX3Nob3dEYXRhID0gbmV3IFNob3dEYXRhKGRhdGEuc2hvdyk7XG4gICAgdGhpcy5fdHJpYWxEYXRhID0gbmV3IFRyaWFsRGF0YShkYXRhLnRyaWFsKTtcbiAgICAvLyDop4bpopHmtYFcbiAgICB0aGlzLl9zdHJlYW1zRGF0YSA9IG5ldyBTdHJlYW1zRGF0YShkYXRhLnN0cmVhbSwgZGF0YS5kdmQpO1xuICAgIGZvciAoY29uc3Qga2V5IGluIERlZmF1bHRQbGF5TGlzdERhdGEpIHtcbiAgICAgIFV0aWxzLmRlZmluZUdldHRlcih0aGlzLCBrZXkpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+W5Y6f5aeL5pWw5o2uXG4gICAqL1xuICBnZXQgcGxheWxpc3REYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9wbGF5bGlzdERhdGE7XG4gIH1cbiAgLyoqXG4gICAqIOiOt+WPluinhumikea1geaVsOaNrlxuICAgKi9cbiAgZ2V0IHN0cmVhbXNEYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9zdHJlYW1zRGF0YS5zdHJlYW1EYXRhO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bor63oqIDmuIXmmbDluqbliJfooahcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICovXG4gIGdldE1lZGlhU3RyZWFtRGF0YSh0eXBlID0gJ2ZsdicpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyZWFtc0RhdGEuZ2V0TWVkaWFTdHJlYW1EYXRhKHR5cGUpO1xuICB9XG4gIC8qKlxuICAgKiDmoLnmja7or63oqIDmuIXmmbDluqYs6I635Y+W6KeG6aKR5pWw5o2uXG4gICAqL1xuICBnZXRTdHJlYW1CeVF1YWxpdHkobGFuZywgcXVhbGl0eSkge1xuICAgIHJldHVybiB0aGlzLl9zdHJlYW1zRGF0YS5nZXRTdHJlYW1CeVF1YWxpdHkobGFuZywgcXVhbGl0eSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheUxpc3REYXRhO1xuIl19