Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

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

var _wepy = require("./../../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _API = require("./../../API/index.js");

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

var ProgramList = function(_wepy$component) {
    _inherits(ProgramList, _wepy$component);
    function ProgramList() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, ProgramList);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProgramList.__proto__ || Object.getPrototypeOf(ProgramList)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.data = {
            name: "programlist",
            title: "选集",
            programList: null,
            videoType: "tv",
            currectIndex: 0,
            itemWidth: 0
        }, _this.props = {
            vid: String,
            showid: String,
            playPageData: Object,
            pageConfig: Object
        }, _this.methods = {
            onProgramHandler: function onProgramHandler(program, index) {
                var vid = program.action.extra.value;
                if (this.vid === vid) return;
                this.$emit("NavigateToPlay", program);
                this.currectIndex = index;
                this.$apply();
            }
        }, _this.watch = {
            playPageData: function playPageData(newValue, oldValue) {
                this.getProgramData();
            },
            vid: function vid(newValue, oldValue) {
                if (newValue === oldValue) return;
                this.resetData();
            },
            showid: function showid(newValue, oldValue) {
                if (newValue === oldValue) return;
                this.resetData();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(ProgramList, [ {
        key: "resetData",
        /**
     * 切换视频时数据重置
     */
        value: function resetData() {}
        // this.programList = null;
        // this.currectIndex = 0;
        // this.itemWidth = 0;
        // this.$apply();
        /**
     * 开始获取数据信息
     */    }, {
        key: "getProgramData",
        value: function getProgramData() {
            var _this2 = this;
            if (!this.pageConfig || !this.playPageData) return false;
            var tag = this.pageConfig[this.name].tag;
            var programInfo = null;
            var tags = tag.split(",");
            for (var i = 0; i < tags.length; i++) {
                if (this.playPageData.playerModules.has(tags[i])) {
                    if (i === 0 || i === 3) {
                        this.videoType = "tv";
                        this.itemWidth = 61;
                    } else {
                        this.videoType = "movie";
                        this.itemWidth = 135;
                    }
                    programInfo = this.playPageData.playerModules.get(tags[i]);
                    if (programInfo.title) this.title = programInfo.title;
                }
            }
            if (!programInfo) return;
            var videoArgs = {};
            if (this.showid) {
                videoArgs.showid = this.showid;
            } else {
                videoArgs.vid = this.vid;
            }
            (0, _API.getModuleComment)(programInfo, videoArgs, function(data) {
                _this2.currectIndex = 0;
                var tempData = [];
                for (var key in data) {
                    var itemData = data[key];
                    var videoId = _this2.vid;
                    if (_this2.vid === "") {
                        videoId = _this2.playPageData.currentVid;
                    }
                    var isVid = videoId.indexOf(itemData.action.extra.value) !== -1;
                    if (isVid) {
                        _this2.currectIndex = parseInt(key);
                    }
                    tempData.push(itemData);
                }
                _this2.programList = tempData;
                _this2.$apply();
            });
        }
    } ]);
    return ProgramList;
}(_wepy2.default.component);

exports.default = ProgramList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyYW1MaXN0LmpzIl0sIm5hbWVzIjpbIlByb2dyYW1MaXN0IiwiZGF0YSIsIm5hbWUiLCJ0aXRsZSIsInByb2dyYW1MaXN0IiwidmlkZW9UeXBlIiwiY3VycmVjdEluZGV4IiwiaXRlbVdpZHRoIiwicHJvcHMiLCJ2aWQiLCJTdHJpbmciLCJzaG93aWQiLCJwbGF5UGFnZURhdGEiLCJPYmplY3QiLCJwYWdlQ29uZmlnIiwibWV0aG9kcyIsIm9uUHJvZ3JhbUhhbmRsZXIiLCJwcm9ncmFtIiwiaW5kZXgiLCJhY3Rpb24iLCJleHRyYSIsInZhbHVlIiwiJGVtaXQiLCIkYXBwbHkiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJnZXRQcm9ncmFtRGF0YSIsInJlc2V0RGF0YSIsInRhZyIsInByb2dyYW1JbmZvIiwidGFncyIsInNwbGl0IiwiaSIsImxlbmd0aCIsInBsYXllck1vZHVsZXMiLCJoYXMiLCJnZXQiLCJ2aWRlb0FyZ3MiLCJ0ZW1wRGF0YSIsImtleSIsIml0ZW1EYXRhIiwidmlkZW9JZCIsImN1cnJlbnRWaWQiLCJpc1ZpZCIsImluZGV4T2YiLCJwYXJzZUludCIsInB1c2giLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsSSxHQUFPO0FBQ0xDLFlBQU0sYUFERDtBQUVMQyxhQUFPLElBRkY7QUFHTEMsbUJBQWEsSUFIUjtBQUlMQyxpQkFBVyxJQUpOO0FBS0xDLG9CQUFjLENBTFQ7QUFNTEMsaUJBQVc7QUFOTixLLFFBUVBDLEssR0FBUTtBQUNOQyxXQUFLQyxNQURDO0FBRU5DLGNBQVFELE1BRkY7QUFHTkUsb0JBQWNDLE1BSFI7QUFJTkMsa0JBQVlEO0FBSk4sSyxRQU1SRSxPLEdBQVU7QUFDUkMsc0JBRFEsNEJBQ1NDLE9BRFQsRUFDa0JDLEtBRGxCLEVBQ3lCO0FBQy9CLFlBQU1ULE1BQU1RLFFBQVFFLE1BQVIsQ0FB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LFNBQVNOLEdBQVQsQ0FBcEI7QUFDRDtBQUNERCxtQkFBU1EsSUFBVCxDQUFjTixRQUFkO0FBQ0Q7O0FBRUQsZUFBS3JDLFdBQUwsR0FBbUJtQyxRQUFuQjtBQUNBLGVBQUtoQixNQUFMO0FBQ0QsT0FsQkQ7QUFtQkQ7Ozs7RUE5RnNDLGVBQUt5QixTOztrQkFBekJoRCxXIiwiZmlsZSI6InByb2dyYW1MaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IGdldE1vZHVsZUNvbW1lbnQgfSBmcm9tICdAL0FQSS8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmFtTGlzdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgZGF0YSA9IHtcbiAgICBuYW1lOiAncHJvZ3JhbWxpc3QnLFxuICAgIHRpdGxlOiAn6YCJ6ZuGJyxcbiAgICBwcm9ncmFtTGlzdDogbnVsbCxcbiAgICB2aWRlb1R5cGU6ICd0dicsXG4gICAgY3VycmVjdEluZGV4OiAwLFxuICAgIGl0ZW1XaWR0aDogMFxuICB9O1xuICBwcm9wcyA9IHtcbiAgICB2aWQ6IFN0cmluZyxcbiAgICBzaG93aWQ6IFN0cmluZyxcbiAgICBwbGF5UGFnZURhdGE6IE9iamVjdCxcbiAgICBwYWdlQ29uZmlnOiBPYmplY3RcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBvblByb2dyYW1IYW5kbGVyKHByb2dyYW0sIGluZGV4KSB7XG4gICAgICBjb25zdCB2aWQgPSBwcm9ncmFtLmFjdGlvbi5leHRyYS52YWx1ZTtcbiAgICAgIGlmICh0aGlzLnZpZCA9PT0gdmlkKSByZXR1cm47XG4gICAgICB0aGlzLiRlbWl0KCdOYXZpZ2F0ZVRvUGxheScsIHByb2dyYW0pO1xuXG4gICAgICB0aGlzLmN1cnJlY3RJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH07XG4gIHdhdGNoID0ge1xuICAgIHBsYXlQYWdlRGF0YShuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuZ2V0UHJvZ3JhbURhdGEoKTtcbiAgICB9LFxuICAgIHZpZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gb2xkVmFsdWUpIHJldHVybjtcbiAgICAgIHRoaXMucmVzZXREYXRhKCk7XG4gICAgfSxcbiAgICBzaG93aWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSByZXR1cm47XG4gICAgICB0aGlzLnJlc2V0RGF0YSgpO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIOWIh+aNouinhumikeaXtuaVsOaNrumHjee9rlxuICAgKi9cbiAgcmVzZXREYXRhKCkge1xuICAgIC8vIHRoaXMucHJvZ3JhbUxpc3QgPSBudWxsO1xuICAgIC8vIHRoaXMuY3VycmVjdEluZGV4ID0gMDtcbiAgICAvLyB0aGlzLml0ZW1XaWR0aCA9IDA7XG4gICAgLy8gdGhpcy4kYXBwbHkoKTtcbiAgfVxuICAvKipcbiAgICog5byA5aeL6I635Y+W5pWw5o2u5L+h5oGvXG4gICAqL1xuICBnZXRQcm9ncmFtRGF0YSgpIHtcbiAgICBpZiAoIXRoaXMucGFnZUNvbmZpZyB8fCAhdGhpcy5wbGF5UGFnZURhdGEpIHJldHVybiBmYWxzZTtcbiAgICBsZXQgdGFnID0gdGhpcy5wYWdlQ29uZmlnW3RoaXMubmFtZV0udGFnO1xuICAgIGxldCBwcm9ncmFtSW5mbyA9IG51bGw7XG4gICAgY29uc3QgdGFncyA9IHRhZy5zcGxpdCgnLCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucGxheVBhZ2VEYXRhLnBsYXllck1vZHVsZXMuaGFzKHRhZ3NbaV0pKSB7XG4gICAgICAgIGlmIChpID09PSAwIHx8IGkgPT09IDMpIHtcbiAgICAgICAgICB0aGlzLnZpZGVvVHlwZSA9ICd0dic7XG4gICAgICAgICAgdGhpcy5pdGVtV2lkdGggPSA2MTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZpZGVvVHlwZSA9ICdtb3ZpZSc7XG4gICAgICAgICAgdGhpcy5pdGVtV2lkdGggPSAxMzU7XG4gICAgICAgIH1cbiAgICAgICAgcHJvZ3JhbUluZm8gPSB0aGlzLnBsYXlQYWdlRGF0YS5wbGF5ZXJNb2R1bGVzLmdldCh0YWdzW2ldKTtcbiAgICAgICAgaWYgKHByb2dyYW1JbmZvLnRpdGxlKSB0aGlzLnRpdGxlID0gcHJvZ3JhbUluZm8udGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghcHJvZ3JhbUluZm8pIHJldHVybjtcbiAgICBjb25zdCB2aWRlb0FyZ3MgPSB7fTtcbiAgICBpZiAodGhpcy5zaG93aWQpIHtcbiAgICAgIHZpZGVvQXJncy5zaG93aWQgPSB0aGlzLnNob3dpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlkZW9BcmdzLnZpZCA9IHRoaXMudmlkO1xuICAgIH1cbiAgICBnZXRNb2R1bGVDb21tZW50KHByb2dyYW1JbmZvLCB2aWRlb0FyZ3MsIChkYXRhKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlY3RJbmRleCA9IDA7XG4gICAgICBjb25zdCB0ZW1wRGF0YSA9IFtdO1xuICAgICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcbiAgICAgICAgY29uc3QgaXRlbURhdGEgPSBkYXRhW2tleV07XG4gICAgICAgIGxldCB2aWRlb0lkID0gdGhpcy52aWQ7XG4gICAgICAgIGlmICh0aGlzLnZpZCA9PT0gJycpIHtcbiAgICAgICAgICB2aWRlb0lkID0gdGhpcy5wbGF5UGFnZURhdGEuY3VycmVudFZpZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1ZpZCA9IHZpZGVvSWQuaW5kZXhPZihpdGVtRGF0YS5hY3Rpb24uZXh0cmEudmFsdWUpICE9PSAtMTtcbiAgICAgICAgaWYgKGlzVmlkKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZWN0SW5kZXggPSBwYXJzZUludChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBEYXRhLnB1c2goaXRlbURhdGEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb2dyYW1MaXN0ID0gdGVtcERhdGE7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=