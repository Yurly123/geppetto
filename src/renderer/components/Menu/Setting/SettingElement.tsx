import React from 'react';
import { Setting, SettingElement, settingValue } from '@common/setting';
import SettingInput from './SettingInput';

type Props = {
    name: keyof Setting,
    element: SettingElement
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