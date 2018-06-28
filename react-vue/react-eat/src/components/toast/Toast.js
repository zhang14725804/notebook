import './Toast.less';

var Toast = function () {

}

Toast.prototype.show = function (str) {
    var dom = document.createElement("div");
    var id = new Date().getTime();
    dom.id = id;
    dom.innerText = str;
    dom.className = 'toast-bg';
    document.body.appendChild(dom);

    setTimeout(function () {
        var dom = document.getElementById(id);
        document.body.removeChild(dom);
    }, 2000)
}

export default Toast;