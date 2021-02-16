/*
 There are 7 primitive data types: string, number, bigint, boolean, undefined, symbol, and null in Javascript.
 
 The language specification explicitly says:
If x is null and y is undefined, return true when we do undefined==null

I'm not aware of any records of the language design process that explain the reasoning for that decision, but == has rules for handling different types,
and "null" and "undefined" are both things that mean "nothing", so having them be equal makes intuitive sense.

but if we do nul===undefined //false

Yeah, a Not-A-Number is Not equal to itself. But unlike the case with undefined and null where comparing an undefined value 
to null is true but a hard check(===) of the same will give you a false value, NaN’s behavior is because of IEEE spec that all systems need 
to adhere to. In this blog I will throw some light on NaNs and how they are implemented in the v8 engine.
Short Story: According to IEEE 754 specifications any operation performed on NaN values should yield a false value or should raise an error.

Types of NaN
There are 2 types of NaN, one can speak another is deaf.
Quiet NaN*/
var i="IWillBeaNaN";
parseInt(i)+"LOL"//NaNLOL

/*A Quiet NaN is simply any NaN value that doesn’t raise error and can flow through your code by falsifying value or converting itself to a string.
Signaling NaN
This one can talk, NaN values in this case will raise or set error for the user to handle it, most of the strongly typed languages make use of signaling NaNs.*/

