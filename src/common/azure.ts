import { Viseme, VisemeSymbol } from "./types";

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