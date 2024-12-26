import React, { useContext, useEffect } from 'react';
import { DispatchChatContext, DispatchMessagesContext, DispatchSettingContext } from './contexts';

const InitialLoader: React.FC = () => {
    const dispatchSetting = useContext(DispatchSettingContext)
    const dispatchMessages = useContext(DispatchMessagesContext)
    const dispatchChat = useContext(DispatchChatContext)
    
    useEffect(() => {(async () => {
        const settingFileExist = await window.store.checkSettingFile()
        if (settingFileExist) {
            const setting = await window.store.loadSetting()
            dispatchSetting({ type: 'changeAll', setting })
        }

        const messagesFileExist = await window.store.checkMessagesFile()
        if (messagesFileExist) {
            const { messages, userName } = await window.store.loadMessages()
            dispatchMessages({ type: 'changeAll', messages })
            dispatchChat({ type: 'changePartial', partial: { userName } })
        }
    })() }, [])

    return null
}

export default InitialLoader;