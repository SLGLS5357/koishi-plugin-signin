import { Schema } from 'koishi';
export interface Config {
    integral: number;
    morning: string;
    forenoon: string;
    monoondel: string;
    afternoon: string;
    night: string;
    midnight: string;
    late_at_night: string;
}
export declare const Config: Schema<Config>;
