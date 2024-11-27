import React, { ReactNode } from 'react';
import SettingSaveLoad from './SettingSaveLoad';
import { HelpTrigger } from '@components/util';


type Props = {
    children: ReactNode;
}
const SettingWrapper: React.FC<Props> = ({ children }) => {
    return (
        <div className='setting'>
            <HelpTrigger message='설정을 변경하고 저장할 수 있습니다.'>
                <h3 className='setting-title'>설정</h3>
            </HelpTrigger>
            {children}
            <SettingSaveLoad />
        </div>
    );
};

export default SettingWrapper;
