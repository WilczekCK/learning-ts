//Typy zaawansowane
//Unique symbol
//Wywolanie Symbol() zwraca wartość o typie symbol
//która zachowuje się jak prymityw, ale jest niemutowalna i unikalna
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var x = Symbol("a");
var y = Symbol("b");
x === y; //false
x = y; // ok
y = x; // ok
var x2 = Symbol["for"]("a");
var y2 = Symbol["for"]("a");
x2 === y2; //Error!
//Symbole przypisywane do stałych nigdy nie mogą ulec zmianie
var x3 = Symbol["for"]("a");
var y3 = Symbol["for"]("a");
typeof x3; // typeof x3
typeof y3; // typeof y3
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var User2 = /** @class */ (function () {
    function User2() {
    }
    return User2;
}());
var res = {
    a: 1,
    b: "foo"
};
function getProductPrice(id) { }
var userId = "bbb";
getProductPrice(userId);
var result = Object.assign({ age: 42 }, { name: "Ania" });
result.age; //ok
result.name; //ok
//Unia ( | ) LUB
//Zdefiniować mozna tylko w deklaracji typu
//Funkcja ponizej oczekuje liczby lub ciągu znaków
function parseInt(x) { }
var userIdToUser = {};
var bit;
bit = 0; //ok
bit = 2; //BŁAD */
var cred;
cred = "omit"; //ok
cred = "inclade"; //err
var requestConfig = {
    Accept: "...",
    Authorization: "..."
};
//As const - niemutowalne typy danych
//TS przy literałach stringów, przypisuje polom typ string zamiast literału.
var request = {
    credentials: "omit"
};
//Typ to string, a nie omit, to problematycznie.
//W tym wypadu mozemy skorzystać z rzutowania.
var request2 = {
    credentials: "omit"
    //dawniej "omit" as const
};
//Mozna tez uzywac tego zapisu w stosunku do obiektów i tablic
var request3 = {
    credentials: "omit"
};
//Tablice as const zamieniane są na tuple tylko do odczytu
var arr = [1, "h"];
//readonly [1, "h"]
//Type guards
//typeof, instanceof
//Pozwalają one na sprawdzenie czy dana wartość posiada jakiś określony
//typ w trakcie działania aplikacji. TS korzysta z wyników uzycia tych
//operatorów aby przewidywac, wnioskować i zawęzać typów
function parseInt(arg) {
    if (typeof arg === 'string') {
        // 1
    }
    else {
        // 2
    }
}
//Gdyby nasza unia składała się z większej liczby róznych typów
//to w bloku 2 arg miałby typ będący ich częscią wspólną
function parseInt2(arg) {
    if (typeof arg === 'string') {
        //1
    }
    else {
        //2 number | object
    }
}
//Gdy juz wyeliminujemy wszystkie mozliwosc, TS przypisze
//zmiennej typ never, gdyz taka sytuacja nie powinna sie wydarzyć
function parseInt3(arg) {
    if (typeof arg === "string") {
        // 1
    }
    else if (typeof arg === "number") {
        // 2
    }
    else {
        // 3 never
    }
}
//analogicznie, TS potrafi wywnioskować prawidłowy typ dla operatora instanceof
var Character = /** @class */ (function () {
    function Character() {
    }
    return Character;
}());
var User3 = /** @class */ (function (_super) {
    __extends(User3, _super);
    function User3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User3;
}(Character));
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Enemy;
}(Character));
if (ch instanceof User3) {
    ch.age; //ok
    ch.name; //ok
}
else if (ch instanceof Enemy) {
    ch.hp; //ok
    ch.name; //ok
}
else {
    ch.name; //ok
}
if ("age" in x) {
    x; // User | Admin
}
if ("role" in x) {
    x; // admin
}
//Funkcja sprawdza czy podany obiekt jest rzeczywiscie tym
//co powinien.
//Specjalny typ zwracany val is SingleValue oznacza, ze jesli
//funkcja zwróci true, to val ma typ SingleValue
function isSingleValue(val) {
    return ("value" in val && typeof val.value == "string");
}
if (isSingleValue(obj)) {
    //obj = SingleValue
}
else {
    //ManyValues
}
//Dobrym zastosowaniem straznika, są wszelkiej maści walidatory
function isFutureDate(x) { }
function isUser(x) { }
//Pamiętajmy, uzywając typu x is Y przyjmujemy na swoje barki
//odpowiedzialność za prawidłowe napisanie kodu funkcji
//asserts x is Y
//Rozszerzenie straznika powyzej ale poprzedzony slowem asserts
//Sluzy do opisywania asercji, czyli popularnych funkcji które rzucają wyjątek gdy nie jest spełniony.
function assertIsSingleValue(obj) {
    if (!isSingleValue(obj)) {
        throw new Error();
    }
}
//tutaj d ma typ any
assertIsSingleValue(d);
//tutaj d ma typ SingleValue
//Pobieranie typu wartości
//Pobieranie typu na podstawie wartości
//typeof
var defaultConfig = {
    port: 3000,
    host: 'localhost'
};
//type Config = { port: number, host: string }
var Config = typeof obj;
//string zawierający "object"
//Typ tablicy i tupli
var arr2 = [1, "a", 123];
// (string | number) []
var interval = [1, "m"];
function create(name) {
    // ...
}
var m = create("Moderator");
var n = create("Paweł");
console.log(m);
console.log(n);
