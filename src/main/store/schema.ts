import { Messages } from '@common/openai';
import { Schema } from 'electron-store';

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
    'userName': {
        type: 'string',
    },
}

export { messageSchema }