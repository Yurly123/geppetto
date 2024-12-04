import { ChatModel } from "openai/resources";

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
        discription: string;
        value: T;
        display: string;
    }[];
};

export type SettingElement = BooleanSettingElement | NumberSettingElement | EnumSettingElement;

export interface ISetting {
    [name: string]: SettingElement
}

export interface Setting extends ISetting {
    'TTS음량': NumberSettingElement;
    'TTS토글': BooleanSettingElement;
    'GPT모델': EnumSettingElement<ChatModel>;
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
    'GPT모델': {
        description: '채팅을 구동할 GPT 모델을 선택합니다. 이전 대화 기록에 어떤 모델을 썼느냐에 상관없이 현재 대화에 적용됩니다.',
        value: 'gpt-4o-mini', default: 'gpt-4o-mini',
        enum: [ {
            discription: 'gpt-4o-mini 모델로 대화합니다. 토큰당 가격이 매우 낮지만 성능은 떨어집니다. 테스트 목적으로 적합합니다.',
            value: 'gpt-4o-mini', display: '미니 사오'
        }, {
            discription: 'gpt-4o-2024-11-20 모델로 대화합니다. 미니 사오에 비해 성능이 우수합니다.',
            value: 'gpt-4o-2024-11-20', display: '1120 사오'
        }]
    }
}

export interface ISettingStoreData {
    [name: keyof Setting]: settingValue;
}

export interface SettingStoreData extends ISettingStoreData {
    'TTS음량': number;
    'TTS토글': boolean;
    'GPT모델': string;
}
