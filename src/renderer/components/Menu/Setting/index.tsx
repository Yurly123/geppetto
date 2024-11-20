import React, { useContext } from 'react';
import '@styles/menu.scss';
import { DispatchSettingContext, SettingContext } from '@components/contexts';
import SettingElement from './SettingElement';

const Setting: React.FC = () => {
    const setting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

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
        </div>
    )
}

export default Setting;