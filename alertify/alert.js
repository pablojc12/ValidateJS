/* global alertify */

function alerta(texto) {
    //un alert
    alertify.alert("<p class='black'>" + texto + "</p>", function () {
        //aqui introducimos lo que haremos tras cerrar la alerta.
        //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
    });
}

function confirmar() {
    //un confirm
    alertify.confirm("<p>Aqu� confirmamos algo.<br><br><b>ENTER</b> y <b>ESC</b> corresponden a <b>Aceptar</b> o <b>Cancelar</b></p>", function (e) {
        if (e) {
            alertify.success("Has pulsado '" + alertify.labels.ok + "'");
        } else {
            alertify.error("Has pulsado '" + alertify.labels.cancel + "'");
        }
    });
    return false
}

function datos() {
    //un prompt
    alertify.prompt("Esto es un <b>prompt</b>, introduce un valor:", function (e, str) {
        if (e) {
            alertify.success("Has pulsado '" + alertify.labels.ok + "'' e introducido: " + str);
        } else {
            alertify.error("Has pulsado '" + alertify.labels.cancel + "'");
        }
    });
    return false;
}

function notificacion(texto) {
    alertify.log(texto);
    return false;
}

function ok(texto) {
    alertify.success(texto);
    return false;
}

function error(texto) {
    alertify.error(texto);
    return false;
}