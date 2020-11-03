/* Dynamiczne typowanie */
let x = 123;
x = "abc"

/* Statyczne typowanie */
let x: number = 123;
x = "abc" //error

let d: Date = 'hello'; //error

let y = 42; //interferencja typu number
y = "ghi"; //err

/* Słabe typowanie */
const x = "123" //ciąg znaków
const areEqual = x == 123 // true, dla JS;

const a = "3" - 1; //1
const b = "3" + 1 //31

/* Silne typowanie */
const x2 = "123"
const areEqual2 = x == 123; //Err, TS

    //Wyjątek,
        //bez dynamicznego typowania
            if(Boolean(x)){}
        //z dynamicznym typowaniem
            if(x) {}

/* TS - Ignore - zezwól na brudny kod*/

//@ts-ignore 
let x3: number = "aaa";

/* Duck typing */
//Jeśli chodzi jak kaczka, kwaczy jak kaczka to jest kaczką.

declare const x4: unknown;
if(typeof x === 'number'){
    console.log(x.toFixed(2));
}

/* Typowanie strukturalne */
//Porównanie dokonywane na podstawie ich struktury, nie typu.
//Tego typu typowanie, nie ma znaczenia nazwa typu, tylko sama struktura
//gdy struktury są dokładnie identyczne, mozna przypisywać stałe do siebie

type User = { id: number };
const michal: User = { id: 123 };
const marcin: User = michal;

type Product = { id: number };
const bread: Product = michal;