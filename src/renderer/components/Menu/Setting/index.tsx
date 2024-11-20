import React, { useContext, useEffect } from 'react';
import '@styles/menu.scss';
import { DispatchSettingContext, SettingContext } from '@components/contexts';
import SettingElement from './SettingElement';

const Setting: React.FC = () => {
    const setting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

    useEffect(() => {
        window.store.loadSetting().then(
            (data) => dispatchSetting({ type: 'changeAll', setting: data })
        )
    }, [])

    return (
        <div className='setting'>
            {Object.keys(setting).map((name: keyof typeof setting) =>
                <SettingElement
                    name={name}
                    key={name}
                    element={setting[name]}
                    onChange={(value) => dispatchSetting(
                        { type: 'change', name, value }
                    )}
                />
            )}
            <div onClick={() => window.store.saveSetting(setting)}>저장</div>
            <div onClick={() => window.store.loadSetting().then(
                (data) =>dispatchSetting({type: 'changeAll', setting: data}))}>로드</div>
        </div>
    )
}

export default Setting;