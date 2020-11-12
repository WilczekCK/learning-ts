//Typy zaawansowane
    //Unique symbol
        //Wywolanie Symbol() zwraca wartość o typie symbol
        //która zachowuje się jak prymityw, ale jest niemutowalna i unikalna

        let x = Symbol("a");
        let y = Symbol("b");

        x === y; //false
        x = y // ok
        y = x // ok

        const x2 = Symbol.for("a");
        const y2 = Symbol.for("a");

        x2 === y2; //Error!

        //Symbole przypisywane do stałych nigdy nie mogą ulec zmianie

        const x3: unique symbol = Symbol.for("a");
        const y3: unique symbol = Symbol.for("a");

        typeof x3 // typeof x3
        typeof y3 // typeof y3

        //Niemozliwe więc jest pomylenie ze sobą dwóch
        //unique symbol, przypisanie, porównanie jest niemozliwe

    //typ i interfejs
        //Czym sie róznia? Niewiele.
        //Interfejsy mozna rozszerzac i implementować w klasach
        //Interfejsy były pierwsze

        interface Callable{
            (): void;
        }

        interface Entity extends Callable {
            id: string
        }

        class User implements Entity {
            //..
        }

        //Poźniej dodano słowo kluczowe type
        //skaraca troche zapis i ułatwia definiowanie typów
        //mozna je rozszerzac i implementować w klasach jak intefrejsy

        type Callable2 = {
            (): void;
        }

        interface Entity2 extends Callable2{
            id: string;
        }

        class User2 implements Callable2{
            //...
        }

        //Zasadniczo ta sama rola
        //Czym się róznia?

    //Łączenie deklaracji
        //Dozwolone jest wielokrotne definiowane interfejsu o tej samej nazwie
        interface Xyz {
            a: number;
        }

        interface Xyz {
            b: string
        }

        const res: Xyz = {
            a: 1,
            b: "foo",
        }

    //Aliasy typów
        //Type zezwala na tworzenie aliasów typów.
        //Typy są strukturalne, a nie nominalne i to pozwala na 
        //nieoczekiwane operacje jak ta ponizej
        type UserID = string;
        type ProductID = string;

        function getProductPrice(id: ProductID){}

        const userId: UserID = "bbb";

        getProductPrice(userId);

    //Część wspólna i suma typów (unia)
        //Suma (union) to taki typ, który zawiera wartości wspólne dla A i B ( A | B )
        //Wspólna (intersection) to taki typ, który zawiera wszystkie wartości z A i B (A & B)

        type A = {
            a: string, 
            b: number;
        }

        type B = {
            b: number;
            c: string;
        }

        type Union = A | B; // () => b
        type Intersection = A & B; // () => a, b, c

        declare const intersection: Intersection;
        declare const union: Union;

        intersection.a; //ok
        intersection.b; //ok
        intersection.c; //ok

        union.b; //ok
        union.a; // ERROR
        union.c // ERR

        //Część wspólna ( & ) I
            
            interface ObjectConstructor{
                assign<T,U>(target:T, source: U): T & U;
            }

            const result = Object.assign(
                {age: 42},
                {name: "Ania"}
            );

            result.age; //ok
            result.name; //ok

            //Cześć wspólną typów mona zdefiniować te uzywając intefrejsów
            //oraz słowa extends, efekt będzie praktycznie taki sam

            interface A2 {}
            interface B2 {}
            interface C extends A, B {}

        //Unia ( | ) LUB
            //Zdefiniować mozna tylko w deklaracji typu

            //Funkcja ponizej oczekuje liczby lub ciągu znaków
            function parseInt(x: string | number){}

            //Najlepiej zapisać w kilku linijkach, ale mozna tez tak:
            type Union2 = A | B | C | D;
            //Bardzo przydatne okazują się unie z typem undefined i null

    //Index signature
        //JS zapisuje objekty jako mapy, czyli trzyma 'klucz' i 'wartosc'
        //TS przewiduje takie zastosowanie i pozwala na dokładne zdefiniowane
        //typów. Słuy temu specjalna notacja zwaną sygnaturą indeksu

        type IndexType1 = {
            [key: string]: number;
        };

        interface IndexType2 {
            [key: string]: number;
        }

        //Typy generyczne
        type Dict<T> = {
            [key: string]: T;
        }

        const userIdToUser: Dict<User> = {};

    //Literal type
        //Pozwala on na zapisanie, ze dana zmienna moze przyjmować tylko
        //bardzo konkretne wartości, przykładowo oczekiwanie tylko liczb 0 i 1

        type Bit = 0 | 1;

        let bit: Bit;
        bit = 0; //ok
        bit = 2; //BŁAD */

        //podobnie ze stringami

        type RequestCredentials2 = "omit" | "same-origin" | "include";

        let cred: RequestCredentials2;
        cred = "omit"; //ok
        cred = "inclade"; //err

        //Literałów mozna uzywać takze w sygnaturze indeksu
        type Headers2 = "Accept" | "Authorization";
        
        type RequestConfig = {
            [header in Headers2]: string;
        }

        const requestConfig: RequestConfig = {
            Accept: "...",
            Authorization: "..."
        }

    //As const - niemutowalne typy danych
        //TS przy literałach stringów, przypisuje polom typ string zamiast literału.

        const request = {
            credentials: "omit",
        }

        //Typ to string, a nie omit, to problematycznie.
        //W tym wypadu mozemy skorzystać z rzutowania.

        const request2 = {
            credentials: "omit" as "omit"
            //dawniej "omit" as const
        }

        //Mozna tez uzywac tego zapisu w stosunku do obiektów i tablic
        const request3 = {
            credentials: "omit",
        } as const;

        //Takie uzycie sprawi, ze typem request3 bedzie:
        type R = {
            readonly credentials: "omit";
        }


        //Tablice as const zamieniane są na tuple tylko do odczytu
        const arr = [1, "h"] as const;
        //readonly [1, "h"]

    //Type guards
        //typeof, instanceof
            //Pozwalają one na sprawdzenie czy dana wartość posiada jakiś określony
            //typ w trakcie działania aplikacji. TS korzysta z wyników uzycia tych
            //operatorów aby przewidywac, wnioskować i zawęzać typów

            function parseInt(arg: string | number) {
                if(typeof arg === 'string') {
                    // 1
                }else{
                    // 2
                }
            }

            //Gdyby nasza unia składała się z większej liczby róznych typów
            //to w bloku 2 arg miałby typ będący ich częscią wspólną

            function parseInt2(arg: string | number | object){
                if (typeof arg === 'string'){
                    //1
                } else {
                    //2 number | object
                }
            }

            //Gdy juz wyeliminujemy wszystkie mozliwosc, TS przypisze
            //zmiennej typ never, gdyz taka sytuacja nie powinna sie wydarzyć

            function parseInt3(arg: string | number) {
                if (typeof arg === "string") {
                  // 1
                } else if (typeof arg === "number") {
                  // 2
                } else {
                  // 3 never
                }
            }

            //analogicznie, TS potrafi wywnioskować prawidłowy typ dla operatora instanceof

            class Character {
                name!: string;
            }

            class User3 extends Character {
                age!: number;
            }

            class Enemy extends Character {
                hp!: number;
            }

            declare let ch: Character;

            if (ch instanceof User3){
                ch.age; //ok
                ch.name; //ok
            } else if (ch instanceof Enemy){
                ch.hp; //ok
                ch.name; //ok
            }else{
                ch.name; //ok
            }

        //Operator in
            //Sprawdza czy własność o podanej nazwie istnieje w obiekcie

            type Character2 = { 
                name: string
            }

            type User4 = { 
                name: string,
                age: number
            }

            type Admin3 = { 
                name: string,
                age: number,
                role: string
            }

            declare let x4: Character2 | User4 | Admin3;

            if("age" in x){
                x; // User | Admin
            }

            if("role" in x){
                x; // admin
            }

        //x is Y
            //Mozliwe jest tworzenie wlasnych strazników typów
            //runtime check

            type SingleValue = { value: string };
            type ManyValues = { options: Array<SingleValue>};

            //Funkcja sprawdza czy podany obiekt jest rzeczywiscie tym
            //co powinien.

            //Specjalny typ zwracany val is SingleValue oznacza, ze jesli
            //funkcja zwróci true, to val ma typ SingleValue

            function isSingleValue(val: SingleValue | ManyValues): val is SingleValue {
                return (
                    "value" in val && typeof val.value == "string"
                )
            }

            declare const obj: any;
            if(isSingleValue(obj)) {
                //obj = SingleValue
            }else{
                //ManyValues
            }

            //Dobrym zastosowaniem straznika, są wszelkiej maści walidatory
            function isFutureDate(x: any): x is Date {}
            function isUser(x: any): x is User {}

            //Pamiętajmy, uzywając typu x is Y przyjmujemy na swoje barki
            //odpowiedzialność za prawidłowe napisanie kodu funkcji

        //asserts x is Y
            //Rozszerzenie straznika powyzej ale poprzedzony slowem asserts
            //Sluzy do opisywania asercji, czyli popularnych funkcji które rzucają wyjątek gdy nie jest spełniony.

            function assertIsSingleValue(obj: any): asserts obj is SingleValue {
                if(!isSingleValue(obj)) {
                    throw new Error();
                }
            }

            declare const d: any;
            //tutaj d ma typ any

            assertIsSingleValue(d);
            //tutaj d ma typ SingleValue

        //Pobieranie typu wartości
            //Pobieranie typu na podstawie wartości

            //typeof
                const defaultConfig = {
                    port: 3000,
                    host: 'localhost'
                }

                type Config = typeof defaultConfig;

                type Config = typeof obj;
                //type Config = { port: number, host: string }

                const Config = typeof obj;
                //string zawierający "object"

            //Typ tablicy i tupli

                const arr2 = [1, "a", 123];
                type AR = typeof arr2;
                // (string | number) []
                
                const interval = [1, "m"] as const;
                type T = typeof interval;
                // readonly [1, "m"]

                //Pobieranie typ elementów w tablicach
                type elenentA = typeof arr2[number];
                //string | number

                type elenentT = typeof interval[number];
                //1 | "m";

                //Podobnie z obiektami

                type obj = {
                    a: number;
                    b: string;
                }

                type element0 = obj[keyof obj];
                //string | number

        //Przeładowanie funkcji literałami
            //funkcja-fabryka, która produkuje obiekty róznych typów
            //w zaleznosci od przekazanej nazwy.

            function create(name: 'User'): User;
            function create(name: 'Admin'): Admin;
            function create(name: 'Moderator'): Moderator;
            function create(name: string): Character {
                // ...
            }
            
            const m = create("Moderator"); //m ma typ moderator
            const n = create("Paweł"); //n ma typ Character

        //Typy rekurencyjne
            //TS pozwala na tworzenie ich, czyli takich które w swojej 
            //definicji odwołują się do samych siebie.
            //Przydają się do opisywania struktury drzewiastej albo relacji pomiedzy ludzmi.

            type User5 = {
                name: string;
                friends: Array <User>;
            }

            type Json = 
                | null
                | string
                | number
                | boolean
                | Json[]
                | { [name: string]: Json }

            //Sprawa pogarsza się, gdy w gre wchodzą generyki.
            //Niemozliwe jest stworzenie typu generycznego który zalezy od samego siebie
            type Bar<A> = { x: A, y: A };
            type Foo = Bar<Foo>;
            //ERR

        //Algebraiczne typy danych
            //Typy stworzone przez połączenie wielu typów.
            //Dzielimy je na typy iloczynu i typy sumy.
            //Czyli, są to typy z połączenia kilku typów.
            //Przykładowo, typ opisujący okres czasu określymy jako połączenie liczby typu i jednostki.
            //(Czas jest liczbą i jednostką)
            //Natomiast postaci w grze jako alternatywy graczy i wrogów
            //(Postać jest graczem lub wrogiem).

            type Unit = "h" | "m" | "s";
            type Time = [number, Unit];

            type Character3 = Player | Enemy2;

            //Ale jak nasza aplikacja ma odrózniac od siebie Player i Enemy gdy dostanie typ character??

            //Otagowanie unia i pattern matching

            type Player = { 
                type: "player",
                name: string;
            }

            type Enemy2 = {
                type: "enemy",
                hp: number;
            }


            declare const character: Character;

            if(character.type === "player"){
                // character ma tu typ Player
            }else{
                //character ma tu typ Enemy
            }

            //Spójrzmh na inny przykład z zycia wziety.

            type SuccessResponse = {
                success: true;
                data: string;
            }

            type ErrorResponse = {
                success: false;
                error: Error;
            }

            type Response2 = SuccessResponse | ErrorResponse;

            declare const res2: Response2;

            if(res2.success){
                console.log(res2.data);
            }else{
                console.log(res2.error);
            }

        //Wyłuskiwanie typu
            //Sprawdzanie typu jednego konkretnego pola z obiektu

            type UserID = User["id"];

            //lookup type
            function findUser(id: User["id"]): User {
                //...;
            }
            //Zapamietaj!