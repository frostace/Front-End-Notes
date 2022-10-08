fn main() {
    // normal loop
    // loop {
    //     println!("again!");
    // }

    // loop with return value
    let mut counter = 0;
    let result = loop {
        counter += 1;

        if counter == 10 {
            // add the value you want returned after the break expression
            break counter * 2;
        }
    };

    println!("the result is {result}")

    // haven't learned: https://doc.rust-lang.org/book/ch03-05-control-flow.html#loop-labels-to-disambiguate-between-multiple-loops
}
