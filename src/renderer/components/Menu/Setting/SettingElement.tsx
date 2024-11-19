import React from 'react';
import '@styles/menu.scss';
import { Setting, settingValue } from '@common/setting';
import SettingInput from './SettingInput/SettingInput';

type Props = {
    name: string,
    element: Setting[keyof Setting]
    onChange: (value: settingValue) => void
}
const SettingElement: React.FC<Props> = ({ name, element, onChange }) => {
    return (
        <div className='setting-element'>
            <span>{name}</span>
            <SettingInput
                element={element}
                onChange={onChange}
            />
        </div>
    )
}

export default SettingElement;