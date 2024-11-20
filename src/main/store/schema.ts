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
}

const booleanSettingSchema: JSONSchema = {
    type: 'object',
    properties: {
        'value': { type: 'boolean' },
        'default': { type: 'boolean' },
    },
}

const settingSchema: Schema<Setting> = {
    'TTS음량': numberSettingSchema,
    'TTS토글asdfasdf': booleanSettingSchema,
}

export { settingSchema }