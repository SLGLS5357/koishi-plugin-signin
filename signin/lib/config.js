"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const koishi_1 = require("koishi");
exports.Config = koishi_1.Schema.intersect([
    koishi_1.Schema.object({
        integral: koishi_1.Schema.number().description('设置每次签到获得的积分')
            .min(0).max(100).step(1).default(10),
        morning: koishi_1.Schema.string().description('早上(5-8)签到回复的内容').default("早上好呀~,新的一天开始咯~"),
        forenoon: koishi_1.Schema.string().description('上午(9-11)回复的内容').default("上午好呀~,每天都要学习呦~"),
        monoondel: koishi_1.Schema.string().description('中午(12)回复的内容').default("中午好呀~,你吃饭了嘛~"),
        afternoon: koishi_1.Schema.string().description('下午(13-17)回复的内容').default("下午好呀~"),
        night: koishi_1.Schema.string().description('晚上(19-22)回复的内容').default("晚上好呀~"),
        midnight: koishi_1.Schema.string().description('半夜(23)回复的内容').default("晚上好~ 该睡觉咯~"),
        late_at_night: koishi_1.Schema.string().description('深夜(0-4)回复的内容').default("喂(#ˋOˊ)还不睡觉! 快去睡觉ᕦ(ò_óˇ)ᕤ"),
    }).description("配置"),
]);
