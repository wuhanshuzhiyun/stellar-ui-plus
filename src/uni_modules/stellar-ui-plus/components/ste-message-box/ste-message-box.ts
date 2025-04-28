export const messageBoxDefaultOptionsKey = 'ste:messageBox';

export const getMessageBoxKey = (customKey?: string) => {
    return customKey ? `${messageBoxDefaultOptionsKey}:${customKey}` : messageBoxDefaultOptionsKey;
};
