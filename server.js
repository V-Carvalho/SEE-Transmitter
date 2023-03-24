require('dotenv').config()
const { SerialPort } = require("serialport");

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
    let date = new Date();     
    let rawData = data.toString().slice(7, 20);

    const attendedEvent = false;
    let zoneNumber = rawData.slice(-3);
    let accountNumber = rawData.slice(0, 4);
    let eventCode = rawData.slice(4, 8);
    let partitionNumber = rawData.slice(8, 10);
    let dateEvent = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    let eventTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    saveEvent(attendedEvent,zoneNumber, accountNumber, eventCode, partitionNumber, dateEvent, eventTime);
  }  
});

saveEvent = async (attendedEvent, zoneNumber, accountNumber, eventCode, partitionNumber, dateEvent, eventTime) => { 
  await fetch(process.env.SEE_API_DATABASE, {
    method: 'POST',
    body: JSON.stringify({
      attendedEvent: attendedEvent,
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

