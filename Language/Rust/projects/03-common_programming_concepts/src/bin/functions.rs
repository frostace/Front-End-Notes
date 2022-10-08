fn main() {
    print_labeled_measurement(5, 'h');

    statement_vs_expressions();
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}

fn statement_vs_expressions() {
    // a statement does not return a value
    // while an expression always returns a value
    // Expressions do not include ending semicolons. If you add a semicolon to the end of an expression, you turn it into a statement
    let _v1 = 1; // the whole line is a statement while `1` is an expression
    let _v2 = 5 + 6; // `5 + 6` is an expression
    let _v3 = {
        let x = 3;
        x + 1
    }; // a new scope block created with curly brackets is an expression
    let _v4 = println!("The value of _v3 is: {_v3}"); // calling a macro is an expression
    let _v5 = five(); // calling a function is an expression
}

fn five() -> i32 {
    5
}
