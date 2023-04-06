import { Config } from './config';
export * from './config';
export declare const name = "signin";
export declare const using: any[];
export declare const usage = "\n\u8BE5\u63D2\u4EF6\u4F1A\u5728koishi\u6570\u636E\u5E93'.koishi.db'\u4E2D\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A'user_sign_in'\u8868,\u7B7E\u5230\u4FE1\u606F\u5C06\u4F1A\u50A8\u5B58\u5728\u8BE5\u8868\u4E2D.\n";
export declare function apply(ctx: any, config: Config): Promise<void>;
