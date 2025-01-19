const { SerialPort } = require('serialport');

const port = new SerialPort({
  path: '/dev/ttyS1',
  baudRate: 9600,
  autoOpen: false
});

port.open((err) => {
  if (err) {
    console.log('Port açılırken hata oluştu:', err);
    return;
  }
  console.log('Port açıldı!');
  sendTelemetryData();
});

function sendTelemetryData() {
  setInterval(() => {
    const telemetryData = {
      speed: 120,
      batteryVoltage: 12.5,
      batteryCells: Array(20).fill(3.7),
      batteryTemperature: 40, 
      remainingEnergy: 150,
      soc: 85
    };

    const dataToSend = JSON.stringify(telemetryData);
    port.write(dataToSend + '\n', (err) => {
      if (err) {
        console.log('Veri gönderme hatası:', err);
      } else {
        console.log('Veri gönderildi:', dataToSend);
      }
    });
  }, 2000);
}
