var superagent = require("superagent");
var async = require('async')
//相对目录要写清楚
let utils = require('./utils.js')
const charset = require('superagent-charset');
charset(superagent);
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/u148DB2';

//获取所有的url
let pages = utils.getUrls();

MongoClient.connect(url, {
    server: {
        poolSize: 50
    }
}, function (err, db) {
    if (err) throw (err)
    //爬取单个页面
    function getPage(singeUrl) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                superagent.get(singeUrl)
                    .set({
                        'Content-Type': 'text/html;charset=UTF-8',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
                    })
                    .charset('utf8')
                    .end(function (err, sres) {
                        if (err) throw err;
                        utils.singleRequestU148(sres, db)
                    })
                resolve('resolve==' + singeUrl)
            }, 100);  
        })
    }
    async function run() {
        for (let i = 0; i < pages.length; i += 5) {
            // console.log(pages[i])
            // console.log(pages[i+1])
            // console.log(pages[i+2])
            // console.log(pages[i+3])
            // console.log(pages[i+4])
            await Promise.all([ getPage(pages[i]), getPage(pages[i + 1]), getPage(pages[i + 2]), getPage(pages[i + 3]), getPage(pages[i + 4])]);
        }
    }

    run()
});