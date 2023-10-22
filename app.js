//Programa probado con Node JS 16.17.1
//Elaborado por Buzo Zamora Elian
//21 de Octubre de 2023, Ensenada B.C
//NOTA 1: Estoy intentando hacer el mismo lexer anterior, pero esta vez evaluando caracter por caracter
//e intentare que esta vez imprima bien las palabras sin saltos de linea adicionales. Osea bien.

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
    var query="'SELECT edad correo,sueldo FROM usuarios WHERE nombre='juan, pedro'";
    //variables necesarias
    var caracterVacio=" ";
    var letraActual="";
    var formarPalabra="";
    var caracteresDiferentes=",'=";

    //Bucle for GENERAL
    for(let i=0;i<query.length;i++){
        letraActual=query[i]; //almacena la letra
        
        if(letraActual!=caracterVacio){ //primero evalua si el caracter SI es un caracter

            if(caracteresDiferentes.includes(letraActual)){ //evalua si es un caracterEspecial
                if(formarPalabra==""){
                    formarPalabra="";
                }else{
                    console.log(formarPalabra);
                    console.log(letraActual);
                    formarPalabra="";
                }   
            }else{
                formarPalabra=formarPalabra+letraActual; //va construyendo la palabra hasta encontrar un espacio
            }
        }//fin primer condicional
        

        if(letraActual==caracterVacio){//después evalua si el caracter es vacio o " "
            if(formarPalabra==""){ 
                formarPalabra="";
            }else{ //esto se corre si formarPalabra tiene puras letras
                console.log(formarPalabra);
                formarPalabra="";
            }    
        }//fin segundo condicional
            
    }//fin bucle for general

    if(query[query.length-1]!=" "){ //evalua si el ultimo caracter del query es diferente de vacio. Para imprimir la palabra formada
        console.log(formarPalabra);
    }
    





}); //fin del readFile

