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

var _streamSegmentData = require("./stream-segment-data.js");

var _streamSegmentData2 = _interopRequireDefault(_streamSegmentData);

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

var QUALITY_STREAM_ORDER = {
    "270p": [ "3gphd" ],
    "320p": [ "mp4sd" ],
    "480p": [ "mp4hd" ],
    "720p": [ "mp4hd2v2" ]
};

var QUALITY_NAME_ORDER = {
    "270p": "省流",
    "320p": "标清",
    "480p": "高清",
    "720p": "超清"
};

/**
 * 流数据重构
 */ var StreamsData = function() {
    function StreamsData(streamData, dvdData) {
        _classCallCheck(this, StreamsData);
        this._streamsData = new Map();
        this._languageData = [];
        if (dvdData && dvdData.audiolang) {
            this._languageData = dvdData.audiolang;
        }
        if (streamData) {
            this._resetStreamData(streamData);
        }
    }
    /**
   * 获取语言清晰度流列表
   */    _createClass(StreamsData, [ {
        key: "getMediaStreamData",
        value: function getMediaStreamData() {
            var _this = this;
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "flv";
            var langData = [];
            this._streamsData.forEach(function(value, key) {
                var qualitys = _this.getQualityList(key, type);
                if (qualitys.length > 0) {
                    var data = {};
                    data.id = key;
                    data.name = _this.getLangCodeToCN(key);
                    data.qualityList = qualitys;
                    langData.push(data);
                }
            });
            return langData;
        }
        /**
     * 获取清晰度列表
     */    }, {
        key: "getQualityList",
        value: function getQualityList(lang) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "flv";
            var _qualityList = [];
            if (this._streamsData.has(lang)) {
                var tempQu = this._streamsData.get(lang);
                if (type !== "mp4") {
                    for (var key in QUALITY_NAME_ORDER) {
                        if (tempQu.has(key)) {
                            var st = this.getStreamByQuality(lang, key);
                            var _data = this.buildStreamData(key, st);
                            _qualityList.push(_data);
                        }
                    }
                } else {
                    for (var tempQuality in QUALITY_NAME_ORDER) {
                        if (tempQu.has(tempQuality)) {
                            var _st = this.getStreamByQuality(lang, tempQuality);
                            var _index = QUALITY_STREAM_ORDER[tempQuality].indexOf(_st.stream_type);
                            if (_st.segs && _st.segs[0] && _st.segs[0].src) {
                                if (_index === 0) {
                                    var _data2 = this.buildStreamData(tempQuality, _st);
                                    _qualityList.push(_data2);
                                }
                            }
                        }
                    }
                }
            }
            return _qualityList;
        }
        /**
     * new
     * @param {String} type
     */    }, {
        key: "buildStreamData",
        value: function buildStreamData(key, data) {
            var _data = {};
            _data.id = key;
            _data.name = QUALITY_NAME_ORDER[key];
            _data.width = data.width;
            _data.height = data.height;
            _data.duration = data.videoMilliSeconds;
            _data.segs = data.segs;
            _data.streamURL = data.streamURL;
            return _data;
        }
    }, {
        key: "_resetStreamData",
        value: function _resetStreamData(data) {
            var i = 0;
            var j = 0;
            var k = 0;
            var item = void 0;
            var langArr = [];
            var lang = void 0;
            var audioLanguage = "";
            // 语言
                        var _defaultQuality = "";
            // 清晰度
            // 初始化筛选语言
                        for (i = 0; i < data.length; i++) {
                item = data[i];
                lang = item.audio_lang;
                if (langArr.indexOf(lang) === -1) {
                    langArr.push(lang);
                }
            }
            // 将不同stream放入对应language
                        for (i = 0; i < langArr.length; i++) {
                var videoQualityDict = new Map();
                for (j = 0; j < data.length; j++) {
                    var videoStreamDict = new Map();
                    item = data[j];
                    audioLanguage = item.audio_lang;
                    lang = langArr[i];
                    if (lang !== audioLanguage) {
                        continue;
                    }
                    _defaultQuality = item.stream_type;
                    // 无分片信息及m3u8地址时不存入
                                        if (!item.segs) {
                        continue;
                    }
                    // 重构分片数据
                                        var segs = [];
                    var size = 0;
                    var millisecondsAudio = 0;
                    var millisecondsVideo = 0;
                    // 根据清晰度返回流类型 一种清晰度可能对应多种流
                                        var quality = this.getIdByStreamType(_defaultQuality);
                    if (quality === "0") {
                        continue;
                    }
                    if (videoQualityDict.has(quality)) {
                        videoStreamDict = videoQualityDict.get(quality);
                    }
                    // 相同清晰度要进行拼接
                                        if (videoStreamDict.has(_defaultQuality)) {
                        segs = videoStreamDict.get(_defaultQuality).segs;
                        size = videoStreamDict.get(_defaultQuality).size;
                        millisecondsAudio = videoStreamDict.get(_defaultQuality).milliseconds_audio;
                        millisecondsVideo = videoStreamDict.get(_defaultQuality).milliseconds_video;
                    }
                    if (item.size) {
                        size += item.size;
                    }
                    if (item.milliseconds_audio) {
                        millisecondsAudio += item.milliseconds_audio;
                    }
                    if (item.milliseconds_video) {
                        millisecondsVideo += item.milliseconds_video;
                    }
                    for (k = segs.length; k < item.segs.length; k++) {
                        var segObj = item.segs[k];
                        if (!segObj) {
                            break;
                        }
                        var _videoSegmentData = new _streamSegmentData2.default(k, segObj);
                        if (_videoSegmentData.src) {
                            segs.push(_videoSegmentData);
                        }
                    }
                    if (item.m3u8_url) {
                        item.streamURL = item.m3u8_url;
                    }
                    item.segs = segs;
                    item.size = size;
                    item.audioMilliSeconds = millisecondsAudio;
                    item.videoMilliSeconds = millisecondsVideo;
                    videoStreamDict.set(_defaultQuality, item);
                    videoQualityDict.set(quality, videoStreamDict);
                }
                this._streamsData.set(langArr[i], videoQualityDict);
            }
        }
        /**
     * 视频流数据
     */    }, {
        key: "getIdByStreamType",
        /**
     * 根据流类型返回清晰度id
     * @param {String} value 流类型 例：mp4hd
     * 返回对应清晰度id 例：1-4
     */
        value: function getIdByStreamType(_value) {
            var _level = void 0;
            for (_level in QUALITY_STREAM_ORDER) {
                var tempArr = QUALITY_STREAM_ORDER[_level];
                if (tempArr.indexOf(_value) !== -1) {
                    return _level;
                }
            }
            return "0";
        }
        /**
     * 根据语言code 获取中文
     * @param {String} code 语言code
     */    }, {
        key: "getLangCodeToCN",
        value: function getLangCodeToCN(code) {
            var _language = code;
            for (var i = 0; i < this._languageData.length; i++) {
                if (this._languageData[i].langcode === code) {
                    _language = this._languageData[i].lang;
                }
            }
            return _language;
        }
        /**
     * 根据语言 清晰度获取视频数据
     * @param {String} lang 语言
     * @param {int} quality 清晰度
     * @return {Array} 视频流数据
     */    }, {
        key: "getStreamByQuality",
        value: function getStreamByQuality(lang, quality) {
            if (this._streamsData.has(lang)) {
                var tempQu = this._streamsData.get(lang);
                if (tempQu.has(quality)) {
                    var tempStr = tempQu.get(quality);
                    for (var i = 0; i < QUALITY_STREAM_ORDER[quality].length; i++) {
                        if (tempStr.has(QUALITY_STREAM_ORDER[quality][i])) {
                            return tempStr.get(QUALITY_STREAM_ORDER[quality][i]);
                        }
                    }
                }
            }
            return {};
        }
    }, {
        key: "streamData",
        get: function get() {
            return this._streamsData;
        }
    } ]);
    return StreamsData;
}();

