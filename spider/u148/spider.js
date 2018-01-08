var superagent = require("superagent");
var async = require('async')
//相对目录要写清楚
let utils=require('./utils.js')
const charset = require('superagent-charset');
charset(superagent);
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/u148DB';

//获取所有的url
let pages = utils.getUrls();

MongoClient.connect(url, {
	server: {
		poolSize: 50
	}
}, function(err, db) {
	if (err) throw (err)

	//爬取单个页面
	function getPage(singeUrl) {
		superagent.get(singeUrl)
			.set({
				'Content-Type': 'text/html;charset=UTF-8',
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'})
			.charset('utf8')
			.end(function (err, sres) {
				if (err) throw err;
				utils.singleRequest(sres,db)
			});
	}
	async.mapLimit(pages, 5, function (url, callback) {
		fetchUrl(url, callback);
	}, function (err, result) {
		console.log(result);
	});
	var concurrencyCount = 0;

	function fetchUrl(url, callback) {
		concurrencyCount++;
		console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);

		getPage(url);

		setTimeout(function () {
			concurrencyCount--;
			callback(null, url + ' html content');
		}, 360);
	};
});