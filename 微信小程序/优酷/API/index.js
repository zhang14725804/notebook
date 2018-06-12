Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.getModuleList = exports.sendGoldLog = exports.requestData = exports.sendEventLog = exports.createSign = exports.URL_ADDRESS = exports.getUpsData = exports.getModuleComment = undefined;

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _defaultData = require("./../config/default-data.js");

var _defaultData2 = _interopRequireDefault(_defaultData);

var _random = require("./../utils/random.js");

var _random2 = _interopRequireDefault(_random);

var _md = require("./../utils/md5.js");

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

// 接口请求
var DEV_HOST = _defaultData2.default.ENV ? "https://pre-service.dandelion.youku.com/" : "https://service.dandelion.youku.com/";

var LOG_HOST = "https://gm.mmstat.com/yt/";

var URL_ADDRESS = {
    // 首页tab配置
    GET_INDEX_NAV: DEV_HOST + "weixin/pages",
    // 首页模块内容
    GET_INDEX_MUDULE: DEV_HOST + "weixin/pageById",
    // u密令
    GET_UML: DEV_HOST + "weixin/u",
    // 发现页 短视频
    GET_FEED_LIST: DEV_HOST + "weixin/find",
    // 发现页 标签
    GET_RCMD_LIST: DEV_HOST + "weixin/rcmdvideos",
    // 发现页 点赞
    VIDEO_PRAISE: DEV_HOST + "weixin/find/praise",
    // 播放页 模块
    PLAY_DETAIL: DEV_HOST + "weixin/playDetail",
    // 播放页 模块异步详细
    PLAY_DETAIL_COMPONENT: DEV_HOST + "weixin/playDetailComponent",
    // 分享图片裁剪
    SHARE_IMAGE: DEV_HOST + "weixin/share/pic",
    // 播放页 mt配置
    PLAY_PAGE_CONFIG: "https://hudong.alicdn.com/api/data/v2/86407b9ff0fc4c7bb50fc457b3a165db.js",
    // 播放器 播放服务
    PLAYER_UPS: "https://ups.youku.com/ups/get.json",
    // 播放页 订阅信息
    GET_FANS: "https://api.m.youku.com/api/subscribe/get",
    // 日志 曝光
    LOG_URL: "https://log.mmstat.com/vx.gif",
    // 日志 停留时间
    TS_LOG: LOG_HOST + "youkuweixin.pages.vtslog",
    // 日志 点击事件
    EVENT_LOG: LOG_HOST + "youkuweixin.pages.event",
    // 播放器vv日志
    VV_LOG: LOG_HOST + "youkuweixin.player.vdoview"
};

var createSign = function createSign(obj, _timestamp) {
    var newkey = Object.keys(obj).sort();
    var arr = [];
    for (var i = 0; i < newkey.length; i++) {
        arr.push(newkey[i] + "=" + obj[newkey[i]]);
    }
    var _params = arr.join("&");
    return (0, _md2.default)(_params + _timestamp + "YOUKUWEIXINXIAOCHENGXU");
};

/**
 * 请求数据
 * @param {Object} options
 */ var requestData = function requestData(options) {
    if (!options.url) {
        // url不能为null'
        return;
    }
    var callback = options.callback || "callback";
    var args = options.data || {};
    // const params = formatParams(data);
        if (options.sign) {
        var _timestamp = new Date().getTime();
        var _sign = createSign(args, _timestamp);
        args._timestamp = _timestamp;
        args.sign = _sign;
    }
    var requestOptions = {};
    requestOptions.url = options.url;
    requestOptions.data = args;
    if (options.method && options.method === "POST") {
        requestOptions.method = "POST";
        requestOptions.header = {
            "content-type": "application/x-www-form-urlencoded"
        };
    }
    requestOptions.success = requestOptions.fail = function(data) {
        callback({
            isSuccess: true,
            result: data
        });
    };
    _wepy2.default.request(requestOptions);
};

var formatParams = function formatParams(data) {
    var arr = [];
    for (var name in data) {
        if (name === "aplus") {
            arr.push(name);
        } else {
            arr.push(name + "=" + encodeURIComponent(data[name]));
        }
    }
    return arr.join("&");
};

