/**
 * 更优雅的让接口同时支持callback和promise
 * @example
 * function xxx(p1, p2, fn) {
 *   fn = fn || createPromiseCallback();
 *   // your code here...
 *   return fn.promise;
 * }
 */
function createPromiseCallback() {
    var cb = void 0;
    if (!Promise) {
        cb = function() {};
        cb.promise = {};
        var throwPromiseNotDefined = function() {
            throw new Error("Must support ES6 Promises.");
        };
        Object.defineProperty(cb.promise, "then", {
            get: throwPromiseNotDefined
        });
        Object.defineProperty(cb.promise, "catch", {
            get: throwPromiseNotDefined
        });
        return cb;
    }
    var promise = new Promise(function(resolve, reject) {
        cb = function(err, data) {
            if (err) return reject(err);
            return resolve(data);
        };
    });
    cb.promise = promise;
    return cb;
}

// export {
//   global
// }
var lut = [];

for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? "0" : "") + i.toString(16);
}

function guid() {
    var d0 = Math.random() * 4294967295 | 0;
    var d1 = Math.random() * 4294967295 | 0;
    var d2 = Math.random() * 4294967295 | 0;
    var d3 = Math.random() * 4294967295 | 0;
    return lut[d0 & 255] + lut[d0 >> 8 & 255] + lut[d0 >> 16 & 255] + lut[d0 >> 24 & 255] + "-" + lut[d1 & 255] + lut[d1 >> 8 & 255] + "-" + lut[d1 >> 16 & 15 | 64] + lut[d1 >> 24 & 255] + "-" + lut[d2 & 63 | 128] + lut[d2 >> 8 & 255] + "-" + lut[d2 >> 16 & 255] + lut[d2 >> 24 & 255] + lut[d3 & 255] + lut[d3 >> 8 & 255] + lut[d3 >> 16 & 255] + lut[d3 >> 24 & 255];
}

/* global wx */ var apiDomain = "https://account.youku.com";

// const apiDomain = 'http://account.heyi.test'
// let thirdPartyLoginTask
function thirdPartyLogin(param, callback) {
    // if (thirdPartyLoginTask && thirdPartyLoginTask.abort) {
    //   thirdPartyLoginTask.abort()
    //   thirdPartyLoginTask = null
    // }
    console.log("request thirdPartyLogin ->", param);
    wx.request({
        url: apiDomain + "/api/thirdPartyLogin.htm",
        method: "POST",
        data: param,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
            var data = res.data;
            data.resultCode !== 0 ? callback(data) : callback(null, data.content);
        },
        fail: function(err) {
            callback(err);
        }
    });
}

/**
 * 服务端登出
 * @param {Object} param 请求参数
 *   {String} appid 应用ID
 *   {String} pid 业务方ID
 *   {String} stoken 会话token
 *   {String} ptoken 长期会话token
 * @param {Function} callback 回调方法
 */ function logout(param, callback) {
    console.log("request logout ->", param);
    wx.request({
        url: apiDomain + "/api/logout.htm",
        method: "POST",
        data: param,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
            var data = res.data;
            data.resultCode !== 0 ? callback(data) : callback(null, true);
        },
        fail: function(err) {
            callback(err);
        }
    });
}

/**
 * 校验会话token有效性 / 换新的stoken
 * @param {Object} param 请求参数
 *   {String} appid 应用ID
 *   {String} pid 业务方ID
 *   {String} stoken 会话token
 *   {String} ptoken 长期会话token
 * @param {Function} callback 回调方法
 */ function verifyCookie(param, callback) {
    console.log("request verifyCookie ->", param);
    wx.request({
        url: apiDomain + "/api/verifyCookie.htm",
        method: "POST",
        data: param,
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
            var data = res.data;
            data.resultCode !== 0 ? callback(data) : callback(null, data.content);
        },
        fail: function(err) {
            callback(err);
        }
    });
}

var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

/**
 * 针对微信写的小程序调用SDK
 * 对接文档：https://lark.alipay.com/yk-passport/qypltl/hn054g
 * @author: asins <wkli@alibaba-inc.com>
 */
// 微信小程序本地Storage存储名字
var wxStorageName = "yk-psp-sdk";

// 微信小程序
var wxPspAppid = "wx6625326b861ee496";

// 记录用户登录态信息
var ptokenExpireTimeKey = "ptokenExpireTime";

// ptoken失效时间戳
var stokenExpireTimeKey = "stokenExpireTime";

// stoken失效时间戳
// sdk单例
var _instance = null;

// sdk调起的优酷PSP小程序执行队列
var _flowQueue = {};

