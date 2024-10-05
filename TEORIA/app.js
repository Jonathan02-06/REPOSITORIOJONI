let saludo = "hola";

let saludoArray = Array.from(saludo);
console.log(saludoArray);

//ejemplo array
let x = [1, 2, 3, 4];
let copia = Array.from(x);
console.log(x);
console.log(copia);
console.log(x == copia);


/// mAP
// CREA NUEVA ARRAY CON LOS RESULTADOS DE APLICAR UNA FUNCION A LOS ELEMENTOS DE OTRO ARRAY
// NO MODIFICA

//condicionales
/// if  if(condicion)  {instruccion}
//if else (varias condicones)

if (10 > 1) {
    console.log('todo bien');
}
 if (1 > 10){
    console.log('todo bien');
 }
let numero = 200;

 if ( numero % 2 == 0 ){
    console.log('par');
 } else {
    console.log('impar');
 }
   //switch

   const listaAlumnos = ['richard', 'antonio', 'luis'];

let nombresAlumnos = listaAlumnos.forEach(
    function (elementodelarray) {
        console.log(elementodelarray);
    }
)
/////
const numeros = [100, 200, 300];

for (let cadaelemento of numeros) {
   cadaelemento *= 8;
   console.log(cadaelemento);
}

const cosas = [
   'taza',
   'lavadora',
   'mesa'
];

for (const cosa in cosas) {
   console.log(`algo de la cocina es ${cosas[cosa]}`);
};

let personaje = {
   nombre : 'zinedine',
   apellido : 'zidane',
   ciudad : 'marsella',
   instrumento : 'balon'
}

for (const claves in personaje) {
   console.log(`estas son las claves de personaje: ${personaje[claves]}`)
};


///metodos

let listanumeros = [1, 2, 3, 4, 5];

let listanumeroscuadrado = listanumeros.map(
   function (elemento) {
      return elemento * elemento
   }
)
console.log(listanumeroscuadrado);

///calcular cuadrado solo de nuemros pares y si no scaamos el original

let listacuadradospares = listanumeros.map(
   function (elemento) {
      if (elemento % 2 == 0) {
         return elemento * elemento
      } else {
         return elemento
      }
   }   
)

// igual que el anterior pero en ternario
//condicion true o false

let ternariocuadradospares = listanumeros.map(
   function (elemento) {
      return elemento % 2 == 0 
      ? elemento * elemento
      : elemento
   }   
)
console.log(ternariocuadradospares);


//mismo ejercios forma simplificada

let ternarioarrow = listanumeros.map(elemento => elemento % 2 == 0 ? elemento * elemento : elemento)
console.log(ternarioarrow);

///FILTER 
//DEVUELVE LOS ELEMNTOS DE UN
// ARRAY QUE CUMPLEN UNA CONDICON

//*SCAAMOS LOS PARES DE UNA LISTA

const cifras = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 let pares = cifras.filter(e => e % 2 == 0)
 console.log (pares);

 ///ejemplo JSON

 let dataJSON = `{ "nombre" : "noelia" : "hobby" : "nadar" , "numeros" : [ 0, 13 ]}`
console.log(dataJSON);


