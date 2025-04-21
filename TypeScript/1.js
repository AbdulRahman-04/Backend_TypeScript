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
var a = "Rahman";
console.log(typeof a, a);
// in above example the variable a has a type of String and its value is a string, written inside "".
// Number: a number is a type in ts which is basically any number, just like JavaScript. e.g
var b = 12;
console.log(typeof b, b);
// Boolean: a boolean value in ts & js is same, i.e TRUE and False. e.g
var value = true;
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
var greet = "hey";
var hi = greet;
console.log(typeof hi, hi);
// reference type ex:
var Arr = [12, 14, 15, 16];
var Arr2 = Arr.filter(function (x) {
    return x === 12;
});
console.log(Arr2, typeof Arr2);
// Arrays : Arrays, Just like in JS are used to store multiple data type values bute here in ts, arrays elements type should be pre defined. e.g
var arr = ["hi", "hello"];
console.log(arr, typeof arr);
var arr1 = [12, 15, 49, 69];
console.log(arr1, typeof arr1);
var arr2 = [false, false, false];
console.log(arr2, typeof arr2);
// Tuples: Tuples in ts are basically arrays whose elements type is declared but also the type of each index element is also defined while declaring
//         the variable. e.x: 
var myArr = ["rahman", false, true, 69];
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
var ab = false;
ab = true;
ab = 49;
console.log(ab, typeof ab);
// Unknown: unknown is a type in Ts which doesn't let programmer to perform operations on a variable which has unknown type , its good to use 
//          unknown as type other than any for strictly tye safety in our app.
var n = "rahman";
n = 48;
console.log(n, typeof n);
var myUser = {
    username: "hey",
    age: 49,
    isalive: true
};
console.log(myUser, typeof myUser);
var myUser1 = 50;
console.log(myUser1);
