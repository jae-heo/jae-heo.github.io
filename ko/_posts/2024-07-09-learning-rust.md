---
layout: post
title: "Rust 언어를 배우며"
subtitle: "Rust에 대한 내용을 쉽게 설명합니다."
date: 2024-07-09 12:00:00 +0900
last_modified_at: 2024-07-09 12:00:00 +0900
categories: ["tutorial"]
tags: ["rust"]
lang: ko
---

## 목차

1. [소개](#소개)
2. [Rust 언어의 장점](#rust-언어의-장점)
3. [문법](#문법)
    1. [변수](#변수)
    2. [상수](#상수)
    3. [변수 타입](#변수-타입)
    4. [Data Type](#data-type)
        1. [Scalar Type](#scalar-type)
        2. [Compound Type](#compound-type)

<br>
<br>

## 소개

이 글에서는 Rust 언어를 배우며 얻은 것들을 공유하려고 합니다. 주로 [Rust Book](https://doc.rust-lang.org/book/){:target="_blank"}을 통해 학습을 진행할 예정입니다.

### Rust 언어의 장점
[Rust Book-Foreword](https://doc.rust-lang.org/book/foreword.html){:target="_blank"}에서는 러스트 언어의 장점을 아래와 같이 설명합니다.
1. 저수준의 메모리 관리, 데이터 표현, 병행 처리와 같은 복잡한 작업을 쉽게 하도록 도와줍니다.
2. 기존 언어들에서 관리하기 어려웠던 부분들을 명확하게 다루는 도구를 제공합니다.
3. Low-Level 영역의 관리를 충돌이나 보안문제 없이 다루도록 해줍니다.
4. 속도와 메모리 사용 측면에서 효율적인 코드를 작성할 수 있습니다.
5. 병렬 처리 구현의 위험도가 줄어듭니다.
6. 최적화를 이전보다 자신 있게 시도할 수 있습니다.
7. Low-Level 부터 High-Level Programming 까지 지원합니다.

개인적으로 느낀 Rust 언어는
1. C언어와 비슷한 느낌으로 AoT 컴파일러를 사용하므로 속도에 향상이 있습니다.
2. C언어가 구시가지로 시작해 곳곳을 허물며 재개발하는 도시의 형태라면, Rust는 처음부터 많은것을 고려하고 지어진 계획도시 같은 느낌입니다.
3. GC를 사용하지 않고 Heap 영역을 관리할 수 있도록 독특한 시스템을 채용합니다. 이 시스템 또한 메모리 관리에 오버헤드를 가지고있지만, Ownership 같은 규칙을 Coder에게 준수하도록 하여 기존 GC 보다 좋은 성능의 메모리 관리 방법을 제공합니다.
4. 기존 추상화되어있던 GC의 작업을 사용자에게 요구하는 만큼 사용자는 더 많은것을 고려하며 코드를 작성해야합니다. 하지만 그것을 고려해도 좋을 만큼 메리트가 있는 언어라고 생각됩니다.
5. 언어적인 부분 외에도 패키지매니저, 라이브러리, 문서 등이 상당한 퀄리티로 제공되기 때문에 높은 접근성을 가지고 있습니다.

그렇다면 Rust언어에 대해 조금 더 깊이 내려가보겠습니다.

## 문법

### 변수

- 변수는 let 키워드로 정의합니다.
- 변수는 항상 중괄호(function declaration) 안에 있어야 합니다.
- 기본적으로 모든 변수는 immutable(변할 수 없는)입니다.
- 변수를 선언할 때 mut(mutable) 키워드를 사용하면 변수를 변할 수 있도록 만들 수 있습니다.

```rust
// 오류가 발생합니다.
let testVar = 5;
testVar = 6;

// 오류가 발생하지 않습니다.
let mut testVar = 5;
testVar = 6;
```

### 상수

- 상수는 Const 키워드로 정의합니다.

```rust
fn main() {
	const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
}
```

- 기본적으로 상수는 변하지 않으므로 mut 키워드를 사용할 수 없습니다.

```rust
// 상수의 경우 mut 키워드를 사용할 경우 오류가 발생합니다.
fn main() {
	const mut THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
}
```

- 상수는 Block 밖에도 정의가 가능합니다.

```rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
fn main() {
	let testVar = 10;
}
```

### 변수 타입

- Rust는 변수의 타입을 지정하지 않고 선언할 수 있습니다.

```rust
// 변수의 타입을 자동으로 추론합니다.
fn main() {
	// 이때 i8~i128, u8~u128 타입이 가능성이 있는데, 
	// 기본적으로 정수의 경우 타입 명시를 하지 않는다면 i32 타입을 갖습니다.
    let x = 2;

	// 부동소수점의 경우 f32가 Default Type 입니다.
    let y = 3.0; // f32
}
```

- 정적으로 데이터타입을 확인합니다.

```
//이 경우에는 Type Error가 발생합니다.
fn main() {
	let mut testVar = "   ";
	testVar = 5;
}
```

- 같은 이름으로 변수를 새로 선언할 수 있습니다.

```rust
// 같은 이름의 변수를 새로 선언해도 오류가 아닙니다. (Shadowing)
fn main() {
	let testVar = "   ";
	let testVar = 5;
}

```rust
// 조금 더 자세히 알아보자면, 만약 shadowing으로 교체된 변수가 Heap영역을 차지하고 있다면...
fn main() {
    {
        let s = String::from("hello"); // s는 힙 메모리를 사용하므로
        let s = 5; // 이전 s는 Scope를 벗어나게 되므로 drop이 호출됩니다.
    } // 여기서 새로운 s는 Scope를 벗어나게 됩니다.
}
```

### Data Type

**Scalar Type**

Rust에는 네 가지의 스칼라 타입의 자료형이 있습니다. Integer, floating-point number, Boolean, character 입니다. 이 자료형은 메모리상의 Stack에서 관리됩니다.

**Compound Type**

두 가지의 Compound Type을 지원합니다. Tuple, Array 입니다. 두 자료구조의 차이는, Tuple의 경우 각 엘리먼트가 다른 데이터타입을 갖도록 허용하고, Array의 경우 모든 Element가 같은 테이터타입을 갖도록 합니다.

- Tuple 선언방법의 예시입니다.

```rust
fn main() {
	// 각 element별 타입을 다르게 지정할 수 있습니다.
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

```rust
fn main() {
	// 타입을 명시하지 않았지만 타입추론을 통해 각 엘리먼트별 Type이 추론됩니다.
    let tup = (500, 6.4, 1);

	// Tuple의 Decomposing도 가능합니다.
    let (x, y, z) = tup;
}
```

- Tuple의 Element에 접근하는 예시입니다.

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;

    let six_point_four = x.1;

    let one = x.2;
}
```

- Array 선언방법의 예시입니다.

```rust
fn main() {
	// 각 element별 타입이 모두 같아야합니다.
    let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
}
```

```rust
fn main() {
	// 타입과 길이를 직접 명시할 수 있습니다.
    let a: [i32; 5] = [1, 2, 3, 4, 5];
}
```

- Array의 element에 접근하는 예시입니다.

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```
