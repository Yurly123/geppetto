export type settingValue = number | boolean | string;

export interface ISettingElement<T extends settingValue> {
    value: T;
    readonly default: T;
    readonly description: string;
}

export interface BooleanSettingElement
    extends ISettingElement<boolean> { };

export interface NumberSettingElement
    extends ISettingElement<number> {
    readonly min?: number;
    readonly max?: number;
};

export interface EnumSettingElement<T extends string = string>
    extends ISettingElement<T> {
    readonly enum: {
        readonly discription: string;
        readonly value: T;
        readonly display: string;
    }[];
};

export interface StringSettingElement
    extends ISettingElement<string> { };

export type SettingElement =
    BooleanSettingElement |
    NumberSettingElement |
    EnumSettingElement |
    StringSettingElement;