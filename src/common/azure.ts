export interface Viseme {
    visemeId: number;
    offset: number;
}

export type SSMLOption = {
    pitch?: number,
    rate?: number,
}

export enum VisemeSymbol {
    '(쉼)' = 0,
    '애' = 1,
    '아' = 2,
    '오' = 3,
    '에' = 4,
    '어' = 5,
    '이' = 6,
    '우' = 7,
    '오우' = 8,
    '아아' = 9,
    '오이' = 10,
    '아이' = 11,
    '흐' = 12,
    '르' = 13,
    'ㄹ' = 14,
    'ㅅ' = 15,
    '시' = 16,
    '드' = 17,
    'ㅍ' = 18,
    'ㄷ' = 19,
    'ㄱ' = 20,
    'ㅂ' = 21,
}

export function getVisemeSymbol(viseme: Viseme): string
export function getVisemeSymbol(visemeId: number): string
export function getVisemeSymbol(visemeOrId: Viseme | number): string {
    switch (typeof visemeOrId) {
        case 'object':
            return VisemeSymbol[visemeOrId.visemeId];
        case 'number':
            return VisemeSymbol[visemeOrId];
    }
}