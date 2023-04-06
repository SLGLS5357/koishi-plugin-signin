import { Context, Schema } from 'koishi'
import { Time, h } from "koishi"
import { resolve } from 'path'
import { } from '@koishijs/plugin-console'

import { Config } from './config';
import { sign_integral } from './sign_integral';

export * from './config';
export const name = 'signin'    //插件名称 "签到"
export const using = []

export const usage = `
该插件会在koishi数据库'.koishi.db'中创建一个名为'user_sign_in'表,签到信息将会储存在该表中.
`
let _config: Config;      //定义一个_config等于Config 的常量，类型为 Schema<Config>

export async function apply(ctx, config: Config) {

  _config = config;

  ctx.database.extend("user_sign_in", {      //创建数据库名为: user_sign_in 数据表, .koishi.db数据库中
    id: "string",    //用户
    time: "string",    //时间
    integral: "string",  //积分
  }, {
    primary: "id"
  })

  const logger = ctx.logger("signin")    //定义日志中插件的名称
  ctx.command('签到', '签到获得10点积分').alias('signin')   //ctx.command('签到') 定义一个指令,没有参数的,别名 "signin"
    .action(async ({ session }) => {
      {
        let User_ID = session.userId;  //获取调用签到指令用户的ID:即session.userId
        let 签到积分 = 10;  //定义局部变量 签到积分为: 10
        {
          let 积分 = (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral,    //读取总积分
            时间 = (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.time,        //读取数据库中的签到时间
            签到时间 = Time.template('yyyy-MM-dd hh:mm:ss', new Date());     //读取当前的签到时间     new Date().toISOString();

          //判断数据库中是否有该用户的信息,如果没有,用户历史第一次写入签到信息
          if (时间 == null && 积分 == null) {
            //写入签到时间和和积分
            await ctx.database.upsert('user_sign_in', [{ id: (String(session.userId)), time: 签到时间 }], ['id'])
            await ctx.database.upsert('user_sign_in', [{ id: (String(session.userId)), integral: (_config.integral) }], ['id'])    //_config.integral 每次签到获得的积分
            
            //输出日志
            logger.success(('用户' + String(session.userId) + '历史第一次签到！写入签到信息成功'));

            //签到时间. 返回不同回复,签到结束
            return (reply(签到时间, 签到积分, User_ID, config, ctx));
          }

          //数据据库中有用户的信息,对比数据中的签到信息,写入信息
          if ((Number(签到时间.slice(8, 10))) != Number(时间.slice(8, 10))) {
            //写入签到时间和积分
            await ctx.database.upsert('user_sign_in', [{ id: (String(session.userId)), time: 签到时间 }], ['id'])
            await ctx.database.upsert('user_sign_in', [{ id: (String(session.userId)), integral: (Number(积分) + Number(_config.integral)) }], ['id'])     //_config.integral 每次签到获得的积分
            
            logger.success((String(session.userId) + '完成了一次签到！'));

            //签到时间. 返回不同回复,签到结束
            return (reply(签到时间, 签到积分, User_ID, config, ctx));

          }

          //如果今日用户已签到,返回
          return (String(h('at', { id: (session.userId) })) + '今天已经签到过咯');
          //输出日志
          logger.error((String(session.userId) + '签到失败！原因:该用户今日已经签到'));
        }
      }
    });


  //子指令,查看当前总积分!
  ctx.command('签到.v', '查看当前总积分').alias('signin.v')     //创见子指令
    .action(async ({ session }) => {

      return ([h('at', { id: (session.userId) }), '当前总积分:', (await ctx.database.get('user_sign_in', { id: String(session.userId) }))[0]?.integral].join(''));

    });

}

//签到时间. 返回不同回复
export async function reply(签到时间: string, 签到积分: Number, User_ID: Number, config: Config, ctx: any) {

  if (0 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 4) {
    return ([h('at', { id: (User_ID) }), '&#10;', _config.late_at_night, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(User_ID) }))[0]?.integral].join(''));
  }
  else if (5 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 8) {
    return ([h('at', { id: (User_ID) }), '&#10;', _config.morning, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(User_ID) }))[0]?.integral].join(''));
  }
  else if (9 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 11) {
    return ([h('at', { id: (User_ID) }), '&#10;', _config.forenoon, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(User_ID) }))[0]?.integral].join(''));
  }
  else if ((Number(签到时间.slice(11, 13))) == 12) {
    return ([h('at', { id: (User_ID) }), '&#10;', _config.monoondel, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(User_ID) }))[0]?.integral].join(''));
  }
  else if (13 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 17) {
    return ([h('at', { id: (User_ID) }), '&#10;', _config.afternoon, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(User_ID) }))[0]?.integral].join(''));
  }
  else if (18 <= (Number(签到时间.slice(11, 13))) && (Number(签到时间.slice(11, 13))) <= 22) {
    return ([h('at', { id: (User_ID) }), '&#10;', _config.night, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(User_ID) }))[0]?.integral].join(''));
  }
  else if ((Number(签到时间.slice(11, 13))) == 23) {
    return ([h('at', { id: (User_ID) }), '&#10;', _config.midnight, '&#10;', '签到成功!获得', 签到积分, '点积分,当前总积分:', (await ctx.database.get('user_sign_in', { id: String(User_ID) }))[0]?.integral].join(''));
  }


  
}
