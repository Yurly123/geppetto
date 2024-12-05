import { StringSettingElement } from '@common/setting';
import React from 'react';

type Props = {
    element: StringSettingElement
    onChange: (value: string) => void
}
const StringSettingInput: React.FC<Props> = ({ element, onChange }) => {
    return <input
        type='text'
        value={element.value}
        onChange={(e) => onChange(e.target.value)}
    />
};

export default StringSettingInput;