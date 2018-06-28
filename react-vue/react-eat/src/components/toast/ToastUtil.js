import Toast from './Toast'

var ToastUtil = {
    show: function (str) {
        new Toast().show(str);
    }
}

export default ToastUtil;