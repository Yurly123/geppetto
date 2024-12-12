import { EnumSettingElement } from '@common/setting';
import { HelpTrigger } from '@components/util';
import React from 'react';

type Props = {
    element: EnumSettingElement
    onChange: (value: string) => void
}
const EnumSettingInput: React.FC<Props> = ({ element, onChange }) => {
    const currentOption = element.enum.find((option) =>
        option.value === element.value);

    return <HelpTrigger message={currentOption?.description}>
        <select
            value={element.value}
            onChange={(e) => onChange(e.target.value)}
        >
            {element.enum.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.display}
                </option>
            ))}
        </select>
    </HelpTrigger>
};

export default EnumSettingInput;
