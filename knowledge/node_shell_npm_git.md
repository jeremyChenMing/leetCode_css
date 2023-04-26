## 一、shell相关命令
1、ls   显示当前目录下的文件 
    参数 -a 显示所有文件包含隐藏文件  -l  显示的详细信息

2、cd 进入某个位置
    参数 （空） 回到home目录下
                ～     不同的目录下
                ..      回到上一级目录

3、pwd 显示当前的工作目录

4、mkdir 创建一个文件夹        
      rmdir删除一个文件夹

5、cp 复制命令
复制一个文件到另一目录：cp 1.txt ../test2
复制一个文件到本目录并改名：cp 1.txt 2.txt
复制一个文件夹a并改名为b：cp -r a b

6、mv 移动命令
将一个文件移动到另一个目录：mv 1.txt ../test1
将一个文件在本目录改名：mv 1.txt 2.txt
将一个文件一定到另一个目录并改名：mv 1.txt ../test1/2.txt

7、rm 删除命令
rm命令用于删除文件，与dos下的del/erase命令相似，rm命令常用的参数有三个：-i，-r，-f。
–i ：系统在删除文件之前会先询问确认，用户回车之后，文件才会真的被删除。需要注意，linux下删除的文件是不能恢复的，删除之前一定要谨慎确认。
–r：该参数支持目录删除，功能和rmdir命令相似。
–f：和-i参数相反，-f表示强制删除

8、du df
du命令可以显示目前的目录所占用的磁盘空间，df命令可以显示目前磁盘剩余空间
如果du命令不加任何参数，那么返回的是整个磁盘的使用情况，如果后面加了目录的话，就是这个目录在磁盘上的使用情况。
du -hs 指定目录  查看指定目录的总大小
du -hs ./* 查看当前目录下的所有文件夹和文件的大小
这两个命令都支持-k，-m和-h参数，-k和-m类似，都表示显示单位，一个是k字节一个是兆字节，-h则表示human-readable，即友好可读的显示方式。

9、cat  显示或连接文本文件 有点类似vim
    同时也可以重定向，例如cat test.js > test.txt  会把左边的内容复制到右侧，右侧以前的内容会被清空
    如果时>>合并到后面的文件尾部

10、echo 命令
echo命令的使用频率不少于ls和cat，尤其是在shell脚本编写中。
语法：echo [-ne][字符串]
功能：echo会将输入的字符串送往标准输出，输出的字符串间以空白字符隔开， 并在最后加上换行符。
参数：
-n 显示字串时在最后自动换行
-e 支持以下格式的转义字符， -E 不支持以下格式的转义字符
/a 发出警告声；
/b 删除前一个字符；
/c 最后不加上换行符号；
/f 换行但光标仍旧停留在原来的位置；
/n 换行且光标移至行首；
/r 光标移至行首，但不换行；
/t 插入tab；
/v 与/f相同；
// 插入/字符；
/nnn 插入nnn（八进制）所代表的ASCII字符

11、file 查看文件的类型

12、find 查找文件

13、touch
Touch 创建一个文件
mkdir 创建一个文件夹


## 二、npm相关命令
1、npm install moduleNames：安装Node模块
安装完毕后会产生一个node_modules目录，其目录下就是安装的各个node模块。
node的安装分为全局模式和本地模式。
一般情况下会以本地模式运行，包会被安装到和你的应用程序代码的本地node_modules目录下。
在全局模式下，Node包会被安装到Node的安装目录下的node_modules下。
全局安装命令为$npm install -g moduleName。
获知使用$npm set global=true来设定安装模式，$npm get global可以查看当前使用的安装模式。
示例：
npm install express 
默认会安装express的最新版本，也可以通过在后面加版本号的方式安装指定版本，如npm install express@3.0.6
npm install <name> -g 
将包安装到全局环境中

npm install <name> --save 
安装的同时，将信息写入package.json中项目路径中如果有package.json文件时，直接使用npm install方法就可以根据dependencies配置安装所有的依赖包，这样代码提交到github时，就不用提交node_modules这个文件夹了。
2、npm view moduleNames：查看node模块的package.json文件夹
注意事项：如果想要查看package.json文件夹下某个标签的内容，可以使用$npm view moduleName labelName
3、npm list：查看当前目录下已安装的node包
           nam list 查看local包
     或者npm list —global  产看全局的所有的包
           npm list -g —depth=0 查看最外层的包

注意事项：Node模块搜索是从代码执行的当前目录开始的，搜索结果取决于当前使用的目录中的node_modules下的内容。$ npm list parseable=true可以目录的形式来展现当前安装的所有node包
4、npm help：查看帮助命令
5、npm view moudleName dependencies：查看包的依赖关系
6、npm view moduleName repository.url：查看包的源文件地址
7、npm view moduleName engines：查看包所依赖的Node的版本
8、npm help folders：查看npm使用的所有文件夹
9、npm rebuild moduleName：用于更改包内容后进行重建
10、npm outdated：检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
11、npm update moduleName：更新node模块,更新包
12、npm uninstall moudleName：卸载node模块
13、一个npm包是包含了package.json的文件夹，package.json描述了这个文件夹的结构。访问npm的json文件夹的方法如下：
$ npm help json 
此命令会以默认的方式打开一个网页，如果更改了默认打开程序则可能不会以网页的形式打开。
14、发布一个npm包的时候，需要检验某个包名是否已存在
$ npm search packageName
15、npm init：会引导你创建一个package.json文件，包括名称、版本、作者这些信息等
16、npm root：查看当前包的安装路径
npm root -g：查看全局的包的安装路径
17、npm -v：查看npm安装的版本

1.npm常用的命令

当 npm 安装一个包的时候它会维护一个副本，下次你想再次安装那个包的时候，就不用再去访问网络重新下载了。那些副本会在 home 目录 .npm 文件夹中缓存起来。
$ ls ~/.npm
_locks  minimist  mkdirp  registry.npmjs.org  underscore
随着时间推移，这个目录里会有很多老的包，十分的混乱，所以时常清理下是十分有必要的。
$ npm cache clean

2.npm 脚本
就是在package.js中的scripts字段定义脚本命令

1）通配符 ＊ 
＊表示任意文件名  ＊.js
＊＊ 表示任意子目录    **/ * .js
            如果要将通配符传入原始命令，要将 ”＊” 转义    例如： “test” ： “tap test/\*.js”

