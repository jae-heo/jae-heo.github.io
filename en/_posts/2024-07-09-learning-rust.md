---
layout: post
title: "Learning the Rust Language"
subtitle: "Explaining Rust concepts in a simple way."
date: 2024-07-09 12:00:00 +0900
last_modified_at: 2024-07-09 12:00:00 +0900
categories: ["tutorial"]
tags: ["rust"]
lang: en
---

## Table of Contents

1. [Introduction](#introduction)
2. [Advantages of the Rust Language](#advantages-of-the-rust-language)
3. [Syntax](#syntax)
    1. [Variables](#variables)
    2. [Constants](#constants)
    3. [Variable Types](#variable-types)
    4. [Data Types](#data-types)
        1. [Scalar Types](#scalar-types)
        2. [Compound Types](#compound-types)

<br>
<br>

## Introduction

In this post, I will share what I have learned about the Rust language. The primary resource for my learning will be the [Rust Book](https://doc.rust-lang.org/book/){:target="_blank"}.

### Advantages of the Rust Language

In the [Rust Book-Foreword](https://doc.rust-lang.org/book/foreword.html){:target="_blank"}, the advantages of the Rust language are described as follows:
1. Helps simplify complex tasks such as low-level memory management, data representation, and concurrency.
2. Provides tools to clearly handle parts that were difficult to manage in existing languages.
3. Allows managing low-level areas without crashes or security issues.
4. Enables writing efficient code in terms of speed and memory usage.
5. Reduces the risk of implementing parallel processing.
6. Allows for more confident optimization attempts.
7. Supports programming from low-level to high-level.

My personal thoughts on the Rust language:
1. Improves speed by using an AoT compiler similar to the C language.
2. If the C language is like a city starting from old times and being redeveloped, Rust feels like a planned city built with many considerations from the start.
3. Adopts a unique system to manage the heap area without using a GC. This system also has overhead for memory management, but it offers a better memory management method than traditional GC by requiring coders to follow rules like Ownership.
4. Requires users to consider more while writing code because the tasks previously abstracted by GC are now their responsibility. However, I believe the merits of the language make it worthwhile.
5. Besides the language itself, provides high-quality package managers, libraries, and documentation, which make it highly accessible.

Now, let's dive deeper into the Rust language.

## Syntax

### Variables

- Variables are defined with the `let` keyword.
- Variables must always be inside curly braces (function declaration).
- By default, all variables are immutable.
- To make a variable mutable, use the `mut` keyword when declaring it.

```rust
// This will cause an error.
let testVar = 5;
testVar = 6;

// This will not cause an error.
let mut testVar = 5;
testVar = 6;
```

### Constants

- Constants are defined with the `const` keyword.

```rust
fn main() {
	const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
}
```

- Constants cannot be mutable, so you cannot use the `mut` keyword with them.

```rust
// Using the `mut` keyword with constants will cause an error.
fn main() {
	const mut THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
}
```

- Constants can also be defined outside of a block.

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
fn main() {
	let testVar = 10;
}
```

### Variable Types

- Rust allows you to declare variables without specifying their types.

```rust
// The type of the variable is inferred automatically.
fn main() {
    // This could be of type i8 to i128, or u8 to u128,
    // but by default, if the type is not specified, an integer is of type i32.
    let x = 2;

    // For floating-point numbers, the default type is f32.
    let y = 3.0; // f32
}
```

- Rust performs static type checking.

```rust
// This will cause a type error.
fn main() {
	let mut testVar = "   ";
	testVar = 5;
}
```

- You can redeclare a variable with the same name.

```rust
// Redeclaring a variable with the same name is not an error (Shadowing).
fn main() {
	let testVar = "   ";
	let testVar = 5;
}

```rust
// To delve deeper, if a shadowed variable occupies heap space...
fn main() {
    {
        let s = String::from("hello"); // s uses heap memory
        let s = 5; // The previous s goes out of scope, and drop is called.
    } // The new s goes out of scope here.
}
```

### Data Types

**Scalar Types**

Rust has four scalar types: Integer, floating-point number, Boolean, and character. These types are managed on the stack.

**Compound Types**

Rust supports two compound types: Tuple and Array. The difference is that a Tuple allows each element to have a different data type, while an Array requires all elements to have the same data type.

- Example of declaring a Tuple:

```rust
fn main() {
    // Each element can have a different type.
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

```rust
fn main() {
    // Even without specifying types, type inference will determine each element's type.
    let tup = (500, 6.4, 1);

    // You can also decompose a Tuple.
    let (x, y, z) = tup;
}
```

- Accessing elements of a Tuple:

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}
```

- Example of declaring an Array:

```rust
fn main() {
    // All elements must have the same type.
    let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
}
```

```rust
fn main() {
    // You can explicitly specify the type and length.
    let a: [i32; 5] = [1, 2, 3, 4, 5];
}
```

- Accessing elements of an Array:

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```
