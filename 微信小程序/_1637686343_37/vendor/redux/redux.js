function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r() {}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = void 0;

var o = e(require("./createStore")), t = e(require("./combineReducers")), i = e(require("./bindActionCreators")), u = e(require("./applyMiddleware")), s = e(require("./compose")), n = e(require("./utils/warning"));

"string" == typeof r.name && "isCrushed" !== r.name && (0, n.default)("You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build."), 
exports.createStore = o.default, exports.combineReducers = t.default, exports.bindActionCreators = i.default, 
exports.applyMiddleware = u.default, exports.compose = s.default;