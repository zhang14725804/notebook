### 内网穿透 ngrok 服务器和客户端配置

https://luozm.github.io/ngrok

https://cloud.tencent.com/developer/article/1048272

https://ubock.com/article/31

https://tonybai.com/2015/03/14/selfhost-ngrok-service/

https://tonybai.com/2015/03/14/selfhost-ngrok-service/

https://xicheng412.github.io/2016/09/27/ngrok-config/

https://www.cnblogs.com/along21/p/8384588.html

https://aotu.io/notes/2016/02/19/ngrok/index.html


### 用到的命令

    export NGROK_DOMAIN="ngrok.domain"（domain是自己阿里云中的域名）


    openssl genrsa -out rootCA.key 2048
    openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem
    openssl genrsa -out device.key 2048
    openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr
    openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000

    cp rootCA.pem assets/client/tls/ngrokroot.crt && cp device.crt assets/server/tls/snakeoil.crt && cp device.key assets/server/tls/snakeoil.key

    // 编译服务端
    make release-server
    // 编译windows客户端
    GOOS=windows GOARCH=amd64 make release-client

    // 远程拷贝文件夹到本地
    scp -r root@39.98.206.20:/usr/local/ngrok/bin/windows_amd64 ~/Desktop

    // 运行服务端
    ./bin/ngrokd -tlsKey="assets/server/tls/snakeoil.key" -tlsCrt="assets/server/tls/snakeoil.crt" -domain="$NGROK_DOMAIN"  -httpAddr=":7777" -httpsAddr=":7778" -tunnelAddr=":7779"

### 遇到的错误

    （1） Failed to read message: remote error: bad certificate

    （2） no such host

    都是因为domain配置问题。为什么域名前面加上ngrok.domain就好了，这个ngrok前缀哪里来的