exports.default = StreamsData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmVhbXMtZGF0YS5qcyJdLCJuYW1lcyI6WyJRVUFMSVRZX1NUUkVBTV9PUkRFUiIsIlFVQUxJVFlfTkFNRV9PUkRFUiIsIlN0cmVhbXNEYXRhIiwic3RyZWFtRGF0YSIsImR2ZERhdGEiLCJfc3RyZWFtc0RhdGEiLCJNYXAiLCJfbGFuZ3VhZ2VEYXRhIiwiYXVkaW9sYW5nIiwiX3Jlc2V0U3RyZWFtRGF0YSIsInR5cGUiLCJsYW5nRGF0YSIsImZvckVhY2giLCJ2YWx1ZSIsImtleSIsInF1YWxpdHlzIiwiZ2V0UXVhbGl0eUxpc3QiLCJsZW5ndGgiLCJkYXRhIiwiaWQiLCJuYW1lIiwiZ2V0TGFuZ0NvZGVUb0NOIiwicXVhbGl0eUxpc3QiLCJwdXNoIiwibGFuZyIsIl9xdWFsaXR5TGlzdCIsImhhcyIsInRlbXBRdSIsImdldCIsInN0IiwiZ2V0U3RyZWFtQnlRdWFsaXR5IiwiX2RhdGEiLCJidWlsZFN0cmVhbURhdGEiLCJ0ZW1wUXVhbGl0eSIsIl9pbmRleCIsImluZGV4T2YiLCJzdHJlYW1fdHlwZSIsInNlZ3MiLCJzcmMiLCJ3aWR0aCIsImhlaWdodCIsImR1cmF0aW9uIiwidmlkZW9NaWxsaVNlY29uZHMiLCJzdHJlYW1VUkwiLCJpIiwiaiIsImsiLCJpdGVtIiwibGFuZ0FyciIsImF1ZGlvTGFuZ3VhZ2UiLCJfZGVmYXVsdFF1YWxpdHkiLCJhdWRpb19sYW5nIiwidmlkZW9RdWFsaXR5RGljdCIsInZpZGVvU3RyZWFtRGljdCIsInNpemUiLCJtaWxsaXNlY29uZHNBdWRpbyIsIm1pbGxpc2Vjb25kc1ZpZGVvIiwicXVhbGl0eSIsImdldElkQnlTdHJlYW1UeXBlIiwibWlsbGlzZWNvbmRzX2F1ZGlvIiwibWlsbGlzZWNvbmRzX3ZpZGVvIiwic2VnT2JqIiwiX3ZpZGVvU2VnbWVudERhdGEiLCJtM3U4X3VybCIsImF1ZGlvTWlsbGlTZWNvbmRzIiwic2V0IiwiX3ZhbHVlIiwiX2xldmVsIiwidGVtcEFyciIsImNvZGUiLCJfbGFuZ3VhZ2UiLCJs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QSxJQUFJNUMscUJBQXFCeUQsT0FBckIsRUFBOEJ4QyxNQUFsRCxFQUEwRDJCLEdBQTFELEVBQStEO0FBQzdELGdCQUFJNEIsUUFBUTlDLEdBQVIsQ0FBWTFCLHFCQUFxQnlELE9BQXJCLEVBQThCYixDQUE5QixDQUFaLENBQUosRUFBbUQ7QUFDakQscUJBQU80QixRQUFRNUMsR0FBUixDQUFZNUIscUJBQXFCeUQsT0FBckIsRUFBOEJiLENBQTlCLENBQVosQ0FBUDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0QsYUFBTyxFQUFQO0FBQ0Q7Ozt3QkFsRGdCO0FBQ2YsYUFBTyxLQUFLdkMsWUFBWjtBQUNEOzs7Ozs7a0JBbURZSCxXIiwiZmlsZSI6InN0cmVhbXMtZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHJlYW1TZWdtZW50RGF0YSBmcm9tICcuL3N0cmVhbS1zZWdtZW50LWRhdGEnO1xuY29uc3QgUVVBTElUWV9TVFJFQU1fT1JERVIgPSB7XG4gICcyNzBwJzogWyczZ3BoZCddLFxuICAnMzIwcCc6IFsnbXA0c2QnXSxcbiAgJzQ4MHAnOiBbJ21wNGhkJ10sXG4gICc3MjBwJzogWydtcDRoZDJ2MiddXG59O1xuY29uc3QgUVVBTElUWV9OQU1FX09SREVSID0ge1xuICAnMjcwcCc6ICfnnIHmtYEnLFxuICAnMzIwcCc6ICfmoIfmuIUnLFxuICAnNDgwcCc6ICfpq5jmuIUnLFxuICAnNzIwcCc6ICfotoXmuIUnXG59O1xuLyoqXG4gKiDmtYHmlbDmja7ph43mnoRcbiAqL1xuY2xhc3MgU3RyZWFtc0RhdGEge1xuICBjb25zdHJ1Y3RvcihzdHJlYW1EYXRhLCBkdmREYXRhKSB7XG4gICAgdGhpcy5fc3RyZWFtc0RhdGEgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5fbGFuZ3VhZ2VEYXRhID0gW107XG4gICAgaWYgKGR2ZERhdGEgJiYgZHZkRGF0YS5hdWRpb2xhbmcpIHtcbiAgICAgIHRoaXMuX2xhbmd1YWdlRGF0YSA9IGR2ZERhdGEuYXVkaW9sYW5nO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtRGF0YSkge1xuICAgICAgdGhpcy5fcmVzZXRTdHJlYW1EYXRhKHN0cmVhbURhdGEpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog6I635Y+W6K+t6KiA5riF5pmw5bqm5rWB5YiX6KGoXG4gICAqL1xuICBnZXRNZWRpYVN0cmVhbURhdGEodHlwZSA9ICdmbHYnKSB7XG4gICAgY29uc3QgbGFuZ0RhdGEgPSBbXTtcbiAgICB0aGlzLl9zdHJlYW1zRGF0YS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBjb25zdCBxdWFsaXR5cyA9IHRoaXMuZ2V0UXVhbGl0eUxpc3Qoa2V5LCB0eXBlKTtcbiAgICAgIGlmIChxdWFsaXR5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pZCA9IGtleTtcbiAgICAgICAgZGF0YS5uYW1lID0gdGhpcy5nZXRMYW5nQ29kZVRvQ04oa2V5KTtcblxuICAgICAgICBkYXRhLnF1YWxpdHlMaXN0ID0gcXVhbGl0eXM7XG4gICAgICAgIGxhbmdEYXRhLnB1c2goZGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGxhbmdEYXRhO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmuIXmmbDluqbliJfooahcbiAgICovXG4gIGdldFF1YWxpdHlMaXN0KGxhbmcsIHR5cGUgPSAnZmx2Jykge1xuICAgIGNvbnN0IF9xdWFsaXR5TGlzdCA9IFtdO1xuICAgIGlmICh0aGlzLl9zdHJlYW1zRGF0YS5oYXMobGFuZykpIHtcbiAgICAgIGNvbnN0IHRlbXBRdSA9IHRoaXMuX3N0cmVhbXNEYXRhLmdldChsYW5nKTtcblxuICAgICAgaWYgKHR5cGUgIT09ICdtcDQnKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIFFVQUxJVFlfTkFNRV9PUkRFUikge1xuICAgICAgICAgIGlmICh0ZW1wUXUuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0ID0gdGhpcy5nZXRTdHJlYW1CeVF1YWxpdHkobGFuZywga2V5KTtcbiAgICAgICAgICAgIGNvbnN0IF9kYXRhID0gdGhpcy5idWlsZFN0cmVhbURhdGEoa2V5LCBzdCk7XG4gICAgICAgICAgICBfcXVhbGl0eUxpc3QucHVzaChfZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHRlbXBRdWFsaXR5IGluIFFVQUxJVFlfTkFNRV9PUkRFUikge1xuICAgICAgICAgIGlmICh0ZW1wUXUuaGFzKHRlbXBRdWFsaXR5KSkge1xuICAgICAgICAgICAgY29uc3Qgc3QgPSB0aGlzLmdldFN0cmVhbUJ5UXVhbGl0eShsYW5nLCB0ZW1wUXVhbGl0eSk7XG4gICAgICAgICAgICBjb25zdCBfaW5kZXggPSBRVUFMSVRZX1NUUkVBTV9PUkRFUlt0ZW1wUXVhbGl0eV0uaW5kZXhPZihzdC5zdHJlYW1fdHlwZSk7XG4gICAgICAgICAgICBpZiAoc3Quc2VncyAmJiBzdC5zZWdzWzBdICYmIHN0LnNlZ3NbMF0uc3JjKSB7XG4gICAgICAgICAgICAgIGlmIChfaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBfZGF0YSA9IHRoaXMuYnVpbGRTdHJlYW1EYXRhKHRlbXBRdWFsaXR5LCBzdCk7XG4gICAgICAgICAgICAgICAgX3F1YWxpdHlMaXN0LnB1c2goX2RhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfcXVhbGl0eUxpc3Q7XG4gIH1cbiAgLyoqXG4gICAqIG5ld1xuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICAgKi9cbiAgYnVpbGRTdHJlYW1EYXRhKGtleSwgZGF0YSkge1xuICAgIGNvbnN0IF9kYXRhID0ge307XG4gICAgX2RhdGEuaWQgPSBrZXk7XG4gICAgX2RhdGEubmFtZSA9IFFVQUxJVFlfTkFNRV9PUkRFUltrZXldO1xuICAgIF9kYXRhLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICBfZGF0YS5oZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICBfZGF0YS5kdXJhdGlvbiA9IGRhdGEudmlkZW9NaWxsaVNlY29uZHM7XG4gICAgX2RhdGEuc2VncyA9IGRhdGEuc2VncztcbiAgICBfZGF0YS5zdHJlYW1VUkwgPSBkYXRhLnN0cmVhbVVSTDtcbiAgICByZXR1cm4gX2RhdGE7XG4gIH1cbiAgX3Jlc2V0U3RyZWFtRGF0YShkYXRhKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBqID0gMDtcbiAgICBsZXQgayA9IDA7XG5cbiAgICBsZXQgaXRlbTtcbiAgICBjb25zdCBsYW5nQXJyID0gW107XG4gICAgbGV0IGxhbmc7XG4gICAgbGV0IGF1ZGlvTGFuZ3VhZ2UgPSAnJzsgLy8g6K+t6KiAXG4gICAgbGV0IF9kZWZhdWx0UXVhbGl0eSA9ICcnOyAvLyDmuIXmmbDluqZcbiAgICAvLyDliJ3lp4vljJbnrZvpgInor63oqIBcbiAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgaXRlbSA9IGRhdGFbaV07XG4gICAgICBsYW5nID0gaXRlbS5hdWRpb19sYW5nO1xuXG4gICAgICBpZiAobGFuZ0Fyci5pbmRleE9mKGxhbmcpID09PSAtMSkge1xuICAgICAgICBsYW5nQXJyLnB1c2gobGFuZyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIOWwhuS4jeWQjHN0cmVhbeaUvuWFpeWvueW6lGxhbmd1YWdlXG4gICAgZm9yIChpID0gMDsgaSA8IGxhbmdBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZpZGVvUXVhbGl0eURpY3QgPSBuZXcgTWFwKCk7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICBsZXQgdmlkZW9TdHJlYW1EaWN0ID0gbmV3IE1hcCgpO1xuICAgICAgICBpdGVtID0gZGF0YVtqXTtcbiAgICAgICAgYXVkaW9MYW5ndWFnZSA9IGl0ZW0uYXVkaW9fbGFuZztcbiAgICAgICAgbGFuZyA9IGxhbmdBcnJbaV07XG4gICAgICAgIGlmIChsYW5nICE9PSBhdWRpb0xhbmd1YWdlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgX2RlZmF1bHRRdWFsaXR5ID0gaXRlbS5zdHJlYW1fdHlwZTtcblxuICAgICAgICAvLyDml6DliIbniYfkv6Hmga/lj4ptM3U45Zyw5Z2A5pe25LiN5a2Y5YWlXG4gICAgICAgIGlmICghaXRlbS5zZWdzKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6YeN5p6E5YiG54mH5pWw5o2uXG4gICAgICAgIGxldCBzZWdzID0gW107XG5cbiAgICAgICAgbGV0IHNpemUgPSAwO1xuICAgICAgICBsZXQgbWlsbGlzZWNvbmRzQXVkaW8gPSAwO1xuICAgICAgICBsZXQgbWlsbGlzZWNvbmRzVmlkZW8gPSAwO1xuXG4gICAgICAgIC8vIOagueaNrua4heaZsOW6pui/lOWbnua1geexu+WeiyDkuIDnp43muIXmmbDluqblj6/og73lr7nlupTlpJrnp43mtYFcbiAgICAgICAgY29uc3QgcXVhbGl0eSA9IHRoaXMuZ2V0SWRCeVN0cmVhbVR5cGUoX2RlZmF1bHRRdWFsaXR5KTtcbiAgICAgICAgaWYgKHF1YWxpdHkgPT09ICcwJykge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWRlb1F1YWxpdHlEaWN0LmhhcyhxdWFsaXR5KSkge1xuICAgICAgICAgIHZpZGVvU3RyZWFtRGljdCA9IHZpZGVvUXVhbGl0eURpY3QuZ2V0KHF1YWxpdHkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOebuOWQjOa4heaZsOW6puimgei/m+ihjOaLvOaOpVxuICAgICAgICBpZiAodmlkZW9TdHJlYW1EaWN0LmhhcyhfZGVmYXVsdFF1YWxpdHkpKSB7XG4gICAgICAgICAgc2VncyA9IHZpZGVvU3RyZWFtRGljdC5nZXQoX2RlZmF1bHRRdWFsaXR5KS5zZWdzO1xuICAgICAgICAgIHNpemUgPSB2aWRlb1N0cmVhbURpY3QuZ2V0KF9kZWZhdWx0UXVhbGl0eSkuc2l6ZTtcbiAgICAgICAgICBtaWxsaXNlY29uZHNBdWRpbyA9IHZpZGVvU3RyZWFtRGljdC5nZXQoX2RlZmF1bHRRdWFsaXR5KS5taWxsaXNlY29uZHNfYXVkaW87XG4gICAgICAgICAgbWlsbGlzZWNvbmRzVmlkZW8gPSB2aWRlb1N0cmVhbURpY3QuZ2V0KF9kZWZhdWx0UXVhbGl0eSkubWlsbGlzZWNvbmRzX3ZpZGVvO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLnNpemUpIHtcbiAgICAgICAgICBzaXplICs9IGl0ZW0uc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5taWxsaXNlY29uZHNfYXVkaW8pIHtcbiAgICAgICAgICBtaWxsaXNlY29uZHNBdWRpbyArPSBpdGVtLm1pbGxpc2Vjb25kc19hdWRpbztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5taWxsaXNlY29uZHNfdmlkZW8pIHtcbiAgICAgICAgICBtaWxsaXNlY29uZHNWaWRlbyArPSBpdGVtLm1pbGxpc2Vjb25kc192aWRlbztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGsgPSBzZWdzLmxlbmd0aDsgayA8IGl0ZW0uc2Vncy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIGNvbnN0IHNlZ09iaiA9IGl0ZW0uc2Vnc1trXTtcbiAgICAgICAgICBpZiAoIXNlZ09iaikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IF92aWRlb1NlZ21lbnREYXRhID0gbmV3IFN0cmVhbVNlZ21lbnREYXRhKGssIHNlZ09iaik7XG4gICAgICAgICAgaWYgKF92aWRlb1NlZ21lbnREYXRhLnNyYykge1xuICAgICAgICAgICAgc2Vncy5wdXNoKF92aWRlb1NlZ21lbnREYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0ubTN1OF91cmwpIHtcbiAgICAgICAgICBpdGVtLnN0cmVhbVVSTCA9IGl0ZW0ubTN1OF91cmw7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5zZWdzID0gc2VncztcbiAgICAgICAgaXRlbS5zaXplID0gc2l6ZTtcbiAgICAgICAgaXRlbS5hdWRpb01pbGxpU2Vjb25kcyA9IG1pbGxpc2Vjb25kc0F1ZGlvO1xuICAgICAgICBpdGVtLnZpZGVvTWlsbGlTZWNvbmRzID0gbWlsbGlzZWNvbmRzVmlkZW87XG5cbiAgICAgICAgdmlkZW9TdHJlYW1EaWN0LnNldChfZGVmYXVsdFF1YWxpdHksIGl0ZW0pO1xuXG4gICAgICAgIHZpZGVvUXVhbGl0eURpY3Quc2V0KHF1YWxpdHksIHZpZGVvU3RyZWFtRGljdCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zdHJlYW1zRGF0YS5zZXQobGFuZ0FycltpXSwgdmlkZW9RdWFsaXR5RGljdCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiDop4bpopHmtYHmlbDmja5cbiAgICovXG4gIGdldCBzdHJlYW1EYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9zdHJlYW1zRGF0YTtcbiAgfVxuICAvKipcbiAgICog5qC55o2u5rWB57G75Z6L6L+U5Zue5riF5pmw5bqmaWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIOa1geexu+WeiyDkvovvvJptcDRoZFxuICAgKiDov5Tlm57lr7nlupTmuIXmmbDluqZpZCDkvovvvJoxLTRcbiAgICovXG4gIGdldElkQnlTdHJlYW1UeXBlKF92YWx1ZSkge1xuICAgIGxldCBfbGV2ZWw7XG4gICAgZm9yIChfbGV2ZWwgaW4gUVVBTElUWV9TVFJFQU1fT1JERVIpIHtcbiAgICAgIGNvbnN0IHRlbXBBcnIgPSBRVUFMSVRZX1NUUkVBTV9PUkRFUltfbGV2ZWxdO1xuICAgICAgaWYgKHRlbXBBcnIuaW5kZXhPZihfdmFsdWUpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gX2xldmVsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJzAnO1xuICB9XG4gIC8qKlxuICAgKiDmoLnmja7or63oqIBjb2RlIOiOt+WPluS4reaWh1xuICAgKiBAcGFyYW0ge1N0cmluZ30gY29kZSDor63oqIBjb2RlXG4gICAqL1xuICBnZXRMYW5nQ29kZVRvQ04oY29kZSkge1xuICAgIGxldCBfbGFuZ3VhZ2UgPSBjb2RlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGFuZ3VhZ2VEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fbGFuZ3VhZ2VEYXRhW2ldLmxhbmdjb2RlID09PSBjb2RlKSB7XG4gICAgICAgIF9sYW5ndWFnZSA9IHRoaXMuX2xhbmd1YWdlRGF0YVtpXS5sYW5nO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX2xhbmd1YWdlO1xuICB9XG4gIC8qKlxuICAgKiDmoLnmja7or63oqIAg5riF5pmw5bqm6I635Y+W6KeG6aKR5pWw5o2uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsYW5nIOivreiogFxuICAgKiBAcGFyYW0ge2ludH0gcXVhbGl0eSDmuIXmmbDluqZcbiAgICogQHJldHVybiB7QXJyYXl9IOinhumikea1geaVsOaNrlxuICAgKi9cbiAgZ2V0U3RyZWFtQnlRdWFsaXR5KGxhbmcsIHF1YWxpdHkpIHtcbiAgICBpZiAodGhpcy5fc3RyZWFtc0RhdGEuaGFzKGxhbmcpKSB7XG4gICAgICBjb25zdCB0ZW1wUXUgPSB0aGlzLl9zdHJlYW1zRGF0YS5nZXQobGFuZyk7XG4gICAgICBpZiAodGVtcFF1LmhhcyhxdWFsaXR5KSkge1xuICAgICAgICBjb25zdCB0ZW1wU3RyID0gdGVtcFF1LmdldChxdWFsaXR5KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBRVUFMSVRZX1NUUkVBTV9PUkRFUltxdWFsaXR5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0ZW1wU3RyLmhhcyhRVUFMSVRZX1NUUkVBTV9PUkRFUltxdWFsaXR5XVtpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wU3RyLmdldChRVUFMSVRZX1NUUkVBTV9PUkRFUltxdWFsaXR5XVtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHJlYW1zRGF0YTtcbiJdfQ==