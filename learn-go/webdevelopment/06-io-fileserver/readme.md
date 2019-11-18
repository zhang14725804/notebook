### https://golang.org/pkg/os/

### ServeContent
    http.ServeContent
    func ServeContent(w ResponseWriter, req *Request, name string, modtime time.Time, content io.ReadSeeker)
### ServeFile
    http.ServeFile
    func ServeFile(w ResponseWriter, r *Request, name string)
### FileServer & StripPrefix
    http.FileServer
    func FileServer(root FileSystem) Handler

    http.StripPrefix
    func StripPrefix(prefix string, h Handler) Handler