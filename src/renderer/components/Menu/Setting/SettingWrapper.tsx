import React, { ReactNode } from 'react';
import SettingSaveLoad from './SettingSaveLoad';


type Props = {
    children: ReactNode;
}
const SettingWrapper: React.FC<Props> = ({ children }) => {
    return (
        <div className='setting'>
            <h3 className='setting-title'>설정</h3>
            {children}
            <SettingSaveLoad />
        </div>
    );
};

export default SettingWrapper;
