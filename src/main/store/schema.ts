import { Messages } from '@common/openai';
import { Setting } from '@common/setting';
import { Schema } from 'electron-store';
import { JSONSchema } from 'json-schema-typed';

const numberSettingSchema: JSONSchema = {
    type: 'object',
    properties: {
        'value': { type: 'number' },
        'default': { type: 'number' },
        'min': { type: 'number' },
        'max': { type: 'number' },
    },
    required: ['value', 'default'],
}

const booleanSettingSchema: JSONSchema = {
    type: 'object',
    properties: {
        'value': { type: 'boolean' },
        'default': { type: 'boolean' },
    },
    required: ['value', 'default'],
}

const settingSchema: Schema<Setting> = {
    'TTS음량': numberSettingSchema,
    'TTS토글': booleanSettingSchema,
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