/**
 * 重构首页显示模块数据
 * @param {Object} res
 */ var getModuleList = function getModuleList(res, moduleIndex, logData) {
    // 通过map获取值
    var showModuleIndex = moduleIndex;
    var tags = _defaultData2.default.SUPPORT_MODULE_CONFIG;
    var _modules = res.result.data.data.list;
    var _moduleList = [];
    var _spmConfig = _defaultData2.default.SPM_CONFIG.index;
    for (var i = 0; i < _modules.length; i++) {
        // 模块
        var _moduleItem = {};
        _moduleItem.title = _modules[i].title;
        _moduleItem.hiddenHeader = _modules[i].hiddenHeader;
        _moduleItem.moduleId = _modules[i].moduleId;
        _moduleItem.spm = _spmConfig.spm + "_" + logData.pageId + "." + _modules[i].moduleId + ".0";
        var isSendLog = false;
        var components = _modules[i].components || [];
        var _componentData = [];
        var _loop = function _loop(key) {
            // 抽屉
            var componentItem = components[key];
            // console.log(componentItem);
                        var tag = componentItem.template.priorityTag || componentItem.template.tag;
            var isIn = tags.find(function(value) {
                return value === tag;
            });
            if (isIn) {
                var _tempComponent = {};
                var _itemResult = [];
                for (var itemkey in componentItem.itemResult.item) {
                    // 重构卡片
                    var _item = componentItem.itemResult.item[itemkey];
                    _item.spm = _spmConfig.spm + "_" + logData.pageId + "." + _modules[i].moduleId + "." + componentItem.componentId + "_" + itemkey;
                    _itemResult.push(_item);
                }
                _tempComponent.itemResult = _itemResult;
                _tempComponent.type = tag;
                _tempComponent.componentId = componentItem.componentId;
                if (!isSendLog) {
                    // 发送模块日志
                    var _data = {};
                    _data.title = logData.navList[logData.pageId].pageName + "_" + _moduleItem.title;
                    _data.url = _spmConfig.page;
                    _data.spm = _moduleItem.spm;
                    _data.referUrl = logData.source;
                    _data.referSpm = logData.referSpm;
                    sendGoldLog(_data);
                    if (_tempComponent.type === "PHONE_LUNBO") {
                        // 发送初始轮播图曝光统计
                        _data = {};
                        var _modules2 = _tempComponent.itemResult[0];
                        _data.title = _modules2.title;
                        _data.url = _spmConfig.page;
                        _data.spm = _modules2.spm;
                        _data.referUrl = _spmConfig.page;
                        _data.referSpm = "";
                        sendGoldLog(_data);
                    }
                    isSendLog = true;
                }
                var pageData = {};
                pageData.nowPage = 1;
                pageData.startIndex = 0;
                // componentItem.line = 1;
                                if (tag === "PHONE_BASE_B") {
                    pageData.num = 2 * componentItem.line;
                } else if (tag === "PHONE_BASE_C") {
                    pageData.num = 3 * componentItem.line;
                } else {
                    pageData.num = _itemResult.length;
                }
                pageData.endIndex = pageData.num - 1;
                pageData.totalNum = _itemResult.length;
                pageData.page = Math.ceil(pageData.totalNum / pageData.num);
                showModuleIndex[componentItem.componentId] = pageData;
                _tempComponent.hasNext = componentItem.itemResult.hasNext;
                _componentData.push(_tempComponent);
            }
        };
        for (var key in components) {
            _loop(key);
        }
        if (_componentData.length > 0) {
            _moduleItem.components = _componentData;
            _moduleList.push(_moduleItem);
        }
    }
    return [ showModuleIndex, _moduleList ];
};

/**
 * 获取播放页模块详细信息
 * @param {Object} data 模块数据
 * @param {String} videoArgs 视频数据
 * @param {Function} callback 回调方法
 */ var getModuleComment = function getModuleComment(data, videoArgs, callback) {
    if (!data) return;
    var asyncLoad = data.asyncLoad;
    var args = {};
    var result = data.itemResult ? data.itemResult.item : null;
    if (asyncLoad) {
        args.componentId = data.componentId;
        if (videoArgs.showid) {
            args.showid = videoArgs.showid;
        } else {
            args.vid = videoArgs.vid;
        }
        var options = {};
        options.url = URL_ADDRESS.PLAY_DETAIL_COMPONENT;
        options.sign = true;
        options.data = args;
        options.callback = function(res) {
            if (res.isSuccess && res.result && res.result.data) {
                var resData = res.result.data;
                if (resData.data && resData.data.data) {
                    result = resData.data.data.itemResult ? resData.data.data.itemResult.item : null;
                    result = setSpm(result, data.spm);
                }
            }
            callback(result);
        };
        requestData(options);
    } else {
        result = setSpm(result, data.spm);
        return callback(result);
    }
};

var setSpm = function setSpm(data, spm) {
    var result = [];
    for (var key in data) {
        var itemData = data[key];
        itemData.spm = spm + "_" + key;
        result.push(itemData);
    }
    return result;
};

/**
 * 发送日志
 */ var sendGoldLog = function sendGoldLog(args) {
    var options = {};
    var _params = {};
    _params.logtype = 1;
    _params.title = args.title || "";
    // 'page_homechannel'; // 标题
        _params.aplus = "";
    _params.cfgver = "vx.1.0";
    var uuid = _wepy2.default.getStorageSync("youku-uuid");
    if (!uuid) {
        uuid = _random2.default.rand(32, 16).toLowerCase();
        _wepy2.default.setStorageSync("youku-uuid", uuid);
    }
    _params.pu_i = uuid || "";
    // 用户uuid
        _params._p_url = args.url || "";
    // 'page_homechannel'; // 当前页面url
        _params._p_ref = args.referUrl || "";
    // 来源页面url
        _params["spm-cnt"] = args.spm || "";
    // 'a2h89.11361758'; // 当前页面spm
        _params["spm-url"] = args.referSpm || "";
    // 来源页面spm
        var screenWidth = 0;
    var screenHeight = 0;
    var platform = "wx";
    try {
        var res = _wepy2.default.getSystemInfoSync();
        // 屏幕宽度
                screenWidth = res.screenWidth;
        // 屏幕高度
                screenHeight = res.screenHeight;
        platform = res.platform;
    } catch (e) {
        // error
    }
    _params._p_os = platform;
    // 平台
        _params._p_scr = screenWidth + "*" + screenHeight;
    // 分辨率
        _params._p_pf = "wx";
    // 平台类型
        _params.cache = parseInt(Math.random() * 1e8);
    options.url = URL_ADDRESS.LOG_URL + "?" + formatParams(_params);
    options.callback = function(res) {
        // complete
    };
    requestData(options);
};

/**
 * 点击日志
 * @param {Object} args 参数
 */ var sendEventLog = function sendEventLog(args) {
    if (!args.eventCode) return;
    var options = {};
    var _params = {};
    _params.eventType = "CLI";
    _params.eventCode = args.eventCode;
    options.url = URL_ADDRESS.EVENT_LOG;
    options.data = _params;
    options.callback = function(res) {
        // complete
    };
    requestData(options);
};

