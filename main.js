const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile('index.html');

  // Theo dõi thư mục
  const watcher = chokidar.watch('C:\\Users\\DucTai\\Desktop\\AIC_local\\uploads', { persistent: true });

  watcher.on('add', (filePath) => {
    if (path.extname(filePath) === '.csv') {
      selectEarliestCsvFile('C:\\Users\\DucTai\\Desktop\\AIC_local\\uploads');
    }
  });
}

function selectEarliestCsvFile(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) return console.error(err);

    const csvFiles = files
      .filter(file => path.extname(file) === '.csv')
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(folderPath, file)).birthtime
      }));

    if (csvFiles.length > 0) {
      const earliestFile = csvFiles.reduce((prev, curr) => (prev.time < curr.time) ? prev : curr);
      mainWindow.webContents.send('new-csv-file', path.join(folderPath, earliestFile.name));
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});