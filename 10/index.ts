//Enumy
    //Zbiór nazwanych wartości.
    //Sposób reprezentacji danych.
    //Enumy najczęsciej traktujemy jak obiekty

    //Enumy numeryczne
        //Powiedzmy ze mamy fakture o 3 stanach (0,1,2)
        enum InvoiceStatus {
            SUBMITTED, //0
            APPROVED, //1
            PAID, //2
        }

        function getStatusLabel(status: InvoiceStatus){
            switch (status){
                case InvoiceStatus.SUBMITTED:
                    return "Invoice was submitted";
                case InvoiceStatus.APPROVED:
                    return "Invoice is approved";
                case InvoiceStatus.PAID:
                    return "kasa";
            }
        }

        getStatusLabel(1) //Invoice is approved!

        //Inicjalizacja
            //Podczas deklarowania enumeracji mozemy przypisac liczby inne niz domyślne.

            enum AnotherEnum {
                SUBMITTED = 123,
                APPROVED, //124
                PAID, //125
                SOMETHING_ELSE = 1024,
                MORE //1025
            }

        //Reprezentacja enumów w JS
            //Enumy są obiektami i zasadniczo mozemy je tak traktować

            const InvoiceStatus2 = {
                SUBMITTED: 0,
                APPROVED: 1,
                PAID: 2,
                0: "SUBMITTED",
                1: "APPROVED",
                2: "PAID"
            }

            //Tylko zamiast 3 mamy 6 pól :(

        //Inicjalizacja enumów wyrazeniem
            function getValue(){return 1;}
            enum MyEnum {
                X = getValue(),
                Y = 2 + 2,
            }

            //Po polu z przypisaną wartością wyrazenia
            //musi pojawić się kolejne z inicjalizacją

            enum MyEnum1 {
                X = getValue(),
                Y = 4,
                Z, //ok
            }

            enum MyEnum2 {
                X = getValue(),
                Y, //ERROR
            }
            
            //W skrocie, pole bez inicjalizacji musi sie
            //pojawić pierwsze albo po prostu ze stałą wartością
        
        //Enumy z maską bitową
            
            enum FileAccess {
                None = 1 << 0,
                Read = 1 << 1,
                Write = 1 << 2,
                Execute = 1 << 3
            }

            const readWrite = FileAccess.Read | FileAccess.Write; // => 6

    //Enumy z ciągami znaków
        //Trzeba zawsze ręcznie podać wartość dla kazdego pola
        //Zadne z pól nie ma wtedy wartości domyślnej.
        
        enum UserRole {
            USER = "user",
            ADMIN = "admin",
            MODERATOR = "moderator"
        }

    //Róznice pomiędzy enumami
        //Enumeracja z liczbami była wcześniej, niz ze stringami
        //dlatego jest mniej bezpieczna, poniewaz do zmiennej
        //bedacej enumem, mozemy przepisac dowolną liczbę a
        //nie tylko te określone w enumeracji

        const invoiceStatus3: InvoiceStatus = 123; //O nie! to zadziala a nie powinno :(

        enum InvoiceStatus4 {
            SUBMITTED = "SUBMITTED",
            APPROVED = "APPROVED",
            PAID = "PAID"
        }

        const invoiceStatus4: InvoiceStatus4 = "asdada"; //bład

    //Enumy są typowane nominalnie

        enum InvoiceStatus5 {
            submitted,
            approved,
        }

        enum FormStatus {
            submitted,
            approved,
        }

        //Nawet jak enumy mają dokładnie takie same nazwy pól i wartości
        //wyrzuca błąd, daje nam to większe bezpieczeństwo typów.

    //Test wyczerpania
        //Funkcja kompilatora która pozwala na znalezienie miejsc
        //w których zapomnieliśmy uwględnić jakąś mozliwosc
        //opcja --noImplicitReturns to TS wykryje to i poinformuje o błędzie

        enum Role {
            ADMIN = "admin",
            USER = "user",
            GUEST = 'guest',
        }

        function getPermissionsFor(role: Role){
            switch (role){
                case Role.ADMIN:
                    return [
                        //...
                    ]
                case Role.USER:
                    return [
                       //... 
                    ]
            }
        }

    //Test wyczerpania z liczbami
        //Test wyczerpania działa tylko z Enumami stringami
        //dlatego lepiej stringów uzywac ;)

    //Kompatybilnosc obiektów i enumów
        //W pełni kompatybilne z obiektami
        //Prawidlowe jest uzycie enumeracji w miejscu gdzie oczekiwany był obiekt.

        function doSth(arg: {ADMIN: number}) {};
        doSth(Role) //OK

    //const enum
        //const enum nie pozostawia śladu po skompilowaniu do JS
        //UWAGA: NIE DZIALA W PRZYPADKU POLACZENIA Z BABELem!
        const enum Role2 {
            A,
            B,
            C
        }

        const allowedRoles = [Role2.A, Role2.C]
        // () => var allowedRoles = [0 /* A */, 2 /* C */];

    //Enum a literał stringa
        //Posiada, pogadamy w następnym rozdziale