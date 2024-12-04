import { EnumSettingElement } from '@common/setting';
import React from 'react';

type Props = {
    element: EnumSettingElement
    onChange: (value: string) => void
}
const EnumSettingInput: React.FC<Props> = ({ element, onChange }) => {
    return <select
        value={element.value}
        onChange={(e) => onChange(e.target.value)}
    >
        {element.values.map((option) => {
            return <option key={option} value={option}>{option}</option>
        })}
    </select>
};

export default EnumSettingInput;
