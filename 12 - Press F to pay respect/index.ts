/* Typy warunkowe */
    
    //Co to są typy warunkowe?
        //Jest to mozliwość wyrazania nieregularnych mapowań typów.
        //Pozwalają na zapisanie takiej transformacji, która wybiera
        //typ w zaleznosci od warunku.

        //Typ warunkowy ma zawsze taką formę:
            type R = T extends U ? X : Y;

        //Gdzie T, U, X i Y to typy.
        //Notacja ... ? ... : ... jest analogiczna do operatora trójargumentowego z JSa

    //Przykładowe uzycie
        type IsBoolean = T extends boolean ? true : false;

        type t01 = IsBoolean<number>; //false
        type t02 = IsBoolean<string>; //false
        type t03 = IsBoolean<true>;  //true

    //Typy warunkowe na unii
        type NonNullable<T> = T extends null | undefined
            ? never
            : T;

        type t04 = NonNullable<number> //number
        type t05 = NonNullable<string | null>; //string
        type t06 = NonNullable<null | undefined> //never;

        //Do warunkowego NonNullable podajemy parametr, a rezultatem
        //jest ten sam typ ale z usuniętymi null i undefined
        //jeśli po ich wyeliminowaniu nic nie zostaje, zwraca never  

    //Zagniezdzanie
        //Conditional types mozemy zagniezdzać
        //Stworzmy generyk ktory zwraca typ zawierający nazwę podanego parametru

        type TypeName<T> =
            T extends string ? "string" :
            T extends number ? "number" :
            T extends boolean ? "boolean" :
            T extends undefined ? "undefined" :
            T extends Function ? "function" :
            T extends Array<any> ? "array" :
            T extends null ? "null" :
            T extends symbol ? "symbol" :
            "object";

            type t07 = TypeName<string>; // 'string'
            type t08 = TypeName<number>; // 'number'
            type t09 = TypeName<boolean>; // 'boolean'
            type t10 = TypeName<undefined>; // 'undefined'
            type t11 = TypeName<function>; // 'function'
            type t12 = TypeName<array>; // 'array'
            type t13 = TypeName<null>; // 'null'
            type t14 = TypeName<symbol>; // 'symbol'
            type t15 = TypeName<object>; // 'object

    //Warunkowe typy dystrybutywne
        //Jest to cecha typów warunkowych, która sprawia ze ich uzycie na unii
        //działa tak, jakbyśmy uzyli warunku na kazdym z komponentów wchodzących w jej skład osobno

        //Te przykłady robią dokładnie to samo:
            type t16 = NonNullable<string | null | undefined>;
            //string

            type t17 = 
                | NonNullable<string>
                | NonNullable<null>
                | NonNullable<undefined>;
            //string

        //Głównym zastosowaniem tego, jest filtrowanie unii
            type StringsOnly<T> = T extends string ? T: never;
            type Result = StringsOnly<"abc" | 123 | "ghi">;
            //"abc" | never | ghi
            //"abc" | ghi

    //Przykład uzycia
        //Wyslijmy JSONa, pomijając funkcje w typie
        type Model = {
            name: string;
            age: number;

            save(): Promise<void>;
        }

        type FieldsNames<T extends object> = {
            [K in keyof T]: T[K] extends Function ? never : K;
        }[keyof T];

        type OnlyFields<T extends object> = {
            [K in FieldsNames<T>]: T[K];
        }

        type ModelFields = OnlyFields<Model>;
        // { name: string; age:number; }

        //TBC