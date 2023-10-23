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
    var query="SELECT edad correo,sueldo FROM usuarios WHERE nombre='juan, pedro'"
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
                if(formarPalabra==""){ //en caso de que haya habido varios espacios en blanco
                    formarPalabra="";   
                    console.log(letraActual); //solo imprime la letraActual (que corresponde a un caracter Especial)

                }else{ //si habia una palabra construida previamente entrará en esta condición
                    console.log(formarPalabra); //imprimirá la palabra previamente construida
                    console.log(letraActual);   //imprimirá después el caracter especial
                    formarPalabra="";           //reiniciará la variable para volver a construir otra palabra
                                                //en la siguiente iteracion.
                }   
            }else{ //si es un caracter comun y corriente, entrará aquí
                formarPalabra=formarPalabra+letraActual; //va construyendo la palabra hasta encontrar un espacio
            }
        }//fin primer condicional
    
        if(letraActual==caracterVacio){//aqui entra cuando el caracter es vacio.
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

