import { Messages } from '@common/openai';
import { SettingStoreData } from '@common/setting';
import { Schema } from 'electron-store';

const settingSchema: Schema<SettingStoreData> = {
    'GPT모델': { type: 'string' },
    '보기 테마': { type: 'string' },
    '제미니 모드': { type: 'boolean' },
    'Gemini모델': { type: 'string' },
}

export { settingSchema }

const messageSchema: Schema<Messages> = {
    'messages': {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                role: { type: 'string' },
                content: { type: 'string' },
                token: { type: 'number' },
            },
            required: ['role', 'content'],
        },
    },
}

export { messageSchema }