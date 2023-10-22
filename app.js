//Programa probado con Node JS 16.17.1
//Elaborado por Buzo Zamora Elian
//21 de Octubre de 2023, Ensenada B.C

var query="SELECT edad correo,sueldo FROM usuarios WHERE nombre='juan, pedro'";
                            //NOTA: Si nombre= y 'juan tienen un espacio entre ellos,
                            //la consola imprime los valores separados correctamente.
                            //ejemplo: nombre=, 'juan, 
                            //Pero si están como nombre='juan, los imprime raro pues
                            //y es lo que me falta corregir



//INICIALIZACION DE VARIABLES
var querySpliteado=query.split(" "); //separar por espacios el Query
var letra=""; 
var palabraActual="";
var subtexto=""; 
var bandera=0;
const caracteresDiferentes=",=" //Otros caracters que va a evaluar

//QuerySpliteado: es un arreglo con todos los elementos de Query separados por el " "  bien.
for(let i=0;i<querySpliteado.length;i++){ //Bucle For General

    bandera=0; //reiniciar bandera.
    palabraActual=querySpliteado[i]; //Trabajar con cada palabra.

    for(let k=0;k<palabraActual.length;k++){ //bucle for que evalúa cada letra de palabraActual
        letra=palabraActual[k];
        if(caracteresDiferentes.includes(letra)){
            console.log(letra); //imprimir el "caracterDiferente"
            subtexto=palabraActual.split(letra); //splitear la palabra en base al caracter
            for(let e=0;e<subtexto.length;e++){ 
                console.log(subtexto[e]); //imprimir elementos de palabra separados por caracter
            }
            bandera=1; //significa que si entró en el condicional if. 

        }//cierre condicional if

    }//fin bucle for de letras de la palabra

    if(bandera==0){ //si bandera vale 1, significa que ya se imprimió la palabra con el caracter especial
        console.log(palabraActual);
    }

}//fin for general  
