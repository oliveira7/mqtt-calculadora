const mqtt = require('mqtt');

//let cliente = mqtt.connect('mqtt://test.mosquitto.org');
let cliente = mqtt.connect('mqtt://localhost:1883');
let topicoConta = 'Conta';
let message = '';
let topicoResultado = 'Resultado'
let numero = 1;

const prompt = require('prompt-sync')();


cliente.on('connect', () => {
    while (numero != 0) {
        numero = prompt('Digite um numero: ');
        if (numero != 0) {
            message += numero + '/';
        }
    }

    cliente.publish(topicoConta, message);
    console.log('Mensagem enviada', message);
});

cliente.on('message', (message) => {
    message = message.toString();
    console.log('resultado recebido: ', message);
    cliente.end();
});

cliente.on('connect', () => {
    cliente.subscribe(topicoResultado);
});




