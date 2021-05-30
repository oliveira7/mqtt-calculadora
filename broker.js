const mosca = require('mosca');

let porta = { port: 1883 };
let broker = new mosca.Server(porta);

broker.on('clientConnected', function(client) {
    console.log('Cliente conectado: ', client.id);
});

broker.on('ready', () => {
    console.log('O broker está operante!');
});
