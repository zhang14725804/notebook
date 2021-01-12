

## http标准库实现原理（太难了 shiori kuraki  🔥🔥🔥）

```golang
type Server struct{}
func (srv *Server) ListenAndServe() error
func (srv *Server) Serve(l net.Listener) error  // 每个tcp连接，启动一个goroutine
func (srv *Server) ServeTLS(l net.Listener, certFile, keyFile string) error

func (c *conn) serve(ctx context.Context) // 很复杂
func (c *conn) readRequest(ctx context.Context) (w *response, err error) // request创建response

func (srv *Server) Shutdown(ctx context.Context) error

func (h *timeoutHandler) ServeHTTP(w ResponseWriter, r *Request)

type Handler interface

func (w *response) Header() Header

func (c *conn) readRequest(ctx context.Context) (w *response, err error)

func readRequest(b *bufio.Reader, deleteHostHeader bool) (req *Request, err error)
func (r *Reader) ReadMIMEHeader() (MIMEHeader, error)
```

跟踪堆栈调用之后，如何退回到原来的位置


https://www.youtube.com/watch?v=qnrTDH8oiXY


https://draveness.me/golang/docs/part4-advanced/ch09-stdlib/golang-net-http/#92-http

