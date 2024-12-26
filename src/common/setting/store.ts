import { Schema } from "electron-store";
import { Setting } from "./setting";
import { settingValue } from "./settingElement";

export interface ISettingStoreData {
    [name: keyof Setting]: settingValue;
}

export interface SettingStoreData extends ISettingStoreData {
    'GPT모델': string;
    '보기 테마': string;
    '제미니 모드': boolean;
    'Gemini모델': string;
    '사칭 허용': boolean;
}

export const settingSchema: Schema<SettingStoreData> = {
    'GPT모델': { type: 'string' },
    '보기 테마': { type: 'string' },
    '제미니 모드': { type: 'boolean' },
    'Gemini모델': { type: 'string' },
    '사칭 허용': { type: 'boolean' },
}