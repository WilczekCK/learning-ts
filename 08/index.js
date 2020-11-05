/* Inferencja typów i const */
//Czym jest inferencja?
//Jest to mechanizm automatycznego wnioskowania typów
//na podstawie dostępnych informacji - wartości i wywołań funkcji
//TS potrafi wywnioskować typy stałych, zmiennych, tablic, obiektów,
//całych wyrazen i typ zwracany z funkcji i czasem na podstawie kontekstu
//Przykład: 
var val = 123; //TS wie ze to number, bez twardego typowania
function fn() {
    return 123; //TS wie, ze zwraca typ numer
}
//Lecz czasem trzeba mu pomóc
function fn2(a, b) {
    return a * b;
}
fn2(2, 3); //6
//W powyzszym wypadku musimy mu pomóc
function fn3(a, b) {
    return a * b;
}
//Typ wspólny:
//Jakie typy zwróci kompilator?
function fn4(a, b) {
    return Math.random() > 0.5 ? a : b;
} // => unia typów, moze byc jednym lub drugim: string | number
var arr = [1, "a", null]; // => unia typów: number, string, null
var Background = /** @class */ (function () {
    function Background() {
    }
    return Background;
}());
var Boulder = /** @class */ (function () {
    function Boulder() {
    }
    return Boulder;
}());
var Player = /** @class */ (function () {
    function Player() {
    }
    return Player;
}());
var arr = [
    new Player(),
    new Boulder(),
    new Background()
];
//TS nie wie, ze to tablica obiektów typów "Drawable"
//podaje zamiast tego unię typów: Array<Player | Boulder | Background>
//Musimy mu pomóc
var objects = [
    new Player(),
    new Boulder(),
    new Background()
];
//Czy to tablica, czy tupla?
var interval = [1, 'm'];
//TS powie, ze tablica.
//Jesli chcemy to zmienic, musimy wpisac ją ręcznie
var interval2 = [1, 'm'];
var fn4 = function (name, age) {
    return name.length > 1 && age > 15;
};
function getInvoiceTotal(invoice) {
    return invoice.amount;
} // zwraca typ number
function getInvoiceTotal2(invoice) {
    return invoice.submittedAt && invoice.amount;
} //o nie, unia typów: number || undefined - błąd, lecz TS go nie widzi :(
//Inferencja przy const i let
//Inferencja typów rózni się gdy przypisujemy ją do let lub const
var valVariable = 123; // number
var valConstant = 123;
//TS nadaje stałej specjalny typ literału, ktora nigdy się nie zmienia.
