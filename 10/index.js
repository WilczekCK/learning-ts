//Enumy
//Zbiór nazwanych wartości.
//Sposób reprezentacji danych.
//Enumy najczęsciej traktujemy jak obiekty
//Enumy numeryczne
//Powiedzmy ze mamy fakture o 3 stanach (0,1,2)
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus[InvoiceStatus["SUBMITTED"] = 0] = "SUBMITTED";
    InvoiceStatus[InvoiceStatus["APPROVED"] = 1] = "APPROVED";
    InvoiceStatus[InvoiceStatus["PAID"] = 2] = "PAID";
})(InvoiceStatus || (InvoiceStatus = {}));
function getStatusLabel(status) {
    switch (status) {
        case InvoiceStatus.SUBMITTED:
            return "Invoice was submitted";
        case InvoiceStatus.APPROVED:
            return "Invoice is approved";
        case InvoiceStatus.PAID:
            return "kasa";
    }
}
getStatusLabel(1); //Invoice is approved!
//Inicjalizacja
//Podczas deklarowania enumeracji mozemy przypisac liczby inne niz domyślne.
var AnotherEnum;
(function (AnotherEnum) {
    AnotherEnum[AnotherEnum["SUBMITTED"] = 123] = "SUBMITTED";
    AnotherEnum[AnotherEnum["APPROVED"] = 124] = "APPROVED";
    AnotherEnum[AnotherEnum["PAID"] = 125] = "PAID";
    AnotherEnum[AnotherEnum["SOMETHING_ELSE"] = 1024] = "SOMETHING_ELSE";
    AnotherEnum[AnotherEnum["MORE"] = 1025] = "MORE"; //1025
})(AnotherEnum || (AnotherEnum = {}));
//Reprezentacja enumów w JS
//Enumy są obiektami i zasadniczo mozemy je tak traktować
var InvoiceStatus2 = {
    SUBMITTED: 0,
    APPROVED: 1,
    PAID: 2,
    0: "SUBMITTED",
    1: "APPROVED",
    2: "PAID"
};
//Tylko zamiast 3 mamy 6 pól :(
//Inicjalizacja enumów wyrazeniem
function getValue() { return 1; }
var MyEnum;
(function (MyEnum) {
    MyEnum[MyEnum["X"] = getValue()] = "X";
    MyEnum[MyEnum["Y"] = 4] = "Y";
})(MyEnum || (MyEnum = {}));
//Po polu z przypisaną wartością wyrazenia
//musi pojawić się kolejne z inicjalizacją
var MyEnum1;
(function (MyEnum1) {
    MyEnum1[MyEnum1["X"] = getValue()] = "X";
    MyEnum1[MyEnum1["Y"] = 4] = "Y";
    MyEnum1[MyEnum1["Z"] = 5] = "Z";
})(MyEnum1 || (MyEnum1 = {}));
var MyEnum2;
(function (MyEnum2) {
    MyEnum2[MyEnum2["X"] = getValue()] = "X";
    MyEnum2[MyEnum2["Y"] = void 0] = "Y";
})(MyEnum2 || (MyEnum2 = {}));
//W skrocie, pole bez inicjalizacji musi sie
//pojawić pierwsze albo po prostu ze stałą wartością
//Enumy z maską bitową
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 1] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["Execute"] = 8] = "Execute";
})(FileAccess || (FileAccess = {}));
var readWrite = FileAccess.Read | FileAccess.Write; // => 6
//Enumy z ciągami znaków
//Trzeba zawsze ręcznie podać wartość dla kazdego pola
//Zadne z pól nie ma wtedy wartości domyślnej.
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
    UserRole["MODERATOR"] = "moderator";
})(UserRole || (UserRole = {}));
//Róznice pomiędzy enumami
//Enumeracja z liczbami była wcześniej, niz ze stringami
//dlatego jest mniej bezpieczna, poniewaz do zmiennej
//bedacej enumem, mozemy przepisac dowolną liczbę a
//nie tylko te określone w enumeracji
var invoiceStatus3 = 123; //O nie! to zadziala a nie powinno :(
var InvoiceStatus4;
(function (InvoiceStatus4) {
    InvoiceStatus4["SUBMITTED"] = "SUBMITTED";
    InvoiceStatus4["APPROVED"] = "APPROVED";
    InvoiceStatus4["PAID"] = "PAID";
})(InvoiceStatus4 || (InvoiceStatus4 = {}));
var invoiceStatus4 = "asdada"; //bład
//Enumy są typowane nominalnie
var InvoiceStatus5;
(function (InvoiceStatus5) {
    InvoiceStatus5[InvoiceStatus5["submitted"] = 0] = "submitted";
    InvoiceStatus5[InvoiceStatus5["approved"] = 1] = "approved";
})(InvoiceStatus5 || (InvoiceStatus5 = {}));
var FormStatus;
(function (FormStatus) {
    FormStatus[FormStatus["submitted"] = 0] = "submitted";
    FormStatus[FormStatus["approved"] = 1] = "approved";
})(FormStatus || (FormStatus = {}));
//Nawet jak enumy mają dokładnie takie same nazwy pól i wartości
//wyrzuca błąd, daje nam to większe bezpieczeństwo typów.
//Test wyczerpania
//Funkcja kompilatora która pozwala na znalezienie miejsc
//w których zapomnieliśmy uwględnić jakąś mozliwosc
//opcja --noImplicitReturns to TS wykryje to i poinformuje o błędzie
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
    Role["GUEST"] = "guest";
})(Role || (Role = {}));
function getPermissionsFor(role) {
    switch (role) {
        case Role.ADMIN:
            return [
            //...
            ];
        case Role.USER:
            return [
            //... 
            ];
    }
}
//Test wyczerpania z liczbami
//Test wyczerpania działa tylko z Enumami stringami
//dlatego lepiej stringów uzywac ;)
//Kompatybilnosc obiektów i enumów
//W pełni kompatybilne z obiektami
//Prawidlowe jest uzycie enumeracji w miejscu gdzie oczekiwany był obiekt.
function doSth(arg) { }
;
doSth(Role); //OK
var allowedRoles = [0 /* A */, 2 /* C */];
// () => var allowedRoles = [0 /* A */, 2 /* C */];
//Enum a literał stringa
//Posiada, pogadamy w następnym rozdziale
