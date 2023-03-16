const { SerialPort } = require("serialport");

// Create a port
const port = new SerialPort({ path: "COM2", baudRate: 57600, autoOpen: false });

port.open(function (error) {
  if (error) {
    console.log("Erro ao abrir porta: ", error.message);
  }
});

// The open event is always emitted
port.on("open", function () {
  console.log(`Porta ${port.path} aberta e conectada!`);
});

// Read data that is available
port.on("data", function (data) {
  const rawData = "9999E60211000"; // data.toString().slice(7, 20);

  const zoneNumber = rawData.slice(-3);
  console.log(`Zona: ${zoneNumber}`);
  const accountNumber = rawData.slice(0, 4);
  console.log(`Nº da conta: ${accountNumber}`);
  const eventCode = rawData.slice(4, 8);
  console.log(`Cod. do evento: ${eventCode}`);
  const partitionNumber = rawData.slice(8, 10);
  console.log(`Nº da partição: ${partitionNumber}`);
});

port.on("error", function (error) {
  console.log("Porta desconectada: ", error.message);
});
