var e = require("./performanceUtil").throttle;

module.exports = e(1e3, function(e, a) {
    console.log("step 0");
    var s = void 0, r = void 0;
    switch (e.pagetype) {
      case "wechat":
        return void a.eventHandle.emit("goto-chat", e);

      case "catelist":
        s = "cate-list";
        break;

      case "serviceseek":
        s = "service-seek";
        break;

      case "serviceseekdetail":
        s = "service-seek-detail";
        break;

      case "user-apply":
        r = "/pages/user/apply/apply";
        break;

      case "user-resume":
        r = "/pages/user/resume/resume";
        break;

      case "wenda-answer":
        r = "/pages/wenda/answer/answer";
        break;

      case "wenda-question":
        r = "/pages/wenda/question/question";
        break;

      case "youxuan":
        r = "/pages/youxuan/youxuan";
        break;

      case "operators-job":
        r = "/pages/operators/job/job";
        break;

      case "web-view-bst":
        r = "/pages/web-view-list/bst/bst";
        break;

      case "web-view-info":
        r = "/pages/web-view-list/info/info";
        break;

      case "web-view-seek":
        r = "/pages/web-view-list/seek/seek";
        break;

      case "web-view-weather":
        r = "/pages/web-view-list/weather/weather";
        break;

      default:
        s = e.pagetype;
    }
    var t = JSON.parse(JSON.stringify(e));
    "friend" !== s && (delete t.pagetype, a.goto([ r || "/pages/" + s + "/" + s, t ], !0));
});