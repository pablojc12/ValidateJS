/* global checkButton, guardado, actualizado, noGuardado, server, borrado, registrado, err, evento */

"use strict";

document.oncontextmenu = function(){return false;};
/**
 * Variabe para las peticiones en ajax
 * @type objetoJSON
 */
var objetoJSON = null;

/**
 * funcion para retornar el valor del componente (universal)
 * @param campo (elemento a axtraer el valor)
 * @returns (retorna el valor sin espacios al final e inicio)
 */
function lee(campo)
{
    return campo.value.trim();
}

/**Funcion para validar campos vacios
 * 
 * @param {String} dato
 * @param {text} mensaje
 * @param {text} idElement  
 * @returns {Boolean}
 */
function campoVacio(dato, mensaje, idElement)
{
    if (dato === "")
    {
        controlDosMensajes(mensaje);
        foco(idElement);
        return false;
    }
    else if(typeof dato === "undefined")
    {
        //error("La variable enviada al metodo es indefinida");
        return false;
    }
    else
        return true;
}

/**
 * Funcion para retornar la fecha del sistema
 * @returns {String}
 */
function dateSystem()
{
    var f = new Date();
    var month = String(f.getMonth() + 1);
    var day = String(f.getDate());
    var year = String(f.getFullYear());
    
    if(month.length === 1)
        month = "0" + month;
    return year + "-" + month + "-" + day;
}

/* Funcion para comparar dos passwords con un 
 * foco en el id del elemento a mandar
 * 
 * borra ambos valores de los id proporcionados y enfoca al primero de ellos
 * 
 * @param {text} pass1
 * @param {text} pass2
 * @param {text} idElement1
 * @param {text} idElement2
 * @returns {Boolean}
 */
function comparaPassword(pass1, pass2, idElement1, idElement2)
{
    if (campoVacio(pass1, textLlenarPas()))
    {
        if (pass1.length > 5)
        {
            if (campoVacio(pass2, textLlenarPas1()))
            {
                if (pass1 === pass2)
                    return true;
                else
                {
                    controlDosMensajes(textErrorPassword());
                    borrarVal(idElement1);
                    borrarVal(idElement2);
                    foco(idElement1);
                    return false;
                }
            } 
            else
            {
                foco(idElement2);
                return false;
            }
        } 
        else
        {
            foco(idElement1);
            controlDosMensajes(textErrorPassword1());
            return false;
        }
    }
    else
    {
        foco(idElement1);
        return false;
    }
}

/**
 * funcion para la validacion del correo electronico
 * @param {text} email
 * @param {text} idElement
 * @returns {Boolean}
 */
function validaEmail(email, idElement)
{
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (campoVacio(email, textLlenarMail()))
    {
        if (expr.test(email))
            return true;
        else
        {
            controlDosMensajes(textErrorMail());
            foco(idElement);
            return false;
        }
    }
    else
    {
        foco(idElement);
        return false;
    }
}

/**
 * funcion para hacer la validacion de una cadena con tildes
 * @param valor
 * @param mensaje1 de campo vacio
 * @param mensaje2 de error de validacion
 * @param idElement
 * @returns {Boolean}
 */
function validaText(valor, mensaje1, mensaje2, idElement)
{
    var expr = /^([a-z ñáéíóú]{2,})$/i;
    if(campoVacio(valor, mensaje1))
    {
        if(expr.test(valor)) 
            return true;
        else 
        {
            controlDosMensajes(mensaje2);	
            foco(idElement);
            return false;
        }
    }
    else
    {
        foco(idElement);
        return false;
    }
    
}

/**
 * funcion para validar fechas
 * @param fecha
 * @param idElement
 * @returns {Boolean}
 */
function validarFormatoFecha(fecha, idElement) 
{
    var expr = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    
    if(campoVacio(fecha, textLlenarFechaN()))
    {
        if (expr.test(fecha)) 
            return true;
        else 
        {
            controlDosMensajes(textErrorFNacimiento());
            foco(idElement);
            return false;
        }
    }
    else
    {
        foco(idElement);
        return false;
    }
} 

/**
 * funcion para realizar el foco hacia el elemento correspondiente
 * @param idElement (elemeno hacia donde dirige el foco)
 */
function foco(idElement)
{
    if(typeof idElement !== "undefined" && idElement !== "")
        document.getElementById(idElement).focus();
}

/**
 * Funcion para borrar el valor del campo dependiendo de su id
 * @param {text} idElement
 */
function borrarVal(idElement)
{
    if(typeof idElement !== "undefined" && idElement !== "")
        document.getElementById(idElement).value = "";
}

