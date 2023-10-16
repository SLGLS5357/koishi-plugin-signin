"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign_integral = void 0;
class sign_integral {
    constructor(ctx, integral, //积分
    morning, //早上
    forenoon, //上午
    monoondel, //中午
    afternoon, //下午
    night, //晚上
    midnight, //半夜11点
    late_at_night) {
        this.ctx = ctx;
        this.integral = integral; //积分
        this.morning = morning; //早上
        this.forenoon = forenoon; //上午
        this.monoondel = monoondel; //中午
        this.afternoon = afternoon; //下午
        this.night = night; //晚上
        this.midnight = midnight; //半夜11点
        this.late_at_night = late_at_night; //深夜:0-5点     
    }
}
exports.sign_integral = sign_integral;
