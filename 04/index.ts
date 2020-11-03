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
    const interval1: [boolean, string, number, object] = [true, "day", 123, {name: 'Pabel', age: 21}]; //OK
    const interval2: [string, number] = []; //error
    
    //Nie jest moliwe przypisanie niewłaściwego typu do indeksu
    const interval3: [number, string] = [3, "Testing"];
    const num = interval3[0] // number => 3
    const unit = interval3[1] // string => "Testing"
    const somethingElse = interval3[2] // error => niepoprawny indeks

    interval3[0] = "day" //err => niepoprawny typ
    interval3[0] = 5 //ok => podmień 3 na 5

    //tuple posiadają etykiety elementów
    const interval4: [value: number, unit: string] = [3, "months"];

// - enum - enumeracja (iteracja po obiektach) w celu znalezienia nazwanych wartości
    enum Suit {
        Spades,
        Hearts,
        Diamonds,
        Clubs
    }

    const cards: Suit = Suit.Hearts; // => 1

    //Mozliwe jest stworzenie enumow o wartosciach ciagów znaków z
    enum UserRole {
        Admin = "admin",
        Manager = "manager",
        User = "user"
    }

    const role : UserRole = UserRole.Admin; // => "admin"

// - void - typ oznaczający "brak wartości", uywany do oznaczania funkcji które nic nie zwracają
    function fn1(): void {} //ok
    function fn1(): void {return} //ok
    function fn2(): void {return undefined}; //ok

// - any - typ który przyjmuje wartości dowolone, odradzane korzystanie.
// - Object - opisuje własności i metody, które są wspólne dla wszystkich obiektów.
//   Uzywany głównie do tego, by dziedziczyły po nim inne typy.
// - never - opisuje wartość, która nigdy nie wystąpi (wut?), nigdy nie zwraca wartości.
    function fn3(): never {
        throw new Error("Ta funkcja nigdy nie zwraca!");
    }
    //fn3() => err, ta funkcja nigdy nie zwraca warto

    //Często uzywa się do oznaczania sytuacju, które nie powinny się zdarzyć
        function assertUnreachable(x: string): never{
            throw new Error();
        }

        function getValue(name: string): number {
            switch(name){
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

        function assertUnreachable2(x: never): never{
            throw new Error();
        }

        function getValue2(name: Name): number {
            switch(name){
                case "low":
                    return 0;
                case "medium":
                    return 1;
                case "high":
                    return 2;
            }
        }

        type Name = "low" | "medium" | "high";
    
        //getValue2("dasd") //err, not assigned
        //getValue2("medium") // => 1


    // - unknown - reprezentuje typ, który jest nieznany, dodany by ukrócić naduywanie any.
    //   mona z niego odczytać i uzywać w dowolnym kontekscie

        let x: unknown;
        x = 123;
        x = "asv";
        x = {};
        //itd

        //nie uda się uyć zmiennej nieznanego typu w kontekście gdzie oczekiwany jest inny typ
        let a: number = x; //err.

    // type - definiowanie własnych typów.
    type User = { 
        name: string;
    };

    const user: User = { 
        name: "Michał",
    }

    function doSth(u: User){} //ok§