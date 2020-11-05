/* Inferencja typów i const */
    //Czym jest inferencja?
        //Jest to mechanizm automatycznego wnioskowania typów
        //na podstawie dostępnych informacji - wartości i wywołań funkcji
        //TS potrafi wywnioskować typy stałych, zmiennych, tablic, obiektów,
        //całych wyrazen i typ zwracany z funkcji i czasem na podstawie kontekstu

    //Przykład: 
        let val = 123; //TS wie ze to number, bez twardego typowania

        function fn() {
            return 123; //TS wie, ze zwraca typ numer
        }

        //Lecz czasem trzeba mu pomóc
        function fn2(a,b){
            return a*b;
        }
        fn2(2,3) //6

        //W powyzszym wypadku musimy mu pomóc

        function fn3(a: number, b: number){
            return a * b;
        }

    //Typ wspólny:
        //Jakie typy zwróci kompilator?

        function fn4(a: string, b: number){
            return Math.random() > 0.5 ? a : b;
        } // => unia typów, moze byc jednym lub drugim: string | number

        const arr = [1, "a", null] // => unia typów: number, string, null

    //Inferencja czasem zawodzi
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
      
        class Background implements Drawable {
            // …
        }
      
        class Boulder implements Drawable, Collidable {
            // …
        }
      
        class Player implements Character {
            // …
        }
        
        const arr = [
            new Player(),
            new Boulder(),
            new Background()
        ] 
        //TS nie wie, ze to tablica obiektów typów "Drawable"
        //podaje zamiast tego unię typów: Array<Player | Boulder | Background>
        //Musimy mu pomóc

        const objects: Array<Drawable> = [
            new Player(),
            new Boulder(),
            new Background()
        ]


        //Czy to tablica, czy tupla?
        const interval = [1, 'm'];
        //TS powie, ze tablica.
        
        //Jesli chcemy to zmienic, musimy wpisac ją ręcznie
        const interval2: [number, string] = [1, 'm'];

    //Inferencja kontekstowa
        type Cb = (name: string, age: number) => boolean;

        const fn4: Cb = (name, age) => {
            return name.length > 1 && age > 15;
        }

    //Cementowanie typów
        //Oznacza to zaprzestanie korzystania z inferencji i zamiast tego
        //wpisywanie typów ręcznie.

        type Invoice = {
            amount: number;
            submittedAt?: Date;
        }

        function getInvoiceTotal(invoice: Invoice){
            return invoice.amount;
        } // zwraca typ number

        function getInvoiceTotal2(invoice: Invoice){
            return invoice.submittedAt && invoice.amount;
        } //o nie, unia typów: number || undefined - błąd, lecz TS go nie widzi :(

    //Inferencja przy const i let
        //Inferencja typów rózni się gdy przypisujemy ją do let lub const
        let valVariable = 123 // number
        const valConstant = 123;

        //TS nadaje stałej specjalny typ literału, ktora nigdy się nie zmienia.