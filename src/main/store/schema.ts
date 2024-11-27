import { Messages } from '@common/openai';
import { SettingStoreData } from '@common/setting';
import { Schema } from 'electron-store';

const settingSchema: Schema<SettingStoreData> = {
    'TTS음량': { type: 'number' },
    'TTS토글': { type: 'boolean' },
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
            },
            required: ['role', 'content'],
        },
    },
}

export { messageSchema }