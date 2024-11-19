import { NumberSettingElement } from '@common/setting';
import React from 'react';

type Props = {
    element: NumberSettingElement
    onChange: (value: number) => void
}
const NumberSettingInput: React.FC<Props> = ({ element, onChange }) => {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === '') { onChange(0); return }
        const value = parseInt(e.target.value)
        if (isNaN(value)) return
        if (value < element.min) return
        if (value > element.max) return

        onChange(parseInt(e.target.value))
    }

    return <input
        type='number'
        value={element.value.toString()}
        min={element.min}
        max={element.max}
        onChange={handleChange}
    />
};

export default NumberSettingInput;