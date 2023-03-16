# 📡 SEE Transmitter

Este aplicativo node.js inicia um servidor onde o mesmo retransmite os eventos recebidos no Viaweb Receiver.

## Getting Started

### Pré-requisitos

* Você deve ter instalado o Node.js [LINK](https://nodejs.org/en/download).
* Você deve ter instalado o Viaweb Receiver [LINK](https://alarmandhouse.websiteseguro.com/docman/index.php?path=62-63).
* Você deve ter instalado o Virtual Serial Ports Emulator [LINK](https://eterlogic.com/Downloads.html).

### ⚙️ Configuração

* Abra o Virtual Serial Ports Emulator e crie uma porta serial virtual.
<img src="https://user-images.githubusercontent.com/34304319/225749777-10248707-01bf-4c3f-a93d-303270735b06.png" height="400" width="500">

* Abra o Viaweb Receiver e clique em configurar, informe a porta serial para comunicação com o software de monitoramento e o tipo de receptora(Sur-Gard).
<img src="https://user-images.githubusercontent.com/34304319/225750948-0e7acd12-049d-4d50-92d7-d253bb0951e6.png" height="400" width="500">

### 🚀 Rodando o SEE-Transmitter

* Baixe ou clone o repositório:

```
git clone https://github.com/V-Carvalho/SEE-Transmitter.git
```

* Instalando as dependências do aplicativo:

```
npm install
```

* Iniciando o servidor aplicativo:

```
node server.js
```

* Assim que esses passos estiverem concluídos, cada evento recebido no Viaweb Receiver será direcionado para o SEE-Transmitter via porta serial, é possivel visualizar os eventos no console do terminal.

<img src="https://user-images.githubusercontent.com/34304319/225751247-dcd78666-7ab5-4b9c-b83d-fe1ac33ff64e.png">

### 🔧 Tecnologias utilizadas

![Node.js ](https://skillicons.dev/icons?i=nodejs)
![Javascript](https://skillicons.dev/icons?i=js)
