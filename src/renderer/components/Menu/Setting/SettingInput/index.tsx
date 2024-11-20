import React from 'react';
import '@styles/menu.scss';
import { NumberSettingElement, settingValue, BooleanSettingElement, SettingElement } from '@common/setting';
import NumberSettingInput from './NumberSettingInput';
import BooleanSettingInput from './BooleanSettingInput';

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
    }
}

export default SettingInput;