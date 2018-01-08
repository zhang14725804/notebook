var cheerio = require("cheerio");
module.exports.getUrls= function() {
    var basicUrl = 'http://www.u148.net/list/'
    var pages = [];
    for (let i = 1; i < 1333; i++) {
        pages.push(basicUrl + i);
    }
    return pages;
    // var result = [];
    // //将url分成每5个一组
    // for (var i = 0, len = pages.length; i < len; i += 5) {
    //     result.push(pages.slice(i, i + 5));
    // }
    // return result;
}
module.exports.singleRequest= function(response,db){
    var $ = cheerio.load(response.text);
    var links;
    var title;
    var writer;
    var writer_link;
    var summery;
    var date;
    var looks_reply;
    $('.list-content').each(function () {
        //文章配图
        imgUrl = $(this).prev().find('img').attr('src');
        //文章链接
        links = 'http://www.u148.net' + $(this).find('h1 a').attr('href');
        //文章标题
        title = $(this).find('h1 a').text();
        //作者
        writer = $(this).find('.index-time a').text();
        //作者链接
        writer_link = 'http://www.u148.net' + $(this).find('.index-time a').attr('href');
        //概要
        summery = $(this).find(".summary").text();
        //创建日期
        date = $(this).find('.data-text').text().replace('推荐于：', '');
        //浏览量
        looks_reply = $(this).find(".data-right").text().split('/');

        db.collection('u148test').insert({
            "imgUrl": imgUrl,
            "links": links,
            "title": title,
            "writer": writer,
            "writer_link": writer_link,
            "summery": summery,
            "date": date,
            "looks": looks_reply[0].replace(/[^\d]/g, ''),
            "reply": looks_reply[1].replace(/[^\d]/g, ''),
        }, function (err, r) {
            if (err) throw (err)
        });
    })
}