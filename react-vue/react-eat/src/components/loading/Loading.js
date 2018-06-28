import './Loading.less'

var Loading = function () {
    let loadingId;
    let isShow = false;
    let count = 0;
}

Loading.show = function () {
    if (this.isShow) {
        this.count++;
        return;
    }
    this.count =1;
    this.isShow = true;
    var wrap = document.createElement("div");
    var loadBg = document.createElement("div");
    var prog = document.createElement("div");
    this.loadingId = new Date().getTime();
    wrap.id = this.loadingId;
    prog.className = 'progress';
    loadBg.className = 'loading-bg';
    wrap.className = 'loading-wrap-bg';
    loadBg.appendChild(prog);
    wrap.appendChild(loadBg);
    document.body.appendChild(wrap);
}

Loading.hide = function () {
    this.count--;
    if (this.count === 0) {
        let dom = document.getElementById(this.loadingId);
        this.isShow = false;
        if (dom) {
            document.body.removeChild(dom);
        }
    }
}

export default Loading;


