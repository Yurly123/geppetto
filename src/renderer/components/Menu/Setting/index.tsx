import React, { useContext } from 'react';
import '@styles/menu.scss';
import { DispatchSettingContext, SettingContext } from '@components/contexts';
import { Setting as ISetting } from '@common/setting';
import SettingElement from './SettingElement';

const Setting: React.FC = () => {
    const setting: ISetting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

    return (
        <div className='setting'>
            {Object.keys(setting).map((name) =>
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