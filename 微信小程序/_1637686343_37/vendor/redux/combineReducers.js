function e(e, t) {
    var r = t && t.type;
    return "Given action " + (r && '"' + r.toString() + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state.';
}

function t(e, t, r, i) {
    var o = Object.keys(t), a = r && r.type === n.ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
    if (0 === o.length) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
    var u = Object.keys(e).filter(function(e) {
        return !t.hasOwnProperty(e) && !i[e];
    });
    return u.forEach(function(e) {
        i[e] = !0;
    }), u.length > 0 ? "Unexpected " + (u.length > 1 ? "keys" : "key") + ' "' + u.join('", "') + '" found in ' + a + '. Expected to find one of the known reducer keys instead: "' + o.join('", "') + '". Unexpected keys will be ignored.' : void 0;
}

function r(e) {
    Object.keys(e).forEach(function(t) {
        var r = e[t];
        if (void 0 === r(void 0, {
            type: n.ActionTypes.INIT
        })) throw new Error('Reducer "' + t + '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');
        if (void 0 === r(void 0, {
            type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".")
        })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + n.ActionTypes.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.');
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(n) {
    for (var o = Object.keys(n), a = {}, u = 0; u < o.length; u++) {
        var d = o[u];
        "function" == typeof n[d] && (a[d] = n[d]);
    }
    var s, c = Object.keys(a), f = {};
    try {
        r(a);
    } catch (e) {
        s = e;
    }
    return function() {
        var r = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = arguments[1];
        if (s) throw s;
        var o = t(r, a, n, f);
        o && (0, i.default)(o);
        for (var u = !1, d = {}, h = 0; h < c.length; h++) {
            var y = c[h], l = a[y], p = r[y], v = l(p, n);
            if (void 0 === v) {
                var g = e(y, n);
                throw new Error(g);
            }
            d[y] = v, u = u || v !== p;
        }
        return u ? d : r;
    };
};

var n = require("./createStore"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./utils/warning"));