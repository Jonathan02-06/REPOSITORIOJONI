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



//*callback

function acciondepersona (callback){
   const nombre = 'Joni'
   callback(nombre)
}
function despedir(nombre) {
   console.log(`soy ${nombre} estoy cansado,adios`)
}
acciondepersona(despedir)



// Desarrollador una calculadora super simple

function multiplicar(num1, num2) {
   return num1 * num2
}
console.log(multiplicar);

// Añadir metodos de operaciones a el objeto calculadora

const calculadora = {
   sumar: function (num1, num2) {
   }, restar: function (num1, num2) {

   }, dividir: function (num1, num2) {

   }, multiplicar: function (num1, num2) {
         
   }, sumarcifrasdecimales: function (num1, num2) {

   }

}  








const inventario = [
    { nombre: "Camisa", categoria: "Ropa", cantidad: 10, precio: 20 },
    { nombre: "Pantalón", categoria: "Ropa", cantidad: 5, precio: 30 },
    { nombre: "Zapatillas", categoria: "Calzado", cantidad: 8, precio: 50 },
    { nombre: "Sombrero", categoria: "Accesorios", cantidad: 15, precio: 10 }
  ];
// Función 1: Añadir un Producto

function agregarProducto(nombre, categoria, cantidad, precio) {
   const nuevoproducto = {nombre, categoria, cantidad, precio}
   inventario.push(nuevoproducto)
   console.log(`se ha añadido el producto ${nombre}`);
   

}




// Función 2: Buscar un Producto
// Función 3: Actualizar Stock

