# koishi插件

## 一个带数据库的签到插件

### signin v1.0.4 更新日志

- 修复 配置文件每次签到积分不可修改,固定为10的bug

### signin V1.0.5 更新日志

- 新增 数据表用户名。可使用signin.name 指令修改
- 数据表与V1.0.4不兼容，使用前请先备份.koishi.db 中的‘user_sign_in’表，再删除此表

### 该插件将在'.koishi.db'中创建一个名为'user_sign_in'表,签到信息将会储存在该表中.
