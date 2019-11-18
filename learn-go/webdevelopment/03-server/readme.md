### Request & Response

Request and response messages are similar. Both messages consist of:

- a request/response line
- zero or more header lines
- a blank line (ie, CRLF by itself)
- an optional message body

### Header
- list of header field
https://en.wikipedia.org/wiki/List_of_HTTP_header_fields

### OSI model（七层协议）
https://en.wikipedia.org/wiki/OSI_model（更丰富）
https://zh.wikipedia.org/wiki/OSI%E6%A8%A1%E5%9E%8B

### Request && Response
https://en.wikipedia.org/wiki/List_of_RFCs
https://tools.ietf.org/html/rfc7230  （HTTP1.1（RFCs7230-7237））

### RFC
https://en.wikipedia.org/wiki/Request_for_Comments

### IETF
https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force
https://www.ietf.org/


#### 知识点总结

### 1. 建立TCP连接
- net.listen

```
    func Listen(net, laddr string) (Listener, error)
```
- net.Listener
```
    type Listener interface {
        // Accept waits for and returns the next connection to the listener.
        Accept() (Conn, error)

        // Close closes the listener.
        // Any blocked Accept operations will be unblocked and return errors.
        Close() error

        // Addr returns the listener's network address.
        Addr() Addr
    }
```
- net.Conn
```
    type Conn interface {
        // Read reads data from the connection.
        Read(b []byte) (n int, err error)

        // Write writes data to the connection.
        Write(b []byte) (n int, err error)

        // Close closes the connection.
        // Any blocked Read or Write operations will be unblocked and return errors.
        Close() error

        // LocalAddr returns the local network address.
        LocalAddr() Addr

        // RemoteAddr returns the remote network address.
        RemoteAddr() Addr

        SetDeadline(t time.Time) error

        SetReadDeadline(t time.Time) error

        SetWriteDeadline(t time.Time) error
    }
```

- net.Dial
```
    func Dial(network, address string) (Conn, error)
```
- TODOS::net.Dial和net.listen 有什么区别

### 2. 读写操作
- Write

        io.WriteString
        func WriteString(w Writer, s string) (n int, err error)

        fmt.Fprintln
        func Fprintln(w io.Writer, a ...interface{}) (n int, err error)  
        // io.WriteString和fmt.Fprintf有什么区别

- Read

        ioutil.ReadAll
        func ReadAll(r io.Reader) ([]byte, error)

        bufio.NewScanner
        func NewScanner(r io.Reader) *Scanner



- Read & Write

        io.Copy
        func Copy(dst Writer, src Reader) (written int64, err error)


todos：：

    memory-database没有写

    https://github.com/GoesToEleven/golang-web-dev/blob/master/015_understanding-TCP-servers/07_tcp-apps/02_memory-database/main.go