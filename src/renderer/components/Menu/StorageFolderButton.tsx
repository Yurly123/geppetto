import React from 'react';

const StorageFolderButton: React.FC = () => {
    return (
        <div
            className='storage-folder-button'
            onClick={window.store.openStorageFolder}
        >
            저장 폴더 확인
        </div>
    );
};

export default StorageFolderButton;
