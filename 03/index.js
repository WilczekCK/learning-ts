/* Dynamiczne typowanie */
var x = 123;
x = "abc";
/* Statyczne typowanie */
var x = 123;
x = "abc"; //error
var d = 'hello'; //error
var y = 42; //interferencja typu number
y = "ghi"; //err
/* Słabe typowanie */
var x = "123"; //ciąg znaków
var areEqual = x == 123; // true, dla JS;
var a = "3" - 1; //1
var b = "3" + 1; //31
/* Silne typowanie */
var x2 = "123";
var areEqual2 = x == 123; //Err, TS
//Wyjątek,
//bez dynamicznego typowania
if (Boolean(x)) { }
//z dynamicznym typowaniem
if (x) { }
/* TS - Ignore - zezwól na brudny kod*/
//@ts-ignore 
var x3 = "aaa";
if (typeof x === 'number') {
    console.log(x.toFixed(2));
}
var michal = { id: 123 };
var marcin = michal;
var bread = michal;
console.log(bread);
