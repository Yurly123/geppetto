import React, { useContext } from 'react';
import { DispatchSettingContext, SettingContext } from '@components/contexts';
import SettingElement from './SettingElement';
import SettingWrapper from './SettingWrapper';

const Setting: React.FC = () => {
    const setting = useContext(SettingContext)
    const dispatchSetting = useContext(DispatchSettingContext)

    return (
        <SettingWrapper>
            {Object.keys(setting).map((name: keyof typeof setting) =>
                <SettingElement
                    name={name}
                    key={name}
                    element={setting[name]}
                    onChange={(value) => dispatchSetting(
                        { type: 'change', name, value }
                    )}
                />
            )}
        </SettingWrapper>
    )
}

export default Setting;