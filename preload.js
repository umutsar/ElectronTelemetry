const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    onSerialData: (callback) => ipcRenderer.on('serial-data', callback)
});
