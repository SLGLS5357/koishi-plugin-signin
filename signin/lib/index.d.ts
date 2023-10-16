import { Config } from './config';
export * from './config';
export declare const name = "signin";
export declare const using: any[];
export declare const usage = "\n\n# signin v1.0.4 \u66F4\u65B0\u65E5\u5FD7\n\n- \u4FEE\u590D \u914D\u7F6E\u6587\u4EF6\u6BCF\u6B21\u7B7E\u5230\u79EF\u5206\u4E0D\u53EF\u4FEE\u6539,\u56FA\u5B9A\u4E3A10\u7684bug\n\n### \u8BE5\u63D2\u4EF6\u5C06\u5728'.koishi.db'\u4E2D\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A'user_sign_in'\u8868,\u7B7E\u5230\u4FE1\u606F\u5C06\u4F1A\u50A8\u5B58\u5728\u8BE5\u8868\u4E2D.\n";
export declare function apply(ctx: any, config: Config): Promise<void>;
export declare function reply(signin_Time: string, signin_Integral: Number, userId: string, config: Config, ctx: any): Promise<string>;
