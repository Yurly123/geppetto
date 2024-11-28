import { DispatchSettingContext, SettingContext } from '@components/contexts';
import { HelpTrigger } from '@components/util';
import React, { useContext } from 'react';

const SettingSaveLoad: React.FC = () => {
    const setting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

    function saveSetting() {
        window.store.saveSetting(setting)
    }
    async function loadSetting() {
        const data = await window.store.loadSetting()
        dispatchSetting({ type: 'changeAll', setting: data })
    }

    return <HelpTrigger message='설정을 저장폴더에 저장하거나 불러올 수 있습니다. 설정은 자동저장되지 않습니다.'>
        <div className='setting-saveload'>
            <div onClick={saveSetting}>설정 저장</div>
            <div onClick={loadSetting}>설정 로드</div>
        </div>
    </HelpTrigger>
};

export default SettingSaveLoad;
