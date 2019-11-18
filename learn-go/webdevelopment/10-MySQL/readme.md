### 安装MySQL
（1）下载[MySQL Community Server](http://dev.mysql.com/downloads/)

ps：还要注册，其实可以不用注册的（瞎了我的eye）

ps:要下载[installer版本](https://dev.mysql.com/downloads/windows/installer/8.0.html)

（2）配置环境变量

选中系统变量中的“path”，在path值开头处输入mysql安装目录下的bin文件夹所在路径：C:\Program Files\MySQL\MySQL Server 5.7\bin，保存退出

（3）测试是否配置成功：

打开cmd，输入**mysql -u root -p**回车，然后输入mysql安装时设置的root账号的密码（123456），若提示“Welcome to the MySQL monitor.”说明配置成功了

（4）启动mysql

 以管理员的身份运行cmd，输入“net start mysql80”（MySQL80是配置mysql server时填写的服务器名称，cmd里不区分大小写也可以使用）

cmd路径：：C:\Windows\System32，右击cmd.exe，以管理员权限运行

（5）关闭mysql服务

以管理员的权限 net stop mysql ，关闭mysql服务

 ps：参考[windows10上安装mysql](https://blog.csdn.net/zhouzezhou/article/details/52446608) 

 ### database/sql
 [database/sql](https://golang.org/pkg/database/sql/)

 ### 命令行操做mysql
 - mysql -u root -p 链接数据库
 - show database
 - create database dbname

 ps：每条语句后面都需要封号“；”

