/* Klasy i interfejsy */
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _name;
//Klasa
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.sayHello = function () {
        console.log("My name is " + this.name);
    };
    return User;
}());
//Wywołanie
var x = new User();
//Deklaracja klasy jest równiez deklaracją nowego typu User
var x2 = new User();
//Konstruktor
//Klasy najczęściej posiadają zdefiniowany konstruktor
var User2 = /** @class */ (function () {
    function User2(name) {
        this.name = name;
    }
    return User2;
}());
//Typescript posiada lukier składniowy upraszczający powyszy kod, oba przyklady są równowane
var User3 = /** @class */ (function () {
    function User3(name) {
        this.name = name;
    }
    return User3;
}());
//Dzięki dodaniu słowa public w konstruktorze przed argumentem name
//parametr zostanie automatycznie przypisany do instancji klasy w momencje jej tworzenia
var x3 = new User3("Michał"); // user.name => 'Michał"
var User4 = /** @class */ (function () {
    function User4(name, age) {
        this.name = name;
        this.age = age;
    }
    return User4;
}());
var x4 = new User4("Adam", 21); // user.name => "Adam", user.age => 21;
//Pola bez inicjacji
//TS poinformuje nas o pomyłce, jeśli zapomnimy zainicjować jakiegoś pola
var User5 = /** @class */ (function () {
    function User5() {
    }
    return User5;
}());
//Aby uniknąć błedu, powinniśmy oznaczyć pole jako opcjonalne
var User6 = /** @class */ (function () {
    function User6() {
    }
    return User6;
}());
//Jeśli chcemy stworzyć pole które nie jest opcjonalne, ale tez nie
//jest od razu inicjalizowane, stosujemy kwalifikator  "!"
//Ale nie jest to rekomendowane, TS nie będzie w stanie wyłapać pomyłki za nas.
var User7 = /** @class */ (function () {
    function User7() {
    }
    return User7;
}());
//Dziedziczenie
//Klasy dziedziczą dzięki słowu kluczowemu extends
var Vehicle = /** @class */ (function () {
    function Vehicle(numberOfWheels) {
        this.numberOfWheels = numberOfWheels;
    }
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.ride = function () {
        console.log("I have " + this.numberOfWheels + " wheels!");
    };
    return Car;
}(Vehicle));
var c = new Vehicle(4);
//c.ride() // => I have 4 wheels! 
//Jeśli subklasa równiez definiuje konstruktor, niezbędne
//jest uzycie slowa kluczowego 'super'
var A = /** @class */ (function () {
    function A() {
        this.a = "test A";
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super.call(this) || this;
    }
    return C;
}(A));
//Modyfikatory public, private, protected
//Są podobne jak w innych językach, jednak TS wprowadza drobne róznice.
//warta uwaga jest kompatybilność typów przy uzywaniu pól prywatnych
//public
//Oznacza, ze ma się dowolny dostęp do danego pola.
//Jeśli nie oznaczymy zadnego modyfikatora, TS przyjmie defaultowo 'public'
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
//private
//Brak dostępu do danego pola z zewnątrz
//Klasy dziedziczące nie mają do niego dostępu
var User8 = /** @class */ (function () {
    function User8(name) {
        this.name = name;
    }
    User8.prototype.sayHello = function () {
        console.log("Jestem " + this.name);
    };
    return User8;
}());
var user8 = new User8("Michał");
//user8.sayHello(); // => Jestem Michał
//user8.name; // => error przy kompilacji
//protected
//To samo co private tylko klasy dziedziczące mają dostęp
var User9 = /** @class */ (function () {
    function User9(name) {
        this.name = name;
    }
    return User9;
}());
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Admin.prototype.sayHello = function () {
        console.log(this.name);
    };
    return Admin;
}(User9));
//const user9 = new Admin("Pablo");
//user9.sayHello(); // => "Pablo"
//readonly
//Pola i metody mogą być oznaczone dodatkowo jako readonly, tylko do odczytu
//to znaczy, ze nie mozliwe jest przypisanie ich poza konstruktorem
//Zły przykład, cannot assign to state because read-only property
var Component = /** @class */ (function () {
    function Component() {
        this.state = { userId: 123 };
    }
    Component.prototype.updateState = function () {
        this.state = {};
    };
    return Component;
}());
//Readonly moze występować obok modyfikatorow dostępu
var Component2 = /** @class */ (function () {
    function Component2() {
        this.state = { userId: 123 };
    }
    return Component2;
}());
//własności w parametrach konstruktora
var User10 = /** @class */ (function () {
    function User10(name) {
        this.name = name;
    }
    return User10;
}());
//mozemy zamienic na
var User11 = /** @class */ (function () {
    function User11(name) {
        this.name = name;
    }
    return User11;
}());
//Analogicznie mozna postepić z innymi modyfikatorami
var User12 = /** @class */ (function () {
    function User12(name) {
        this.name = name;
    }
    return User12;
}());
//Klasa Abstrakcyjna
//Są to klasy których nie da sie instancjonować i słuza wyłącznie do dziedziczenia po nich.
//Klasy te deklarujemy tylko podajac typ i oznacza sie je rowniez slowem "abstract"
var Message = /** @class */ (function () {
    function Message(text) {
        this.text = text;
    }
    ;
    Message.prototype.log = function () {
        console.log(this.text);
    };
    return Message;
}());
var Phone = /** @class */ (function (_super) {
    __extends(Phone, _super);
    function Phone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Phone.prototype.sendSms = function () {
        console.log('xD');
    };
    return Phone;
}(Message));
;
var tel = new Phone('Hello moto');
//Teraz mozna uzywać tego typu
var invoice = {
    amount: 123,
    submittedAt: new Date()
};
//Kompatybilność typów
function getInvoiceSummary(invoice) {
    return ("Twoja faktura na kwote " + invoice.amount +
        ("zosta\u0142a wys\u0142ana " + invoice.submittedAt));
}
getInvoiceSummary(invoice); //all good
getInvoiceSummary({
    amount: 42,
    submittedAt: new Date()
}); // all good
getInvoiceSummary({
    amount: 42,
    submittedAt: new Date(),
    blabla: 123
}); //err
var moreThanInvoice = {
    amount: 42,
    submittedAt: new Date(),
    blabla: 123
};
getInvoiceSummary(moreThanInvoice); // all good!
var ex = {
    cannotUpdateMe: "abc"
};
ex.optionalProperty = 123; // OK => 123
ex.cannotUpdateMe = "a"; //error
//Mozliwe jest stworzenie tablicy tylko do odczytu
//Wszystkie metody, modifikowanie jest niedozwolone w tego typu tablicy
var arr = [1, 2, 3];
arr[0] = 42; //err
arr.push(123); //err
arr.unshift(); //err
var arr2 = [1, 2, 3];
arr2[0] = 42; //ok
arr2.push(123); //ok
arr2.unshift(); //ok
var ArrayQueue = /** @class */ (function () {
    function ArrayQueue() {
        this.array = [];
    }
    ArrayQueue.prototype.push = function (val) {
        this.array.push(val);
    };
    ArrayQueue.prototype.pop = function () {
        return this.array.pop();
    };
    return ArrayQueue;
}());
var arrQue = new ArrayQueue();
arrQue.push('Apple');
arrQue.push('Pineapple');
arrQue.pop();
arrQue; // ({array}) => "Apple" 
//Klasy interfejsów mogą implementować wiele interfejsów:
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
//Mogą tez jednoczesnie implementować interfejsy i rozszerzac inne klasy
var OtherClass = /** @class */ (function () {
    function OtherClass() {
    }
    return OtherClass;
}());
var MyClass2 = /** @class */ (function (_super) {
    __extends(MyClass2, _super);
    function MyClass2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyClass2;
}(OtherClass));
//Bardzo często interfejsy opisują konkretne cechy obiektów a nie ich caly kształt.
//Typ statyczny i typ instancji w klasach
var User13 = /** @class */ (function () {
    function User13(id) {
        this.id = id;
    }
    User13.compare = function (user1, user2) {
        return user1.id === user2.id;
    };
    return User13;
}());
var userA = new User13("abc");
var userB = new User13("123");
var userC = new User13("abc");
User13.compare(userA, userB); //false
User13.compare(userA, userC); //true
var User14 = /** @class */ (function () {
    function class_1(id) {
        this.id = id;
    }
    class_1.compare = function (a, b) {
        return a.id === b.id;
    };
    return class_1;
}());
var user14a = new User14("D");
var user14b = new User14("D");
var user14c = new User14("E");
User14.compare(user14a, user14b); //true
User14.compare(user14c, user14b); //false
//Pola prywatne ES
//Pole prywatne dodajemy w klasach z uzyciem znaczka #
var Person = /** @class */ (function () {
    function Person(name) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
    }
    Person.prototype.greet = function () {
        console.log("Hello, my name is " + __classPrivateFieldGet(this, _name));
    };
    return Person;
}());
_name = new WeakMap();
var person = new Person('John');
//person.greet(); // => "Hello, my name is John"
console.log(person);
