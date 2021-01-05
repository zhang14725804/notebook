### 0.HTTP、HTTP2 和 HTTP3, QUIC

### 1. HTTP

HTTP 协议是应用层协议，在通常情况下我们都会使用 TCP 作为底层的传输层协议传输数据包，但是 HTTP/3 在 UDP 协议上实现了新的传输层协议 QUIC 并使用 QUIC 传输数据，这也意味着 HTTP 既可以跑在 TCP 上，也可以跑在 UDP 上。

