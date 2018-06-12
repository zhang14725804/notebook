Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    showLoad: function() {
        return {
            type: "show"
        };
    },
    completeLoad: function() {
        return {
            type: "complete"
        };
    },
    errorLoad: function() {
        return {
            type: "error"
        };
    },
    nomoreLoad: function() {
        return {
            type: "nomore"
        };
    },
    firstErrorLoad: function() {
        return {
            type: "firstError"
        };
    },
    invalidLoad: function() {
        return {
            type: "invalid"
        };
    },
    emptyLoad: function() {
        return {
            type: "empty"
        };
    }
};