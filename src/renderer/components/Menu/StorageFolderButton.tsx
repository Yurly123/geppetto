import { HelpTrigger } from '@components/util';
import React from 'react';

const StorageFolderButton: React.FC = () => {
    return <div
        className='storage-folder-button'
        onClick={window.store.openStorageFolder}
    >
        <HelpTrigger message='앱에서 현재 사용중인 저장폴더를 확인합니다.'>
            저장 폴더 확인
        </HelpTrigger>
    </div >
};

export default StorageFolderButton;
