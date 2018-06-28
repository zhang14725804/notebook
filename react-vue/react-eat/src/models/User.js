import Cook from '../utils/CK';

function User() {

    var token = "";

    this.isLogin = function () {
        let token = Cook.get("token");
        return token !== undefined && token != null && token !== "";
    }

    this.getToken = function () {
        return Cook.get("token");
    }

    this.setToken = function (token) {
        this.token = token;
    }
}

window.User = new User();