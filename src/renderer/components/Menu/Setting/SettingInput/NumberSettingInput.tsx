import { NumberSettingElement } from '@common/setting';
import React from 'react';

type Props = {
    element: NumberSettingElement
    onChange: (value: number) => void
}
const NumberSettingInput: React.FC<Props> = ({
    element, onChange
}) => {
    return <input
        type='number'
        value={element.value}
        min={element.min}
        max={element.max}
        onChange={(e) => {
            if (e.target.value === '') onChange(0)
            else onChange(parseInt(e.target.value))
        }}
    />
};

export default NumberSettingInput;
