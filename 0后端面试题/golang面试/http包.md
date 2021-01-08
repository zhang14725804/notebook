

## http标准库实现原理（太难了  🔥🔥🔥）

```golang
type Server struct{}
func (srv *Server) ListenAndServe() error
func (srv *Server) Serve(l net.Listener) error  // 每个tcp连接，启动一个goroutine
func (srv *Server) ServeTLS(l net.Listener, certFile, keyFile string) error

func (c *conn) serve(ctx context.Context)
func (c *conn) readRequest(ctx context.Context) (w *response, err error) // request创建response

```

https://www.youtube.com/watch?v=qnrTDH8oiXY


https://draveness.me/golang/docs/part4-advanced/ch09-stdlib/golang-net-http/#92-http

