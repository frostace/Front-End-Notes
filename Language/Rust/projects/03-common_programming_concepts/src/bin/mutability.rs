// mutability
/**
fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
*/

// mutability vs shadowing
/**
 * when to use shadowing:
 * 1. when you want to perform a few transformations on a value but have the variable be immutable after those transformations have been completed.
 * 2. when you want to change the type of the value but reuse the same name.
 */
// shadowing
fn main() {
    let x = 5;

    {
        // transformations
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}");

    // type change
    let spaces = "   ";
    println!("The value of spaces is: {spaces}");
    let spaces = spaces.len();
    println!("The value of spaces is: {spaces}");
}
