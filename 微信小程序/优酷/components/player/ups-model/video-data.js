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
 * 视频基本信息重构
 */ var VideoData = function() {
    function VideoData(videoData, trialData) {
        _classCallCheck(this, VideoData);
        for (var key in _defaultData.DefaultVideoData) {
            this["_" + key] = _defaultData.DefaultVideoData[key];
            _utils2.default.defineGetter(this, key);
        }
        if (videoData) {
            this._resetVideoData(videoData, trialData);
        }
    }
    /**
   * 重置视频数据
   * @param {Object} videoData 视频数据
   * @param {Object} trialData 试看数据
   */    _createClass(VideoData, [ {
        key: "_resetVideoData",
        value: function _resetVideoData(videoData, trialData) {
            if (videoData.hasOwnProperty("id")) {
                this._id = videoData.id;
            }
            if (videoData.hasOwnProperty("encodeid")) {
                this._encodeId = videoData.encodeid;
            }
            if (videoData.hasOwnProperty("title")) {
                this._title = videoData.title;
            }
            if (videoData.hasOwnProperty("seconds")) {
                this._duration = videoData.seconds;
            }
            if (videoData.hasOwnProperty("ctype")) {
                this._videoType = videoData.ctype;
            }
            if (videoData.hasOwnProperty("logo")) {
                this._coverURL = videoData.logo;
            }
            if (videoData.hasOwnProperty("category_id")) {
                this._categoryId = videoData.category_id;
            }
            if (videoData.hasOwnProperty("category_letter_id")) {
                this._categoryLetterId = videoData.category_letter_id;
            }
            if (videoData.hasOwnProperty("subcategories")) {
                var _array = [];
                var i = void 0;
                for (i = 0; i < videoData.subcategories.length; i++) {
                    if (videoData.subcategories[i].hasOwnProperty("id")) {
                        _array.push(videoData.subcategories[i].id);
                    }
                }
                this._categoryString = _array.join("|");
            }
            if (videoData.hasOwnProperty("tags")) {
                this._tags = videoData.tags;
            }
            this._resetVideoTypeData(videoData, trialData);
        }
        /**
     * 重置视频类型数据
     * @param {Object} videoData 视频数据
     * @param {Object} trialData 试看数据
     */    }, {
        key: "_resetVideoTypeData",
        value: function _resetVideoTypeData(videoData, trialData) {
            if (trialData) {
                this._isTrial = true;
            }
            if (trialData && videoData.hasOwnProperty("privacy")) {
                // 订阅试看视频
                var isSubscribe = trialData.type === "subscribe";
                var isFollower = videoData.privacy === "follower";
                if (isSubscribe && isFollower) {
                    this._isSubscribe = false;
                }
            }
            if (videoData.hasOwnProperty("transfer_mode")) {
                // 是否rtmp视频
                this._isRtmp = videoData.transfer_mode === "rtmp";
            }
            if (videoData.hasOwnProperty("type")) {
                // 是否弹幕视频
                var _videoType = videoData.type;
                this._isDanmaku = _videoType.indexOf("bullet") > -1;
                if (videoData.hasOwnProperty("share_type")) {
                    // 是否广告分成视频
                    var isShare = _videoType.indexOf("share") > -1;
                    if (isShare && videoData.share_type === "ad") {
                        this._isShareAd = true;
                    }
                }
                // 全景视频
                                this._isPanorama = _videoType.indexOf("panorama") > -1;
                // 付费视频
                                this._isFee = _videoType.indexOf("fee") > -1;
                // 自频道视频
                                this._isChannelVip = _videoType.indexOf("channel_vip") > -1;
            }
        }
    } ]);
    return VideoData;
}();

