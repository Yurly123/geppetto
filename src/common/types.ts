export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface Viseme {
    visemeId: number;
    offset: number;
}