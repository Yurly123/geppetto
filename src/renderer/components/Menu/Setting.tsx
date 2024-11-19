import React, { useContext } from 'react';
import '@styles/menu.scss';
import { SettingContext } from '@components/contexts';
import { Setting as ISetting } from '@common/setting';
import SettingElement from './SettingElement';

const Setting: React.FC = () => {
    const setting: ISetting = useContext(SettingContext)

    return (
        <div className='setting'>
            {Object.keys(setting).map((name) =>
                <SettingElement
                    name={name}
                    element={setting[name]}
                />
            )}
        </div>
    )
}

export default Setting;