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

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _mixins = require("./../mixins/index.js");

var _mixins2 = _interopRequireDefault(_mixins);

var _footer = require("./../components/common/footer.js");

var _footer2 = _interopRequireDefault(_footer);

var _swiperLayer = require("./../components/index/swiperLayer.js");

var _swiperLayer2 = _interopRequireDefault(_swiperLayer);

var _drawList = require("./../components/index/drawList.js");

var _drawList2 = _interopRequireDefault(_drawList);

var _singlePicture = require("./../components/index/singlePicture.js");

var _singlePicture2 = _interopRequireDefault(_singlePicture);

var _adList = require("./../components/index/adList.js");

var _adList2 = _interopRequireDefault(_adList);

var _line = require("./../components/index/line.js");

var _line2 = _interopRequireDefault(_line);

var _update = require("./../components/index/update.js");

var _update2 = _interopRequireDefault(_update);

var _dataError = require("./../components/common/dataError.js");

var _dataError2 = _interopRequireDefault(_dataError);

var _API = require("./../API/index.js");

var _util = require("./../utils/util.js");

var _defaultData = require("./../config/default-data.js");

var _defaultData2 = _interopRequireDefault(_defaultData);

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

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

// import listData from '@/config/listMock' // mock数据
var List = function(_wepy$page) {
    _inherits(List, _wepy$page);
    function List() {
        var _ref;
        var _temp, _this, _ret;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        _classCallCheck(this, List);
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            navigationBarTitleText: "优酷视频",
            disableScroll: true
        }, _this.data = {
            navList: [],
            errorType: "",
            loading: false,
            showModuleIndex: {},
            navData: [],
            pageId: -1,
            networkType: "",
            scrollHeight: 566,
            // 来源
            source: "",
            // 来源spm
            referSpm: "",
            countRequest: 0,
            _timer: ""
        }, _this.mixins = [ _mixins2.default ], _this.$repeat = {
            moduleItem: {
                com: "update",
                props: ""
            }
        }, _this.$props = {
            swiperlayer: {
                "v-bind:CompontentData.once": {
                    value: "componentItem.itemResult",
                    for: "moduleItem.components",
                    item: "componentItem",
                    index: "index",
                    key: "key"
                }
            },
            singlepicture: {
                "v-bind:CompontentData.once": {
                    value: "componentItem.itemResult[0]",
                    for: "moduleItem.components",
                    item: "componentItem",
                    index: "index",
                    key: "key"
                }
            },
            drawlist: {
                "v-bind:CompontentData.once": {
                    value: "componentItem.itemResult",
                    for: "moduleItem.components",
                    item: "componentItem",
                    index: "index",
                    key: "key"
                },
                "v-bind:pageData.sync": {
                    value: "showModuleIndex[componentItem.componentId]",
                    for: "moduleItem.components",
                    item: "componentItem",
                    index: "index",
                    key: "key"
                },
                "v-bind:type.once": {
                    value: "componentItem.type",
                    for: "moduleItem.components",
                    item: "componentItem",
                    index: "index",
                    key: "key"
                }
            },
            adlist: {
                "v-bind:CompontentData.once": {
                    value: "componentItem.itemResult",
                    for: "moduleItem.components",
                    item: "componentItem",
                    index: "index",
                    key: "key"
                },
                "v-bind:type.once": {
                    value: "componentItem.type",
                    for: "moduleItem.components",
                    item: "componentItem",
                    index: "index",
                    key: "key"
                }
            },
            update: {
                "v-bind:componentId.once": {
                    value: "componentItem.componentId",
                    for: "moduleItem.components",
                    item: "componentItem",
                    index: "index",
                    key: "key"
                }
            },
            dataerror: {
                "xmlns:v-bind": "",
                "v-bind:errorType.sync": "errorType"
            }
        }, _this.$events = {}, _this.components = {
            swiperlayer: _swiperLayer2.default,
            singlepicture: _singlePicture2.default,
            drawlist: _drawList2.default,
            adlist: _adList2.default,
            footer: _footer2.default,
            line: _line2.default,
            update: _update2.default,
            dataerror: _dataError2.default
        }, _this.watch = {
            pageId: function pageId(newValue, oldValue) {
                if (newValue === oldValue) return;
                this.sendLog(newValue, oldValue);
                this.setPage();
            }
        }, _this.events = {
            REFRASH: function REFRASH($event) {
                _this.setPage();
            },
            UPDATE_COMPONENT: function UPDATE_COMPONENT($event) {
                var pageDate = _this.showModuleIndex[$event.componentId];
                pageDate.nowPage++;
                var start = void 0;
                var end = void 0;
                if (pageDate.nowPage < pageDate.page) {
                    start = (pageDate.nowPage - 1) * pageDate.num;
                    end = pageDate.nowPage * pageDate.num - 1;
                } else if (pageDate.nowPage === pageDate.page) {
                    start = (pageDate.nowPage - 1) * pageDate.num;
                    end = pageDate.totalNum - 1;
                } else {
                    pageDate.nowPage = 1;
                    start = 0;
                    end = pageDate.num - 1;
                }
                pageDate.startIndex = start;
                pageDate.endIndex = end;
                _this.showModuleIndex[$event.componentId] = pageDate;
                _this.$apply();
            },
            NavigateToPlay: function NavigateToPlay(data) {
                var url = (0, _util.getPlayURL)(data);
                _wepy2.default.navigateTo({
                    url: "/pages/" + url
                });
            }
        }, _this.methods = {
            // 选择栏目
            selectNav: function selectNav(index, e) {
                this.pageId = index;
                this.$apply();
            },
            onSlideChangeEnd: function onSlideChangeEnd(e) {
                var _this2 = this;
                this.countRequest++;
                if (this.countRequest > 1) {
                    if (this._timer) {
                        clearTimeout(this._timer);
                        this._timer = null;
                    }
                    this._timer = setTimeout(function() {
                        _this2.pageId = e.detail.current;
                        _this2.countRequest = 0;
                        _this2.$apply();
                    }, 600);
                } else {
                    this.pageId = e.detail.current;
                    this.$apply();
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(List, [ {
        key: "getModuleData",
        // 加载数据
        value: function getModuleData(idNum) {
            var _this3 = this;
            if (this.navData[idNum] && this.navData[idNum].isLoadData) {
                // 如果已存在缓存数据且数据已经在线加载 return
                return;
            }
            this.resetStatus(idNum);
            if (this.networkType === "none") return;
            var options = {};
            options.url = _API.URL_ADDRESS.GET_INDEX_MUDULE;
            options.sign = true;
            options.data = {
                pageId: idNum
            };
            options.callback = function(data) {
                _this3.getModuleComplete(idNum, data);
            };
            (0, _API.requestData)(options);
        }
        /**
     * 获取模块数据 重构数据
     */    }, {
        key: "getModuleComplete",
        value: function getModuleComplete(idNum, res) {
            if (!res.result.data || !res.result.data.data) return;
            var logData = {};
            logData.source = this.source;
            logData.referSpm = this.referSpm;
            logData.navList = this.navList;
            logData.pageId = this.pageId;
            var _moduleListData = (0, _API.getModuleList)(res, this.showModuleIndex, logData);
            this.showModuleIndex = _moduleListData[0];
            this.navData[idNum].moduleList = _moduleListData[1];
            this.navData[idNum].isLoadData = true;
            this.navData[idNum].isError = false;
            this.loading = false;
            this.$apply();
        }
        /**
     * 设置页面
     */    }, {
        key: "setPage",
        value: function setPage() {
            // 切换栏目时跳转到顶部
            _wepy2.default.pageScrollTo({
                scrollTop: 0,
                duration: 0
            });
            for (var i = 0; i < this.navList.length; i++) {
                this.navList[i].navClassCurrent = "";
            }
            this.navList[this.pageId].navClassCurrent = "current";
            // 设置标题
                        if (this.pageId > 0) {
                _wepy2.default.setNavigationBarTitle({
                    title: "优酷视频-" + this.$parent.globalData.navList[this.pageId].pageName
                });
            } else {
                _wepy2.default.setNavigationBarTitle({
                    title: "优酷视频"
                });
            }
            this.getModuleData(this.pageId);
            this.$apply();
        }
        /**
     * 发送页面黄金令箭pv
     */    }, {
        key: "sendLog",
        value: function sendLog(newValue, oldValue) {
            var _data = {};
            var _spmConfig = _defaultData2.default.SPM_CONFIG.index;
            _data.title = this.$parent.globalData.navList[newValue].pageName;
            _data.url = _spmConfig.page;
            _data.spm = _spmConfig.spm + "_" + newValue + ".0.0";
            if (oldValue !== -1) {
                this.source = _spmConfig.page;
                this.referSpm = _spmConfig.spm + "_" + oldValue + ".0.0";
            }
            _data.referUrl = this.source;
            _data.referSpm = this.referSpm;
            (0, _API.sendGoldLog)(_data);
        }
    }, {
        key: "onLoad",
        value: function onLoad(opt, data) {
            var _this4 = this;
            // 获取导航信息
                        this.navList = this.$parent.globalData.navList;
            this.navData = new Array(this.navList.length);
            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    // 计算主体部分高度,单位为px,由于主体px和微信rpx之间换算差导致设置的
                    _this4.scrollHeight = res.windowHeight - 37;
                    _this4.$apply();
                }
            });
            _wepy2.default.getNetworkType({
                complete: function complete(res) {
                    if (res.networkType) {
                        _this4.networkType = res.networkType;
                    } else {
                        _this4.networkType = "none";
                    }
                    _this4.pageId = 0;
                    _this4.$apply();
                }
            });
            _wepy2.default.onNetworkStatusChange(function(result) {
                _this4.networkType = result.networkType;
                _this4.$apply();
            });
            this.$apply();
        }
        /**
     * 重置数据状态
     */    }, {
        key: "resetStatus",
        value: function resetStatus(idNum) {
            this.navData[idNum] = {};
            if (this.networkType === "none") {
                this.navData[idNum].isError = true;
                this.errorType = "nonetwork";
                // 显示无网络
                                _wepy2.default.showToast({
                    title: "网络未连接",
                    icon: "none",
                    duration: 2e3
                });
            } else {
                this.navData[idNum].isError = false;
            }
        }
    } ]);
    return List;
}(_wepy2.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(List, "pages/index"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJuYXZMaXN0IiwiZXJyb3JUeXBlIiwibG9hZGluZyIsInNob3dNb2R1bGVJbmRleCIsIm5hdkRhdGEiLCJwYWdlSWQiLCJuZXR3b3JrVHlwZSIsInNjcm9sbEhlaWdodCIsInNvdXJjZSIsInJlZmVyU3BtIiwiY291bnRSZXF1ZXN0IiwiX3RpbWVyIiwibWl4aW5zIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic3dpcGVybGF5ZXIiLCJzaW5nbGVwaWN0dXJlIiwiZHJhd2xpc3QiLCJhZGxpc3QiLCJmb290ZXIiLCJsaW5lIiwidXBkYXRlIiwiZGF0YWVycm9yIiwid2F0Y2giLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwic2VuZExvZyIsInNldFBhZ2UiLCJldmVudHMiLCIkZXZlbnQiLCJwYWdlRGF0ZSIsImNvbXBvbmVudElkIiwibm93UGFnZSIsInN0YXJ0IiwiZW5kIiwicGFnZSIsIm51bSIsInRvdGFsTnVtIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwiJGFwcGx5IiwidXJsIiwibmF2aWdhdGVUbyIsIm1ldGhvZHMiLCJzZWxlY3ROYXYiLCJpbmRleCIsImUiLCJvblNsaWRlQ2hhbmdlRW5kIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRldGFpbCIsImN1cnJlbnQiLCJpZE51bSIsImlzTG9hZERhdGEiLCJyZXNldFN0YXR1cyIsIm9wdGlvbnMiLCJHRVRfSU5ERVhfTVVEVUxFIiwic2lnbiIsImNhbGxiYWNrIiwiZ2V0TW9kdWxlQ29tcGxldGUiLCJyZXMiLCJyZXN1bHQiLCJsb2dEYXRhIiwiX21vZHVsZUxpc3REYXRhIiwibW9kdWxlTGlzdCIsImlzRXJyb3IiLCJwYWdlU2Nyb2xsVG8iLCJzY3JvbGxUb3AiLCJkdXJhdGlvbiIsImkiLCJsZW5ndGgiLCJuYXZDbGFzc0N1cnJlbnQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwicGFnZU5hbWUiLCJnZXRNb2R1bGVEYXRhIiwiX2RhdGEiLCJfc3BtQ29uZmlnIiwiU1BNX0NPTkZJRyIsInNwbSIsInJlZmVyVXJsIiwib3B0IiwiQXJyYXkiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsIndpbmRvd0hlaWdodCIsImdldE5ldHdvcmtUeXBlIiwiY29tcGxldGUiLCJvbk5ldHdvcmtTdGF0dXNDaGFuZ2UiLCJzaG93VG9hc3QiLCJpY29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7OztBQUhBOzs7SUFLcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxxQkFBZTtBQUZSLEssUUFLVEMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLGVBQVMsS0FISjtBQUlMQyx1QkFBaUIsRUFKWjtBQUtMQyxlQUFTLEVBTEo7QUFNTEMsY0FBUSxDQUFDLENBTko7QUFPTEMsbUJBQWEsRUFQUjtBQVFMQyxvQkFBYyxHQVJUO0FBU0w7QUFDQUMsY0FBUSxFQVZIO0FBV0w7QUFDQUMsZ0JBQVUsRUFaTDtBQWFMQyxvQkFBYyxDQWJUO0FBY0xDLGNBQVE7QUFkSCxLLFFBZ0JQQyxNLEdBQVMsa0IsUUFFVkMsTyxHQUFVLEVBQUMsY0FBYSxFQUFDLE9BQU0sUUFBUCxFQUFnQixTQUFRLEVBQXhCLEVBQWQsRSxRQUNYQyxNLEdBQVMsRUFBQyxlQUFjLEVBQUMsOEJBQTZCLEVBQUMsU0FBUSwwQkFBVCxFQUFvQyxPQUFNLHVCQUExQyxFQUFrRSxRQUFPLGVBQXpFLEVBQXlGLFNBQVEsT0FBakcs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QUNELE9BSEQ7QUFJQSxXQUFLQSxNQUFMO0FBQ0Q7QUFDRDs7Ozs7O2dDQUdZWSxLLEVBQU87QUFDakIsV0FBS2xELE9BQUwsQ0FBYWtELEtBQWIsSUFBc0IsRUFBdEI7QUFDQSxVQUFJLEtBQUtoRCxXQUFMLEtBQXFCLE1BQXpCLEVBQWlDO0FBQy9CLGFBQUtGLE9BQUwsQ0FBYWtELEtBQWIsRUFBb0JhLE9BQXBCLEdBQThCLElBQTlCO0FBQ0EsYUFBS2xFLFNBQUwsR0FBaUIsV0FBakI7QUFDQTtBQUNBLHVCQUFLNEYsU0FBTCxDQUFlO0FBQ2JsQixpQkFBTyxPQURNO0FBRWJtQixnQkFBTSxNQUZPO0FBR2J4QixvQkFBVTtBQUhHLFNBQWY7QUFLRCxPQVRELE1BU087QUFDTCxhQUFLbEUsT0FBTCxDQUFha0QsS0FBYixFQUFvQmEsT0FBcEIsR0FBOEIsS0FBOUI7QUFDRDtBQUNGOzs7O0VBbE8rQixlQUFLOUIsSTs7a0JBQWxCMUMsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgbWl4aW4gZnJvbSAnQC9taXhpbnMvJztcbmltcG9ydCBmb290ZXIgZnJvbSAnQC9jb21wb25lbnRzL2NvbW1vbi9mb290ZXInO1xuaW1wb3J0IHN3aXBlckxheWVyIGZyb20gJ0AvY29tcG9uZW50cy9pbmRleC9zd2lwZXJMYXllcic7XG5pbXBvcnQgZHJhd0xpc3QgZnJvbSAnQC9jb21wb25lbnRzL2luZGV4L2RyYXdMaXN0JztcbmltcG9ydCBzaW5nbGVQaWN0dXJlIGZyb20gJ0AvY29tcG9uZW50cy9pbmRleC9zaW5nbGVQaWN0dXJlJztcbmltcG9ydCBhZExpc3QgZnJvbSAnQC9jb21wb25lbnRzL2luZGV4L2FkTGlzdCc7XG5pbXBvcnQgbGluZSBmcm9tICdAL2NvbXBvbmVudHMvaW5kZXgvbGluZSc7XG5pbXBvcnQgdXBkYXRlIGZyb20gJ0AvY29tcG9uZW50cy9pbmRleC91cGRhdGUnO1xuaW1wb3J0IERhdGFFcnJvciBmcm9tICdAL2NvbXBvbmVudHMvY29tbW9uL2RhdGFFcnJvcic7XG4vLyBpbXBvcnQgbGlzdERhdGEgZnJvbSAnQC9jb25maWcvbGlzdE1vY2snIC8vIG1vY2vmlbDmja5cbmltcG9ydCB7IFVSTF9BRERSRVNTLCByZXF1ZXN0RGF0YSwgc2VuZEdvbGRMb2csIGdldE1vZHVsZUxpc3QgfSBmcm9tICdAL0FQSS8nO1xuaW1wb3J0IHsgZ2V0UGxheVVSTCB9IGZyb20gJ0AvdXRpbHMvdXRpbCc7XG5pbXBvcnQgREVGQVVMVF9EQVRBIGZyb20gJ0AvY29uZmlnL2RlZmF1bHQtZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8mOmFt+inhumikScsXG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZVxuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgbmF2TGlzdDogW10sXG4gICAgZXJyb3JUeXBlOiAnJyxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBzaG93TW9kdWxlSW5kZXg6IHt9LFxuICAgIG5hdkRhdGE6IFtdLFxuICAgIHBhZ2VJZDogLTEsXG4gICAgbmV0d29ya1R5cGU6ICcnLFxuICAgIHNjcm9sbEhlaWdodDogNTY2LFxuICAgIC8vIOadpea6kFxuICAgIHNvdXJjZTogJycsXG4gICAgLy8g5p2l5rqQc3BtXG4gICAgcmVmZXJTcG06ICcnLFxuICAgIGNvdW50UmVxdWVzdDogMCxcbiAgICBfdGltZXI6ICcnXG4gIH07XG4gIG1peGlucyA9IFttaXhpbl07XG5cbiAkcmVwZWF0ID0ge1wibW9kdWxlSXRlbVwiOntcImNvbVwiOlwidXBkYXRlXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wic3dpcGVybGF5ZXJcIjp7XCJ2LWJpbmQ6Q29tcG9udGVudERhdGEub25jZVwiOntcInZhbHVlXCI6XCJjb21wb25lbnRJdGVtLml0ZW1SZXN1bHRcIixcImZvclwiOlwibW9kdWxlSXRlbS5jb21wb25lbnRzXCIsXCJpdGVtXCI6XCJjb21wb25lbnRJdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcInNpbmdsZXBpY3R1cmVcIjp7XCJ2LWJpbmQ6Q29tcG9udGVudERhdGEub25jZVwiOntcInZhbHVlXCI6XCJjb21wb25lbnRJdGVtLml0ZW1SZXN1bHRbMF1cIixcImZvclwiOlwibW9kdWxlSXRlbS5jb21wb25lbnRzXCIsXCJpdGVtXCI6XCJjb21wb25lbnRJdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcImRyYXdsaXN0XCI6e1widi1iaW5kOkNvbXBvbnRlbnREYXRhLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiY29tcG9uZW50SXRlbS5pdGVtUmVzdWx0XCIsXCJmb3JcIjpcIm1vZHVsZUl0ZW0uY29tcG9uZW50c1wiLFwiaXRlbVwiOlwiY29tcG9uZW50SXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpwYWdlRGF0YS5zeW5jXCI6e1widmFsdWVcIjpcInNob3dNb2R1bGVJbmRleFtjb21wb25lbnRJdGVtLmNvbXBvbmVudElkXVwiLFwiZm9yXCI6XCJtb2R1bGVJdGVtLmNvbXBvbmVudHNcIixcIml0ZW1cIjpcImNvbXBvbmVudEl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dHlwZS5vbmNlXCI6e1widmFsdWVcIjpcImNvbXBvbmVudEl0ZW0udHlwZVwiLFwiZm9yXCI6XCJtb2R1bGVJdGVtLmNvbXBvbmVudHNcIixcIml0ZW1cIjpcImNvbXBvbmVudEl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwiYWRsaXN0XCI6e1widi1iaW5kOkNvbXBvbnRlbnREYXRhLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiY29tcG9uZW50SXRlbS5pdGVtUmVzdWx0XCIsXCJmb3JcIjpcIm1vZHVsZUl0ZW0uY29tcG9uZW50c1wiLFwiaXRlbVwiOlwiY29tcG9uZW50SXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDp0eXBlLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiY29tcG9uZW50SXRlbS50eXBlXCIsXCJmb3JcIjpcIm1vZHVsZUl0ZW0uY29tcG9uZW50c1wiLFwiaXRlbVwiOlwiY29tcG9uZW50SXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJ1cGRhdGVcIjp7XCJ2LWJpbmQ6Y29tcG9uZW50SWQub25jZVwiOntcInZhbHVlXCI6XCJjb21wb25lbnRJdGVtLmNvbXBvbmVudElkXCIsXCJmb3JcIjpcIm1vZHVsZUl0ZW0uY29tcG9uZW50c1wiLFwiaXRlbVwiOlwiY29tcG9uZW50SXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJkYXRhZXJyb3JcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmVycm9yVHlwZS5zeW5jXCI6XCJlcnJvclR5cGVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHN3aXBlcmxheWVyOiBzd2lwZXJMYXllcixcbiAgICBzaW5nbGVwaWN0dXJlOiBzaW5nbGVQaWN0dXJlLFxuICAgIGRyYXdsaXN0OiBkcmF3TGlzdCxcbiAgICBhZGxpc3Q6IGFkTGlzdCxcbiAgICBmb290ZXI6IGZvb3RlcixcbiAgICBsaW5lOiBsaW5lLFxuICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgIGRhdGFlcnJvcjogRGF0YUVycm9yXG4gIH07XG4gIHdhdGNoID0ge1xuICAgIHBhZ2VJZCAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICB0aGlzLnNlbmRMb2cobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIHRoaXMuc2V0UGFnZSgpO1xuICAgIH1cbiAgfTtcbiAgZXZlbnRzID0ge1xuICAgICdSRUZSQVNIJzogKCRldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5zZXRQYWdlKCk7XG4gICAgfSxcbiAgICAnVVBEQVRFX0NPTVBPTkVOVCc6ICgkZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VEYXRlID0gdGhpcy5zaG93TW9kdWxlSW5kZXhbJGV2ZW50LmNvbXBvbmVudElkXTtcbiAgICAgIHBhZ2VEYXRlLm5vd1BhZ2UgKys7XG4gICAgICBsZXQgc3RhcnQ7XG4gICAgICBsZXQgZW5kO1xuICAgICAgaWYgKHBhZ2VEYXRlLm5vd1BhZ2UgPCBwYWdlRGF0ZS5wYWdlKSB7XG4gICAgICAgIHN0YXJ0ID0gKChwYWdlRGF0ZS5ub3dQYWdlIC0gMSkgKiBwYWdlRGF0ZS5udW0pO1xuICAgICAgICBlbmQgPSBwYWdlRGF0ZS5ub3dQYWdlICogcGFnZURhdGUubnVtIC0gMTtcbiAgICAgIH0gZWxzZSBpZiAocGFnZURhdGUubm93UGFnZSA9PT0gcGFnZURhdGUucGFnZSkge1xuICAgICAgICBzdGFydCA9ICgocGFnZURhdGUubm93UGFnZSAtIDEpICogcGFnZURhdGUubnVtKTtcbiAgICAgICAgZW5kID0gcGFnZURhdGUudG90YWxOdW0gLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnZURhdGUubm93UGFnZSA9IDE7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICAgICAgZW5kID0gcGFnZURhdGUubnVtIC0gMTtcbiAgICAgIH1cbiAgICAgIHBhZ2VEYXRlLnN0YXJ0SW5kZXggPSBzdGFydDtcbiAgICAgIHBhZ2VEYXRlLmVuZEluZGV4ID0gZW5kO1xuICAgICAgdGhpcy5zaG93TW9kdWxlSW5kZXhbJGV2ZW50LmNvbXBvbmVudElkXSA9IHBhZ2VEYXRlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LFxuICAgICdOYXZpZ2F0ZVRvUGxheSc6IChkYXRhLCAuLi5hcmdzKSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBnZXRQbGF5VVJMKGRhdGEpO1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzLyR7dXJsfWBcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICAvLyDpgInmi6nmoI/nm65cbiAgICBzZWxlY3ROYXYoaW5kZXgsIGUpIHtcbiAgICAgIHRoaXMucGFnZUlkID0gaW5kZXg7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sXG4gICAgb25TbGlkZUNoYW5nZUVuZChlKSB7XG4gICAgICB0aGlzLmNvdW50UmVxdWVzdCsrO1xuICAgICAgaWYgKHRoaXMuY291bnRSZXF1ZXN0ID4gMSkge1xuICAgICAgICBpZiAodGhpcy5fdGltZXIpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgICAgICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGFnZUlkID0gZS5kZXRhaWwuY3VycmVudDtcbiAgICAgICAgICB0aGlzLmNvdW50UmVxdWVzdCA9IDA7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSwgNjAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFnZUlkID0gZS5kZXRhaWwuY3VycmVudDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIC8vIOWKoOi9veaVsOaNrlxuICBnZXRNb2R1bGVEYXRhKGlkTnVtKSB7XG4gICAgaWYgKHRoaXMubmF2RGF0YVtpZE51bV0gJiYgdGhpcy5uYXZEYXRhW2lkTnVtXS5pc0xvYWREYXRhKSB7XG4gICAgICAvLyDlpoLmnpzlt7LlrZjlnKjnvJPlrZjmlbDmja7kuJTmlbDmja7lt7Lnu4/lnKjnur/liqDovb0gcmV0dXJuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVzZXRTdGF0dXMoaWROdW0pO1xuICAgIGlmICh0aGlzLm5ldHdvcmtUeXBlID09PSAnbm9uZScpIHJldHVybjtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgb3B0aW9ucy51cmwgPSBVUkxfQUREUkVTUy5HRVRfSU5ERVhfTVVEVUxFO1xuICAgIG9wdGlvbnMuc2lnbiA9IHRydWU7XG4gICAgb3B0aW9ucy5kYXRhID0ge3BhZ2VJZDogaWROdW19O1xuICAgIG9wdGlvbnMuY2FsbGJhY2sgPSAoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5nZXRNb2R1bGVDb21wbGV0ZShpZE51bSwgZGF0YSk7XG4gICAgfVxuICAgIHJlcXVlc3REYXRhKG9wdGlvbnMpO1xuICB9XG4gIC8qKlxuICAgKiDojrflj5bmqKHlnZfmlbDmja4g6YeN5p6E5pWw5o2uXG4gICAqL1xuICBnZXRNb2R1bGVDb21wbGV0ZShpZE51bSwgcmVzKSB7XG4gICAgaWYgKCFyZXMucmVzdWx0LmRhdGEgfHwgIXJlcy5yZXN1bHQuZGF0YS5kYXRhKSByZXR1cm47XG4gICAgY29uc3QgbG9nRGF0YSA9IHt9O1xuICAgIGxvZ0RhdGEuc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgbG9nRGF0YS5yZWZlclNwbSA9IHRoaXMucmVmZXJTcG07XG4gICAgbG9nRGF0YS5uYXZMaXN0ID0gdGhpcy5uYXZMaXN0O1xuICAgIGxvZ0RhdGEucGFnZUlkID0gdGhpcy5wYWdlSWQ7XG5cbiAgICBjb25zdCBfbW9kdWxlTGlzdERhdGEgPSBnZXRNb2R1bGVMaXN0KHJlcywgdGhpcy5zaG93TW9kdWxlSW5kZXgsIGxvZ0RhdGEpO1xuICAgIHRoaXMuc2hvd01vZHVsZUluZGV4ID0gX21vZHVsZUxpc3REYXRhWzBdO1xuXG4gICAgdGhpcy5uYXZEYXRhW2lkTnVtXS5tb2R1bGVMaXN0ID0gX21vZHVsZUxpc3REYXRhWzFdO1xuICAgIHRoaXMubmF2RGF0YVtpZE51bV0uaXNMb2FkRGF0YSA9IHRydWU7XG4gICAgdGhpcy5uYXZEYXRhW2lkTnVtXS5pc0Vycm9yID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICAvKipcbiAgICog6K6+572u6aG16Z2iXG4gICAqL1xuICBzZXRQYWdlKCkge1xuICAgIC8vIOWIh+aNouagj+ebruaXtui3s+i9rOWIsOmhtumDqFxuICAgIHdlcHkucGFnZVNjcm9sbFRvKHtcbiAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIGR1cmF0aW9uOiAwXG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5hdkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubmF2TGlzdFtpXS5uYXZDbGFzc0N1cnJlbnQgPSAnJztcbiAgICB9XG4gICAgdGhpcy5uYXZMaXN0W3RoaXMucGFnZUlkXS5uYXZDbGFzc0N1cnJlbnQgPSAnY3VycmVudCc7XG4gICAgLy8g6K6+572u5qCH6aKYXG4gICAgaWYgKHRoaXMucGFnZUlkID4gMCkge1xuICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgICB0aXRsZTogYOS8mOmFt+inhumikS0ke3RoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkxpc3RbdGhpcy5wYWdlSWRdLnBhZ2VOYW1lfWBcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgIHRpdGxlOiAn5LyY6YW36KeG6aKRJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZ2V0TW9kdWxlRGF0YSh0aGlzLnBhZ2VJZCk7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuICAvKipcbiAgICog5Y+R6YCB6aG16Z2i6buE6YeR5Luk566tcHZcbiAgICovXG4gIHNlbmRMb2cobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgY29uc3QgX2RhdGEgPSB7fTtcbiAgICBjb25zdCBfc3BtQ29uZmlnID0gREVGQVVMVF9EQVRBLlNQTV9DT05GSUcuaW5kZXg7XG4gICAgX2RhdGEudGl0bGUgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5uYXZMaXN0W25ld1ZhbHVlXS5wYWdlTmFtZTtcbiAgICBfZGF0YS51cmwgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgX2RhdGEuc3BtID0gYCR7X3NwbUNvbmZpZy5zcG19XyR7bmV3VmFsdWV9LjAuMGA7XG4gICAgaWYgKG9sZFZhbHVlICE9PSAtMSkge1xuICAgICAgdGhpcy5zb3VyY2UgPSBfc3BtQ29uZmlnLnBhZ2U7XG4gICAgICB0aGlzLnJlZmVyU3BtID0gYCR7X3NwbUNvbmZpZy5zcG19XyR7b2xkVmFsdWV9LjAuMGA7XG4gICAgfVxuICAgIF9kYXRhLnJlZmVyVXJsID0gdGhpcy5zb3VyY2U7XG4gICAgX2RhdGEucmVmZXJTcG0gPSB0aGlzLnJlZmVyU3BtO1xuICAgIHNlbmRHb2xkTG9nKF9kYXRhKTtcbiAgfVxuICBvbkxvYWQob3B0LCBkYXRhKSB7XG4gICAgLy8g6I635Y+W5a+86Iiq5L+h5oGvXG4gICAgdGhpcy5uYXZMaXN0ID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEubmF2TGlzdDtcbiAgICB0aGlzLm5hdkRhdGEgPSBuZXcgQXJyYXkodGhpcy5uYXZMaXN0Lmxlbmd0aCk7XG5cbiAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAvLyDorqHnrpfkuLvkvZPpg6jliIbpq5jluqYs5Y2V5L2N5Li6cHgs55Sx5LqO5Li75L2TcHjlkozlvq7kv6FycHjkuYvpl7TmjaLnrpflt67lr7zoh7Torr7nva7nmoRcbiAgICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSByZXMud2luZG93SGVpZ2h0IC0gMzc7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgd2VweS5nZXROZXR3b3JrVHlwZSh7XG4gICAgICBjb21wbGV0ZTogKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLm5ldHdvcmtUeXBlKSB7XG4gICAgICAgICAgdGhpcy5uZXR3b3JrVHlwZSA9IHJlcy5uZXR3b3JrVHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5ldHdvcmtUeXBlID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZUlkID0gMDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB3ZXB5Lm9uTmV0d29ya1N0YXR1c0NoYW5nZSgocmVzdWx0KSA9PiB7XG4gICAgICB0aGlzLm5ldHdvcmtUeXBlID0gcmVzdWx0Lm5ldHdvcmtUeXBlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9KTtcbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIC8qKlxuICAgKiDph43nva7mlbDmja7nirbmgIFcbiAgICovXG4gIHJlc2V0U3RhdHVzKGlkTnVtKSB7XG4gICAgdGhpcy5uYXZEYXRhW2lkTnVtXSA9IHt9O1xuICAgIGlmICh0aGlzLm5ldHdvcmtUeXBlID09PSAnbm9uZScpIHtcbiAgICAgIHRoaXMubmF2RGF0YVtpZE51bV0uaXNFcnJvciA9IHRydWU7XG4gICAgICB0aGlzLmVycm9yVHlwZSA9ICdub25ldHdvcmsnO1xuICAgICAgLy8g5pi+56S65peg572R57ucXG4gICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn572R57uc5pyq6L+e5o6lJyxcbiAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uYXZEYXRhW2lkTnVtXS5pc0Vycm9yID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=