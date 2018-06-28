var http = require('http');
var url = require('url');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    let _url = url.parse(req.url);
    console.log(_url.path);
    console.log(req);
    console.log(req.headers);
    var chunks = [];
    var size = 0;
    req.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length;
    });

    req.on("end", function () {
        var buffer = Buffer.concat(chunks, size);
        console.log(buffer.toString());

        var rems = [];

        //根据\r\n分离数据和报头
        for (var i = 0; i < buffer.length; i++) {
            var v = buffer[i];
            var v2 = buffer[i + 1];
            if (v == 13 && v2 == 10) {
                rems.push(i);
            }
        }


        //图片信息
        var picmsg_1 = buffer.slice(rems[0] + 2, rems[1]).toString();
        console.log(picmsg_1);
        // var filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];
        var filename = "test.jpg";
        console.log("文件名:" + filename);
        //图片数据
        var nbuf = buffer.slice(rems[3] + 2, rems[rems.length - 2]);

        var path = './databox/' + filename;
        fs.writeFileSync(path, nbuf);
        console.log("保存" + filename + "成功")

        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end('<div id="path">' + path + '</div>');
    });

    if (req.method === "POST" && _url.path === "/upload") {
        res.write("success");
    } else {
        res.write("hello");
    }
    res.end();
}).listen(3002);


server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
console.log("Server runing at port: " + 3002 + ".");