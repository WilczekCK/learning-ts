/* Funkcje w TS */
//Zapis funkcji jest identyczny jak w JS
//lecz muszą być podane typy argumentów funkcji 
function add(x, y) {
    return x + y;
}
// Kazda funkcja ma typ zwracany, TS wywnioskuje samemu, lecz moemy podać typ zwracany po dwukropku
function add2(x, y) {
    return x + y;
}
//Jeśli funkcja nie zwraca niczego, uzywamy void
function doNth() { }
;
//Mozna tez napisac wyrazenie funkcyjne
var fn1 = function () { };
var fn2 = function mojaFunkcja() { };
var fn = function () { };
var fn3 = function (x, y) { return x + y; };
//fn3(1,2) => 3
//fn3("1", 2) => error
// lub
var fn4 = function (a, b) {
    return a + b;
};
var fn5 = function (name, age) {
    return name.length > 1 && age > 18;
};
//fn5("Pawel", 17) => false
//fn5("Pawel", 21) => true
//Parametry opcjonalne
//Uzywamy do tego znaku '?' 
//UWAGA, parametry opcjonalne zawsze muszą być podawane na końcu!
function getFullName(firstName, middleName) { }
//getFullName('Pawel', 'Jan')
//Parametry domyślne
function addNumbers(a, b) {
    if (a === void 0) { a = 1; }
    if (b === void 0) { b = 2; }
    console.log(a, b);
    console.log(typeof a);
    console.log(typeof b);
}
//typescript automatycznie zmienia argumenty (a,b) na typ number.
//addNumbers("1", 2); //error, string
//addNumbers(5,4); //all good
//Funkcje wariadyczne
//Fukcja która potrafi przyjmować zmienną, ale nigdzie nie określoną liczbę parametrów. (... rest)
function log() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
}
//Moliwe jest take podanie na początku kilku argumentów, a potem rest
function x(a, b) {
    var c = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        c[_i - 2] = arguments[_i];
    }
    return { a: a, b: b, c: c };
}
console.log(x('Pqglo', 22, 'Arr1', 'Arr2', 'Arr3', "Arr4"));
