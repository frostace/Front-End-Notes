fn main() {
    // integer
    let int = 1_000; // default is i32
    println!("integer: {int}");

    // floating-point
    let x = 2.0; // default is f64
    let y: f32 = 3.0;
    println!("floating-point: {x}, {y}");

    // bool
    let t = true;
    let f: bool = false;
    println!("boolean: {t}, {f}");

    // char
    let c = 'z';
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';
    println!("char: {c}, {z}, {heart_eyed_cat}");

    // === Compound Type ===
    // tuple
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (t1, t2, t3) = tup; // destructure
    println!("tuple: ({t1}, {t2}, {t3})");
    let five_hundred = tup.0;
    let six_point_four = tup.1;
    let one = tup.2;
    println!("tuple: ({five_hundred}, {six_point_four}, {one})");
    // empty tuple = unit
    let _uni = ();

    // array
    // - every element are of the same type
    // - arrays have a fixed length
    let _array1 = [1, 2, 3, 4, 5];
    let _array2 = [3; 5]; // same as [3,3,3,3,3]
    let first = _array1[0];
    let second = _array1[1];
    println!("array: [{first}, {second}]");
    // memory safe principles
    // - trying to access the element of an array that is past the end of the array will lead to a panick on runtime
    // let passed = _array1[5];
    // println!("{passed}");

    // vector
    // - is allowed to shrink / grow in size
    let mut vec = Vec::new();
    vec.push(1);
    assert_eq!(vec.len(), 1);
}
