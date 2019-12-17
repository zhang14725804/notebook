### 码云和git，每次提交都需要输入用户名密码（配置ssh公钥）

通信方式由ssh切换成ssh，就好了

### 通过ssh方式绑定仓库

- git remote -v  查看远程仓库
- git config -e  显示当前所有远程库的详细信息

- git remote rm origin 删除关联的远程仓库

### 同时提交代码到gitee和github（需要配置公钥*.pub）

先增加第一个地址 git remote add origin <url1>

然后增加第二个地址 git remote set-url --add origin <url2>