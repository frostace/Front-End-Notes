# Classes

1. Classes offer a useful structural abstraction

   ## Closure v.s. Class

   ### Closure

   ```js
   function foo() {
       let someProperty;
   
       // Some other initialization code
   
       function someMethod() {
           // Do some stuff with `someProperty`
           // And potentially other things
       }
       // Maybe some other methods
   
       return {
           someMethod,
           // Maybe some other methods
       };
   }
   ```

   ### Class

   Developers would intuitively write the following code with `class` 

   ```js
   class Foo {
       public someProperty;
   
       constructor() {
           // some initialization
       }
   
       public someMethod() {
           // some code
       }
   
       private someUtility() {
           // some code
       }
   }
   
   export = new Foo();
   ```

   Instead of:

   ```js
   let someProperty;
   
   function foo() {
      // Some initialization code
   }
   foo(); // some initialization code
   
   someProperty = 123; // some more initialization
   
   // Some utility function not exported
   
   // later
   export function someMethod() {
   
   }
   ```

   

2. Provides a consistent way for developers to use classes instead of every framework (emberjs, reacts, etc.) coming up with their own version

   

3. Object oriented developers already understand `class`

