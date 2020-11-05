/* Klasy i interfejsy */

    //Klasa
        class User{
            name: string;
            
            sayHello(){
                console.log(`My name is ${this.name}`)
            }
        }
    
        //Wywołanie
        const x = new User();

        //Deklaracja klasy jest równiez deklaracją nowego typu User
        const x2: User = new User();

    //Konstruktor
        //Klasy najczęściej posiadają zdefiniowany konstruktor
        class User2{
            name: string;

            constructor(name: string){
                this.name = name;
            }
        }

        //Typescript posiada lukier składniowy upraszczający powyszy kod, oba przyklady są równowane
        class User3 {
            constructor(public name: string) {}
        }

        //Dzięki dodaniu słowa public w konstruktorze przed argumentem name
        //parametr zostanie automatycznie przypisany do instancji klasy w momencje jej tworzenia

        const x3 = new User3("Michał"); // user.name => 'Michał"

        class User4 {
            constructor(public name: string, public age: number) {}
        }

        const x4 = new User4("Adam", 21); // user.name => "Adam", user.age => 21;
    
    //Pola bez inicjacji
        //TS poinformuje nas o pomyłce, jeśli zapomnimy zainicjować jakiegoś pola
        class User5 {
            name: string;
            // Property 'name' has no initializer and is not
            // definitely assigned in the constructor.(2564)
        }

        //Aby uniknąć błedu, powinniśmy oznaczyć pole jako opcjonalne

        class User6 {
            name?: string;
        }

        //Jeśli chcemy stworzyć pole które nie jest opcjonalne, ale tez nie
        //jest od razu inicjalizowane, stosujemy kwalifikator  "!"
        //Ale nie jest to rekomendowane, TS nie będzie w stanie wyłapać pomyłki za nas.

        class User7 {
            name!: string;
        }

    //Dziedziczenie
        //Klasy dziedziczą dzięki słowu kluczowemu extends

        class Vehicle{
            constructor(public numberOfWheels: number) {}
        }

        class Car extends Vehicle{
            ride() {
                console.log(`I have ${this.numberOfWheels} wheels!`)
            }
        }

        const c = new Vehicle(4);
        //c.ride() // => I have 4 wheels! 

        //Jeśli subklasa równiez definiuje konstruktor, niezbędne
        //jest uzycie slowa kluczowego 'super'

        class A{
            a = "test A"
        }

        class B extends A {

        }

        class C extends A {
            constructor(){
                super();
            }
        }

    //Modyfikatory public, private, protected
        //Są podobne jak w innych językach, jednak TS wprowadza drobne róznice.
        //warta uwaga jest kompatybilność typów przy uzywaniu pól prywatnych

        //public
            //Oznacza, ze ma się dowolny dostęp do danego pola.
            //Jeśli nie oznaczymy zadnego modyfikatora, TS przyjmie defaultowo 'public'

            class D{
                public x: string;
                //to samo co
                //x: string;
            }

        //private
            //Brak dostępu do danego pola z zewnątrz
            //Klasy dziedziczące nie mają do niego dostępu

            class User8 {
                private name: string;

                constructor(name: string){
                    this.name = name;
                }

                sayHello() {
                    console.log(`Jestem ${this.name}`)
                }
            }

            const user8 = new User8("Michał");
            //user8.sayHello(); // => Jestem Michał
            //user8.name; // => error przy kompilacji

        //protected
            //To samo co private tylko klasy dziedziczące mają dostęp

            class User9 {
                protected name: string;

                constructor(name: string){
                    this.name = name;
                }
            }

            class Admin extends User9 {
                sayHello() {
                    console.log(this.name)
                }
            }

            //const user9 = new Admin("Pablo");
            //user9.sayHello(); // => "Pablo"

        //readonly
            //Pola i metody mogą być oznaczone dodatkowo jako readonly, tylko do odczytu
            //to znaczy, ze nie mozliwe jest przypisanie ich poza konstruktorem

            //Zły przykład, cannot assign to state because read-only property
            class Component {
                readonly state = { userId: 123 }

                updateState(){
                    this.state = {};
                }
            }

            //Readonly moze występować obok modyfikatorow dostępu
            class Component2 {
                private readonly state = { userId: 123 };
            }

        //własności w parametrach konstruktora
            class User10 {
                name: string;

                constructor(name: string){
                    this.name = name
                }
            }

            //mozemy zamienic na

            class User11 {
                constructor(public name: string) {}
            }

            //Analogicznie mozna postepić z innymi modyfikatorami

            class User12{
                constructor(public readonly name: string) {}
            }
    
    //Klasa Abstrakcyjna
        //Są to klasy których nie da sie instancjonować i słuza wyłącznie do dziedziczenia po nich.
        //Klasy te deklarujemy tylko podajac typ i oznacza sie je rowniez slowem "abstract"
        abstract class Message {
            constructor(private text: string) {
            };
            abstract send(): void;

            log(){
                console.log(this.text);
            }
        }

        class Phone extends Message{
            sendSms(): void {
                console.log('xD');
            }
        };

        const tel = new Phone('Hello moto');
        //tel.sendSms(); // => "xD"
        //tel.log();  // => "Hello moto"
    
    //Interfejs
        //Podstawowy budulec TSa, opisuje kształt czegoś i podlega zasadon typowania strukturalnego.
        //Interfejs nazywa i definiuje typ bez zadnej implementacji

        interface Invoice{
            amount: number;
            submittedAt: Date;
        }

        //Teraz mozna uzywać tego typu

        const invoice: Invoice = { 
            amount: 123,
            submittedAt: new Date(),
        }

        //Kompatybilność typów

            function getInvoiceSummary(invoice: Invoice){
                return (
                    `Twoja faktura na kwote ${invoice.amount}` +
                    `została wysłana ${invoice.submittedAt}`
                )
            }

            getInvoiceSummary(invoice); //all good
            getInvoiceSummary({
                amount:42,
                submittedAt: new Date(),
            }) // all good
            getInvoiceSummary({
                amount:42,
                submittedAt: new Date(),
                blabla: 123
            }) //err

            const moreThanInvoice = {
                amount:42,
                submittedAt: new Date(),
                blabla:123
            }

            getInvoiceSummary(moreThanInvoice) // all good!

            //Modyfikatory w interfejsach
                // Własność jest opcjonalna lub tylko do odczytu (? i readonly) 

                interface Example {
                    optionalProperty?: number;
                    readonly cannotUpdateMe:string;
                }

                const ex: Example = { 
                    cannotUpdateMe: "abc"
                }

                ex.optionalProperty = 123 // OK => 123
                ex.cannotUpdateMe = "a" //error

                //Mozliwe jest stworzenie tablicy tylko do odczytu
                //Wszystkie metody, modifikowanie jest niedozwolone w tego typu tablicy

                const arr: ReadonlyArray<number> = [1,2,3];
                arr[0] = 42; //err
                arr.push(123) //err
                arr.unshift() //err

                const arr2: Array<number> = [1,2,3];
                arr2[0] = 42; //ok
                arr2.push(123) //ok
                arr2.unshift() //ok
            
            //Wywoływalne i konstruowalne interfejsy
                //Interfejsy mogą zostać wykorzystane do opisania funkcji

                //Callable to typ, który opisuje funkcje.
                interface Callable {
                    render(name: string): boolean;
                    inject: Array<string>;
                }

                //Mozliwe jest równiez opisanie typu, który jest konstruowalny.
                interface Constructor {
                    new (): number;
                }

                //Funkcje w JS mogą być konstruktorami i mogą zwracać co innego
                interface WeirdFunction {
                    new (): number;
                    (): string;
                }

                //TS musi dawać mozliwość przedstawiania konstrukcji które juz istnieją w JS

                //Czy to poprawny kod? Raczej nie.
               /* function Date(...args){
                    if(this instanceof Date){
                        initializeDate(this, ...args);
                    }

                    return toDateString(clockGetTime());
                } */

            //Implementowanie interfejsów w klasach
                //Mozna implementować interfejsy w klasach
                interface Queue {
                    push(val: string): void;
                    pop(): string;
                }

                class ArrayQueue implements Queue {
                    private array: Array<string> = [];

                    push(val: string){
                        this.array.push(val);
                    }

                    pop(){
                        return this.array.pop();
                    }
                }

                const arrQue = new ArrayQueue();
                arrQue.push('Apple');
                arrQue.push('Pineapple');
                arrQue.pop(); 
                arrQue; // ({array}) => "Apple" 

                //Klasy interfejsów mogą implementować wiele interfejsów:
                class MyClass implements A, B, C {
                    //...
                }

                //Mogą tez jednoczesnie implementować interfejsy i rozszerzac inne klasy
                class OtherClass{}
                class MyClass2 extends OtherClass implements A, B, C {
                    //...
                }

                //Podobnie, interfejsy mogą rozszerzać inne interfejsy

                interface Drawable {
                    draw(): void;
                }

                interface Collidable {
                    readonly x: number;
                    readonly y: number;
                    collidesWith(obj: Collidable): boolean;
                }

                interface Character extends Drawable, Collidable {
                    readonly health: number;
                }

                //Bardzo często interfejsy opisują konkretne cechy obiektów a nie ich caly kształt.

            //Typ statyczny i typ instancji w klasach

            class User13 {
                constructor(public id: string) {}

                static compare(user1: User13, user2: User13): boolean{
                    return user1.id === user2.id;
                }
            }

            const userA = new User13("abc")
            const userB = new User13("123")
            const userC = new User13("abc")

            User13.compare(userA, userB) //false
            User13.compare(userA, userC) //true

            //Do opisania typu statycznego i typu instacji mozna uzyc interfejsow

            interface UserInstance {
                id: string;
            }

            interface UserConstructor {
                new (id: string): UserInstance;
                compare(a: UserInstance, b: UserInstance): boolean;
            }

            const User14: UserConstructor = class implements UserInstance {
                constructor(public id: string) {}

                static compare(
                    a: UserInstance,
                    b: UserInstance
                ): boolean {
                    return a.id === b.id
                }
            };

            const user14a = new User14("D")
            const user14b = new User14("D")
            const user14c = new User14("E")

            User14.compare(user14a, user14b) //true
            User14.compare(user14c, user14b) //false

        //Pola prywatne ES
            //Pole prywatne dodajemy w klasach z uzyciem znaczka #
            //Pola # są unikalne w obrębie swojej klasy, nie zostaną nadpisane w trakcie dzieczenia
            //Pola # zawsze deklarujemy przed uzyciem
            class Person{
                #name;

                constructor(name){
                    this.#name = name
                }

                greet() {
                    console.log(`Hello, my name is ${this.#name}`)
                }
            }

            const person = new Person('John');
            //person.greet(); // => "Hello, my name is John"

            //Pola # są unikalne w obrębie swojej klasy, nie zostaną nadpisane w trakcie dzieczenia

            //Przykład bez #
            class Character_without_hashtag {
                foo = 10;
                characterMethod(){
                    return this.foo;
                }
            }

            class User15 extends Character_without_hashtag {
                foo = 20;

                userMethod() {
                    return this.foo;
                }
            }

            const user15 = new User15();
            user15.charcterMethod(); // => 20
            user15.userMethod(); // => 20

            //Przykład z #
            class Character_with_hashtag {
                #foo = 10;
                characterMethod(){
                    return this.#foo;
                }
            }

            class User16 extends Character_with_hashtag {
                #foo = 20;

                userMethod() {
                    return this.#foo;
                }
            }

            const user16 = new User16();
            user16.charcterMethod(); // => 10
            user16.userMethod(); // => 20