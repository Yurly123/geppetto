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
    '보기 테마': EnumSettingElement<'side-view' | 'pop-up'>;
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
            discription: 'gpt-4o-mini 모델로 대화합니다. 성능은 떨어지지만 토큰 당 가격이 매우 저렴합니다. 테스트 목적으로 적합합니다.',
            value: 'gpt-4o-mini', display: '미니 사오'
        }, {
            discription: 'gpt-4o-2024-11-20 모델로 대화합니다. 미니 사오에 비해 성능이 우수합니다.',
            value: 'gpt-4o-2024-11-20', display: '1120 사오'
        }]
    },
    '보기 테마': {
        description: '채팅창의 보기 테마를 선택합니다. 현재 디스플레이에 적합하게 조절해주세요.',
        value: 'side-view', default: 'side-view',
        enum: [ {
            discription: '채팅창과 초상화를 옆쪽으로 배치합니다. 세로 화면에 적합하지 않습니다.',
            value: 'side-view', display: '사이드 뷰'
        }, {
            discription: '초상화를 배경으로 채팅창을 팝업 형태로 띄웁니다.',
            value: 'pop-up', display: '팝업'
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
    '보기 테마': string;
}
