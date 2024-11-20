import { DispatchSettingContext, SettingContext } from '@components/contexts';
import React, { useContext, useEffect } from 'react';

const SettingSaveLoad: React.FC = () => {
    const setting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

    function saveSetting() {
        window.store.saveSetting(setting)
    }
    function loadSetting() {
        window.store.loadSetting()
            .then((data) => dispatchSetting(
                { type: 'changeAll', setting: data }
            ))
    }

    useEffect(loadSetting, [])

    return (
        <div className='setting-saveload'>
            <div onClick={saveSetting}>설정 저장</div>
            <div onClick={loadSetting}>설정 로드</div>
        </div>
    );
};

export default SettingSaveLoad;
