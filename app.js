/*
Programa probado con Node JS 16.17.1
Elaborado por Buzo Zamora Elian
21 de Octubre de 2023, Ensenada B.C
NOTA 1: Estoy intentando hacer el mismo lexer anterior, pero esta vez evaluando caracter por caracter
e intentare que esta vez imprima bien las palabras sin saltos de linea adicionales. Osea bien.
NOTA 2: Funciona como deberia funcionar el Lexer anterior. Es momento de programar lo
correspondiente a los tokens del arhivo sqlkeywords.txt
NOTA 3: Lo mismo que imprime en consola, lo almacena en un archivo log, lo que me permitira
trabajar con ese mismo archivo para lo de los tokens.
*/

/*  Usamos el modulo fs de Node.js
    con require ('fs) se esta importando el modulo 
    para acceder a todas las funciones y metodos de fs. */
    const fs = require ('fs'); 
    /*readFile es un método de fs.
    UTF-8 el parámetro que indica que se desea leer el archivo en formato UTF-8. 
    (err, data) son las variables que usamos como parámetro de nuestro callBack.
    err: se utiliza para almacenar cualquier error que ocurra durante la operacion.
    data: se utiliza para almacenar los datos o el resultado de la operacion
    */
    
    var query="SELECT edad correo,sueldo FROM usuarios WHERE nombre='juan, pedro'"
    //variables necesarias bucle for 1
    var caracterVacio=" ";
    var letraActual="";
    var formarPalabra="";
    var caracteresDiferentes="._,-'';*+/=()<>!%$@&|^`~?:'[]";
    caracteresDiferentes=caracteresDiferentes+'"';
    //variables necesarias bucle for 2
    const numerosPermitidos="1234567890";
    const abecedario="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" //minusculas y mayusculas porque no quiero complicarme la neta
    const dosPuntos=":";
    var keywordsSplit="";
    var keywordActual="";    
    var formarNumero="";
    var banderaDosPuntos=0;
    var banderaEspacios=0;
    var formarPalabraReservada="";
    var palabraReservadaConstruida="";
    var palabraReservadaConstruidaSinEspacios="";   //en esta variable almacenaremos la original y usaremos trim() para retirar espacios vacios.
    const guionBajo="_"
    var caracterEspecialUnico="";
    var todosMisTokens={};

    //PRIMER BUCLE FOR GENERAL
    for(let i=0;i<query.length;i++){
        letraActual=query[i]; //almacena la letra
        if(letraActual!=caracterVacio){ //primero evalua si el caracter SI es un caracter

            if(caracteresDiferentes.includes(letraActual)){ //evalua si es un caracterEspecial
                if(formarPalabra==""){ //en caso de que haya habido varios espacios en blanco
                    formarPalabra="";   
                    console.log(letraActual); //solo imprime la letraActual (que corresponde a un caracter Especial)
                    
                    mensaje='"'+letraActual+'"';
                    fs.appendFile('queryAprobado.log', mensaje + '\n', (err) => {
                        if (err) throw err;
                    });
                }else{ //si habia una palabra construida previamente entrará en esta condición
                    console.log(formarPalabra); //imprimirá la palabra previamente construida
                        mensaje='"'+formarPalabra+'"';
                        fs.appendFile('queryAprobado.log', mensaje + '\n', (err) => {
                            if (err) throw err;
                        });

                    console.log(letraActual);   //imprimirá después el caracter especial
                        mensaje='"'+letraActual+'"';
                        fs.appendFile('queryAprobado.log', mensaje + '\n', (err) => {
                            if (err) throw err;
                        });
                    formarPalabra="";           //reiniciará la variable para volver a construir otra palabra
                                                //en la siguiente iteracion.
                }   
            }else{ //si es un caracter comun y corriente, entrará aquí
                formarPalabra=formarPalabra+letraActual; //va construyendo la palabra hasta encontrar un espacio
            }
        }//fin primer condicional
    
        //segundo condicional
        if(letraActual==caracterVacio){//aqui entra cuando el caracter es vacio.
            if(formarPalabra==""){ 
                formarPalabra="";
            }else{ //esto se corre si formarPalabra tiene puras letras
                console.log(formarPalabra);

                    mensaje='"'+formarPalabra+'"';
                        fs.appendFile('queryAprobado.log', mensaje + '\n', (err) => {
                            if (err) throw err;
                        });
                formarPalabra="";
            }    
        }//fin segundo condicional
          
    }//fin primer bucle for general
 


//DELIMITAR LOS ELEMENTOS DEL sqlkeywords.txt en base de comillas dobles
fs.readFile('sqlkeywords.txt','utf8', (err, data) => {
        console.log("\n================================================\nComienza la segunda seccion del codigo");
        keywordsSplit=data.split("\n"); //separar los renglones en base saltos de Linea (No hemos tokenizado)
        
        for(let k=0;k<keywordsSplit.length;k++){//SEGUNDO BUCLE FOR GENERAL
            keywordActual=keywordsSplit[k]; //almacena cada apalabra
            formarNumero="";
            banderaEspacios=0;
            banderaDosPuntos=0;
            formarPalabraReservada="";
            palabraReservadaConstruida="";

            for(l=0;l<keywordActual.length;l++){ //evaluar cada letra de la palabra actual
                
                if(banderaEspacios==0){
                    if(numerosPermitidos.includes(keywordActual[l])){
                        formarNumero=formarNumero+keywordActual[l];
                    }
                }
                

                if(keywordActual[l]==" "){
                    if(banderaEspacios==0){
                        banderaEspacios++; //se produjo el primer espacio
                    }
                }

                if(keywordActual[l]==dosPuntos){
                    banderaDosPuntos++;
                }

                if(banderaDosPuntos==1){ //cuando ya hubo un ":" significa que a partir de ahi empieza la expresion
                   formarPalabraReservada=formarPalabraReservada+keywordActual[l];
               }
            }//fin bucle for de letras
           
        
            //EVALUAR LA PALABRA CONSTRUIDA PARA RETIRAR CARACTERES ESPECIALES
            for (b=0;b<formarPalabraReservada.length;b++){
                
                if(caracteresDiferentes.includes(formarPalabraReservada[b])){
                    if(guionBajo.includes(formarPalabraReservada[b])){ //para incluir los "_" en la palabra reservada.
                        palabraReservadaConstruida=palabraReservadaConstruida+formarPalabraReservada[b];
                    }
                    if(caracterVacio.includes(formarPalabraReservada[b])){ //para incluir los caracteres vacios
                        palabraReservadaConstruida=palabraReservadaConstruida+formarPalabraReservada[b];
                    }

                    
                    //sino no realizar operacion alguna pues entonces

                }else{
                    palabraReservadaConstruida=palabraReservadaConstruida+formarPalabraReservada[b];
                }

            }//fin for que evalua palabra construida para retirar caracteres especiales.
            palabraReservadaConstruidaSinEspacios=palabraReservadaConstruida.trim(); //chars vacios retirar de la palabra construida
            todosMisTokens[formarNumero] = palabraReservadaConstruidaSinEspacios; //crear pares clave y valor
            console.log(formarNumero);
            console.log(palabraReservadaConstruidaSinEspacios);
            
        }//fin bucle for general

        
      console.log(todosMisTokens); // imprimir las palabras clave y valor del objeto todosMisTokens

}); //fin del readFile

