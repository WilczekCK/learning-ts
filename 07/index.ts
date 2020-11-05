/* Typy generyczne */
//Określane mianem szablonów lub typów poliformicznych.
//Generyki to podstawowy budulec typów w naszych aplikacjach.
//Czyli typ który sparametryzowany względem typów.
const x: Array<string> = ["a", "b", "c"];
//Zapis Typ<inny typ> oznacza typ generyczny!

    //Funkcje Generyczne

        //JS
        const id = (x) => x;
        
        //TS
        const id2 = (x: any) => x;

        //Bardziej elegancki TS
        const id3 = <T>(x: T): T => x;
        //Składnia <T> przed wyrazeniem funkcji oznacza iz
        //funkcja jest generyczna, definiuje lokalny typ o nazwie T którego dalej mozemy uzywac
        //przykladowo, wywolujemy funkcje id:
        const result = id3<number>(1);

    //Inferencja w generykach
        //Zapisy powyzej są troche długie, jest mozliwosc skrócenia ich.

        //Mozna pominąć typ zwracany, typescript inferuje go na podstawie ciała funkcji
        //widzi ze zwracam x, wiec typem zwracanym jest typ argumentu x

        //Podobnie z generykiem <number>, TS wywnioskuje typ na podstawie przekazanego mu argumentu
        const id4 = <T>(x:T) => x;
        const result2 = id4(1);

    //Generyczne typy

        //Tworzenie wlasnych generycznych typów
        type Ref<T> = {
            current: T
        }

        const ref1: Ref<number> = { current: 123 }
        const ref2: Ref<string> = { current: "aaa" }
        //typ Ref opisuje obiekt zawierający pole current typu T
        //i uzywamy go z parametrami typu number i string

        function getValue<T>(ref: Ref<T>): T {
            return ref.current;
        }
        //Stworzona funkcja przyjmuje jako argument tylko obiekty kompatybilne z typem Ref<T>
        //i zwraca ich zawartość, czyli coś typu T.

        getValue(ref1) // => 123

    //Inne generyki
        //Generyczne mogą być równie klasy i Interfejsy

        //Interfejs tworzący coś nowego (new)
        //typ który musi skonsturować, zaley od parametru który przekazemy
        interface Constructable<T> {
            new (...args: any[]): T;
        }

        //Klasy generyczne działają podobnie do typów, funkcji i interfejsów
        //definiujemy typ i ozemy uzywać go wewnątrz klasy

        class Queue<T> {
            push(el: T){
                //...
            }

            pop(): T {
                //...
            }
        }

        const queue = new Queue<number>();
        queue.push(1)
        queue.push(2)
        queue.push(3)
        queue.pop() //3

    //Ograniczenia generyków
        //Tworzymy by funkcja przyjmowała jedynie tablice dowolnego typu
        //Jest to jeden ze sposobów
        function doSth<T>(arg: Array<T>){
            //...
        }
        const arr: Array<string> = ["a", "b", "c", "d", "e", "f"];
        const arr2: Ref<string> = { current: "Test"};

        doSth(arr) //ok
        doSth(arr2) //err

        //extends
            //Mozemy ograniczyć sam typ T uzywając słowa kluczowego extends
            //Tworzymy funkcje generyczną, która przyjmuje jako argument obiekty
            //które zawierają pole name będące stringiem.

            type ObjWithName = { name: string }

            //Ograniczamy T tylko do typów, które są kompatybilne z ObjWithName
            function printName<T extends ObjWithName>(arg: T){
                //...
            }

            printName({ name: "Kasia" }); // OK
            printName({ name: "Michał", age: 22 }); // OK
            printName({ age: 22 }); // err