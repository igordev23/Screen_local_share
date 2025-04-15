const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const open = (...args) => import('open').then(mod => mod.default(...args));

let configWindow;
let serverProcess;

function createConfigWindow() {
  configWindow = new BrowserWindow({
    width: 300,
    height: 200,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const configPath = path.join(__dirname, 'config.html');
  configWindow.loadFile(configPath);

  configWindow.on('closed', () => {
    configWindow = null;
    if (serverProcess) serverProcess.kill?.();
    app.quit();
  });
}

function startNextStandaloneServer() {
  return new Promise((resolve, reject) => {
    const isDev = !app.isPackaged;
    let serverPath;
    let cwd;

    if (isDev) {
      serverPath = path.join(__dirname, '.next', 'standalone', 'server.js');
      cwd = path.dirname(serverPath);
    } else {
      serverPath = path.join(process.resourcesPath, '..', 'next-server', 'server.js');
      cwd = path.dirname(serverPath);
    }

    console.log('Caminho do server.js:', serverPath);

    try {
      console.log('Iniciando servidor Next dentro do Electron...');
      process.env.PORT = '3000';
      process.env.HOSTNAME = '0.0.0.0';

      process.chdir(cwd);
      require(serverPath);
      resolve();
    } catch (err) {
      console.error('Erro ao iniciar servidor Next em produção:', err);
      reject(err);
    }
  });
}



app.whenReady().then(async () => {
  try {
    await startNextStandaloneServer();

    ipcMain.handle('get-local-ip', () => 'localhost');

    await open('http://localhost:3000');
    createConfigWindow();
  } catch (err) {
    console.error('Erro ao iniciar aplicação:', err);
  }
});

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill?.();
  if (process.platform !== 'darwin') app.quit();
});