var _class = function() {
    function _class(config) {
        classCallCheck(this, _class);
        if (_instance) {
            // 已实例
            // 子小程序有返回结果，进入后续逻辑
            if (config.navigateBack) this._backFlow(config.navigateBack);
            return _instance;
        }
        Object.assign(this, {
            pid: "",
            // 业务方ID
            appid: "",
            // 应用ID
            env: "release"
        }, config);
        _instance = this;
        var _db = this._getDb();
        // 登录态凭证数据
                if (_db) {
            this.checkLogin({
                forceRemote: true
            });
        }
    }
    _class.prototype._getDb = function _getDb() {
        var _db = null;
        try {
            var dbStr = wx.getStorageSync(wxStorageName);
            if (dbStr && typeof dbStr === "string") {
                _db = JSON.parse(dbStr);
            } else if (typeof dbStr === "object" && dbStr !== null) {
                _db = dbStr;
            }
        } catch (e) {}
        return _db;
    };
    // 修改登录凭证
        _class.prototype._setDb = function _setDb(data, callback) {
        var _db = this._getDb() || {};
        if (data.ptoken && data[ptokenExpireTimeKey]) {
            _db.ptoken = data.ptoken;
            _db[ptokenExpireTimeKey] = data[ptokenExpireTimeKey];
        }
        if (data.stoken && data[stokenExpireTimeKey]) {
            _db.stoken = data.stoken;
            _db[stokenExpireTimeKey] = data[stokenExpireTimeKey];
        }
        wx.setStorage({
            key: wxStorageName,
            data: _db,
            success: function() {
                console.log("save login to local storage success");
                callback && callback(null, true);
            },
            fail: function(err) {
                callback && callback(err.errMsg);
            }
        });
    };
    // 删除内存及Storage中的登录态信息
        _class.prototype._delDb = function _delDb() {
        wx.removeStorage({
            key: wxStorageName
        });
    };
    /**
   * 检测登录状态 登录信息失效自动清空
   * @param {Object} option 参数对象
   *   {Boolean} forceRemote 是否强制服务端检测
   */    _class.prototype.checkLogin = function checkLogin() {
        var _this = this;
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = createCallback(option);
        var _db = this._getDb() || {};
        var nowT = Date.now();
        // stoken过期且ptoken有效  或者  强制服务端检测且stoken有效   则去服务端换新的
                if (nowT > _db[stokenExpireTimeKey] && nowT < _db[ptokenExpireTimeKey] || option.forceRemote === true && nowT < _db[ptokenExpireTimeKey]) {
            var param = {
                pid: this.pid,
                appid: this.appid,
                stoken: _db.stoken,
                ptoken: _db.ptoken
            };
            verifyCookie(param, function(err) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                if (!err && data) {
                    // ptoken校验通过，生成了新的stoken
                    _this._setDb(data);
                } else {
                    _this._delDb();
                }
                callback(null, !!data);
            });
        }
        // TODO 目前不能直接调用callback，必须返回promise才能保证后续then方法支持
                setTimeout(function() {
            // stoken、ptoken都在有效时间内则弱校验为已登录
            if (nowT < _db[ptokenExpireTimeKey] && nowT < _db[ptokenExpireTimeKey]) {
                return callback(null, true);
            }
            // 其它则为未登录（ptoken过期、this._bd不存在）
                        _this._delDb();
            return callback(null, false);
        }, 0);
        return callback.promise;
    };
    // 强制登录（不管是否已登录，不然存在流程死循环）
        _class.prototype.needLogin = function needLogin() {
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = createCallback(option);
        this._needLogin(option, callback);
        return callback.promise;
    };
    _class.prototype._needLogin = function _needLogin(option, callback) {
        var _this2 = this;
        var flowParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var userInfo = (callback.isCb ? option.userInfo : option) || {};
        if (!userInfo.iv || !userInfo.encryptedData) {
            return setTimeout(function() {
                callback("未授权无法完成登录");
            }, 0);
        }
        var loginSuccessFn = function(data) {
            _this2._setDb(data, function(err, isOk) {
                if (err) callback(err); else callback(null, true);
            });
        };
        var errHandle = function(err) {
            console.log("_needLogin error -> ", err);
            var content = err.content || {};
            // 账号被禁用
                        if (err.resultCode === -1) {
                // 系统异常  resultCode: -1  exceptionCode: SYS_EXCEPTION resultMsg
                _this2._toFlow({
                    path: "pages/system-error"
                }, function() {
                    callback(null, false);
                });
            } else if (err.riskErrorCode === "RISK_USER_INTERCEPTOR_FOR_RESET_PWD") {
                // 强制重置密码
                _this2._toFlow({
                    path: "pages/risk/reset-passport"
                }, function() {
                    callback(null, false);
                });
            } else if (err.riskErrorCode === "RISK_USER_INTERCEPTOR_FOR_VALIDATE_MOBILE") {
                // 强制验证手机
                var handleCb = function(err, data) {
                    if (err) return callback(err);
                    if (data.ptoken && data.stoken) {
                        loginSuccessFn(data);
                    } else {
                        _this2._needLogin(option, callback);
                    }
                };
                _this2._toFlow({
                    path: "pages/risk/validate-mobile",
                    extraData: {
                        pid: _this2.pid,
                        appid: _this2.appid,
                        nickname: content.nickname,
                        mobile: content.hiddenMobile,
                        userInfoToken: content.userInfoToken || ""
                    }
                }, handleCb);
            } else if (err.exceptionCode === "CAPTCHA_ERROR") {
                // 强制滑块/图片验证
                var _handleCb = function(err, data) {
                    if (err) return callback(err);
                    _this2._needLogin(option, callback, data);
                };
                _this2._toFlow({
                    path: "pages/risk/verification",
                    extraData: {
                        pid: _this2.pid,
                        appid: _this2.appid
                    }
                }, _handleCb);
            } else {
                // this._toFlow({
                //   path: 'pages/error',
                //   extraData: {
                //     errorMsg: err.resultMsg,
                //   },
                // }, () => {
                callback(err.resultMsg);
                // })
                        }
        };
        // 微信登录
                wx.login({
            success: function(res) {
                console.log("wx.login success", res);
                if (res.code) {
                    var param = Object.assign({
                        authCode: res.code,
                        appid: _this2.appid,
                        tlsite: "wechat",
                        tlsiteSource: "miniProgram",
                        iv: userInfo.iv || "",
                        encryptedData: userInfo.encryptedData || ""
                    }, flowParam);
                    // console.log('请求优酷后端接口', param)
                                        thirdPartyLogin(param, function(err, data) {
                        if (err) return errHandle(err);
                        // console.log('登录成功了', data)
                                                loginSuccessFn(data);
                    });
                } else {
                    callback("微信登录失败");
                }
            }
        });
    };
    // 登出
        _class.prototype.logout = function logout$$1() {
        var _this3 = this;
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = createCallback(option);
        var _db = this._getDb();
        if (!_db) {
            setTimeout(function() {
                callback(null, true);
            }, 0);
        }
        var param = {
            pid: this.pid,
            appid: this.appid,
            stoken: _db.stoken,
            ptoken: _db.ptoken
        };
        logout(param, function(err, isLogged) {
            if (err) callback(err);
            if (isLogged) _this3._delDb();
            callback(null, isLogged);
        });
        return callback.promise;
    };
    // 获取登录凭证
        _class.prototype.getToken = function getToken() {
        var _db = this._getDb();
        if (!_db) return {};
        return {
            ptoken: _db.ptoken,
            stoken: _db.stoken
        };
    };
    // 发送网络请求（封装了登录校验参数）
        _class.prototype.request = function request() {
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var isCb = option.success && typeof option.success === "function";
        var _db = this._getDb();
        if (!option.data) option.data = {};
        // 补上登录凭证
                if (_db) {
            Object.assign(option.data, {
                P_pck_rm: _db.ptoken,
                P_sck: _db.stoken
            });
        }
        if (isCb) return wx.request(option);
        // Promise
                var callback = createPromiseCallback();
        option = Object.assign({}, option, {
            success: function(res) {
                callback(null, res);
            },
            fail: function(err) {
                callback(err);
            }
        });
        wx.request(option);
        return callback.promise;
    };
    // 进入特定工作流
        _class.prototype.toFlow = function toFlow() {
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = createCallback(option);
        this._toFlow(option, callback);
        return callback.promise;
    };
    /**
   * 进入特定工作流
   * @param {Object} option 请求参数
   *   {String} path 请求的页面
   *   {String} env 打开优酷Passport小程序的版本 默认为release
   *   {String} extraData 传给优酷Passport小程序的参数对象
   * @param {Function/Promise} callback 在子程序中回来后的回调方法名
   */    _class.prototype._toFlow = function _toFlow() {
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments[1];
        var extraData = option.extraData || {};
        if (callback && typeof callback === "function") {
            var _flowGuid = guid();
            extraData._flowGuid = _flowGuid;
            _flowQueue[_flowGuid] = callback;
        }
        console.log("SDK _toFlow --\x3e ", option);
        wx.navigateToMiniProgram({
            appId: wxPspAppid,
            path: option.path,
            envVersion: this.env,
            extraData: extraData,
            fail: function(err) {
                console.log("SDK _toFlow to miniprogram error --\x3e ", err);
                delete _flowQueue[extraData._flowGuid];
                wx.navigateTo({
                    url: option.path.replace(/^pages\//i, ""),
                    success: function(res) {
                        callback(null, res);
                    },
                    fail: function(err) {
                        callback(err);
                    }
                });
            }
        });
    };
    // 从工作流(子小程序)返回业务小程序中
        _class.prototype._backFlow = function _backFlow() {
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var extraData = (option.referrerInfo || {}).extraData;
        if (extraData && extraData._flowGuid && _flowQueue[extraData._flowGuid]) {
            var callback = _flowQueue[extraData._flowGuid];
            console.log("SDK _backFlow -> ", option);
            // 清除内存占用
                        delete _flowQueue[extraData._flowGuid];
            // 删除对业务方无关属性
                        delete extraData._flowGuid;
            if (extraData.error) {
                callback(extraData.error);
            } else {
                callback(null, extraData);
            }
        }
    };
    return _class;
}();

function createCallback(opt) {
    var callback = void 0;
    var isCb = opt.success && typeof opt.success === "function";
    if (isCb) {
        callback = function(err, res) {
            if (err) {
                opt.fail && opt.fail(err);
            } else {
                opt.success(res);
            }
        };
    } else {
        callback = createPromiseCallback();
    }
    callback.isCb = isCb;
    return callback;
}

module.exports = _class;