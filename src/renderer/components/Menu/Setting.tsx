import React, { useContext } from 'react';
import '@styles/menu.scss';
import { SettingContext } from '@components/contexts';
import { Setting as ISetting} from '@common/setting';

const Setting: React.FC = () => {
    const setting = useContext(SettingContext)

    function settingElement(name: string) {
        const element = (setting as ISetting)[name];

        let input;
        switch (typeof element.value) {
            case 'number':
                input = <input type='number' value={element.value} />
                break;
            case 'boolean':
                input = <input type='checkbox' checked={element.value} />
                break;
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