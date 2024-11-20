import { initialSetting, Setting } from '@common/setting';
import { Schema } from 'electron-store';
import toJsonSchema from 'to-json-schema';

const settingSchema: Schema<Setting> = toJsonSchema(initialSetting)

export { settingSchema }