/**
 * Mensajes de error solamente
 * Funcion para validar si los dos mensajes estan llenos
 * y arrojarlos
 * @param {text} mensaje1
 * @param {text} mensaje2
 * @param {text} articulo = union de los dos mensajes
 */
function controlDosMensajes(mensaje1, mensaje2, articulo) 
{
    if ((typeof mensaje1 !== "undefined" && typeof mensaje2 !== "undefined" && 
            typeof articulo !== "undefined") && (mensaje1 !== "" && mensaje2 !== ""
            && articulo !== ""))
        error(mensaje1 + " " + articulo + " " + mensaje2);
    else if (typeof mensaje1 !== "undefined" && mensaje1 !== "")
        error(mensaje1);
}
/**
 * Funcion para validar si la fecha ingresada es mayor que la fecha del sistema,
 * si se cumple la condicion retornara true, de lo contrario retorna false
 * @param {text} fecha
 * @returns {Boolean}
 */
function validaBorradoPFecha(fecha)
{
    var dateSys = dateSystem();
    var elementS = dateSys.split("-");
    var elementR = fecha.split("-");
    
    var dateS = parseInt(elementS[2]);
    var monthS = parseInt(elementS[1]);
    
    var dateR = parseInt(elementR[2]);
    var monthR = parseInt(elementR[1]);
    

    if (monthS === monthR && dateS >= dateR)
        return false;
    else if (monthS < monthR)
        return true;
    else if(monthS === monthR && dateS < dateR)
        return true;
    else if(monthS > monthR)
        return false;
}
/**
 * Funcion para retornar el numero de dias que tiene cada mes
 * validando si es año bisiesto o no
 * @param {Number} month
 * @param {Number} year
 * @returns {Number}
 */
function dateMonth(month, year)
{
    var enero = 31;
    var febrero = 29;
    var febreroB = 28;
    var marzo = 31;
    var abril = 30;
    var mayo = 31;
    var junio = 30;
    var julio = 31;
    var agosto = 31;
    var septiembre = 30;
    var octubre = 31;
    var nobiembre = 30;
    var diciembre = 31;
    
    switch (month)
    {
        case 1:
            return enero;
            break;
        case 2:
            if(validaAnoBisiesto(year))
                return febreroB;
            else
                return febrero;
            break;
        case 3:
            return marzo;
            break;
        case 4:
            return abril;
            break;
        case 5:
            return mayo;
            break;
        case 6:
            return junio;
            break;
        case 7:
            return julio;
            break;
        case 8:
            return agosto;
            break;
        case 9:
            return septiembre;
            break;
        case 10:
            return octubre;
            break;
        case 11:
            return nobiembre;
            break;
        case 12:
            return diciembre;
            break;
    }
}

/**
 * Funcion para validar si es año bisiesto
 * @param {Number} year
 * @returns {Boolean}
 */
function validaAnoBisiesto(year)
{
    if((year % 4 === 0) && (year % 100 === 0) || (year % 400 === 0))
        return true;
    else
        return false;
}

/**
 * Funcion para mandar la informacion al servidor de php
 * en base a un objeto cargado, esta funcion solamente funciona 
 * cuando el servidor responde con un objeto de tipo JSON.estado,
 * de lo contrario mandara un error.
 * Funcion para altas, bajas y cambios, NO para consultas
 * 
 * @param {object} objetoJSON
 */
function ajaxLoad(objetoJSON) 
{
    $.ajax({
        url: server,
        type: "post",
        dataType: "json",
        data: objetoJSON
    }).done(function(respuestaJSON){
            console.log(respuestaJSON);
            
            if(typeof respuestaJSON.estado !== "undefined" && respuestaJSON.estado !== "" 
                    && respuestaJSON.estado !== null)
            {
                switch (respuestaJSON.estado)
                {
                    case guardado:
                        ok(textGuardado());
                        break;
                    case noGuardado:
                        error(textNoGuardado());
                        break;
                    case actualizado:
                        ok(textActualizado());
                        break;
                    case borrado:
                        ok(textBorrado());
                        break;
                    case registrado:
                        alerta(textUseRegistrado());
                        break;
                    case err:
                        alerta(textErrorInterno());
                        break;
                    case evento:
                        alerta(textCitaRegistrada());
                        break;
                    default :
                        error(textRespInvalida());                         
                        break;
                }
            }   
            else 
                error(textSinRespuesta());
        })
    .fail(function (data) 
        {
            error(textSinRespuesta());
            console.log(data);
        });
}
