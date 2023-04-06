import { Schema } from 'koishi'

//插件-

export interface Config {          //创建一个接口

    integral: number   //积分
    
    morning: string    //早上
    forenoon: string   //上午
    monoondel: string  //中午
    afternoon: string  //下午
    night: string      //晚上
    midnight: string   //半夜11点
    late_at_night: string   //深夜:0-5
}

export const Config: Schema<Config> = Schema.intersect([    //插件配置设置
    Schema.object({
        
        integral: Schema.number().description('设置每次签到获得的积分')
        .min(0).max(100).step(1).default(10),

        morning: Schema.string().description('早上(5-8)签到回复的内容').default("早上好呀~,新的一天开始咯~"),
        forenoon: Schema.string().description('上午(9-11)回复的内容').default("上午好呀~,每天都要学习呦~"),
        monoondel: Schema.string().description('中午(12)回复的内容').default("中午好呀~,你吃饭了嘛~"),
        afternoon: Schema.string().description('下午(13-17)回复的内容').default("下午好呀~"),
        night: Schema.string().description('晚上(19-22)回复的内容').default("晚上好呀~"),
        midnight: Schema.string().description('半夜(23)回复的内容').default("晚上好~ 该睡觉咯~"),
        late_at_night: Schema.string().description('深夜(0-4)回复的内容').default("喂(#ˋOˊ)还不睡觉! 快去睡觉ᕦ(ò_óˇ)ᕤ"),   
    }).description("配置"),
])

