const ACTIONS = {
    JOIN_ROOM: 'join',
    NEW_JOIN: 'new-join',
    DISCONNECTED: 'disconnected',
    DISCONNECTING: 'disconnecting',
    CODE_CHANGE: 'code-change',
    FILE_CONTENT_CHANGE: 'file-content-change',
    FILE_CREATE: 'file-create',
    FILE_DELETE: 'file-delete',
    FILE_RENAME: 'file-rename',
    FILE_REORDER: 'file-reorder',
    CONNECT_ERROR: 'connect_error',
    CONNECT_FAILED: 'connect_failed',
    WORKSPACE_SAVED: 'WORKSPACE_SAVED',
    WORKSPACE_SAVED_BROADCAST: 'WORKSPACE_SAVED_BROADCAST'
};

module.exports = ACTIONS;
