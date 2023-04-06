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
exports.apply = exports.usage = exports.using = exports.name = void 0;
const koishi_1 = require("koishi");
__exportStar(require("./config"), exports);
exports.name = 'signin'; //插件名称 "签到"
exports.using = [];
exports.usage = `
该插件会在koishi数据库'.koishi.db'中创建一个名为'user_sign_in'表,签到信息将会储存在该表中.
`;
let _config;
async function apply(ctx, config) {
    _config = config;
    ctx.database.extend("user_sign_in", {
        id: "string",
        time: "string",
        integral: "string", //积分
    }, {
        primary: "id"
    });
    const logger = ctx.logger("签到"); //定义日志中插件的名称
    ctx.command('签到', '签到获得10点积分').alias('signin') //ctx.command('签到') 定义一个指令,没有参数的,别名 "signin"
        .action(async ({ session }) => {
        {
            let 签到积分 = 10; //定义局部变量 签到积分为: 10
            {
                let 积分 = (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral, //读取总积分
                时间 = (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.time, //读取数据库中的签到时间
                签到时间 = koishi_1.Time.template('yyyy-MM-dd hh:mm:ss', new Date()); //读取当前的签到时间     new Date().toISOString();
                if (时间 == null && 积分 == null) {
                    await ctx.database.upsert('user_sign_in', [{ id: (String(session.userId)), time: 签到时间 }], ['id']);
                    await ctx.database.upsert('user_sign_in', [{ id: (String(session.userId)), integral: (_config.integral) }], ['id']); //_config.integral 每次签到获得的积分
                    logger.success(('用户' + String(session.userId) + '历史第一次签到！写入签到信息成功'));
                    if (0 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 4) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.late_at_night, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if (5 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 8) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.morning, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if (9 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 11) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.forenoon, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if ((Number(签到时间.slice(11, 13))) == 12) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.monoondel, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if (13 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 17) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.afternoon, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if (18 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 22) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.night, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if ((Number(签到时间.slice(11, 13))) == 23) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.midnight, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                }
                if ((Number(签到时间.slice(8, 10))) != Number(时间.slice(8, 10))) {
                    await ctx.database.upsert('user_sign_in', [{ id: (String(session.userId)), time: 签到时间 }], ['id']);
                    await ctx.database.upsert('user_sign_in', [{ id: (String(session.userId)), integral: (Number(积分) + Number(_config.integral)) }], ['id']); //_config.integral 每次签到获得的积分
                    logger.success((String(session.userId) + '完成了一次签到！'));
                    if (0 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 4) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.late_at_night, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if (5 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 8) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.morning, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if (9 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 11) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.forenoon, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if ((Number(签到时间.slice(11, 13))) == 12) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.monoondel, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if (13 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 17) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.afternoon, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if (18 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 22) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.night, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    else if ((Number(签到时间.slice(11, 13))) == 23) {
                        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', _config.midnight, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                    }
                    return ([(0, koishi_1.h)('at', { id: (session.userId) }), '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
                }
                logger.error((String(session.userId) + '签到失败！原因:该用户今日已经签到'));
                return (String((0, koishi_1.h)('at', { id: (session.userId) })) + '今天已经签到过咯');
            }
        }
    });
    //子指令,查看当前总积分!
    ctx.command('签到.v', '查看当前总积分').alias('signin.v') //创见子指令
        .action(async ({ session }) => {
        return ([(0, koishi_1.h)('at', { id: (session.userId) }), '当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));
    });
}
exports.apply = apply;
