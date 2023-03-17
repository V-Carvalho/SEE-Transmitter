require('dotenv').config()
const { SerialPort } = require("serialport");

const date = new Date();
const port = new SerialPort({ path: "COM10", baudRate: 57600, autoOpen: false });

// Open the serial port if necessary
port.open((error) => {
  if (error) {
    console.log("Erro ao abrir porta: ", error.message);
  }
});

// Checking if the serial port is open
port.on("open", () => {
  console.log(`Porta ${port.path} aberta e conectada!`);
});

// Reading serial port data
port.on("data", (data) => { 
  if (data.toString().includes('@')) {
    console.log("SERVIDOR ONLINE")    
  } else {    
    const rawData = data.toString().slice(7, 20);

    const zoneNumber = rawData.slice(-3);
    const accountNumber = rawData.slice(0, 4);
    const eventCode = rawData.slice(4, 8);
    const partitionNumber = rawData.slice(8, 10);
    const dateEvent = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    const eventTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    saveEvent(zoneNumber, accountNumber, eventCode, partitionNumber, dateEvent, eventTime);
  }  
});

saveEvent = async (zoneNumber, accountNumber, eventCode, partitionNumber, dateEvent, eventTime) => { 
  await fetch(process.env.SEE_API_DATABASE, {
    method: 'POST',
    body: JSON.stringify({
      zoneNumber: zoneNumber,
      accountNumber: accountNumber,
      eventCode: eventCode,
      partitionNumber: partitionNumber,
      dateEvent: dateEvent,
      eventTime: eventTime
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => {
    if (response.status == 200) {
      console.log(`Evento salvo com sucesso!`)
    }    
  })
  .catch(error => {
    console.log(`Erro ao salvar evento: ${error}!`) 
  });
}

