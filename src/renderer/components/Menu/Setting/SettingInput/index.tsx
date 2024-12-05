import React from 'react';
import { NumberSettingElement, settingValue, BooleanSettingElement, SettingElement, EnumSettingElement } from '@common/setting';
import NumberSettingInput from './NumberSettingInput';
import BooleanSettingInput from './BooleanSettingInput';
import EnumSettingInput from './EnumSettingInput';

type Props = {
    element: SettingElement
    onChange: (value: settingValue) => void
}
const SettingInput: React.FC<Props> = ({ element, onChange }) => {
    switch (typeof element.default) {
        case 'number':
            return <NumberSettingInput
                element={element as NumberSettingElement}
                onChange={onChange}
            />
        case 'boolean':
            return <BooleanSettingInput
                element={element as BooleanSettingElement}
                onChange={onChange}
            />
        case 'string':
            if ('enum' in element)
                return <EnumSettingInput
                    element={element as EnumSettingElement}
                    onChange={onChange}
                />
    }
}

export default SettingInput;