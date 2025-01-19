const { SerialPort } = require('serialport');
const { app, BrowserWindow, ipcMain, Menu} = require('electron');
const path = require('path');

let mainWindow;

const port = new SerialPort({
    path: '/dev/ttyS2',
    baudRate: 9600,
    autoOpen: false       // Bağlantı açıldığında otomatik olarak başlatma
});

port.open((err) => {
    if (err) {
        console.log('Port açılırken hata oluştu:', err);
        return;
    }
    console.log('Port açıldı!');
    listenForData();
});

function listenForData() {
    port.on('data', (data) => {
        const receivedData = data.toString();
        console.log('Alınan veri:', receivedData);

        try {
            const telemetryData = JSON.parse(receivedData);
            console.log('Veri ayrıştırıldı:', telemetryData);

            mainWindow.webContents.send('serial-data', telemetryData);
        } catch (e) {
            console.log('Veri ayrıştırılamadı:', receivedData);
        }
    });
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Preload
        },
    });

    mainWindow.loadFile('index.html');
    Menu.setApplicationMenu(null)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
