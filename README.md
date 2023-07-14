# 自用脚本
## 不定期维护

## 下载ipk
在[原作者处下载](https://github.com/Erope/openwrt_nezha/releases/)
在[supes处下载](https://op.supes.top/packages/)
## 上传到openwrt并安装
```bash
opkg install xxxx.ipk
```
**或**
登录OP后台上传插件安装
![](https://www.slotheve.com/wp-content/uploads/2023/06/image-13.png)
![](https://www.slotheve.com/wp-content/uploads/2023/06/image-14.png)
## 删除/tmp/luci-indexcache并重新登陆openwrt
## 点击nezha-agent并填入具体信息
![](https://www.slotheve.com/wp-content/uploads/2023/06/image-15.png)
## 提示
<font style="background: rgb(250,248,245)">如果点击运行无反应, 请使用 `/etc/init.d/nezha-agent start/restart` 命令</font>
