import { BooleanSettingElement } from '@common/setting';
import React from 'react';

type Props = {
    element: BooleanSettingElement
    onChange: (value: boolean) => void
}
const BooleanSettingInput: React.FC<Props> = ({ element, onChange }) => {
    return <input
        type='checkbox'
        checked={element.value}
        onChange={(e) => onChange(e.target.checked)}
    />
};

export default BooleanSettingInput;
