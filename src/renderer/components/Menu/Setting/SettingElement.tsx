import React from 'react';
import { Setting, SettingElement, settingValue } from '@common/setting';
import SettingInput from './SettingInput';
import { HelpTrigger } from '@components/util';

type Props = {
    name: keyof Setting,
    element: SettingElement
    onChange: (value: settingValue) => void
}
const SettingElement: React.FC<Props> = ({ name, element, onChange }) => {
    return (
        <div className='setting-element'>
            <HelpTrigger message={element.description}>
                <span>{name}</span>
            </HelpTrigger>
            <SettingInput
                element={element}
                onChange={onChange}
            />
        </div>
    )
}

export default SettingElement;