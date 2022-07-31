# INTRO

bookmark: https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html

## WHY RUST

> Rust is the future of JavaScript Infrastructure
> https://leerob.io/blog/rust

1. safe and easy to use references
2. strong, static type system + type inference

## TAKEAWAYS

### Hello World

1. `main` function is always the 1st code that runs in every executable Rust program
2. `macro` vs `function`
   `println!` is a `macro` instead of a normal `function`
3. lines end with `semicolons(;)`
4. ahead-of-time compiled language

```bash
# compile
rustc main.rs

# run binary executable
./main
```

### Cargo

```bash
# create a project
cargo new hello_world

# build
cargo build

# build for release
cargo build --release

# build + run
cargo run

# build without producing a binary and check for errors in its compilation
cargo check

# update crates to the latest versions that fit cargo.toml, which will ignore the Cargo.lock file
cargo update

# build documentation provided by all deps
cargo doc --open

# If we have multiple binary files out there, we can specify which file to run with
cargo run --bin hello
```

1. How does Rust figure out that the src files hadn't changed in `cargo build` / `cargo run`?

### Guessing Game

1. `prelude`: the list of things that Rust automatically imports into every Rust program.
2. `trait`: A trait tells the Rust compiler about functionality a particular type has and can share with other types. Sounds like a subset of a crate, or let's say, a collections of methods implemented in a crate.
3. `shadowing`: Shadowing lets us reuse the `guess` variable name rather than forcing us to create two unique variables, such as `guess_str` and `guess` for example.

### Common Programming Concepts

1. `when to use shadowing`:

    1. when you want to perform a few transformations on a value but have the variable be immutable after those transformations have been completed.
    2. when you want to change the type of the value but reuse the same name.

2. `array vs vector`: `array` is of fixed size while `vector` can shrink/grow in size.
3. `unit`: empty data type.
4. `statement vs expression`: a statement doesn't return a value while an expression alway returns a value. when you add a semicolon to an expression within a new scope block, it's turned from an expression to a statement.

## ACCESSORY

1. rustup: An installer for the systems programming language Rust
2. cargo: Rust's build system and package manager
3. crates.io: where people in the Rust ecosystem post their open source Rust projects

# REFERENCE

official rust book: https://doc.rust-lang.org/book/ch01-01-installation.html
async rust book: https://rust-lang.github.io/async-book/
prelude: https://doc.rust-lang.org/std/prelude/index.html
