Object.defineProperty(exports, "__esModule", {
    value: true
});

var Utils = {
    /**
  * 绑定get方法
  */
    defineGetter: function defineGetter(target, key) {
        Object.defineProperty(target, key, {
            get: function get() {
                return target["_" + key];
            }
        });
    }
};

exports.default = Utils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbIlV0aWxzIiwiZGVmaW5lR2V0dGVyIiwidGFyZ2V0Iiwia2V5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBTUEsUUFBUTtBQUNaOzs7QUFHQUMsY0FKWSx3QkFJQ0MsTUFKRCxFQUlTQyxHQUpULEVBSWM7QUFDeEJDLFdBQU9DLGNBQVAsQ0FBc0JILE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQztBQUNqQ0csU0FEaUMsaUJBQzNCO0FBQ0osZUFBT0osYUFBV0MsR0FBWCxDQUFQO0FBQ0Q7QUFIZ0MsS0FBbkM7QUFLRDtBQVZXLENBQWQ7O2tCQWFlSCxLIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVXRpbHMgPSB7XG4gIC8qKlxuICAqIOe7keWummdldOaWueazlVxuICAqL1xuICBkZWZpbmVHZXR0ZXIodGFyZ2V0LCBrZXkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldFtgXyR7a2V5fWBdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlscztcbiJdfQ==