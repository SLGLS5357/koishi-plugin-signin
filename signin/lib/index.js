"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reply = exports.apply = exports.usage = exports.using = exports.name = void 0;
const koishi_1 = require("koishi");
__exportStar(require("./config"), exports);
exports.name = 'signin'; //插件名称 "签到"
exports.using = [];
exports.usage = `

# signin v1.0.4 更新日志

- 修复 配置文件每次签到积分不可修改,固定为10的bug

### 该插件将在'.koishi.db'中创建一个名为'user_sign_in'表,签到信息将会储存在该表中.
`;
let _config; //定义一个_config等于Config 的常量，类型为 Schema<Config>
async function apply(ctx, config) {
    _config = config;
    ctx.database.extend("user_sign_in", {
        id: "string",
        time: "string",
        integral: "number", //积分
    }, {
        primary: "id"
    });
    const logger = ctx.logger("signin"); //定义日志中插件的名称
    ctx.command('signin', '签到获得积分').alias('签到') //ctx.command('签到') 定义一个指令,没有参数的,别名 "signins"
        .action(async ({ session }) => {
        let userId = session.userId; //会话对象的id
        let signin_Time = koishi_1.Time.template('yyyy-MM-dd hh:mm:ss', new Date()); //读取当前的签到时间     new Date().toISOString();
        let signin_Integral = config.integral; //定义局部变量 签到积分为: config.integral
        const User_profile = await ctx.database.get('user_sign_in', { id: session.userId }); //获取数据库中的用户ID     会话对象用户的ID:session.userId
        if (User_profile.length === 0) {
            // 主键不存在，用户在数据库中没有记录，第一次写入用户信息
            await ctx.database.upsert('user_sign_in', [{ id: (session.userId), time: signin_Time, integral: signin_Integral }], ['id']); //signin_Integral = config.integral 每次签到获得的积分
            //输出日志
            logger.success(('用户' + String(session.userId) + '历史第一次签到！写入签到信息成功'));
            //签到时间. 返回不同回复,签到结束
            return (reply(signin_Time, signin_Integral, userId, config, ctx));
        }
        else {
            // 主键存在,即用户在数据库
            let integral = (await ctx.database.get('user_sign_in', { id: session.userId }))[0]?.integral; //读取用户总积分
            let time = (await ctx.database.get('user_sign_in', { id: session.userId }))[0]?.time; //读取用户的签到时间
            //数据据库中有用户的信息,对比数据中的签到信息,写入信息
            if ((Number(signin_Time.slice(8, 10))) != Number(time.slice(8, 10))) {
                //写入签到时间和积分
                await ctx.database.upsert('user_sign_in', [{ id: session.userId, time: signin_Time, integral: (integral + signin_Integral) }], ['id']); //签到积分=config.integral 每次签到获得的积分
                logger.success((String(session.userId) + '完成了一次签到！'));
                //签到时间. 返回不同回复,签到结束
                return (reply(signin_Time, signin_Integral, userId, config, ctx));
            }
            else {
                //如果今日用户已签到,返回
                logger.error((String(session.userId) + '签到失败！原因:该用户今日已经签到')); //输出日志
                return (String((0, koishi_1.h)('at', { id: (session.userId) })), '&#10;', '今天已经签到过咯');
            }
        }
    });
    //子指令,查看当前总积分!
    ctx.command('signin.v', '查看当前总积分').alias('签到.v') //创见子指令
        .action(async ({ session }) => {
        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
    });
}
exports.apply = apply;
//签到时间. 返回不同回复
async function reply(signin_Time, signin_Integral, userId, config, ctx) {
    if (0 <= (Number(signin_Time.slice(11, 13))) && (Number(signin_Time.slice(11, 13))) <= 4) {
        return ([(0, koishi_1.h)('at', { id: (userId) }), '&#10;', config.late_at_night, '&#10;', '签到成功!获得', signin_Integral, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(userId) }))[0]?.integral].join(''));
    }
    else if (5 <= (Number(signin_Time.slice(11, 13))) && (Number(signin_Time.slice(11, 13))) <= 8) {
        return ([(0, koishi_1.h)('at', { id: (userId) }), '&#10;', config.morning, '&#10;', '签到成功!获得', signin_Integral, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(userId) }))[0]?.integral].join(''));
    }
    else if (9 <= (Number(signin_Time.slice(11, 13))) && (Number(signin_Time.slice(11, 13))) <= 11) {
        return ([(0, koishi_1.h)('at', { id: (userId) }), '&#10;', config.forenoon, '&#10;', '签到成功!获得', signin_Integral, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(userId) }))[0]?.integral].join(''));
    }
    else if ((Number(signin_Time.slice(11, 13))) == 12) {
        return ([(0, koishi_1.h)('at', { id: (userId) }), '&#10;', config.monoondel, '&#10;', '签到成功!获得', signin_Integral, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(userId) }))[0]?.integral].join(''));
    }
    else if (13 <= (Number(signin_Time.slice(11, 13))) && (Number(signin_Time.slice(11, 13))) <= 17) {
        return ([(0, koishi_1.h)('at', { id: (userId) }), '&#10;', config.afternoon, '&#10;', '签到成功!获得', signin_Integral, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(userId) }))[0]?.integral].join(''));
    }
    else if (18 <= (Number(signin_Time.slice(11, 13))) && (Number(signin_Time.slice(11, 13))) <= 22) {
        return ([(0, koishi_1.h)('at', { id: (userId) }), '&#10;', config.night, '&#10;', '签到成功!获得', signin_Integral, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(userId) }))[0]?.integral].join(''));
    }
    else if ((Number(signin_Time.slice(11, 13))) == 23) {
        return ([(0, koishi_1.h)('at', { id: (userId) }), '&#10;', config.midnight, '&#10;', '签到成功!获得', signin_Integral, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(userId) }))[0]?.integral].join(''));
    }
}
exports.reply = reply;
