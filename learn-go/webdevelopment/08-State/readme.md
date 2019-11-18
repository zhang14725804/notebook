### 1、get、post传值

### 2、enctype

    https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean

- application/x-www-form-urlencoded (the default)
- multipart/form-data
- text/plain

### 3、http状态码

http1.1

https://tools.ietf.org/html/rfc7231

https://golang.org/pkg/net/http/#pkg-constants

### 4、cookie

### 5、session

go get github.com/satori/go.uuid

bcrypt包
go get golang.org/x/crypto/bcrypt失败
https://stackoverflow.com/questions/31334197/failed-to-install-golang-org-x-crypto-bcrypt
https://github.com/golang/crypto下载，然后解压至 $GOPATH/src/golang.org/x/ 目录下