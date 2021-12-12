package main

import (
	"log"
	"os"
	"runtime"

	"github.com/urfave/cli/v2"
)

// 😅 go mod tidy 根据go.mod文件来处理依赖关系
// go run . --url https://apache.claz.org/zookeeper/zookeeper-3.7.0/apache-zookeeper-3.7.0-bin.tar.gz
func main() {
	concurrencyNum := runtime.NumCPU()
	app := &cli.App{
		Name:  "downloader",
		Usage: "File concurrency downloader",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "url",
				Aliases:  []string{"u"},
				Usage:    "`URL` to download",
				Required: true,
			},
			&cli.StringFlag{
				Name:    "output",
				Aliases: []string{"o"},
				Usage:   "Output `filename`",
			},
			&cli.IntFlag{
				Name:    "concurrency",
				Aliases: []string{"n"},
				Value:   concurrencyNum,
				Usage:   "Concurrency `number`",
			},
		},
		Action: func(c *cli.Context) error {
			strURL := c.String("url")
			filename := c.String("output")
			concurrency := c.Int("concurrency")
			return NewDownloader(concurrency).Download(strURL, filename)
		},
	}
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