2) 传参数   用－－表示
例如  npm install …..   - -save

3) 执行的顺序
&  表示同时执行     npm run scripts & nam run srcitps1
&& 前一个成功后一个才之行      npm run scripts && nam run srcitps1

4) 简写
npm start  = npm run start
npm stop  = npm run stop
npm test   = npm run  test

npm outdated 查看所有可以更新的包
npm outdated -g --depth=0 查看全局包的更新情况


## Node 包管理 n
全局安装n
Sudo npm install n -g

安装稳定版本、最新版本、制定版本
Sudo n stable, sudo n latest, sudo n 版本号

查看安装了那些版本
n

切换版本
N 版本好
或者直接输入n，在进行回车切换即可


包的管理器npm-check
-u, --update       显示一个交互式UI，用于选择要更新的模块，并自动更新"package.json"内包版本号信息
-g, --global       检查全局下的包
-s, --skip-unused  忽略对未使用包的更新检查
-p, --production   忽略对"devDependencies"下的包的检查
-d, --dev-only     忽略对"dependencies"下的包的检查
-i, --ignore       忽略对指定包的检查.
-E, --save-exact   将确切的包版本存至"package.json"(注意，此命令将存储'x.y.z'而不是'^x.y.z')


## git related commands
+ 1、git merge 冲突侯
```
1、还原 git reflog 然后 git reset --hard 9299b20（最近一次的提交）
2、git merge --abort 放弃本次合并
```
+ 2、longjianpc 菜单
```
1、配置文件目录在scaffold， 仔细阅读readme.md文件
 + /scaffold/dist/menu-0/分别对应group/team/project三级的目录，分别对应不同的菜单配置，配置方法参考readme.md文件（拉取最新，修改，上传），在通知后台，加权限
2、全局文档说明在根目录下的readme.md文件
```
+ 2、查看某个分支的所有提交，可以追溯的第一次提交的id
```
git reflog --date=local | grep feature-info-20200727
```

+ 查看某个分支的代码是否合并到某分支

```
git log online-20200709-pre | grep d0effb9b33bfac690b7eadff15b77cd7080ad51c
1、online-20200709-pre 表示查询分支
2、d0effb9b33bfac690b7eadff15b77cd7080ad51c 表示查看分支的最后一次提交id
3、如果打印 commit d0effb9b33bfac690b7eadff15b77cd7080ad51c 表示此分支最后一个提交的代码已经合并到了online分支，如果是空表示没有合并
```

+ Git global setup

```
git config --global user.name "陈明"
git config --global user.email "chenming@upvi.com"
```
+ Create a new repository
```
git clone git@git.upvi.com:saas/saas-mobile.git
cd saas-mobile
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```
+ Existing folder
```
cd existing_folder
git init
git remote add origin git@git.upvi.com:saas/saas-mobile.git
git add .
git commit -m "Initial commit"
git push -u origin master
```
+ Existing Git repository
```
cd existing_repo
git remote rename origin old-origin
git remote add origin git@git.upvi.com:saas/saas-mobile.git
git push -u origin --all
git push -u origin --tags
```


+ 1、git fetch --prune 清理本地已经删除的分支
```
git branch  查看本地
Git branch -a 查看本地+远程
Git branch -r  查看远程分支
```

