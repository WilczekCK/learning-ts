/* Typy elementarne */
//JS 
// - boolean - wartość logiczna true/false
// - number - liczby zmiennoprzecinkowe
// - string - ciąg znaków
// - symbol - opisywanie symboli dodanych w ES2015
// - bigint - szkic, reprezentowanie ogromnych liczb całkowitych
// - null - unia
// - undefined - unia
// - object - wszystko, co nie jest typem prymitywnym (wszystko co powyzej jest typem prymitywnym)
// - Array - po prostu tablica, typ generyczny, złozony.
// TS
// - tuple - tablica o sztywno zdefiniowanej liczbie elementów i określonych typach (1)
var interval1 = [true, "day", 123, { name: 'Pabel', age: 21 }]; //OK
var interval2 = []; //error
//Nie jest moliwe przypisanie niewłaściwego typu do indeksu
var interval3 = [3, "Testing"];
var num = interval3[0]; // number => 3
var unit = interval3[1]; // string => "Testing"
var somethingElse = interval3[2]; // error => niepoprawny indeks
interval3[0] = "day"; //err => niepoprawny typ
interval3[0] = 5; //ok => podmień 3 na 5
//tuple posiadają etykiety elementów
var interval4 = [3, "months"];
// - enum - enumeracja (iteracja po obiektach) w celu znalezienia nazwanych wartości
var Suit;
(function (Suit) {
    Suit[Suit["Spades"] = 0] = "Spades";
    Suit[Suit["Hearts"] = 1] = "Hearts";
    Suit[Suit["Diamonds"] = 2] = "Diamonds";
    Suit[Suit["Clubs"] = 3] = "Clubs";
})(Suit || (Suit = {}));
var cards = Suit.Hearts; // => 1
//Mozliwe jest stworzenie enumow o wartosciach ciagów znaków z
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["Manager"] = "manager";
    UserRole["User"] = "user";
})(UserRole || (UserRole = {}));
var role = UserRole.Admin; // => "admin"
// - void - typ oznaczający "brak wartości", uywany do oznaczania funkcji które nic nie zwracają
function fn1() { } //ok
function fn1() { return; } //ok
function fn2() { return undefined; }
; //ok
// - any - typ który przyjmuje wartości dowolone, odradzane korzystanie.
// - Object - opisuje własności i metody, które są wspólne dla wszystkich obiektów.
//   Uzywany głównie do tego, by dziedziczyły po nim inne typy.
// - never - opisuje wartość, która nigdy nie wystąpi (wut?), nigdy nie zwraca wartości.
function fn3() {
    throw new Error("Ta funkcja nigdy nie zwraca!");
}
//fn3() => err, ta funkcja nigdy nie zwraca warto
//Często uzywa się do oznaczania sytuacju, które nie powinny się zdarzyć
function assertUnreachable(x) {
    throw new Error();
}
function getValue(name) {
    switch (name) {
        case "low":
            return 0;
        case "medium":
            return 1;
        case "high":
            return 2;
    }
    assertUnreachable(name);
}
//getValue('ascsad') // => error
//lub
function assertUnreachable2(x) {
    throw new Error();
}
function getValue2(name) {
    switch (name) {
        case "low":
            return 0;
        case "medium":
            return 1;
        case "high":
            return 2;
    }
}
//getValue2("dasd") //err, not assigned
//getValue2("medium") // => 1
// - unknown - reprezentuje typ, który jest nieznany, dodany by ukrócić naduywanie any.
//   mona z niego odczytać i uzywać w dowolnym kontekscie
var x;
x = 123;
x = "asv";
x = {};
//itd
//nie uda się uyć zmiennej nieznanego typu w kontekście gdzie oczekiwany jest inny typ
var a = x; //err.
var user = {
    name: "Michał"
};
console.log(user);
