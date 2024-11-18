import { SettingElement } from "./types";

export class Setting {
    constructor(
        public settings: SettingElement[],
    ) {}

    get(name: string): SettingElement {
        return this.settings.find(setting => setting.name === name);
    }

    // Do not make method `set` !!!!
    // Because it has to be done by dispatching action.
}