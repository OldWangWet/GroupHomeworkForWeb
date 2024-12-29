# 服务器docker配置
## 使用方法：
先解压到服务器中，按需处理后再创建容器并运行。
## next:
前端，解压并创建docker容器即可，默认端口3000
## backend：
后端，保存jar文件以及保存数据的文件夹，并 **修改dockerfile，修改jar文件名为保存的jar文件名字，修改保存文件夹的路径。** 再创建docker容器，默认端口8803
## db:
数据库，保存sql文件并创建docker容器，1111.sql为初始化文件，加载之前将1111的语句复制到sql脚本中，默认端口3306 _（项目中提供的sql已经包括了1111.sql的语句）_ 

创建容器并启动(run)时将文件夹中的mysql文件夹挂载到docker容器中实现持久化。(-v /path/to/db/mysql:/var/lib/mysql)
