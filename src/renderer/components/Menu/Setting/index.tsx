import React, { useContext } from 'react';
import '@styles/menu.scss';
import { DispatchSettingContext, SettingContext } from '@components/contexts';
import SettingElement from './SettingElement';
import SettingSaveLoad from './SettingSaveLoad';

const Setting: React.FC = () => {
    const setting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

    return (
        <div className='setting'>
            <div>설정</div>
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
            <SettingSaveLoad />
        </div>
    )
}

export default Setting;