/**
 * 播放服务
 * @param {*} args 参数
 */ var getUpsData = function getUpsData(args, callback) {
    _wepy2.default.request({
        url: URL_ADDRESS.PLAYER_UPS,
        data: args,
        success: function success(data) {
            callback({
                isSuccess: true,
                result: data
            });
        },
        fail: function fail(data) {
            callback({
                isSuccess: false,
                result: data
            });
        }
    });
};

exports.getModuleComment = getModuleComment;

exports.getUpsData = getUpsData;

exports.URL_ADDRESS = URL_ADDRESS;

exports.createSign = createSign;

exports.sendEventLog = sendEventLog;

exports.requestData = requestData;

exports.sendGoldLog = sendGoldLog;

exports.getModuleList = getModuleList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkRFVl9IT1NUIiwiRU5WIiwiTE9HX0hPU1QiLCJVUkxfQUREUkVTUyIsIkdFVF9JTkRFWF9OQVYiLCJHRVRfSU5ERVhfTVVEVUxFIiwiR0VUX1VNTCIsIkdFVF9GRUVEX0xJU1QiLCJHRVRfUkNNRF9MSVNUIiwiVklERU9fUFJBSVNFIiwiUExBWV9ERVRBSUwiLCJQTEFZX0RFVEFJTF9DT01QT05FTlQiLCJTSEFSRV9JTUFHRSIsIlBMQVlfUEFHRV9DT05GSUciLCJQTEFZRVJfVVBTIiwiR0VUX0ZBTlMiLCJMT0dfVVJMIiwiVFNfTE9HIiwiRVZFTlRfTE9HIiwiVlZfTE9HIiwiY3JlYXRlU2lnbiIsIm9iaiIsIl90aW1lc3RhbXAiLCJuZXdrZXkiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImFyciIsImkiLCJsZW5ndGgiLCJwdXNoIiwiX3BhcmFtcyIsImpvaW4iLCJyZXF1ZXN0RGF0YSIsIm9wdGlvbnMiLCJ1cmwiLCJjYWxsYmFjayIsImFyZ3MiLCJkYXRhIiwic2lnbiIsIkRhdGUiLCJnZXRUaW1lIiwiX3NpZ24iLCJyZXF1ZXN0T3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJmYWlsIiwicmVxdWVzdCIsImZvcm1hdFBhcmFtcyIsIm5hbWUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJnZXRNb2R1bGVMaXN0IiwicmVzIiwibW9kdWxlSW5kZXgiLCJsb2dEYXRhIiwic2hvd01vZHVsZUluZGV4IiwidGFncyIsIlNVUFBPUlRfTU9EVUxFX0NPTkZJRyIsIl9tb2R1bGVzIiwicmVzdWx0IiwibGlzdCIsIl9tb2R1bGVMaXN0IiwiX3NwbUNvbmZpZyIsIlNQTV9DT05GSUciLCJpbmRleCIsIl9tb2R1bGVJdGVtIiwidGl0bGUiLCJoaWRkZW5IZWFkZXIiLCJtb2R1bGVJZCIsInNwbSIsInBhZ2VJZCIsImlzU2VuZExvZyIsImNvbXBvbmVudHMiLCJfY29tcG9uZW50RGF0YSIsImtleSIsImNvbXBvbmVudEl0ZW0iLCJ0YWciLCJ0ZW1wbGF0ZSIsInByaW9yaXR5VGFnIiwiaXNJbiIsImZpbmQiLCJ2YWx1ZSIsIl90ZW1wQ29tcG9uZW50IiwiX2l0ZW1SZXN1bHQiLCJpdGVta2V5IiwiaXRlbVJlc3VsdCIsIml0ZW0iLCJfaXRlbSIsImNvbXBvbmVudElkIiwidHlwZSIsIl9kYXRhIiwibmF2TGlzdCIsInBhZ2VOYW1lIiwicGFnZSIsInJlZmVyVXJsIiwic291cmNlIiwicmVmZXJTcG0iLCJzZW5kR29sZExvZyIsInBhZ2VEYXRhIiwibm93UGFnZSIsInN0YXJ0SW5kZXgiLCJudW0iLCJsaW5lIiwiZW5kSW5kZXgiLCJ0b3RhbE51bSIsIk1hdGgiLCJjZWlsIiwiaGFzTmV4dCIsImdldE1vZHVsZUNvbW1lbnQiLCJ2aWRlb0FyZ3MiLCJhc3luY0xvYWQiLCJzaG93aWQiLCJ2aWQiLCJpc1N1Y2Nlc3MiLCJyZXNEYXRhIiwic2V0U3BtIiwiaXRlbURhdGEiLCJsb2d0eXBlIiwiYXBsdXMiLCJjZmd2ZXIiLCJ1dWlkIiwiZ2V0U3RvcmFnZVN5bmMiLCJyYW5kIiwidG9Mb3dlckNhc2UiLCJzZXRTdG9yYWdlU3luYyIsInB1X2kiLCJfcF91cmwiLCJfcF9yZWYiLCJzY3JlZW5XaWR0aCIsInNjcmVlbkhlaWdodCIsInBsYXRmb3JtIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJlIiwiX3Bfb3MiLCJfcF9zY3IiLCJfcF9wZiIsImNhY2hlIiwicGFyc2VJbnQiLCJyYW5kb20iLCJzZW5kRXZlbnRMb2ciLCJldmVudENvZGUiLCJldmVudFR5cGUiLCJnZXRVcHNEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUpBO0FBTUEsSUFBTUEsV0FBVyxzQkFBYUMsR0FBYixHQUFtQiwwQ0FBbkIsR0FBZ0Usc0NBQWpGO0FBQ0EsSUFBTUMsV0FBVywyQkFBakI7QUFDQSxJQUFNQyxjQUFjO0FBQ2xCO0FBQ0FDLGlCQUFlSixXQUFXLGNBRlI7QUFHbEI7QUFD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VTtBQU1YUyxVQUFNLGNBQUNULElBQUQsRUFBVTtBQUNkRixlQUFTLEVBQUMsYUFBYSxLQUFkLEVBQXFCLFVBQVVFLElBQS9CLEVBQVQ7QUFDRDtBQVJVLEdBQWI7QUFVRCxDQVhEO1FBYUV1RSxnQixHQUFBQSxnQjtRQUNBa0MsVSxHQUFBQSxVO1FBQ0E1SSxXLEdBQUFBLFc7UUFDQWlCLFUsR0FBQUEsVTtRQUNBd0gsWSxHQUFBQSxZO1FBQ0EzRyxXLEdBQUFBLFc7UUFDQWlFLFcsR0FBQUEsVztRQUNBOUMsYSxHQUFBQSxhIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5o6l5Y+j6K+35rGCXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBERUZBVUxUX0RBVEEgZnJvbSAnQC9jb25maWcvZGVmYXVsdC1kYXRhJztcbmltcG9ydCBSYW5kb20gZnJvbSAnQC91dGlscy9yYW5kb20nO1xuaW1wb3J0IG1kNSBmcm9tICdAL3V0aWxzL21kNSc7XG5cbmNvbnN0IERFVl9IT1NUID0gREVGQVVMVF9EQVRBLkVOViA/ICdodHRwczovL3ByZS1zZXJ2aWNlLmRhbmRlbGlvbi55b3VrdS5jb20vJyA6ICdodHRwczovL3NlcnZpY2UuZGFuZGVsaW9uLnlvdWt1LmNvbS8nO1xuY29uc3QgTE9HX0hPU1QgPSAnaHR0cHM6Ly9nbS5tbXN0YXQuY29tL3l0Lyc7XG5jb25zdCBVUkxfQUREUkVTUyA9IHtcbiAgLy8g6aaW6aG1dGFi6YWN572uXG4gIEdFVF9JTkRFWF9OQVY6IERFVl9IT1NUICsgJ3dlaXhpbi9wYWdlcycsXG4gIC8vIOmmlumhteaooeWdl+WGheWuuVxuICBHRVRfSU5ERVhfTVVEVUxFOiBERVZfSE9TVCArICd3ZWl4aW4vcGFnZUJ5SWQnLFxuICAvLyB15a+G5LukXG4gIEdFVF9VTUw6IERFVl9IT1NUICsgJ3dlaXhpbi91JyxcbiAgLy8g5Y+R546w6aG1IOefreinhumikVxuICBHRVRfRkVFRF9MSVNUOiBERVZfSE9TVCArICd3ZWl4aW4vZmluZCcsXG4gIC8vIOWPkeeOsOmhtSDmoIfnrb5cbiAgR0VUX1JDTURfTElTVDogREVWX0hPU1QgKyAnd2VpeGluL3JjbWR2aWRlb3MnLFxuICAvLyDlj5HnjrDpobUg54K56LWeXG4gIFZJREVPX1BSQUlTRTogREVWX0hPU1QgKyAnd2VpeGluL2ZpbmQvcHJhaXNlJyxcbiAgLy8g5pKt5pS+6aG1IOaooeWdl1xuICBQTEFZX0RFVEFJTDogREVWX0hPU1QgKyAnd2VpeGluL3BsYXlEZXRhaWwnLFxuICAvLyDmkq3mlL7pobUg5qih5Z2X5byC5q2l6K+m57uGXG4gIFBMQVlfREVUQUlMX0NPTVBPTkVOVDogREVWX0hPU1QgKyAnd2VpeGluL3BsYXlEZXRhaWxDb21wb25lbnQnLFxuICAvLyDliIbkuqvlm77niYfoo4HliapcbiAgU0hBUkVfSU1BR0U6IERFVl9IT1NUICsgJ3dlaXhpbi9zaGFyZS9waWMnLFxuICAvLyDmkq3mlL7pobUgbXTphY3nva5cbiAgUExBWV9QQUdFX0NPTkZJRzogJ2h0dHBzOi8vaHVkb25nLmFsaWNkbi5jb20vYXBpL2RhdGEvdjIvODY0MDdiOWZmMGZjNGM3YmI1MGZjNDU3YjNhMTY1ZGIuanMnLFxuICAvLyDmkq3mlL7lmagg5pKt5pS+5pyN5YqhXG4gIFBMQVlFUl9VUFM6ICdodHRwczovL3Vwcy55b3VrdS5jb20vdXBzL2dldC5qc29uJyxcbiAgLy8g5pKt5pS+6aG1IOiuoumYheS/oeaBr1xuICBHRVRfRkFOUzogJ2h0dHBzOi8vYXBpLm0ueW91a3UuY29tL2FwaS9zdWJzY3JpYmUvZ2V0JyxcbiAgLy8g5pel5b+XIOabneWFiVxuICBMT0dfVVJMOiAnaHR0cHM6Ly9sb2cubW1zdGF0LmNvbS92eC5naWYnLFxuICAvLyDml6Xlv5cg5YGc55WZ5pe26Ze0XG4gIFRTX0xPRzogTE9HX0hPU1QgKyAneW91a3V3ZWl4aW4ucGFnZXMudnRzbG9nJyxcbiAgLy8g5pel5b+XIOeCueWHu+S6i+S7tlxuICBFVkVOVF9MT0c6IExPR19IT1NUICsgJ3lvdWt1d2VpeGluLnBhZ2VzLmV2ZW50JyxcbiAgLy8g5pKt5pS+5Zmodnbml6Xlv5dcbiAgVlZfTE9HOiBMT0dfSE9TVCArICd5b3VrdXdlaXhpbi5wbGF5ZXIudmRvdmlldydcbn1cbi8vIOWPguaVsOaOkuW6j+i/lOWbnuWvhumSpVxuY29uc3QgY3JlYXRlU2lnbiA9IChvYmosIF90aW1lc3RhbXApID0+IHtcbiAgY29uc3QgbmV3a2V5ID0gT2JqZWN0LmtleXMob2JqKS5zb3J0KCk7XG4gIGNvbnN0IGFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld2tleS5sZW5ndGg7IGkrKykge1xuICAgIGFyci5wdXNoKG5ld2tleVtpXSArICc9JyArIG9ialtuZXdrZXlbaV1dKTtcbiAgfVxuICBjb25zdCBfcGFyYW1zID0gYXJyLmpvaW4oJyYnKTtcbiAgcmV0dXJuIG1kNShfcGFyYW1zICsgX3RpbWVzdGFtcCArICdZT1VLVVdFSVhJTlhJQU9DSEVOR1hVJyk7XG59O1xuLyoqXG4gKiDor7fmsYLmlbDmja5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmNvbnN0IHJlcXVlc3REYXRhID0gKG9wdGlvbnMpID0+IHtcbiAgaWYgKCFvcHRpb25zLnVybCkge1xuICAgIC8vIHVybOS4jeiDveS4um51bGwnXG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjayB8fCAnY2FsbGJhY2snO1xuICBjb25zdCBhcmdzID0gb3B0aW9ucy5kYXRhIHx8IHt9O1xuICAvLyBjb25zdCBwYXJhbXMgPSBmb3JtYXRQYXJhbXMoZGF0YSk7XG4gIGlmIChvcHRpb25zLnNpZ24pIHtcbiAgICBjb25zdCBfdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgY29uc3QgX3NpZ24gPSBjcmVhdGVTaWduKGFyZ3MsIF90aW1lc3RhbXApO1xuICAgIGFyZ3MuX3RpbWVzdGFtcCA9IF90aW1lc3RhbXA7XG4gICAgYXJncy5zaWduID0gX3NpZ247XG4gIH1cbiAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7fTtcbiAgcmVxdWVzdE9wdGlvbnMudXJsID0gb3B0aW9ucy51cmw7XG4gIHJlcXVlc3RPcHRpb25zLmRhdGEgPSBhcmdzO1xuICBpZiAob3B0aW9ucy5tZXRob2QgJiYgb3B0aW9ucy5tZXRob2QgPT09ICdQT1NUJykge1xuICAgIHJlcXVlc3RPcHRpb25zLm1ldGhvZCA9ICdQT1NUJztcbiAgICByZXF1ZXN0T3B0aW9ucy5oZWFkZXIgPSB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfTtcbiAgfVxuICByZXF1ZXN0T3B0aW9ucy5zdWNjZXNzID0gcmVxdWVzdE9wdGlvbnMuZmFpbCA9IChkYXRhKSA9PiB7XG4gICAgY2FsbGJhY2soeydpc1N1Y2Nlc3MnOiB0cnVlLCAncmVzdWx0JzogZGF0YX0pO1xuICB9O1xuICB3ZXB5LnJlcXVlc3QocmVxdWVzdE9wdGlvbnMpO1xufTtcbmNvbnN0IGZvcm1hdFBhcmFtcyA9IChkYXRhKSA9PiB7XG4gIGNvbnN0IGFyciA9IFtdO1xuICBmb3IgKGNvbnN0IG5hbWUgaW4gZGF0YSkge1xuICAgIGlmIChuYW1lID09PSAnYXBsdXMnKSB7XG4gICAgICBhcnIucHVzaChuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhW25hbWVdKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnIuam9pbignJicpO1xufVxuLyoqXG4gKiDph43mnoTpppbpobXmmL7npLrmqKHlnZfmlbDmja5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNcbiAqL1xuY29uc3QgZ2V0TW9kdWxlTGlzdCA9IChyZXMsIG1vZHVsZUluZGV4LCBsb2dEYXRhKSA9PiB7XG4gIC8vIOmAmui/h21hcOiOt+WPluWAvFxuICBjb25zdCBzaG93TW9kdWxlSW5kZXggPSBtb2R1bGVJbmRleDtcbiAgY29uc3QgdGFncyA9IERFRkFVTFRfREFUQS5TVVBQT1JUX01PRFVMRV9DT05GSUc7XG4gIGNvbnN0IF9tb2R1bGVzID0gcmVzLnJlc3VsdC5kYXRhLmRhdGEubGlzdDtcbiAgY29uc3QgX21vZHVsZUxpc3QgPSBbXTtcbiAgY29uc3QgX3NwbUNvbmZpZyA9IERFRkFVTFRfREFUQS5TUE1fQ09ORklHLmluZGV4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgX21vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyDmqKHlnZdcbiAgICBjb25zdCBfbW9kdWxlSXRlbSA9IHt9O1xuICAgIF9tb2R1bGVJdGVtLnRpdGxlID0gX21vZHVsZXNbaV0udGl0bGU7XG4gICAgX21vZHVsZUl0ZW0uaGlkZGVuSGVhZGVyID0gX21vZHVsZXNbaV0uaGlkZGVuSGVhZGVyO1xuICAgIF9tb2R1bGVJdGVtLm1vZHVsZUlkID0gX21vZHVsZXNbaV0ubW9kdWxlSWQ7XG4gICAgX21vZHVsZUl0ZW0uc3BtID0gYCR7X3NwbUNvbmZpZy5zcG19XyR7bG9nRGF0YS5wYWdlSWR9LiR7X21vZHVsZXNbaV0ubW9kdWxlSWR9LjBgO1xuXG4gICAgbGV0IGlzU2VuZExvZyA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBfbW9kdWxlc1tpXS5jb21wb25lbnRzIHx8IFtdO1xuICAgIGNvbnN0IF9jb21wb25lbnREYXRhID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgIC8vIOaKveWxiVxuICAgICAgY29uc3QgY29tcG9uZW50SXRlbSA9IGNvbXBvbmVudHNba2V5XTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNvbXBvbmVudEl0ZW0pO1xuICAgICAgY29uc3QgdGFnID0gY29tcG9uZW50SXRlbS50ZW1wbGF0ZS5wcmlvcml0eVRhZyB8fCBjb21wb25lbnRJdGVtLnRlbXBsYXRlLnRhZztcbiAgICAgIGNvbnN0IGlzSW4gPSB0YWdzLmZpbmQodmFsdWUgPT4gdmFsdWUgPT09IHRhZyk7XG4gICAgICBpZiAoaXNJbikge1xuICAgICAgICBjb25zdCBfdGVtcENvbXBvbmVudCA9IHt9O1xuICAgICAgICBjb25zdCBfaXRlbVJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpdGVta2V5IGluIGNvbXBvbmVudEl0ZW0uaXRlbVJlc3VsdC5pdGVtKSB7XG4gICAgICAgICAgLy8g6YeN5p6E5Y2h54mHXG4gICAgICAgICAgY29uc3QgX2l0ZW0gPSBjb21wb25lbnRJdGVtLml0ZW1SZXN1bHQuaXRlbVtpdGVta2V5XTtcbiAgICAgICAgICBfaXRlbS5zcG0gPSBgJHtfc3BtQ29uZmlnLnNwbX1fJHtsb2dEYXRhLnBhZ2VJZH0uJHtfbW9kdWxlc1tpXS5tb2R1bGVJZH0uJHtjb21wb25lbnRJdGVtLmNvbXBvbmVudElkfV8ke2l0ZW1rZXl9YDtcbiAgICAgICAgICBfaXRlbVJlc3VsdC5wdXNoKF9pdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBfdGVtcENvbXBvbmVudC5pdGVtUmVzdWx0ID0gX2l0ZW1SZXN1bHQ7XG4gICAgICAgIF90ZW1wQ29tcG9uZW50LnR5cGUgPSB0YWc7XG4gICAgICAgIF90ZW1wQ29tcG9uZW50LmNvbXBvbmVudElkID0gY29tcG9uZW50SXRlbS5jb21wb25lbnRJZDtcblxuICAgICAgICBpZiAoIWlzU2VuZExvZykge1xuICAgICAgICAgIC8vIOWPkemAgeaooeWdl+aXpeW/l1xuICAgICAgICAgIGxldCBfZGF0YSA9IHt9O1xuICAgICAgICAgIF9kYXRhLnRpdGxlID0gbG9nRGF0YS5uYXZMaXN0W2xvZ0RhdGEucGFnZUlkXS5wYWdlTmFtZSArICdfJyArIF9tb2R1bGVJdGVtLnRpdGxlO1xuICAgICAgICAgIF9kYXRhLnVybCA9IF9zcG1Db25maWcucGFnZTtcbiAgICAgICAgICBfZGF0YS5zcG0gPSBfbW9kdWxlSXRlbS5zcG07XG4gICAgICAgICAgX2RhdGEucmVmZXJVcmwgPSBsb2dEYXRhLnNvdXJjZTtcbiAgICAgICAgICBfZGF0YS5yZWZlclNwbSA9IGxvZ0RhdGEucmVmZXJTcG07XG4gICAgICAgICAgc2VuZEdvbGRMb2coX2RhdGEpO1xuICAgICAgICAgIGlmIChfdGVtcENvbXBvbmVudC50eXBlID09PSAnUEhPTkVfTFVOQk8nKSB7XG4gICAgICAgICAgICAvLyDlj5HpgIHliJ3lp4vova7mkq3lm77mm53lhYnnu5/orqFcbiAgICAgICAgICAgIF9kYXRhID0ge307XG4gICAgICAgICAgICBjb25zdCBfbW9kdWxlcyA9IF90ZW1wQ29tcG9uZW50Lml0ZW1SZXN1bHRbMF07XG4gICAgICAgICAgICBfZGF0YS50aXRsZSA9IF9tb2R1bGVzLnRpdGxlO1xuICAgICAgICAgICAgX2RhdGEudXJsID0gX3NwbUNvbmZpZy5wYWdlO1xuICAgICAgICAgICAgX2RhdGEuc3BtID0gX21vZHVsZXMuc3BtO1xuICAgICAgICAgICAgX2RhdGEucmVmZXJVcmwgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgICAgICAgICBfZGF0YS5yZWZlclNwbSA9ICcnO1xuICAgICAgICAgICAgc2VuZEdvbGRMb2coX2RhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc1NlbmRMb2cgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhZ2VEYXRhID0ge307XG4gICAgICAgIHBhZ2VEYXRhLm5vd1BhZ2UgPSAxO1xuICAgICAgICBwYWdlRGF0YS5zdGFydEluZGV4ID0gMDtcbiAgICAgICAgLy8gY29tcG9uZW50SXRlbS5saW5lID0gMTtcbiAgICAgICAgaWYgKHRhZyA9PT0gJ1BIT05FX0JBU0VfQicpIHtcbiAgICAgICAgICBwYWdlRGF0YS5udW0gPSAyICogY29tcG9uZW50SXRlbS5saW5lO1xuICAgICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ1BIT05FX0JBU0VfQycpIHtcbiAgICAgICAgICBwYWdlRGF0YS5udW0gPSAzICogY29tcG9uZW50SXRlbS5saW5lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhZ2VEYXRhLm51bSA9IF9pdGVtUmVzdWx0Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBwYWdlRGF0YS5lbmRJbmRleCA9IHBhZ2VEYXRhLm51bSAtIDE7XG4gICAgICAgIHBhZ2VEYXRhLnRvdGFsTnVtID0gX2l0ZW1SZXN1bHQubGVuZ3RoO1xuICAgICAgICBwYWdlRGF0YS5wYWdlID0gTWF0aC5jZWlsKHBhZ2VEYXRhLnRvdGFsTnVtIC8gcGFnZURhdGEubnVtKTtcbiAgICAgICAgc2hvd01vZHVsZUluZGV4W2NvbXBvbmVudEl0ZW0uY29tcG9uZW50SWRdID0gcGFnZURhdGE7XG5cbiAgICAgICAgX3RlbXBDb21wb25lbnQuaGFzTmV4dCA9IGNvbXBvbmVudEl0ZW0uaXRlbVJlc3VsdC5oYXNOZXh0O1xuICAgICAgICBfY29tcG9uZW50RGF0YS5wdXNoKF90ZW1wQ29tcG9uZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKF9jb21wb25lbnREYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIF9tb2R1bGVJdGVtLmNvbXBvbmVudHMgPSBfY29tcG9uZW50RGF0YTtcbiAgICAgIF9tb2R1bGVMaXN0LnB1c2goX21vZHVsZUl0ZW0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW3Nob3dNb2R1bGVJbmRleCwgX21vZHVsZUxpc3RdO1xufVxuLyoqXG4gKiDojrflj5bmkq3mlL7pobXmqKHlnZfor6bnu4bkv6Hmga9cbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIOaooeWdl+aVsOaNrlxuICogQHBhcmFtIHtTdHJpbmd9IHZpZGVvQXJncyDop4bpopHmlbDmja5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIOWbnuiwg+aWueazlVxuICovXG5jb25zdCBnZXRNb2R1bGVDb21tZW50ID0gKGRhdGEsIHZpZGVvQXJncywgY2FsbGJhY2spID0+IHtcbiAgaWYgKCFkYXRhKSByZXR1cm47XG4gIGxldCBhc3luY0xvYWQgPSBkYXRhLmFzeW5jTG9hZDtcbiAgY29uc3QgYXJncyA9IHt9O1xuICBsZXQgcmVzdWx0ID0gZGF0YS5pdGVtUmVzdWx0ID8gZGF0YS5pdGVtUmVzdWx0Lml0ZW0gOiBudWxsO1xuXG4gIGlmIChhc3luY0xvYWQpIHtcbiAgICBhcmdzLmNvbXBvbmVudElkID0gZGF0YS5jb21wb25lbnRJZDtcbiAgICBpZiAodmlkZW9BcmdzLnNob3dpZCkge1xuICAgICAgYXJncy5zaG93aWQgPSB2aWRlb0FyZ3Muc2hvd2lkO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmdzLnZpZCA9IHZpZGVvQXJncy52aWQ7XG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBvcHRpb25zLnVybCA9IFVSTF9BRERSRVNTLlBMQVlfREVUQUlMX0NPTVBPTkVOVDtcbiAgICBvcHRpb25zLnNpZ24gPSB0cnVlO1xuICAgIG9wdGlvbnMuZGF0YSA9IGFyZ3M7XG4gICAgb3B0aW9ucy5jYWxsYmFjayA9IChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMuaXNTdWNjZXNzICYmIHJlcy5yZXN1bHQgJiYgcmVzLnJlc3VsdC5kYXRhKSB7XG4gICAgICAgIGNvbnN0IHJlc0RhdGEgPSByZXMucmVzdWx0LmRhdGE7XG4gICAgICAgIGlmIChyZXNEYXRhLmRhdGEgJiYgcmVzRGF0YS5kYXRhLmRhdGEpIHtcbiAgICAgICAgICByZXN1bHQgPSByZXNEYXRhLmRhdGEuZGF0YS5pdGVtUmVzdWx0ID8gcmVzRGF0YS5kYXRhLmRhdGEuaXRlbVJlc3VsdC5pdGVtIDogbnVsbDtcbiAgICAgICAgICByZXN1bHQgPSBzZXRTcG0ocmVzdWx0LCBkYXRhLnNwbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgfTtcbiAgICByZXF1ZXN0RGF0YShvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSBzZXRTcG0ocmVzdWx0LCBkYXRhLnNwbSk7XG4gICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdCk7XG4gIH1cbn1cbmNvbnN0IHNldFNwbSA9IChkYXRhLCBzcG0pID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAobGV0IGtleSBpbiBkYXRhKSB7XG4gICAgY29uc3QgaXRlbURhdGEgPSBkYXRhW2tleV07XG4gICAgaXRlbURhdGEuc3BtID0gYCR7c3BtfV8ke2tleX1gO1xuICAgIHJlc3VsdC5wdXNoKGl0ZW1EYXRhKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiDlj5HpgIHml6Xlv5dcbiAqL1xuY29uc3Qgc2VuZEdvbGRMb2cgPSAoYXJncykgPT4ge1xuICBjb25zdCBvcHRpb25zID0ge307XG4gIGNvbnN0IF9wYXJhbXMgPSB7fTtcbiAgX3BhcmFtcy5sb2d0eXBlID0gMTtcbiAgX3BhcmFtcy50aXRsZSA9IGFyZ3MudGl0bGUgfHwgJyc7IC8vICdwYWdlX2hvbWVjaGFubmVsJzsgLy8g5qCH6aKYXG4gIF9wYXJhbXMuYXBsdXMgPSAnJztcbiAgX3BhcmFtcy5jZmd2ZXIgPSAndnguMS4wJztcbiAgbGV0IHV1aWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd5b3VrdS11dWlkJyk7XG4gIGlmICghdXVpZCkge1xuICAgIHV1aWQgPSBSYW5kb20ucmFuZCgzMiwgMTYpLnRvTG93ZXJDYXNlKCk7XG4gICAgd2VweS5zZXRTdG9yYWdlU3luYygneW91a3UtdXVpZCcsIHV1aWQpO1xuICB9XG4gIF9wYXJhbXMucHVfaSA9IHV1aWQgfHwgJyc7IC8vIOeUqOaIt3V1aWRcbiAgX3BhcmFtcy5fcF91cmwgPSBhcmdzLnVybCB8fCAnJzsgLy8gJ3BhZ2VfaG9tZWNoYW5uZWwnOyAvLyDlvZPliY3pobXpnaJ1cmxcbiAgX3BhcmFtcy5fcF9yZWYgPSBhcmdzLnJlZmVyVXJsIHx8ICcnOyAvLyDmnaXmupDpobXpnaJ1cmxcbiAgX3BhcmFtc1snc3BtLWNudCddID0gYXJncy5zcG0gfHwgJyc7IC8vICdhMmg4OS4xMTM2MTc1OCc7IC8vIOW9k+WJjemhtemdonNwbVxuICBfcGFyYW1zWydzcG0tdXJsJ10gPSBhcmdzLnJlZmVyU3BtIHx8ICcnOyAgLy8g5p2l5rqQ6aG16Z2ic3BtXG4gIGxldCBzY3JlZW5XaWR0aCA9IDA7XG4gIGxldCBzY3JlZW5IZWlnaHQgPSAwO1xuICBsZXQgcGxhdGZvcm0gPSAnd3gnO1xuICB0cnkge1xuICAgIHZhciByZXMgPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgLy8g5bGP5bmV5a695bqmXG4gICAgc2NyZWVuV2lkdGggPSByZXMuc2NyZWVuV2lkdGg7XG4gICAgLy8g5bGP5bmV6auY5bqmXG4gICAgc2NyZWVuSGVpZ2h0ID0gcmVzLnNjcmVlbkhlaWdodDtcbiAgICBwbGF0Zm9ybSA9IHJlcy5wbGF0Zm9ybTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGVycm9yXG4gIH1cbiAgX3BhcmFtcy5fcF9vcyA9IHBsYXRmb3JtOyAvLyDlubPlj7BcbiAgX3BhcmFtcy5fcF9zY3IgPSBgJHtzY3JlZW5XaWR0aH0qJHtzY3JlZW5IZWlnaHR9YDsgLy8g5YiG6L6o546HXG4gIF9wYXJhbXMuX3BfcGYgPSAnd3gnOyAvLyDlubPlj7DnsbvlnotcbiAgX3BhcmFtcy5jYWNoZSA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApO1xuXG4gIG9wdGlvbnMudXJsID0gVVJMX0FERFJFU1MuTE9HX1VSTCArICc/JyArIGZvcm1hdFBhcmFtcyhfcGFyYW1zKTtcbiAgb3B0aW9ucy5jYWxsYmFjayA9IChyZXMpID0+IHtcbiAgICAvLyBjb21wbGV0ZVxuICB9O1xuICByZXF1ZXN0RGF0YShvcHRpb25zKTtcbn1cbi8qKlxuICog54K55Ye75pel5b+XXG4gKiBAcGFyYW0ge09iamVjdH0gYXJncyDlj4LmlbBcbiAqL1xuY29uc3Qgc2VuZEV2ZW50TG9nID0gKGFyZ3MpID0+IHtcbiAgaWYgKCFhcmdzLmV2ZW50Q29kZSkgcmV0dXJuO1xuICBjb25zdCBvcHRpb25zID0ge307XG4gIGNvbnN0IF9wYXJhbXMgPSB7fTtcblxuICBfcGFyYW1zLmV2ZW50VHlwZSA9ICdDTEknO1xuICBfcGFyYW1zLmV2ZW50Q29kZSA9IGFyZ3MuZXZlbnRDb2RlO1xuICBvcHRpb25zLnVybCA9IFVSTF9BRERSRVNTLkVWRU5UX0xPRztcbiAgb3B0aW9ucy5kYXRhID0gX3BhcmFtcztcbiAgb3B0aW9ucy5jYWxsYmFjayA9IChyZXMpID0+IHtcbiAgICAvLyBjb21wbGV0ZVxuICB9O1xuICByZXF1ZXN0RGF0YShvcHRpb25zKVxufVxuLyoqXG4gKiDmkq3mlL7mnI3liqFcbiAqIEBwYXJhbSB7Kn0gYXJncyDlj4LmlbBcbiAqL1xuY29uc3QgZ2V0VXBzRGF0YSA9IChhcmdzLCBjYWxsYmFjaykgPT4ge1xuICB3ZXB5LnJlcXVlc3Qoe1xuICAgIHVybDogVVJMX0FERFJFU1MuUExBWUVSX1VQUyxcbiAgICBkYXRhOiBhcmdzLFxuICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICBjYWxsYmFjayh7J2lzU3VjY2Vzcyc6IHRydWUsICdyZXN1bHQnOiBkYXRhfSk7XG4gICAgfSxcbiAgICBmYWlsOiAoZGF0YSkgPT4ge1xuICAgICAgY2FsbGJhY2soeydpc1N1Y2Nlc3MnOiBmYWxzZSwgJ3Jlc3VsdCc6IGRhdGF9KTtcbiAgICB9XG4gIH0pXG59O1xuZXhwb3J0IHtcbiAgZ2V0TW9kdWxlQ29tbWVudCxcbiAgZ2V0VXBzRGF0YSxcbiAgVVJMX0FERFJFU1MsXG4gIGNyZWF0ZVNpZ24sXG4gIHNlbmRFdmVudExvZyxcbiAgcmVxdWVzdERhdGEsXG4gIHNlbmRHb2xkTG9nLFxuICBnZXRNb2R1bGVMaXN0XG59XG4iXX0=