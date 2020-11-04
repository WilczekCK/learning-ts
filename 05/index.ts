/* Funkcje w TS */

    //Zapis funkcji jest identyczny jak w JS
    //lecz muszą być podane typy argumentów funkcji 
        function add(x: number, y: number){
            return x + y;
        }

    // Kazda funkcja ma typ zwracany, TS wywnioskuje samemu, lecz moemy podać typ zwracany po dwukropku
        function add2(x: number, y: number): number {
            return x + y;
        }

    //Jeśli funkcja nie zwraca niczego, uzywamy void
        function doNth(): void {};

    //Mozna tez napisac wyrazenie funkcyjne
        const fn1 = function () {}
        const fn2 = function mojaFunkcja() {}
        const fn = () => {};

    //TS pozwala na nadpisanie samego typu funkcji, uywając słowa type.
        type MyFunction = (x: number, y: number) => number;
        const fn3: MyFunction = (x,y) => {return x+y};
        //fn3(1,2) => 3
        //fn3("1", 2) => error

        // lub

        const fn4: (x: number, y:number) => number = (
            a: number,
            b: number
        ) => {
            return a + b;
        }

        //fn4(1, 2) => 3

    //Inferencja typów funkcji
        type Cb = (name: string, age: number) => boolean;

        const fn5: Cb = (name, age) => {
            return name.length > 1 && age > 18;
        }

        //fn5("Pawel", 17) => false
        //fn5("Pawel", 21) => true

    //Parametry opcjonalne
        //Uzywamy do tego znaku '?' 
        //UWAGA, parametry opcjonalne zawsze muszą być podawane na końcu!

        function getFullName(
            firstName: string,
            middleName?: string
        ){}

        //getFullName('Pawel', 'Jan')

    //Parametry domyślne
        function addNumbers(a = 1, b = 2){
            console.log(a,b);
            console.log(typeof a)
            console.log(typeof b)
        }
        //typescript automatycznie zmienia argumenty (a,b) na typ number.

        //addNumbers("1", 2); //error, string
        //addNumbers(5,4); //all good
    
    //Funkcje wariadyczne
        //Fukcja która potrafi przyjmować zmienną, ale nigdzie nie określoną liczbę parametrów. (... rest)
        function log(...messages: string[]){}

        //Wielokropkiem opisuje się typ funkcji wariadycznych:
        type Logger = (...m: string[]) => void;

        //Moliwe jest take podanie na początku kilku argumentów, a potem rest
        function x(a: string, b: number, ...c:string[]) {return {a,b,c}}

        //    a      b   [              c              ]
        //x('Pqglo', 22, 'Arr1', 'Arr2', 'Arr3', "Arr4")

    //Przeładowywanie funkcji
        //Funkcja, która na 3 rózne zachowania (w zaleznosci od argumentow) 
        const DEFAULT_CONFIG = {
            in: "./in.txt",
            out: "out.txt",
        };

        type Config = {
            in: string,
            out: string,
            enc?: string
        }

        function getConfig(overrides: {
            enc: string
        }): Config;

        function getConfig(overrides: string): Config;

        //Mozna nadpisac any
        function getConfig(overrides: any): Config {
        //type Arg = { enc: string } | string | undefined
        //function getConfig3(config: Arg):Config{
            if (typeof overrides === "object") {
                return { ...DEFAULT_CONFIG, ...overrides };
            } else if (typeof overrides === "string") {
                return { ...DEFAULT_CONFIG, enc: overrides };
            } else if (typeof overrides === "undefined") {
                return DEFAULT_CONFIG;
            } else {
                throw new Error("Invalid config provided!");
            }
        }
    
    //This
        //TS traktuje this jakby był specjalnym argumentem przekazywanym do funkcji
        
        //Jeśli chcemy opisać jego typ, musi on się znaleść na pierwszym miejscu przed innymi parametrami
        function fnWithThis(
            this: { enc: string },
            options: object,
        ){}
        
        //poleca się nie uzywanie thisa, zapisujac typ never.
        type FnWithoutThis = (this: never) => void;
        function fnWithoutThis(
            FnWithoutThis,
            options: object,
        ){}