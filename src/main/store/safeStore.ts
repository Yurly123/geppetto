import { app, safeStorage } from "electron";
import { readFileSync, writeFile } from "fs";
import { join } from "path";

export function safeSave(fileName: string, data: string) {
    const filePath = join(app.getPath('userData'), fileName);
    const saveData = safeStorage.encryptString(data);
    writeFile(filePath, saveData, (err) => {
        if (err) console.error(err);
    });
}

export function safeLoad(fileName: string) {
    const filePath = join(app.getPath('userData'), fileName);
    try {
        const data = readFileSync(filePath);
        return safeStorage.decryptString(data);
    } catch (err) {
        console.error(err);
        return null;
    }
}