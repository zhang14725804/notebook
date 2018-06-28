import 'whatwg-fetch';
import md5 from 'crypto-js/md5';
import CK from './CK';
import strings from './../constants/Strings';
import Loading from 'components/loading/Loading';

var net = {

    errMsg: function (rep) {
        let msg = rep.message;
        let errMsg = "";
        if (msg !== undefined && msg !== null && msg instanceof Array && msg.length > 0) {
            errMsg = msg[0].message;
        }

        if (errMsg === undefined || errMsg === null || errMsg === "" || errMsg === "null") {
            errMsg = strings.error_net_busy;
        }
        return errMsg;
    },
    request: function (input, init) {
        Loading.show();

        function checkStatus(rep) {
            Loading.hide();
            console.log(rep);
            if (rep.status >= 200 && rep.status < 300) {
                return rep;
            } else {
                var error = new Error(rep.statusText);
                error.response = rep;
                throw error;
            }
        }

        function parseJSON(rep) {
            return rep.json()
        }

        function checkCode(rep) {
            if (rep.code === 1012) {
                CK.set("sessionId", rep.sessionId, "240h");
            }
            return rep;
        }

        // let req = HOST_DEV + "?" + input;
        // let HOST_DEV = "http://localhost:3000";
        let HOST_DEV = window.location.origin;
        let req = HOST_DEV + input;

        let initCp = {
            // credentials: "include"
            credentials: "same-origin"
        }
        if (init !== undefined && init != null) {
            Object.assign(initCp, init);
        }

        return fetch(req, initCp).then(checkStatus).then(parseJSON).then(checkCode);
    },
    requestMd5: function (input, init) {
        Loading.show();
        let map = new Map();
        let time = new Date().getTime();
        map["version"] = window.version;
        map["appType"] = window.appType;
        map["deviceId"] = window.deviceId;
        map["sessionId"] = CK.get("sessionId");
        map["appChannel"] = window.appChannel;
        map['token'] = window.User.getToken();
        map["storeId"] = window.storeId;
        map["timestamp"] = time;

        let qrPath = input.split("?");
        let qrArr = [];
        if (qrPath !== undefined && qrPath instanceof Array && qrPath.length === 2) {
            let qrKVs = qrPath[1].split("&");
            if (qrKVs !== null && qrKVs instanceof Array) {
                for (let qrkv in qrKVs) {
                    let kvs = qrKVs[qrkv].split("=");
                    if (kvs !== undefined && kvs instanceof Array && kvs.length > 0) {
                        if (kvs[0] === "") {
                            continue;
                        }

                        if (kvs[1] == null) {
                            continue;
                        }
                        qrArr.push({"key": kvs[0], "value": kvs[1]});
                    }
                }
            }
        }
        // let HOST_DEV = "http://localhost:3000" + qrPath[0];
        let HOST_DEV = window.location.origin + qrPath[0];

        let qrArrCp = [];

        for (let key in map) {
            if (map[key] == null) {
                continue;
            }
            qrArr.push({"key": key, "value": map[key]});
        }

        qrArrCp = qrArr.slice(0, qrArr.length);

        qrArr.sort(function (a, b) {
            return a.key > b.key;
        });


        qrArr.push({"key": "key", "value": window.pkey});

        function sign(qrArr) {

            let unsign = '';
            for (let ind = 0; ind < qrArr.length; ind++) {
                let e = qrArr[ind];
                unsign += e.key + "=" + e.value;
                if (ind !== (qrArr.length - 1)) {
                    unsign += "&";
                }
            }
            return md5(unsign).toString().toUpperCase();
        }

        let signStr = sign(qrArr);

        qrArrCp.push({"key": "sign", "value": signStr});

        let qrSign = '';
        for (let i = 0; i < qrArrCp.length; i++) {

            let e = qrArrCp[i];
            qrSign += e.key + "=" + e.value;
            if (i !== (qrArrCp.length - 1)) {
                qrSign += "&";
            }
        }

        function checkStatus(rep) {
            Loading.hide();
            console.log(rep);
            if (rep.status >= 200 && rep.status < 300) {
                return rep;
            } else {
                var error = new Error(rep.statusText);
                error.response = rep;
                throw error;
            }
        }

        function parseJSON(rep) {
            return rep.json()
        }

        function checkCode(rep) {
            if (rep.code === 1012) {
                CK.set("sessionId", rep.sessionId, "240h");
            }
            return rep;
        }

        // let req = HOST_DEV + "?" + input;
        // let HOST_DEV = "http://localhost:3000";
        // let req = HOST_DEV + input;
        let req = HOST_DEV + "?" + qrSign;

        let initCp = {
            // credentials: "include"
            credentials: "same-origin"
        }
        if (init !== undefined && init != null) {
            Object.assign(initCp, init);
        }

        return fetch(req, initCp).then(checkStatus).then(parseJSON).then(checkCode);
    }
}

export default net;

/*
let map = new Map();
let time = new Date().getTime();
map["version"] = window.version;
map["appType"] = window.appType;
map["deviceId"] = window.deviceId;
map["sessionId"] = CK.get("sessionId");
map["appChannel"] = window.appChannel;
map['token'] = window.User.getToken();
map["storeId"] = window.storeId;
map["timestamp"] = time;

let qrPath = input.split("?");
let qrArr = [];
if (qrPath !== undefined && qrPath instanceof Array && qrPath.length === 2) {
    let qrKVs = qrPath[1].split("&");
    if (qrKVs !== null && qrKVs instanceof Array) {
        for (let qrkv in qrKVs) {
            let kvs = qrKVs[qrkv].split("=");
            if (kvs !== undefined && kvs instanceof Array && kvs.length > 0) {
                if (kvs[0] === "") {
                    continue;
                }

                if (kvs[1] == null) {
                    continue;
                }
                qrArr.push({"key": kvs[0], "value": kvs[1]});
            }
        }
    }
}
// let HOST_DEV = "http://localhost:3000" + qrPath[0];

let qrArrCp = [];

for (let key in map) {
    if (map[key] == null) {
        continue;
    }
    qrArr.push({"key": key, "value": map[key]});
}

qrArrCp = qrArr.slice(0, qrArr.length);

qrArr.sort(function (a, b) {
    return a.key > b.key;
});


qrArr.push({"key": "key", "value": window.pkey});

function sign(qrArr) {

    let unsign = '';
    for (let ind = 0; ind < qrArr.length; ind++) {
        let e = qrArr[ind];
        unsign += e.key + "=" + e.value;
        if (ind !== (qrArr.length - 1)) {
            unsign += "&";
        }
    }
    return md5(unsign).toString().toUpperCase();
}

let signStr = sign(qrArr);

qrArrCp.push({"key": "sign", "value": signStr});

let qrSign = '';
for (let i = 0; i < qrArrCp.length; i++) {

    let e = qrArrCp[i];
    qrSign += e.key + "=" + e.value;
    if (i !== (qrArrCp.length - 1)) {
        qrSign += "&";
    }
}*/
