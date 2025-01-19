const telemetryTable = document.getElementById('telemetry-table');
const batteryCellsContainer = document.getElementById('battery-cells');

window.api.onSerialData((event, data) => {
    console.log('Renderer Sürecinde Alınan Veri:', data);

    updateTelemetryTable(data);
    updateBatteryCells(data.batteryCells);
});


function updateTelemetryTable(data) {
    telemetryTable.innerHTML = ''; 

    const rows = [
        { key: 'Speed', value: data.speed + ' km/h' },
        { key: 'Battery Voltage', value: data.batteryVoltage + ' V' },
        { key: 'Battery Temperature', value: data.batteryTemperature + ' °C' },
        { key: 'Remaining Energy', value: data.remainingEnergy + ' W' },
        { key: 'State of Charge (SOC)', value: data.soc + ' %' },
    ];

    rows.forEach(row => {
        const tr = document.createElement('tr');
        const tdKey = document.createElement('td');
        const tdValue = document.createElement('td');
        tdKey.textContent = row.key;
        tdValue.textContent = row.value;
        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        telemetryTable.appendChild(tr);
    });
}

function updateBatteryCells(cells) {
    batteryCellsContainer.innerHTML = '';

    cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('battery-cell');
        cellDiv.textContent = cell.toFixed(1) + ' V'
        batteryCellsContainer.appendChild(cellDiv);
    });
}
