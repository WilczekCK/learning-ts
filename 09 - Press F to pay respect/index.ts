/* Kompatybilność typów */
    //TS korzysta z typowania strukturalnego.
    //Jeśli typy mają tą samą strukture (pola i metody) to są kompatybilne.

    //Podtyp a przypisywanie
        //TS definiuje dwa rodzaje kompatybilności: 
            //Podtyp - A jest podtypem B
            //Przypisanie - X mozna przypisać do Y
        //Róznice?
            //Przypisanie pozwala dodatkowo na kompatybilnosc dowolnego typu z any
            //oraz any z dowolnym typem a takze na kompatybilnosc wartosci liczbowych i enumów
        //Kompatybilny? Co to znaczy?
            //Musimy rozumieć ze "Taki, który mozna przypisać do"

    //Kompatybilność strukturalna
        //Dwa obiekty są całkowicie kompatybilne, jeśli zawierają te same pola
        type MyType = { x: number };
        type OtherMyType = { x: number };

        const a: MyType = { x:123 }
        const b: OtherMyType = a;
        //Mozemy tez przypisać to odwrotnie (b do a)

    //Klasy z polami publicznymi
        //Klasa z polami publicznymi jestt kompatybilna z obiektem z tymi samymi polami publicznymi!

        class Player {
            name!: string;
        }

        type P = {
            name: string;
        }

        const instance = new Player();
        const pType: P = instance;
        
        const notAnInstance: Player = { name: "Paul" };

        notAnInstance // => Object{ name: "Paul" };

        //Podczas sprawdzania kompatybilności instacji klasy z innym typem
        //ignorowany jest typ statyczny klasy - konstuktor i pola statyczne nie naleą do instancji!

        class Player2 {
            static a = 1;
            constructor(name: string) {}
        }

        class Hero {
            static b = "a"
            constructor(args: Array<number>){}
        }

        const p: Player2 = new Hero([1,2,3]); // => { b: "a" }
        const h: Hero = new Player2("aaa") // => {a: 1}
    
    //Klasy z polami prywatnymi i polami protected

        class Player{
            private name!: string;
        }

        class Hero {
            private name!: string;
        }

        const p: Player = new Hero();
        const h: Hero = new Player();
        
        //Kod powyzej jest niepoprawny i niekompatybilny pomimo ze mają tę samą strukturę!
        //TS zakłada, ze prywatne pola w róznych klasach nie są zgodne.
        //Poprawmy ponizszy kod, uzywająć dziedziczenia (2 klasy dziedziczą po głównej klasie )

        class Entity {
            private name!: string;
        }

        class Player2 extends Entity {}
        class Hero2 extends Entity {}
        const p2: Player = new Hero2();
        const h2: Hero = new Player();

    //Kompatybilność podtypów
    
        type Character = {
            name: string;
        }

        type User = {
            name: string;
            age: number;
        }

        let character: Character = { name: "Michał" }
        let user: User = { name: "Jan", age: 23 }
        character = user; //ok
        user = character; //err

        //Przypisanie user do character jest mozliwe, ale nie odwrotnie
        //TS uznaje za poprawne przypisanie wtedy, gdy przypisywana zmienna po prawej
        //ma co najmniej te pola co zmienna po lewej

        //ZASADA
        //Mozliwe jest przypisanie do zmiennej o typie X innej zmiennej typu Y
        //wtedy i tylko wtedy, gdy typ Y rozszerza typ X

        //Podobnie to działa w przypadku wywoływania funkcji

        function processCharacter(character: Character){}
        function processUser(user: User) {}

        processCharacter(character); //ok
        processCharacter(user); //ok

        processUser(character) //bład
        processUser(user) //ok

        //ZASADA
        //Nadmiarowe własności obiektu przekazanego jako argument
        //do funkcji są ignorowane


    //Przypisywanie literałów obiektów
        const u: User = { name: "Jan", age: 23 }

        const c1: Character = u;
        const c2: Character = { name: "Jan", age: 23 }
        //TS pragnie nam pomóc i zakłada, e w momencie
        //przypisywanie chcemy uzyc tylko i wyłącznie
        //znanych własności opisanych typem Character

    //Kompatybilność funkcji wariadycznych
        
        //wszystkie funkcje w js są wariadyczne
        //czyli, do kazdej funkcji mozna przekazać
        //dowolną liczbę argumentów
        function add_js(a,b){
            return a + b;
        }

        add_js(1,2,3); // gitgud w js

        function add_ts(a: number, b:number){
            return a + b;
        }

        add_ts(1,2,3) // error!
    
        //ale

        let fn1 = (a: number) => a;
        let fn2 = (a: number, b: number) => a + b;

        fn2 = fn1; //ok
        fn1 = fn2; //err
    
    //Kompatybilność argumentów funkcji
        let processCharacter2 = function (char: Character){
            console.log(char.name);
        }

        let processUser2 = function (user: User){
            console.log(user.age, user.name)
        }

        processCharacter2 = processUser2; //obiekt character nie posiada pola age, error!
        processUser2 = processCharacter2 //ok

    //Kompatybilność metod w obiektacha
        //Wolne funkcje mają inne zasady kompatybilności
        //niz funkcje zdefiniowanych w obiektach

        let characterProcessor = {
            process(character: Character) {}
        }
        let userProcessor = {
            process(user: User) {}
        }

        characterProcessor = userProcessor; //ok
        userProcessor = characterProcessor ; //ok

        //ale co ciekawe!

        let characterProcessor2 = {
            process : function (character: Character){}
        }

        let userProcessor2 = {
            process : function (user: User){}
        }

        characterProcessor2 = userProcessor2; //błąd, kompatybilnosc wolnych funkcji?
        userProcessor2 = characterProcessor2; //OK

    //Kompatybilność typu zwracanego przez funkcje
        
        let makeCharacter = (): Character => {
            return { name: "Michał" };
        }

        let makeUser = (): User => {
            return {name: "Michał", age: 21};
        }

        makeCharacter = makeUser; //ok
        makeUser = makeCharacter; //err, missing age!

    //Argumenty opcjonalne i rest

        type Fopt = (a: number, b?: string) => void;
        type Freq = (a: number, b: string) => void;
        //Tylko przypisanie Fopt do Freq jest poprawne!

        let fopt: Fopt = (a,b) => {};
        let freq: Freq = (a,b) => {};

        fopt = freq; //błąd 
        freq = fopt; //OK

        //Lecz, nadmiarowe argumenty opcjonalne nie stanowią problemu
        //Bo obie te funkcje mozna wywolac z co najmniej 1 argumentem
        type Fone = (a :number) => void;
        type Fextra = (a :number, b?: string) => void;

        let fone: Fone = (a) => {};
        let fextra: Fextra = (a, b) => {};

        fone = fextra; //ok
        fextra = fone; //ok

        //Rest parameter jest traktowany jakby był nieskończoną liczbą opcjonalnych argumentów
        type Frest = (...args: number[]) => void;
        
        const fmany0 : Frest = () => {}; //ok
        const fmany1 : Frest = (a) => {}; //ok
        const fmany2 : Frest = (a,b) => {}; //ok
        const fmany3 : Frest = (a,b,c) => {}; //ok

    //Typy kowariantne, kontrawiarantne, biwariantne i inwariantne
        //Wszystkie zachowania z zachowaniami w tym rozdziale
        //są podjęte przez twórców TypeScripta
        
        //Kowariacja i kontrawariancja 
            //Mozliwosc uzywania w miejscu, gdzie
            //oczekiwany jest typ X jego podtypu lub nadtypu

        type Character2 = {
            name: string;
        }

        type User2 = { 
            name: string;
            age: number;
        }

        type Admin2 = {
            name: string;
            age: number;
            role: string;
        }
        //Character2 to typ bazowy + user go rozszerza + admin rozszerza user
        
        //KOWARIACJA
        //Zamiast typu X, w jego miejsce pozwala na uzycie typou pochodnego od X
        //a więc, zamiast user mozemy uzyc admin.

        type Covariant<T> = () => T;

        let x1: Covariant<Admin2> = { 
        }
        let y1: Covariant<User2> = {

        }
        let z1: Covariant<Character2> = {

        }

        y1 = x1; //OK
        y1 = z1; //BŁAD


        //Kontrawariancja
        //Zamiast typu X, w jego miejsce pozwala na uzycie typu nadrzednego do ok
        //a wiec, zamiast User mozemy uzyc Character

        type Contravariant<T> = (x2: T) => void;

        let x2: Contravariant<Admin2> = {}
        let y2: Contravariant<User2> = {}
        let z2: Contravariant<Character2> = {}

        y2 = x2; //Błąd
        y2 = z2; //OK


        //Biwariancja
        //W miejsce typu x mozna uzyc zarowno typu pochodnego jak i nadrzednego 

        let y3: Bivariant<Admin2> = {}
        let x3: Bivariant<User2> = {}
        let z3: Bivariant<Character2> = {}

        y3 = x3; //ok
        y3 = z3; //ok

        //Inwariancja
        //W miejsce typu x nie mozna uzyc typu pochodnego ani nadrzednego.

        let x4: Invariant<Admin2> = {}
        let y4: Invariant<User2> = {}
        let z4: Invariant<Character2> = {}

        y4 = x4; //błąd!
        y4 = z4; //błąd!


        //Poddaje się, nie ogarniam co się odwala dalej :(
        //Wróce tu jeszcze kiedyś!