//!JS Functions

//*Iteración #1

//*Completa la función que tomando dos números como argumento devuelva el más alto.

function sum(numberOne, numberTwo) {
    return Math.max(numberOne, numberTwo)
}

//*Iteración #2

//*Completa la función que tomando un array de strings como argumento devuelva el más largo, en caso de que dos strings tenga la misma longitud deberá devolver el primero.
//*Puedes usar este array para probar tu función:

const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.']
function findLongestWord(array) {
    return array.reduce((acc, valorActual) => {
        return valorActual.length > acc.length ? valorActual : acc;
    }, '');
} 
console.log(findLongestWord(avengers))

//*Iteración #3

//*Calcular una suma puede ser tan simple como iterar sobre un array y 
//*sumar cada uno de los elementos.
//*Implemente la función denominada sumNumbers que toma un array de números 
//*como argumento y devuelve la suma de todos los números de la matriz.

const numbers = [1, 2, 3, 5, 45, 37, 58];
function sumNumbers(arr) {
    return arr.reduce((total, num) => total + num, 0);
}
console.log(sumNumbers(numbers))

//* Iteración #4

//*Calcular un promedio es una tarea extremadamente común. Puedes usar este array para probar tu función:

const numbers2 = [12, 21, 38, 5, 45, 37, 6]
function promedio(e) {
    const sum = e.reduce((total, num) => total + num, 0);
    console.log(sum)
    const pro = sum / e.length
    console.log(pro); 
    return pro.toFixed(1); 
}  
console.log(promedio(numbers2)); 

//* Iteración #5: 
//* Crea una función que reciba por parámetro un array 
//*y cuando es un valor number lo sume y de lo contrario cuente la longitud del string y lo sume.

const mix = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];
function sumaMix(array) {
    const total = array.reduce((acc, actual) => {
        if (typeof actual == 'number') {
            return acc + actual; 
        } else if (typeof actual == 'string') {
            return acc + actual.length; 
        } else {
            return acc;
        }
    }, 0);
    return total
}
    console.log('SUMA MIX 🫱', sumaMix(mix))