package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
	"sync"
)

type Downloader struct {
	concurrency int
}

func NewDownloader(concurrency int) *Downloader {
	return &Downloader{concurrency: concurrency}
}

func (d *Downloader) Download(strURL, filename string) error {
	if filename == "" {
		filename = path.Base(strURL)
	}

	resp, err := http.Head(strURL)
	if err != nil {
		return err
	}
	// 通过 Head 请求，判断是否支持部分请求。
	if resp.StatusCode == http.StatusOK && resp.Header.Get("Accept-Ranges") == "bytes" {
		return d.multiDownload(strURL, filename, int(resp.ContentLength))
	}
	// 如果不支持，就直接下载整个文件；
	return d.singleDownload(strURL, filename)
}

func (d *Downloader) singleDownload(strURL, filename string) error {
	return nil
}

// getPartDir 部分文件存放的目录
func (d *Downloader) getPartDir(filename string) string {
	return strings.SplitN(filename, ".", 2)[0]
}

// getPartFilename 构造部分文件的名字
func (d *Downloader) getPartFilename(filename string, partNum int) string {
	partDir := d.getPartDir(filename)
	return fmt.Sprintf("%s/%s-%d", partDir, filename, partNum)
}

func (d *Downloader) downloadPartial(strURL, filename string, rangeStart, rangeEnd, i int) {
	if rangeStart >= rangeEnd {
		return
	}
	req, err := http.NewRequest("GET", strURL, nil)
	if err != nil {
		log.Fatal(err)
	}
	// rangeStart 和 rangeEnd 分别表示 Range 的开始和结束；
	req.Header.Set("Range", fmt.Sprintf("bytes=%d-%d", rangeStart, rangeEnd))
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	flags := os.O_CREATE | os.O_WRONLY
	// 为了方便后续合并，文件名加上了序号，这就是 downloadPartial 最后一个参数的作用
	partFile, err := os.OpenFile(d.getPartFilename(filename, i), flags, 0666)
	if err != nil {
		log.Fatal(err)
	}
	defer partFile.Close()

	buf := make([]byte, 32*1024)
	// 将请求的内容写入本地文件中
	_, err = io.CopyBuffer(partFile, resp.Body, buf)
	if err != nil {
		if err == io.EOF {
			return
		}
		log.Fatal(err)
	}
}

// multiDownload 方法中怎么分部分
func (d *Downloader) multiDownload(strURL, filename string, contentLen int) error {
	// 每片大小 TODO 这里可以改进，比如设置5M
	partSize := contentLen / d.concurrency
	partDir := d.getPartDir(filename)
	os.Mkdir(partDir, 0777)
	defer os.RemoveAll(partDir)

	// 通过 sync.WaitGroup 协调并发请求；
	var wg sync.WaitGroup
	wg.Add(d.concurrency)

	// 每个部分的 rangeStart 和 rangeEnd 的计算规则，特别注意最后一部分；
	rangeStart := 0
	for i := 0; i < d.concurrency; i++ {
		go func(i, rangeStart int) {
			defer wg.Done()
			rangeEnd := rangeStart + partSize
			if i == d.concurrency-1 {
				rangeEnd = contentLen
			}
			d.downloadPartial(strURL, filename, rangeStart, rangeEnd, i)
		}(i, rangeStart)
		rangeStart += partSize + 1
	}
	wg.Wait()
	// 所有部分都请求完成后，需要进行合并；
	d.merge(filename)
	return nil
}

func (d *Downloader) merge(filename string) error {
	destFile, err := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		return err
	}
	defer destFile.Close()

	for i := 0; i < d.concurrency; i++ {
		partFilename := d.getPartFilename(filename, i)
		partFile, err := os.Open(partFilename)
		if err != nil {
			return err
		}

		io.Copy(destFile, partFile)
		partFile.Close()
		os.RemoveAll(partFilename)
	}
	return nil
}
