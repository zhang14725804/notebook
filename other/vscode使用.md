## vscode卸载（什么方式安装，就要什么方式卸载）

常规删除：
1. sudo dpkg --purge code & sudo dpkg --remove code
2. sudo apt-get --purge code & sudo apt-get --remove code
3. umake ide  visual-studio-code --remove 
4. 删除配置文件 rm-rf ~/.config/Code &&  rm-rf ~/.vscode

### vscode配置go语言环境

https://blog.csdn.net/qq_15889613/article/details/103378602