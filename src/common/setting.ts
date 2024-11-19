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
