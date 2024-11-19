import React, { useContext } from 'react';
import '@styles/menu.scss';
import { DispatchSettingContext, SettingContext } from '@components/contexts';
import { Setting as ISetting, NumberSettingElement} from '@common/setting';

const Setting: React.FC = () => {
    const setting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

    function settingElement(name: string) {
        let element = (setting as ISetting)[name];

        let input;
        switch (typeof element.value) {
            case 'number': {
                element = element as NumberSettingElement
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

    return (
        <div className='setting'>
            {Object.keys(setting).map((name) => settingElement(name))}
        </div>
    )
}

export default Setting;