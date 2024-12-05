import React from 'react';
import { NumberSettingElement, settingValue, BooleanSettingElement, SettingElement, EnumSettingElement, StringSettingElement } from '@common/setting';
import NumberSettingInput from './NumberSettingInput';
import BooleanSettingInput from './BooleanSettingInput';
import EnumSettingInput from './EnumSettingInput';
import StringSettingInput from './StringSettingInput';

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
            else
                return <StringSettingInput
                    element={element as StringSettingElement}
                    onChange={onChange}
                />
    }
}

export default SettingInput;