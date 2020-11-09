/* Kompatybilność typów */
//TS korzysta z typowania strukturalnego.
//Jeśli typy mają tą samą strukture (pola i metody) to są kompatybilne.
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
var a = { x: 123 };
var b = a;
//Mozemy tez przypisać to odwrotnie (b do a)
//Klasy z polami publicznymi
//Klasa z polami publicznymi jestt kompatybilna z obiektem z tymi samymi polami publicznymi!
var Player = /** @class */ (function () {
    function Player() {
    }
    return Player;
}());
var instance = new Player();
var pType = instance;
var notAnInstance = { name: "Paul" };
notAnInstance; // => Object{ name: "Paul" };
//Podczas sprawdzania kompatybilności instacji klasy z innym typem
//ignorowany jest typ statyczny klasy - konstuktor i pola statyczne nie naleą do instancji!
var Player2 = /** @class */ (function () {
    function Player2(name) {
    }
    Player2.a = 1;
    return Player2;
}());
var Hero = /** @class */ (function () {
    function Hero(args) {
    }
    Hero.b = "a";
    return Hero;
}());
var p = new Hero([1, 2, 3]); // => { b: "a" }
var h = new Player2("aaa"); // => {a: 1}
//Klasy z polami prywatnymi i polami protected
var Player = /** @class */ (function () {
    function Player() {
    }
    return Player;
}());
var Hero = /** @class */ (function () {
    function Hero() {
    }
    return Hero;
}());
var p = new Hero();
var h = new Player();
//Kod powyzej jest niepoprawny i niekompatybilny pomimo ze mają tę samą strukturę!
//TS zakłada, ze prywatne pola w róznych klasach nie są zgodne.
//Poprawmy ponizszy kod, uzywająć dziedziczenia (2 klasy dziedziczą po głównej klasie )
var Entity = /** @class */ (function () {
    function Entity() {
    }
    return Entity;
}());
var Player2 = /** @class */ (function (_super) {
    __extends(Player2, _super);
    function Player2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Player2;
}(Entity));
var Hero2 = /** @class */ (function (_super) {
    __extends(Hero2, _super);
    function Hero2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Hero2;
}(Entity));
var p2 = new Hero2();
var h2 = new Player();
var character = { name: "Michał" };
var user = { name: "Jan", age: 23 };
character = user; //ok
user = character; //err
//Przypisanie user do character jest mozliwe, ale nie odwrotnie
//TS uznaje za poprawne przypisanie wtedy, gdy przypisywana zmienna po prawej
//ma co najmniej te pola co zmienna po lewej
//ZASADA
//Mozliwe jest przypisanie do zmiennej o typie X innej zmiennej typu Y
//wtedy i tylko wtedy, gdy typ Y rozszerza typ X
//Podobnie to działa w przypadku wywoływania funkcji
function processCharacter(character) { }
function processUser(user) { }
processCharacter(character); //ok
processCharacter(user); //ok
processUser(character); //bład
processUser(user); //ok
//ZASADA
//Nadmiarowe własności obiektu przekazanego jako argument
//do funkcji są ignorowane
//Przypisywanie literałów obiektów
var u = { name: "Jan", age: 23 };
var c1 = u;
var c2 = { name: "Jan", age: 23 };
//TS pragnie nam pomóc i zakłada, e w momencie
//przypisywanie chcemy uzyc tylko i wyłącznie
//znanych własności opisanych typem Character
//Kompatybilność funkcji wariadycznych
//wszystkie funkcje w js są wariadyczne
//czyli, do kazdej funkcji mozna przekazać
//dowolną liczbę argumentów
function add_js(a, b) {
    return a + b;
}
add_js(1, 2, 3); // gitgud w js
function add_ts(a, b) {
    return a + b;
}
add_ts(1, 2, 3); // error!
//ale
var fn1 = function (a) { return a; };
var fn2 = function (a, b) { return a + b; };
fn2 = fn1; //ok
fn1 = fn2; //err
//Kompatybilność argumentów funkcji
var processCharacter2 = function (char) {
    console.log(char.name);
};
var processUser2 = function (user) {
    console.log(user.age, user.name);
};
processCharacter2 = processUser2; //obiekt character nie posiada pola age, error!
processUser2 = processCharacter2; //ok
//Kompatybilność metod w obiektacha
//Wolne funkcje mają inne zasady kompatybilności
//niz funkcje zdefiniowanych w obiektach
var characterProcessor = {
    process: function (character) { }
};
var userProcessor = {
    process: function (user) { }
};
characterProcessor = userProcessor; //ok
userProcessor = characterProcessor; //ok
//ale co ciekawe!
var characterProcessor2 = {
    process: function (character) { }
};
var userProcessor2 = {
    process: function (user) { }
};
characterProcessor2 = userProcessor2; //błąd, kompatybilnosc wolnych funkcji?
userProcessor2 = characterProcessor2; //OK
//Kompatybilność typu zwracanego przez funkcje
var makeCharacter = function () {
    return { name: "Michał" };
};
var makeUser = function () {
    return { name: "Michał", age: 21 };
};
makeCharacter = makeUser; //ok
makeUser = makeCharacter; //err, missing age!
//Tylko przypisanie Fopt do Freq jest poprawne!
var fopt = function (a, b) { };
var freq = function (a, b) { };
fopt = freq; //błąd 
freq = fopt; //OK
var fone = function (a) { };
var fextra = function (a, b) { };
fone = fextra; //ok
fextra = fone; //ok
var fmany0 = function () { }; //ok
var fmany1 = function (a) { }; //ok
var fmany2 = function (a, b) { }; //ok
var fmany3 = function (a, b, c) { }; //ok
var x1 = {};
var y1 = {};
var z1 = {};
y1 = x1; //OK
y1 = z1; //BŁAD
var x2 = {};
var y2 = {};
var z2 = {};
y2 = x2; //Błąd
y2 = z2; //OK
//Biwariancja
//W miejsce typu x mozna uzyc zarowno typu pochodnego jak i nadrzednego 
var y3 = {};
var x3 = {};
var z3 = {};
y3 = x3; //ok
y3 = z3; //ok
//Inwariancja
//W miejsce typu x nie mozna uzyc typu pochodnego ani nadrzednego.
var x4 = {};
var y4 = {};
var z4 = {};
y4 = x4; //błąd!
y4 = z4; //błąd!
