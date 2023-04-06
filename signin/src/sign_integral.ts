import fs from 'fs';


export class sign_integral {
  private ctx;

  private integral: number;

  private morning: string;    //早上
  private forenoon: string;   //上午
  private monoondel: string;  //中午
  private afternoon: string; //下午
  private night: string;     //晚上
  private midnight: string;  //半夜11点
  private late_at_night: string;   //深夜:0-5

  constructor(
    ctx,
    integral: number,   //积分

    morning: string,    //早上
    forenoon: string,   //上午
    monoondel: string,  //中午
    afternoon: string, //下午
    night: string,     //晚上
    midnight: string,  //半夜11点
    late_at_night: string,   //深夜:0-5

  ) {
    this.ctx = ctx;
    this.integral = integral;  //积分

    this.morning = morning;    //早上
    this.forenoon = forenoon;   //上午
    this.monoondel = monoondel;  //中午
    this.afternoon = afternoon; //下午
    this.night = night;     //晚上
    this.midnight = midnight; //半夜11点
    this.late_at_night = late_at_night;   //深夜:0-5点     

  }



}