exports.default = VideoData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvLWRhdGEuanMiXSwibmFtZXMiOlsiVmlkZW9EYXRhIiwidmlkZW9EYXRhIiwidHJpYWxEYXRhIiwia2V5IiwiZGVmaW5lR2V0dGVyIiwiX3Jlc2V0VmlkZW9EYXRhIiwiaGFzT3duUHJvcGVydHkiLCJfaWQiLCJpZCIsIl9lbmNvZGVJZCIsImVuY29kZWlkIiwiX3RpdGxlIiwidGl0bGUiLCJfZHVyYXRpb24iLCJzZWNvbmRzIiwiX3ZpZGVvVHlwZSIsImN0eXBlIiwiX2NvdmVyVVJMIiwibG9nbyIsIl9jYXRlZ29yeUlkIiwiY2F0ZWdvcnlfaWQiLCJfY2F0ZWdvcnlMZXR0ZXJJZCIsImNhdGVnb3J5X2xldHRlcl9pZCIsIl9hcnJheSIsImkiLCJzdWJjYXRlZ29yaWVzIiwibGVuZ3RoIiwicHVzaCIsIl9jYXRlZ29yeVN0cmluZyIsImpvaW4iLCJfdGFncyIsInRhZ3MiLCJfcmVzZXRWaWRlb1R5cGVEYXRhIiwiX2lzVHJpYWwiLCJpc1N1YnNjcmliZSIsInR5cGUiLCJpc0ZvbGxvd2VyIiwicHJpdmFjeSIsIl9pc1N1YnNjcmliZSIsIl9pc1J0bXAiLCJ0cmFuc2Zlcl9tb2RlIiwiX2lzRGFubWFrdSIsImluZGV4T2YiLCJpc1NoYXJlIiwic2hhcmVfdHlwZSIsIl9pc1NoYXJlQWQiLCJfaXNQYW5vcmFtYSIsIl9pc0ZlZSIsIl9pc0NoYW5uZWxWaXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0E7OztJQUdNQSxTO0FBQ0oscUJBQVlDLFNBQVosRUFBdUJDLFNBQXZCLEVBQWtDO0FBQUE7O0FBQ2hDLFNBQUssSUFBTUMsR0FBWCxtQ0FBb0M7QUFDbEMsaUJBQVNBLEdBQVQsSUFBa0IsOEJBQWlCQSxHQUFqQixDQUFsQjtBQUNBLHNCQUFNQyxZQUFOLENBQW1CLElBQW5CLEVBQXlCRCxHQUF6QjtBQUNEOztBQUVELFFBQUlGLFNBQUosRUFBZTtBQUNiLFdBQUtJLGVBQUwsQ0FBcUJKLFNBQXJCLEVBQWdDQyxT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QStCLENBQUMsQ0FBbEQ7O0FBRUEsWUFBSXpDLFVBQVVLLGNBQVYsQ0FBeUIsWUFBekIsQ0FBSixFQUE0QztBQUMxQztBQUNBLGNBQU1xQyxVQUFVNUIsV0FBVzJCLE9BQVgsQ0FBbUIsT0FBbkIsSUFBOEIsQ0FBQyxDQUEvQztBQUNBLGNBQUlDLFdBQVcxQyxVQUFVMkMsVUFBVixLQUF5QixJQUF4QyxFQUE4QztBQUM1QyxpQkFBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNEO0FBQ0Y7QUFDRDtBQUNBLGFBQUtDLFdBQUwsR0FBbUIvQixXQUFXMkIsT0FBWCxDQUFtQixVQUFuQixJQUFpQyxDQUFDLENBQXJEO0FBQ0E7QUFDQSxhQUFLSyxNQUFMLEdBQWNoQyxXQUFXMkIsT0FBWCxDQUFtQixLQUFuQixJQUE0QixDQUFDLENBQTNDO0FBQ0E7QUFDQSxhQUFLTSxhQUFMLEdBQXFCakMsV0FBVzJCLE9BQVgsQ0FBbUIsYUFBbkIsSUFBb0MsQ0FBQyxDQUExRDtBQUNEO0FBQ0Y7Ozs7OztrQkFHWTFDLFMiLCJmaWxlIjoidmlkZW8tZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgRGVmYXVsdFZpZGVvRGF0YSB9IGZyb20gJy4vZGVmYXVsdC1kYXRhJztcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcbi8qKlxuICog6KeG6aKR5Z+65pys5L+h5oGv6YeN5p6EXG4gKi9cbmNsYXNzIFZpZGVvRGF0YSB7XG4gIGNvbnN0cnVjdG9yKHZpZGVvRGF0YSwgdHJpYWxEYXRhKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gRGVmYXVsdFZpZGVvRGF0YSkge1xuICAgICAgdGhpc1tgXyR7a2V5fWBdID0gRGVmYXVsdFZpZGVvRGF0YVtrZXldO1xuICAgICAgVXRpbHMuZGVmaW5lR2V0dGVyKHRoaXMsIGtleSk7XG4gICAgfVxuXG4gICAgaWYgKHZpZGVvRGF0YSkge1xuICAgICAgdGhpcy5fcmVzZXRWaWRlb0RhdGEodmlkZW9EYXRhLCB0cmlhbERhdGEpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6YeN572u6KeG6aKR5pWw5o2uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB2aWRlb0RhdGEg6KeG6aKR5pWw5o2uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0cmlhbERhdGEg6K+V55yL5pWw5o2uXG4gICAqL1xuICBfcmVzZXRWaWRlb0RhdGEodmlkZW9EYXRhLCB0cmlhbERhdGEpIHtcbiAgICBpZiAodmlkZW9EYXRhLmhhc093blByb3BlcnR5KCdpZCcpKSB7XG4gICAgICB0aGlzLl9pZCA9IHZpZGVvRGF0YS5pZDtcbiAgICB9XG4gICAgaWYgKHZpZGVvRGF0YS5oYXNPd25Qcm9wZXJ0eSgnZW5jb2RlaWQnKSkge1xuICAgICAgdGhpcy5fZW5jb2RlSWQgPSB2aWRlb0RhdGEuZW5jb2RlaWQ7XG4gICAgfVxuICAgIGlmICh2aWRlb0RhdGEuaGFzT3duUHJvcGVydHkoJ3RpdGxlJykpIHtcbiAgICAgIHRoaXMuX3RpdGxlID0gdmlkZW9EYXRhLnRpdGxlO1xuICAgIH1cbiAgICBpZiAodmlkZW9EYXRhLmhhc093blByb3BlcnR5KCdzZWNvbmRzJykpIHtcbiAgICAgIHRoaXMuX2R1cmF0aW9uID0gdmlkZW9EYXRhLnNlY29uZHM7XG4gICAgfVxuICAgIGlmICh2aWRlb0RhdGEuaGFzT3duUHJvcGVydHkoJ2N0eXBlJykpIHtcbiAgICAgIHRoaXMuX3ZpZGVvVHlwZSA9IHZpZGVvRGF0YS5jdHlwZTtcbiAgICB9XG4gICAgaWYgKHZpZGVvRGF0YS5oYXNPd25Qcm9wZXJ0eSgnbG9nbycpKSB7XG4gICAgICB0aGlzLl9jb3ZlclVSTCA9IHZpZGVvRGF0YS5sb2dvO1xuICAgIH1cbiAgICBpZiAodmlkZW9EYXRhLmhhc093blByb3BlcnR5KCdjYXRlZ29yeV9pZCcpKSB7XG4gICAgICB0aGlzLl9jYXRlZ29yeUlkID0gdmlkZW9EYXRhLmNhdGVnb3J5X2lkO1xuICAgIH1cbiAgICBpZiAodmlkZW9EYXRhLmhhc093blByb3BlcnR5KCdjYXRlZ29yeV9sZXR0ZXJfaWQnKSkge1xuICAgICAgdGhpcy5fY2F0ZWdvcnlMZXR0ZXJJZCA9IHZpZGVvRGF0YS5jYXRlZ29yeV9sZXR0ZXJfaWQ7XG4gICAgfVxuXG4gICAgaWYgKHZpZGVvRGF0YS5oYXNPd25Qcm9wZXJ0eSgnc3ViY2F0ZWdvcmllcycpKSB7XG4gICAgICBjb25zdCBfYXJyYXkgPSBbXTtcbiAgICAgIGxldCBpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHZpZGVvRGF0YS5zdWJjYXRlZ29yaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh2aWRlb0RhdGEuc3ViY2F0ZWdvcmllc1tpXS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xuICAgICAgICAgIF9hcnJheS5wdXNoKHZpZGVvRGF0YS5zdWJjYXRlZ29yaWVzW2ldLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fY2F0ZWdvcnlTdHJpbmcgPSBfYXJyYXkuam9pbignfCcpO1xuICAgIH1cbiAgICBpZiAodmlkZW9EYXRhLmhhc093blByb3BlcnR5KCd0YWdzJykpIHtcbiAgICAgIHRoaXMuX3RhZ3MgPSB2aWRlb0RhdGEudGFncztcbiAgICB9XG5cbiAgICB0aGlzLl9yZXNldFZpZGVvVHlwZURhdGEodmlkZW9EYXRhLCB0cmlhbERhdGEpO1xuICB9XG4gIC8qKlxuICAgKiDph43nva7op4bpopHnsbvlnovmlbDmja5cbiAgICogQHBhcmFtIHtPYmplY3R9IHZpZGVvRGF0YSDop4bpopHmlbDmja5cbiAgICogQHBhcmFtIHtPYmplY3R9IHRyaWFsRGF0YSDor5XnnIvmlbDmja5cbiAgICovXG4gIF9yZXNldFZpZGVvVHlwZURhdGEodmlkZW9EYXRhLCB0cmlhbERhdGEpIHtcbiAgICBpZiAodHJpYWxEYXRhKSB7XG4gICAgICB0aGlzLl9pc1RyaWFsID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRyaWFsRGF0YSAmJiB2aWRlb0RhdGEuaGFzT3duUHJvcGVydHkoJ3ByaXZhY3knKSkge1xuICAgICAgLy8g6K6i6ZiF6K+V55yL6KeG6aKRXG4gICAgICBjb25zdCBpc1N1YnNjcmliZSA9IHRyaWFsRGF0YS50eXBlID09PSAnc3Vic2NyaWJlJztcbiAgICAgIGNvbnN0IGlzRm9sbG93ZXIgPSB2aWRlb0RhdGEucHJpdmFjeSA9PT0gJ2ZvbGxvd2VyJztcbiAgICAgIGlmIChpc1N1YnNjcmliZSAmJiBpc0ZvbGxvd2VyKSB7XG4gICAgICAgIHRoaXMuX2lzU3Vic2NyaWJlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHZpZGVvRGF0YS5oYXNPd25Qcm9wZXJ0eSgndHJhbnNmZXJfbW9kZScpKSB7XG4gICAgICAvLyDmmK/lkKZydG1w6KeG6aKRXG4gICAgICB0aGlzLl9pc1J0bXAgPSB2aWRlb0RhdGEudHJhbnNmZXJfbW9kZSA9PT0gJ3J0bXAnO1xuICAgIH1cbiAgICBpZiAodmlkZW9EYXRhLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcbiAgICAgIC8vIOaYr+WQpuW8ueW5leinhumikVxuICAgICAgY29uc3QgX3ZpZGVvVHlwZSA9IHZpZGVvRGF0YS50eXBlO1xuICAgICAgdGhpcy5faXNEYW5tYWt1ID0gX3ZpZGVvVHlwZS5pbmRleE9mKCdidWxsZXQnKSA+IC0xO1xuXG4gICAgICBpZiAodmlkZW9EYXRhLmhhc093blByb3BlcnR5KCdzaGFyZV90eXBlJykpIHtcbiAgICAgICAgLy8g5piv5ZCm5bm/5ZGK5YiG5oiQ6KeG6aKRXG4gICAgICAgIGNvbnN0IGlzU2hhcmUgPSBfdmlkZW9UeXBlLmluZGV4T2YoJ3NoYXJlJykgPiAtMTtcbiAgICAgICAgaWYgKGlzU2hhcmUgJiYgdmlkZW9EYXRhLnNoYXJlX3R5cGUgPT09ICdhZCcpIHtcbiAgICAgICAgICB0aGlzLl9pc1NoYXJlQWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyDlhajmma/op4bpopFcbiAgICAgIHRoaXMuX2lzUGFub3JhbWEgPSBfdmlkZW9UeXBlLmluZGV4T2YoJ3Bhbm9yYW1hJykgPiAtMTtcbiAgICAgIC8vIOS7mOi0ueinhumikVxuICAgICAgdGhpcy5faXNGZWUgPSBfdmlkZW9UeXBlLmluZGV4T2YoJ2ZlZScpID4gLTE7XG4gICAgICAvLyDoh6rpopHpgZPop4bpopFcbiAgICAgIHRoaXMuX2lzQ2hhbm5lbFZpcCA9IF92aWRlb1R5cGUuaW5kZXhPZignY2hhbm5lbF92aXAnKSA+IC0xO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWRlb0RhdGE7XG4iXX0=