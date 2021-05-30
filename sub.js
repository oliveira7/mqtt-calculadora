const mqtt = require('mqtt');

//let cliente = mqtt.connect('mqtt://test.mosquitto.org');
let cliente = mqtt.connect('mqtt://localhost:1883');
let topicoConta = 'Conta';
let topicoResultado = 'Resultado'

cliente.on('message', (topicoConta, message) => {
    message = message.toString();

    let parametros = new Array();
    let j = 0;
    let aux = '';
    let resultado = 0;

    console.log('mensagem recebida: ', message);

    for (let i = 0; i < message.length; i++) {
        if ((message.charAt(i) >= 0 && message.charAt(i) <= 9) || message.charAt(i) == '.') {
            aux += message.charAt(i);
        }
        else{
            parametros[j] = parseFloat(aux);
            j++;
            aux = '';
        }
    }

    for (let i = 0; i < parametros.length; i++) {
        resultado += parametros[i];
    }

    console.log('Resultado a ser passado: ', resultado);
    cliente.publish(topicoResultado, resultado.toString());
});

cliente.on('connect', () => {
    cliente.subscribe(topicoConta);
});





