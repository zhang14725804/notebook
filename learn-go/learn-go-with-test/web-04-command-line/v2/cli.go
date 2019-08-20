package poker

type CLI struct {
	playerStore PlayerStore
}

/*
	struct添加方法
*/
func (cli *CLI) PlayPoker() {
	cli.playerStore.RecordWin("Cleo")
}
