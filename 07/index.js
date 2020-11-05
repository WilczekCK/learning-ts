/* Typy generyczne */
//Określane mianem szablonów lub typów poliformicznych.
//Generyki to podstawowy budulec typów w naszych aplikacjach.
//Czyli typ który sparametryzowany względem typów.
var x = ["a", "b", "c"];
//Zapis Typ<inny typ> oznacza typ generyczny!
//Funkcje Generyczne
//JS
var id = function (x) { return x; };
//TS
var id2 = function (x) { return x; };
//Bardziej elegancki TS
var id3 = function (x) { return x; };
//Składnia <T> przed wyrazeniem funkcji oznacza iz
//funkcja jest generyczna, definiuje lokalny typ o nazwie T którego dalej mozemy uzywac
//przykladowo, wywolujemy funkcje id:
var result = id3(1);
//Inferencja w generykach
//Zapisy powyzej są troche długie, jest mozliwosc skrócenia ich.
//Mozna pominąć typ zwracany, typescript inferuje go na podstawie ciała funkcji
//widzi ze zwracam x, wiec typem zwracanym jest typ argumentu x
//Podobnie z generykiem <number>, TS wywnioskuje typ na podstawie przekazanego mu argumentu
var id4 = function (x) { return x; };
var result2 = id4(1);
var ref1 = { current: 123 };
var ref2 = { current: "aaa" };
//typ Ref opisuje obiekt zawierający pole current typu T
//i uzywamy go z parametrami typu number i string
function getValue(ref) {
    return ref.current;
}
//Stworzona funkcja przyjmuje jako argument tylko obiekty kompatybilne z typem Ref<T>
//i zwraca ich zawartość, czyli coś typu T.
getValue(ref1); // => 123
//Klasy generyczne działają podobnie do typów, funkcji i interfejsów
//definiujemy typ i ozemy uzywać go wewnątrz klasy
var Queue = /** @class */ (function () {
    function Queue() {
    }
    Queue.prototype.push = function (el) {
        //...
    };
    Queue.prototype.pop = function () {
        //...
    };
    return Queue;
}());
var queue = new Queue();
queue.push(1);
queue.push(2);
queue.push(3);
queue.pop(); //3
//Ograniczenia generyków
//Tworzymy by funkcja przyjmowała jedynie tablice dowolnego typu
//Jest to jeden ze sposobów
function doSth(arg) {
    //...
}
var arr = ["a", "b", "c", "d", "e", "f"];
var arr2 = { current: "Test" };
doSth(arr); //ok
doSth(arr2); //err
//Ograniczamy T tylko do typów, które są kompatybilne z ObjWithName
function printName(arg) {
    //...
}
printName({ name: "Kasia" }); // OK
printName({ name: "Michał", age: 22 }); // OK
printName({ age: 22 }); // err
