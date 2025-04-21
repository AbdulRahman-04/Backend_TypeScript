/*
    Intro to Basic Types in TypeScript: 

    there are 4 types in typescript as follows: 
    - Primitive Types(String, Number, Boolean)
    - Array
    - Tuples
    - Enums
    - Any, Unknown, void, null, undefined, never 

*/

// Primitive Types: 

// String : a string is a type in TS just like Javascript where it is written under " ". e.g:

const a: String = "Rahman"
console.log(typeof a, a);


// in above example the variable a has a type of String and its value is a string, written inside "".


// Number: a number is a type in ts which is basically any number, just like JavaScript. e.g

let b: Number = 12
console.log(typeof b, b);


// Boolean: a boolean value in ts & js is same, i.e TRUE and False. e.g

let value: Boolean = true;
console.log(typeof value, value);

// Difference Between Primitive Types and Refernce Types ( [], {}, () )

/*
        Primitive                                                                Reference
 we can directly copy the value of a primitive                            whereas , in reference values, we can't just directly copy the refernce values
 type variable inside another new variable and                           inside other variables as changes inside new variable will directly affect the
 changes made to the new variable , wont be affecting                    original variable.
 the original variable.


*/  

// primitve type e.x:                                                    
let greet: String = "hey"                                              

let hi = greet

console.log(typeof hi, hi);


// reference type ex:
let Arr : number[] = [12, 14, 15 , 16]

let Arr2 = Arr.filter((x)=>{
    return x === 12
})

console.log(Arr2, typeof Arr2);


// Arrays : Arrays, Just like in JS are used to store multiple data type values bute here in ts, arrays elements type should be pre defined. e.g

let arr: string[] = ["hi", "hello"]
console.log(arr, typeof arr);

let arr1 : number[] = [12, 15, 49, 69]
console.log(arr1, typeof arr1);

let arr2: boolean[] = [false, false, false]
console.log(arr2, typeof arr2);


// Tuples: Tuples in ts are basically arrays whose elements type is declared but also the type of each index element is also defined while declaring
//         the variable. e.x: 

let myArr: [string, boolean, boolean, number] = ["rahman", false, true, 69];
console.log(myArr, typeof myArr);

// from above example, we can see the type of each index element is defined as 0 index element will have string, then 1st index elem boolean, boolean
// , number.


// Enums : An enum (short for "enumeration") is a special data type used to define a set of named constants. 
//         It helps in making code more readable and maintainable by giving meaningful names to fixed values

// enum StatusCodes {
//     INTERNAL_SERVER_ERROR = 404,
//     OK = 200,
//     INVALID_ERROR = 500
// }

// console.log(StatusCodes.INTERNAL_SERVER_ERROR, StatusCodes.INVALID_ERROR, StatusCodes.OK);


// Any Type: The `any` type in TypeScript lets a variable hold **any** value, skipping type checks. 
//           This makes code flexible but **removes type safety**, leading to potential runtime errors. 🚀 Avoid it for reliable code!

let ab: any = false;
ab = true;
ab = 49

console.log(ab , typeof ab);


// Unknown: unknown is a type in Ts which doesn't let programmer to perform operations on a variable which has unknown type , its good to use 
//          unknown as type other than any for strictly tye safety in our app.

let n: unknown = "rahman";
n = 48;

console.log(n, typeof n);


// void: void is used for functions that do not return a value.

// function meraFunction(): void{
//     console.log("hello world");
// }


// Never: never is used for functions that never return—either they throw errors or run forever.

// function throwError(): never {
//     throw new Error("This function never returns!");
//   }


// Type interference and Type annotations: 

// Type interference: declaring a variable in ts without defing its Type.

// Type annotations: declaring a variable in ts while defining its Type

// Interfaces and type aliases: 

// Interfaces: interfaces in ts are like a rulebook which defines teh shape of an object (e.g: mainly used for schemas) it tells before decalring the
//             object, how it'll look and what type of properties it'll have.


interface user {
    username: string,
    age: number,
    isalive: boolean,
}

let myUser: user = {
    username: "hey",
    age: 49,
    isalive: true
}

console.log(myUser, typeof myUser);


// Type Aliases: Type aliases in TypeScript are used for creating own custom names for our types. they make code more readable and reusable by
//               simplifying complex or repetetive types.

type rahman = string | number | null;

let myUser1: rahman =  50;
console.log(myUser1);

