export const mainChannel = {
    SAVE_SETTING: 'save-setting',
    LOAD_SETTING: 'load-setting',
    SAVE_MESSAGES: 'save-messages',
    LOAD_MESSAGES: 'load-messages',
    SAVE_SESSION: 'save-session',
    LOAD_SESSION: 'load-session',
    DELETE_SESSION: 'delete-session',
    CREATE_SESSION: 'create-session',
    SET_CURRENT_SESSION: 'set-current-session',
    GET_CURRENT_SESSION: 'get-current-session',
    OPEN_STORAGE_FOLDER: 'open-storage-folder',
    CHECK_SETTING_FILE: 'check-setting-file',
    CHECK_MESSAGES_FILE: 'check-messages-file',
    GET_ALL_SESSIONS: 'get-all-sessions',
}

export const rendererChannel = {
    SESSONS_CHANGED: 'sessions-changed',
}