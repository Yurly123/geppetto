import React from 'react';
import '@styles/menu.scss';
import { Setting, NumberSettingElement, settingValue, BooleanSettingElement } from '@common/setting';
import NumberSettingInput from './NumberSettingInput';
import BooleanSettingInput from './BooleanSettingInput';

type Props = {
    element: Setting[keyof Setting]
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
    }
}

export default SettingInput;