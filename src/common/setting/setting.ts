import { GeminiModel } from "@common/google";
import { BooleanSettingElement, EnumSettingElement, SettingElement, StringSettingElement } from "./settingElement";
import { ChatModel } from "openai/resources";

export interface ISetting {
    [name: string]: SettingElement
}

export interface Setting extends ISetting {
    'GPT모델': EnumSettingElement<ChatModel>;
    'OpenAI API키': StringSettingElement;
    '보기 테마': EnumSettingElement<'side-view' | 'pop-up'>;
    '제미니 모드': BooleanSettingElement;
    'Gemini모델': EnumSettingElement<GeminiModel>;
    'Gemini API키': StringSettingElement;
}