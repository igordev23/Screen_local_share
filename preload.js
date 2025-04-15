// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expondo a função getLocalIp para o frontend
contextBridge.exposeInMainWorld('electronAPI', {
  getLocalIp: () => ipcRenderer.invoke('get-local-ip'),
});
