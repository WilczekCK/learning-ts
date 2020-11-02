function add(a: number, b: number){
    return a + b;
}

add(1,2); //OK
add(1, "2"); // error
add([], {}); // error
add ("1", "2"); // error
add(null, undefined) //error but only in strict mode, otherwise ok