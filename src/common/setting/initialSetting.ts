import { Setting } from "./setting";

export const initialSetting: Setting = {
    'GPT모델': {
        description: '채팅을 구동할 GPT 모델을 선택합니다. 이전 대화 기록에 어떤 모델을 썼느냐에 상관없이 현재 대화에 적용됩니다.',
        value: 'chatgpt-4o-latest', default: 'chatgpt-4o-latest',
        enum: [ {
            description: 'gpt-4o-mini 모델로 대화합니다. 성능은 떨어지지만 토큰 당 가격이 매우 저렴합니다. 테스트 목적으로 적합합니다.',
            value: 'gpt-4o-mini', display: '미니 사오'
        }, {
            description: 'gpt-4o-2024-11-20 모델로 대화합니다. 가장 최근에 발표된 GPT-4o 모델입니다. 채팅 구동에 권장되는 모델입니다.',
            value: 'gpt-4o-2024-11-20', display: '1120 사오'
        }, {
            description: 'chatgpt-4o-latest 모델로 대화합니다. ChatGPT 공식 홈페이지에서 사용되는 모델입니다. 가격이 다른 사오 모델의 2배입니다. 주기적으로 업데이트되므로 불안정할 수 있습니다.',
            value: 'chatgpt-4o-latest', display: '챗사오'
        }, {
            description: 'gpt-4o 모델로 대화합니다. 현재 gpt-4o-0806 모델과 동일합니다.',
            value: 'gpt-4o', display: 'GPT 사오'
        }]
    },
    'OpenAI API키': {
        description: 'OpenAI API를 사용하기 위한 API키를 입력해 주세요. API키는 OpenAI 웹사이트에서 발급받을 수 있습니다. 본 프로그램은 API키를 저장 폴더 이외의 곳에 저장하거나 제3자에게 전송하지 않습니다.',
        value: 'sk-...', default: 'sk-...',
    },
    'Gemini모델': {
        description: '제미니 모드에서 사용할 Gemini 모델을 선택합니다. 제미니 모드가 활성화되어 있을 때만 적용됩니다.',
        value: 'gemini-2.0-flash-exp', default: 'gemini-2.0-flash-exp',
        enum: [{
            description: 'gemini-2.0-flash-exp 모델로 대화합니다. 최근에 발표된 제미니 2.0 플래시 모델입니다. 실험적 모델이므로 응답이 불안정할 수 있습니다. 또한 언제든지 모델이 삭제되거나 변경될 수 있습니다.',
            value: 'gemini-2.0-flash-exp', display: '잼플 2.0',
        }, {
            description: 'gemini-exp-1206 모델로 대화합니다. 실험적 모델이므로 응답이 불안정할 수 있습니다. 또한 언제든지 모델이 삭제되거나 변경될 수 있습니다.',
            value: 'gemini-exp-1206', display: '1206 잼민',
        }]
    },
    'Gemini API키': {
        description: 'Google AI Studio의 API를 사용하기 위한 API키를 입력해 주세요. API키는 Google AI Studio 웹사이트에서 발급받을 수 있습니다. 본 프로그램은 API키를 저장 폴더 이외의 곳에 저장하거나 제3자에게 전송하지 않습니다.',
        value: 'AIza...', default: 'AIza...',
    },
    '보기 테마': {
        description: '채팅창의 보기 테마를 선택합니다. 현재 디스플레이에 적합하게 조절해주세요.',
        value: 'side-view', default: 'side-view',
        enum: [ {
            description: '채팅창과 초상화를 옆쪽으로 배치합니다. 세로 화면에 적합하지 않습니다.',
            value: 'side-view', display: '사이드 뷰'
        }, {
            description: '초상화를 배경으로 채팅창을 팝업 형태로 띄웁니다.',
            value: 'pop-up', display: '팝업'
        }]
    },
    '제미니 모드': {
        description: '제미니 모드를 활성화합니다. 제미니 모드는 GPT 모델 대신에 Gemini 모델을 사용합니다. Gemini 모델은 Google에서 무료 할당량을 받을 수 있습니다. 제미니 모드는 Google AI Studio의 API Key가 필요합니다.',
        value: false, default: false,
    },
    '사칭 허용': {
        description: '사칭을 허용합니다. 사칭을 허용하면 AI 모델이 사용자의 말과 행동을 응답에 포함해 상황을 묘사할 수 있습니다. 사칭을 허용하지 않으면 AI는 사용자의 말을 묘사할 수 없습니다.',
        value: false, default: false,
    }
}
