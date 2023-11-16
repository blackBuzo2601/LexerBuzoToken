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
NOTA 4: Hoy 2 de Noviembre a las 6:21AM por fin logré concluir el código y todos los tokens funcionan correctamente.
NOTA 5: 12/11/2023 Momento de comenzar con los casos de SELECT con los tokens asignados correctamente.
*/ 

/*  Usamos el modulo fs de Node.js
    con require ('fs) se esta importando el modulo 
    para acceder a todas las funciones y metodos de fs. */
    const { triggerAsyncId } = require('async_hooks');
const fs = require ('fs'); 
const { todo } = require('node:test');
    /*readFile es un método de fs.
    UTF-8 el parámetro que indica que se desea leer el archivo en formato UTF-8. 
    (err, data) son las variables que usamos como parámetro de nuestro callBack.
    err: se utiliza para almacenar cualquier error que ocurra durante la operacion.
    data: se utiliza para almacenar los datos o el resultado de la operacion
    */

//Eliminar los datos en el archivo si es que el archivo tiene datos
fs.truncate('queryAprobado.log', 0, (err) => {
    if (err) {
        console.error('Error al borrar el contenido del archivo: ', err); //puede ocurrir si el archivo no exite.
    } else {
        
    }
});


//QUERY QUE ESTA EN EL ARCHIVO SQL
fs.readFile('query.sql','utf8', (err, data) => {
        var query=data; //almacenar la data del archivo query.sql en la variable QUERY
    
        //TODAS LAS VARIABLES NECESARIAS
        var caracterVacio=" ";
        var letraActual="";
        var formarPalabra="";
        var caracteresDiferentes="._,-'';*+/=()<>!%$@&|^`~?:'[]";
        caracteresDiferentes=caracteresDiferentes+'"'; //para que almacene tambien el caracter "
        const numerosPermitidos="1234567890";
        const abecedario="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" //minusculas y mayusculas porque no quiero complicarme la neta
        const dosPuntos=":"; //para considerar también ":" como un caracter con token valido
        var keywordsSplit="";
        var keywordActual="";    
        var formarNumero="";
        var banderaDosPuntos=0;
        var banderaEspacios=0;
        var formarPalabraReservada="";
        var palabraReservadaConstruida="";
        var palabraReservadaConstruidaSinEspacios="";   //en esta variable almacenaremos la original y usaremos trim() para retirar espacios vacios.
        const guionBajo="_"
        var todosMisTokens={}; //arreglo que almacenará todas las palabras reservadas con su numero correspondiente
        var caracterVacio=" ";
        var queryDataActual="";
        var banderaPalabraEncontrada=false;
        var contadorCaracteresEspeciales=0;
        var contadorDosPuntos=0;
        var contieneAbecedario=0;
    
        console.log("\n\nIMPRESIÓN DE LOS ELEMENTOS DE QUERY SEPARADOS POR SALTOS DE LINEA:\n======================================================================");
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //PRIMER BUCLE FOR GENERAL
        //Este bucle lo que va a hacer es la construcción de todos los elementos  de "query" considerando los espacios,
        //y los caracteres individuales. Imprimirá separados por saltos de linea y los almacenará en un archivo denominado
        //queryAprobado.log. Con este archivo se trabajará mas adelante para buscar el token correspondiente de los elementos.
    
        for(let i=0;i<query.length;i++){
            letraActual=query[i]; //almacena la letra
            if(letraActual!=caracterVacio){ //primero evalua si el caracter SI es un caracter
    
                if(caracteresDiferentes.includes(letraActual)){ //evalua si es un caracterEspecial
                    if(formarPalabra==""){ //en caso de que haya habido varios espacios en blanco
                        formarPalabra="";   
                        console.log(letraActual); //solo imprime la letraActual (que corresponde a un caracter Especial)
                        
                        mensaje=letraActual;
                        fs.appendFile('queryAprobado.log', mensaje + '\n', (err) => {
                            if (err) throw err;
                        });
                    }else{ //si habia una palabra construida previamente entrará en esta condición
                        console.log(formarPalabra); //imprimirá la palabra previamente construida
                            mensaje=formarPalabra;
                            fs.appendFile('queryAprobado.log', mensaje + '\n', (err) => {
                                if (err) throw err;
                            });
    
                        console.log(letraActual);   //imprimirá después el caracter especial
                            mensaje=letraActual;
                            fs.appendFile('queryAprobado.log', mensaje + '\n', (err) => {
                                if (err) throw err;
                            });
                        formarPalabra="";           //reiniciará la variable para volver a construir otra palabra
                                                    //en la siguiente iteracion.
                    }   
                }else{ //si es un caracter comun y corriente, entrará aquí
                    formarPalabra=formarPalabra+letraActual; //va construyendo la palabra hasta encontrar un espacio
                }
            }//fin primer condicional que evalua si es un caracter
        
            //SEGUNDO CONDICIONAL
            if(letraActual==caracterVacio){//aqui entra cuando el caracter es vacio. (" ")
                if(formarPalabra==""){  //si formarPalabra no tiene nada pues no va a realizar nada. Osea no va a imprimir ese espacio vacio en la consola
                    formarPalabra="";
                }else{ //esto se corre si formarPalabra contiene caracteres y aqui se forma la palabra puesto que se encuentra un espacio
                    console.log(formarPalabra);
    
                        mensaje=formarPalabra;
                            fs.appendFile('queryAprobado.log', mensaje + '\n', (err) => {
                                if (err) throw err;
                            });
                    formarPalabra="";
                }    
            }//FIN SEGUNDO CONDICIONAL
              
        }//FIN PRIMER BUCLE FOR GENERAL
    
     //------------------------------------------------------------------------------------------------------------------------
    
    //DELIMITAR LOS ELEMENTOS DEL sqlkeywords.txt y almacenarlos en un objeto {}
    fs.readFile('sqlkeywords.txt','utf8', (err, data) => { //se lee el archivo sqlkeywords.txt
            keywordsSplit=data.split("\n"); //separar los renglones en base saltos de Linea (No hemos tokenizado)
            
            //SEGUNDO BUCLE FOR GENERAL: SE TRABAJA CON CADA UNO DE LOS RENGLONES DE sqlkeywords.txt
            for(let k=0;k<keywordsSplit.length;k++){
                keywordActual=keywordsSplit[k]; //almacena cada palabra por cada iteración    
                formarNumero="";                //               
                banderaEspacios=0;              //
                banderaDosPuntos=0;             //
                formarPalabraReservada="";      //  REINICIO DE VARIABLES por cada iteración
                palabraReservadaConstruida="";  //        
                espacioActivo=0;                //
                posicionCaracterVacio=0;        //
                contadorCaracteresEspeciales=0; //
    
                //Bucle for subgeneral que evalua cada letra del keywordActual
                for(let l=0;l<keywordActual.length;l++){
                    
                    if(banderaEspacios==0){ //La primera iteración de este for banderaEspacios siempre vale 0.
                        if(numerosPermitidos.includes(keywordActual[l])){   //Si el caracter actual es numérico
                            formarNumero=formarNumero+keywordActual[l];     //entonces se construye el numero del token
                        }
                    }
                    
                    if(keywordActual[l]==" "){ //Cuando encuentra el primer espacio, banderaEspacios de valer 0 pasa a 1.
                        if(banderaEspacios==0){//entonces cuando banderEspacios==1, no entra este condicional más.
                            banderaEspacios++; //Cuando entra aquí, significa que ya se produjo el primer espacio.
                        }
                    }
    
                    if(keywordActual[l]==dosPuntos){//Cuando encuentra el primer ":", banderDosPuntos de valer 0 pasa a 1.
                        banderaDosPuntos++;
                    }
    
                    if(banderaDosPuntos>=1){ //cuando ya hubo un ":" significa que a partir de ahi empieza la expresion
                       formarPalabraReservada=formarPalabraReservada+keywordActual[l];
                   }
                }//fin bucle for subgeneral que evalua cada letra del keyword actual
                
    contieneAbecedario=0; //Reinicio de esta variable.
    
    //Este bucle for recorre cada letra de formarPalabraReservada para ver si tiene caracteres del abecedario.
                for(let z=0;z<formarPalabraReservada.length;z++){
                    if(abecedario.includes(formarPalabraReservada[z])){
                        contieneAbecedario++;
                    }
                }
                
                if(contieneAbecedario>=1){ //se corre esto si formarPalabraReservada contiene algo del abecedario
                        for (let b=0;b<formarPalabraReservada.length;b++){ //bucle for adicional
                            if(caracteresDiferentes.includes(formarPalabraReservada[b])){
                                    if(formarPalabraReservada[b]==guionBajo){ //algunas palabras contienen "_", asi que se deben considerar los "_"                                                                                 
                                            palabraReservadaConstruida=palabraReservadaConstruida+formarPalabraReservada[b]; //para incluir los "_" en la palabra reservada.
                                    }
                                    //sino es un "_" no se va a realizar nada. Osea, no se consideran otros caracteres individuales.
                            }else{
                            palabraReservadaConstruida=palabraReservadaConstruida+formarPalabraReservada[b];
                            }   
                        }//fin de bucle for adicional
    
                }else{ //SI NO TIENE LETRAS DEL ABECEDARIO SE CORRE ESTO
                    contadorDosPuntos=0;
                    for (let b=0;b<formarPalabraReservada.length;b++){ //bucle for adicional
                        if(caracteresDiferentes.includes(formarPalabraReservada[b])){
                            
                                if(contadorDosPuntos==1){
                                    contadorCaracteresEspeciales++;
                                }
    
                                if(formarPalabraReservada[b]==dosPuntos){
                                    contadorDosPuntos++
                                }
    
                                /*if(contadorDosPuntos==2){
                                    palabraReservadaConstruida=palabraReservadaConstruida+formarPalabraReservada[b];
                                }*/
    
                                if(contadorCaracteresEspeciales>=1){
                                    palabraReservadaConstruida=palabraReservadaConstruida+formarPalabraReservada[b];
                                }
                                //sino no realizar operacion alguna pues entonces
                    }else{
                        palabraReservadaConstruida=palabraReservadaConstruida+formarPalabraReservada[b];
                    }
                }//fin bucle for adicional
        }//fin condicion de si no se incluyen letras del abedecedario.
        
            palabraReservadaConstruidaSinEspacios=palabraReservadaConstruida.trim(); //chars vacios retirar de la palabra construida
            //ASIGNACIÓN DE TOKENS. Cada palabra reservada tiene un numero asignado.
            todosMisTokens[formarNumero] = palabraReservadaConstruidaSinEspacios; //crear pares clave y valor
                
     }//FIN SEGUNDO BUCLE FOR GENERAL
    //---------------------------------------------------------------------------------------------------------------------------------
    
    //EN ESTE PUNTO LA VARIABLE formarNumero no se reinicia. Esta variable está almacenando el ultimo numero con el
    //que se trabajo para la asignación de tokens. En este punto la variable vale 816. Quiere decir que son 816 veces
    //que ocuparemos recorrer el objeto todosMisTokens para saber el token al que corresponde una palabra reservada.
    
    //IMPRIMIR EL TOKEN CORRESPONDIENTE DE CADA PALABRA o Caracter.
            fs.readFile('queryAprobado.log','utf8', (err, data) => { //leer el query almacenado en queryAprobado.log
                console.log("\nCOMIENZA EL CÓDIGO DONDE SE LEE queryAprobado.log\n===============================================================\n");
                
                queryDataSpliteado=data.toUpperCase();  //Convertir todo el archivo a Mayusculas para no tener problemas con los tokens.
                queryDataSpliteado=queryDataSpliteado.split("\n"); //separar data en base saltos de lineas.
    
                //TERCER BUCLE FOR GENERAL: Este bucle trabaja sobre cada elemento en base saltos de linea de queryAprobado.log
                for(let m=0;m<queryDataSpliteado.length-1;m++){ 
                    banderaPalabraEncontrada=false; //por defecto se inicializa en false esta variable.
    
                    queryDataActual=queryDataSpliteado[m]; //almacena cada elemento de QueryAprobado.log
                    
                    //Bucle for subgeneral que recorre el objeto todosMisTokens
                    for(let n=0;n<formarNumero+1;n++){ //formarNumero vale 997 (el ultimo token de la lista) +1 porque no estaba considerando el ultimo elemento de sqlkeywords.txt
                        if(banderaPalabraEncontrada==false){
                            if(queryDataActual==todosMisTokens[n]){
                                console.log("La palabra reservada ("+queryDataActual+") corresponde al token: "+n);
                                banderaPalabraEncontrada=true;
                            }
                        }
                    } //fin sub ciclo for que recorre el objeto todosMisTokens
            
                    if(banderaPalabraEncontrada==false){
                        console.log(""+queryDataActual+" NO es una palabra reservada");
                    }
                        
                }//FIN DEL TERCER BUCLE FOR GENERAL
        
//--------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------CODIGO PARA EVALUAR SINTAXIS DE SELECT--------------------------------------------------------------------------------------------
console.log("\n\nCODIGO PARA EVALUAR SINTAXIS DE SELECT\n========================================\n");
    //VARIABLES NECESARIAS PARA ESTE MODULO DEL CODIGO:
        var tokensEncontrados=[]; //variable inicializada que almacenará en orden los tokens de cada elemento de query.sql
        const caracteresComparadores="<>=!";

//ESTE BUCLE FOR NO TIENE EXPLICACIÓN. ES UNO QUE COPIÉ Y PEGUÉ DE OTRA SECCION DEL CODIGO.
//AQUI LO QUE VA A HACER ES QUE LOS TOKENS ENCONTRADOS LOS VA A PUSHEAR EN UN ARRAY (tokensEncontrados)
        for(let q=0; q<queryDataSpliteado.length-1;q++){ //bucle for para identificar los tokens de queryAprobado.log (lo mismo que hay en query.sql)
            banderaPalabraEncontrada=false; //por defecto se inicializa en false esta variable.
            queryDataActual=queryDataSpliteado[q]; //almacena cada elemento de QueryAprobado.log
            //Bucle for subgeneral que recorre el objeto todosMisTokens
            for(let r=0;r<formarNumero+1;r++){ //formarNumero vale 1000 (el ultimo token de la lista) +1 para que considere también el ultimo elemento de sqlkeywords.txt
                if(banderaPalabraEncontrada==false){
                    if(queryDataActual==todosMisTokens[r]){
                        tokensEncontrados.push(r);
                        banderaPalabraEncontrada=true;
                    }
                }
            } //fin sub ciclo for que recorre el objeto todosMisTokens
            if(banderaPalabraEncontrada==false){
                tokensEncontrados.push(queryDataActual); //almacenar de igual forma en el array la palabra NO RESERVADA 
            }
        }//FIN DE ESTE BUCLE FOR

    console.log("TOKENS DETECTADOS de Query.sql: ");
    console.log(tokensEncontrados); //para verificar que esté almacenando en el array los tokens correctamente

//objeto que almacena pares clave-valor de reglas para evaluar en el sintaxis de SELECT
    var reglasSintaxis={
        "SELECT_ASTERISCO": [655,7],    //  SELECT *
        "SELECT_COLUMNA":[655,999],     //  SELECT COLUMNA
        "COMA_COLUMNA": [3,999],        //  ,COLUMNA
        "FROM_TABLA":[309,1000],         //  FROM TABLA;
        "WHERE_COLUMNA":[800,999],      //  WHERE COLUMNA
        "REGISTRO_;": [998,6]           //REGISTRO ;
    } 
var posicion=0;
//------------------------DECLARACION DE FUNCIONES para no copiar y pegar codigo----------------------------------------------
    function validaWhereColumnaSignoRegistroPyc(){ //WHERE COLUMNA < REGISTRO ;
            //slice para considerar las posiciones 4 y 5, exluyendo la posicion 6
            if(tokensEncontrados.slice(posicion,posicion+2).toString()==reglasSintaxis["WHERE_COLUMNA"].toString()){ 
                console.log("WHERE_COLUMNA VALIDADO");

                if(caracteresComparadores.includes(todosMisTokens[tokensEncontrados[posicion+2]])){ //evaluar si la siguiente posicion es un comparador
                    console.log("Comparador: "+todosMisTokens[tokensEncontrados[posicion+2]]+" validado.");

                    if(tokensEncontrados.slice(posicion+3).toString()==reglasSintaxis["REGISTRO_;"].toString()){ //slice para considerar la posicion 7 en adelante
                        console.log("REGISTRO; Validado. Query Correcto: "+query);
                    }else{
                        console.log("ERROR DE SINTAXIS. Se esperaba REGISTRO;. Tokens ingresados: "+tokensEncontrados.slice(posicion+3));
                    }
                }else{ //si no es un comparador error de sintaxis
                    console.log("ERROR DE SINTAXIS. Se esperaba un comparador. Token ingresado:  "+tokensEncontrados[posicion+2]);  
                }
            }
            else if(tokensEncontrados[posicion]==6){ //si no es un WHERE_COLUMNA, puede ser un ;
                console.log("(;) VALIDADO. QUERY CORRECTO: "+query);
            }
            else{ //si no es un WHERE_COLUMNA ni un ; es error de sintaxis.
                console.log("ERROR DE SINTAXIS. Se esperaba un (800,999) o (6). Tokens ingresados: "+tokensEncontrados.slice(posicion,posicion+2));
            }            
    } //fin funcion
//-------------------------------------------------------------------------------------------------------------------

if(tokensEncontrados[0]==655){ //VALIDAR QUE EMPIECE con SELECT
    //con slice hacemos que tome en cuenta las posiciones 0 y 1 de tokensEncontrados excluyendo la posicion del 2do parametro (2)
    //utilizamos toString() para poder comparar de una mejor manera que sean iguales los arreglos.
    if(tokensEncontrados.slice(0,2).toString()==reglasSintaxis["SELECT_ASTERISCO"].toString()){
        console.log("SELECT_ASTERISCO VALIDADO");

            if(tokensEncontrados.slice(2,4).toString()==reglasSintaxis["FROM_TABLA"].toString()){
                    console.log("FROM_TABLA VALIDADO");
                    posicion=4;
                    validaWhereColumnaSignoRegistroPyc(); //llamar a la función.
            }else{
                console.log("ERROR DE SINTAXIS. SE ESPERABA UN (309,1000). Tokens ingresados: "+tokensEncontrados.slice(2,4));
            }
//------------------------------------SELECT COLUMNA-----------------------------------------------------------------  
//si no es SELECT *, ES SELECT COLUMNA
}else if(tokensEncontrados.slice(0,2).toString()==reglasSintaxis["SELECT_COLUMNA"].toString()){
    console.log("SELECT_COLUMNA Validado.");
        
        if(tokensEncontrados.slice(2,4).toString()==reglasSintaxis["FROM_TABLA"].toString()){
            console.log("FROM_TABLA VALIDADO");
            posicion=4;
            validaWhereColumnaSignoRegistroPyc(); //llamar a la función.
        }
        //si no es FROM_TABLA, va a buscar que haya otra columna, después de esa primera COLUMNA.
        else if(tokensEncontrados.slice(2,4).toString()==reglasSintaxis["COMA_COLUMNA"].toString()){
         posicion=2;
         while(tokensEncontrados.slice(posicion,posicion+2).toString()==reglasSintaxis["COMA_COLUMNA"].toString()){ //encontrar una coma después de una columna
            console.log("COMA_COLUMNA Validado en posicion: "+posicion+" y posicion: "+(posicion+1)); //+1 para considerar el siguiente de "posicion", recordemos que el segundo parametro de slice no es tomado en cuenta bien.
            posicion=posicion+2;
         }
            if(tokensEncontrados.slice(posicion,posicion+2).toString()==reglasSintaxis["FROM_TABLA"].toString()){
                console.log("FROM_TABLA validado");
                    posicion=posicion+2;
                    validaWhereColumnaSignoRegistroPyc();
            }else{
                console.log("Error de Sintaxis. Se esperaba FROM_TABLA. Tokens ingresados: "+tokensEncontrados.slice(posicion,posicion+2));
            }
        }
        else{ //si no es (FROM_TABLA) ni más columnas (,COLUMNA) es error de sintaxis
            console.log("ERROR DE SINTAXIS. Se esperaba (FROM_TABLA) o (,COLUMNA). Tokens ingresados: "+tokensEncontrados.slice(2,4));
        }
//---------------------------No es SELECT * ni SELECT COLUMNA, entonces Error de Sintaxis---------------------------
    }else{ //SI DESPUÉS DEL SELECT no hay COLUMNA ni * es error de sintaxis.
        console.log("Error de sintaxis. No se encontró (*) ni COLUMNA después de SELECT. Tokens ingresados: "+tokensEncontrados.slice(0,2));
    } 
//=======================================NO EMPIEZA CON SELECT====================================================
}else{ //No es SELECT entonces concluye el programa.
    console.log("Error de sintaxis. No se encontro SELECT al inicio del query.");
}


            }); //fin del readFile que lee QueryAprobado.log

    }); //fin del readFile GENERAL que lee el archivo sqlkeyword.txt


}); //fin del readFile que lee query.sql