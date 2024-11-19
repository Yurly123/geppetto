export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface Viseme {
    visemeId: number;
    offset: number;
}

export type settingValue = number | boolean;
export type settingType = 'number' | 'boolean';
export interface SettingElement {
    type: settingType;
    value: settingValue;
    default: settingValue;
}

export interface Setting {
    [name: string]: SettingElement;
}

export type SSMLOption = {
    pitch?: number,
    rate?: number,
}

export enum VisemeSymbol {
    '(쉼)' = 0,
    '애' = 1,
    '아' = 2,
    '오' = 3,
    '에' = 4,
    '어' = 5,
    '이' = 6,
    '우' = 7,
    '오우' = 8,
    '아아' = 9,
    '오이' = 10,
    '아이' = 11,
    '흐' = 12,
    '르' = 13,
    'ㄹ' = 14,
    'ㅅ' = 15,
    '시' = 16,
    '드' = 17,
    'ㅍ' = 18,
    'ㄷ' = 19,
    'ㄱ' = 20,
    'ㅂ' = 21,
}
