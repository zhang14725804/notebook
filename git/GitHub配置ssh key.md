1、检查本机是否有ssh key设置

    $ cd ~/.ssh 或cd .ssh
    如果没有则提示： No such file or directory
    如果有则进入~/.ssh路径下（ls查看当前路径文件，rm * 删除所有文件）

2、使用Git Bash生成新的ssh key。

    $ cd ~  #保证当前路径在”~”下
    $ ssh-keygen -t rsa -C "xxxxxx@yy.com"  #建议填写自己真实有效的邮箱地址

3、添加ssh key到GItHub

3.1 登录GitHub系统；点击右上角账号头像的“▼”→Settings→SSH kyes→Add SSH key

3.2 复制id_rsa.pub的公钥内容。 

    1) 进入c:/Users/xxxx_000/.ssh/目录下，打开id_rsa.pub文件，全选复制公钥内容。
    2) Title自定义，将公钥粘贴到GitHub中Add an SSH key的key输入框，最后“Add Key”

4、配置账户

    $ git config --global user.name “your_username”  #设置用户名
    $ git config --global user.email “your_registered_github_Email”  #设置邮箱地址(建议用注册giuhub的邮箱)

6、测试ssh keys是否设置成功。

    $ ssh -T git@github.com
    Hi xxx! You've successfully authenticated, but GitHub does not provide shell access. #出现词句话，说明设置成功