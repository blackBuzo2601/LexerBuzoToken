//Programa probado con Node JS 16.17.1
//Elaborado por Buzo Zamora Elian
//21 de Octubre de 2023, Ensenada B.C

/*  usamos el modulo fs de Node.js
    con require ('fs) se esta importando el modulo 
    para acceder a todas las funciones y metodos de fs. */
const fs = require ('fs'); 
/*readFile es un método de fs.
UTF-8 el parámetro que indica que se desea leer el archivo en formato UTF-8. 
(err, data) son las variables que usamos como parámetro de nuestro callBack.
err: se utiliza para almacenar cualquier error que ocurra durante la operacion.
data: se utiliza para almacenar los datos o el resultado de la operacion
*/
fs.readFile('sqlkeywords.txt','utf8', (err, data) => {
var query="SELECT edad correo,sueldo FROM usuarios WHERE nombre='juan, pedro'";
//variables necesarias
var caracterVacio=" ";
var letraActual="";
var formarPalabra="";
var caracteresDiferentes=",'=";
var letraExtra="";
var letraExtraPosicion=0;
var letraActualPosicion=0;
//Bucle for GENERAL
for(let i=0;i<query.length;i++){
    letraActual=query[i]; //almacena la letra
    letraActualPosicion=query.indexOf(letraActual); //almacena la posicion de la letra
    console.log("Letra: "+letraActual+" y posicion: "+letraActualPosicion);
/*
    formarPalabra=formarPalabra+letraActual; //va construyendo la palabra hasta encontrar un espacio
    if(letraActual==caracterVacio){
        console.log(formarPalabra);
        console.log("espacio detectado en el caracter "+letraActualPosicion);
        formarPalabra="";

        //pasar a la siguiente letra a ver si es vacia
        letraActual=query[letraActualPosicion+1]; //almacena la letra SIGUIENTE
        letraActual=query.indexOf(letraActual);//almacena la posicion de letra SIGUIENTE
        if(letraActual==caracterVacio){
            letraActualPosicion=letraActualPosicion+1;
            letraActual=query[letraActualPosicion];
            while(letraActual==caracterVacio){
                letraActualPosicion=letraActualPosicion+1;
                letraActual=query[letraActualPosicion]; //almacena la letra SIGUIENTE
                console.log("Espacio detectado en el caracter: "+letraActualPosicion);
            }
        }
        
    }//fin del while
        */
        
}//fin bucle for general


}); //fin del readFile




