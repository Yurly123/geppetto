
import React, { useContext } from 'react';
import '@styles/menu.scss';
import { DispatchSettingContext } from '@components/contexts';
import { Setting, NumberSettingElement } from '@common/setting';

type Props = {
    name: string,
    element: Setting[keyof Setting]
}
const SettingElement: React.FC<Props> = ({ name, element }) => {
    const dispatchSetting = useContext(DispatchSettingContext)

    let input;
    switch (typeof element.value) {
        case 'number': {
            element = element as NumberSettingElement;
            input = <input
                type='number'
                value={element.value}
                min={element.min}
                max={element.max}
                onChange={(e) => {
                    let value: number;
                    if (e.target.value === '') value = 0
                    else value = parseInt(e.target.value)
                    dispatchSetting({ type: 'change', name, value })
                }}
            />
        } break;
        case 'boolean': {
            input = <input
                type='checkbox'
                checked={element.value}
                onChange={(e) => dispatchSetting(
                    { type: 'change', name, value: e.target.checked }
                )}
            />
        } break;
    }

    return (
        <div key={name} className='setting-element'>
            <span>{name}</span>
            {input}
        </div>
    )
}

export default SettingElement;