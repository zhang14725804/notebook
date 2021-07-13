### 本地项目关联远程项目

1、git init 将当前目录变为git可以管理的仓库

2、git add . 添加到暂存区

3、git commit -m ‘理由’  将文件提交到仓库

4、git remote add origin 远程仓库     关联到远程仓库

5、git push -u origin master（本地库推送到远程），输入账户名密码

我一般使用git push -f origin master（有些许山炮的成分）


git push -f origin --all  推送所有分支和标记

git push -f origin --tags


### 遇到的问题

git push远程分支error: src refspec xxx does not match any.

Git错误--git remote: HTTP Basic: Access denied

git 将某一个仓库的某一次提交合并到另一个仓库（😅😅😅）