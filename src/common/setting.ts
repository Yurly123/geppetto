export type settingValue = number | boolean;

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

export type SettingElement = BooleanSettingElement | NumberSettingElement;

export interface ISetting {
    [name: string]: SettingElement
}

export interface Setting extends ISetting {
    'TTS음량': NumberSettingElement;
    'TTS토글': BooleanSettingElement;
}

export const initialSetting: Setting = {
    'TTS음량': {
        description: 'TTS의 음량을 조절합니다. 이미 음성이 재생 중인 경우에는 즉시 반영되지 않습니다.',
        value: 100, default: 100, min: 0, max: 100
    },
    'TTS토글': {
        description: '응답 시 TTS를 사용할지 여부를 결정합니다. 이미 음성이 재생 중인 경우에는 즉시 반영되지 않습니다.',
        value: true, default: true
    },
}

export interface ISettingStoreData {
    [name: keyof Setting]: settingValue;
}

export interface SettingStoreData extends ISettingStoreData {
    'TTS음량': number;
    'TTS토글': boolean;
}
