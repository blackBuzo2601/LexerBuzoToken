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






}); //fin del readFile




