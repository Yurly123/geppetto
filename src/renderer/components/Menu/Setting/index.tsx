import React, { useContext } from 'react';
import { DispatchSettingContext, SettingContext } from '@components/contexts';
import SettingElement from './SettingElement';
import SettingWrapper from './SettingWrapper';

const Setting: React.FC = () => {
    const setting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

    function settingElement(name: keyof typeof setting) {
        if (setting['제미니 모드'].value) {
            const openaiFeatures: (keyof typeof setting)[]
                = ['GPT모델', 'OpenAI API키']
            if (openaiFeatures.includes(name)) 
                return null
        } else {
            const geminiFeatures: (keyof typeof setting)[]
                = ['Gemini모델', 'Gemini API키']
            if (geminiFeatures.includes(name)) 
                return null
        }

        return <SettingElement
            name={name}
            key={name}
            element={setting[name]}
            onChange={(value) => dispatchSetting(
                { type: 'change', name, value }
            )}
        />
    }

    return (
        <SettingWrapper>
            {Object.keys(setting).map(settingElement)}
        </SettingWrapper>
    )
}

export default Setting;