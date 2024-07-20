---
layout: post
title: "The Path to Python Mastery"
subtitle: "How to Become a Python Expert?"
date: 2024-07-13 12:00:00 +0900
last_modified_at: 2024-07-09 12:00:00 +0900
categories: ["tutorial"]
tags: ["python"]
lang: en
---

## Table of Contents

1. [Background](#background)
2. [Decorators](#decorators)
   - [Example](#example)
   - [Use Cases](#use-cases)
   - [Additional Information: wraps](#additional-information-to-know)
3. [Generators](#generators)
   - [Example](#example-1)
   - [Characteristics of Generators](#characteristics-of-generators)
   - [Use Cases](#use-cases-1)
   - [Additional Information](#additional-information-to-know-1)
4. [Context Managers](#context-managers)
   - [Basic Structure](#basic-structure)
   - [Example: File Management](#example-file-management)
   - [Using contextlib](#using-contextlib)
   - [Use Cases](#use-cases-2)
   - [Key Benefits](#key-benefits)
5. [Metaclasses](#metaclasses)
   - [Basic Concept](#basic-concept)
   - [Defining Metaclasses](#defining-metaclasses)
   - [Using Metaclasses](#using-metaclasses)
   - [Example: Attribute Validation](#example-attribute-validation)
   - [Use Cases](#use-cases-3)
   - [Precautions](#precautions)
6. [Data Classes](#data-classes)
   - [Example](#example)
   - [Characteristics of Data Classes](#characteristics-of-data-classes)
   - [Use Cases](#use-cases)
   - [Additional Information: Post-Initialization](#additional-information-to-know)
7. [Type Hinting](#type-hinting)
   - [Basic Type Hinting](#basic-type-hinting)
   - [Features of Type Hinting](#features-of-type-hinting)
   - [Use Cases](#use-cases-1)
   - [Additional Information: Type Checking Tools](#additional-information-to-know-1)
8. [Functional Programming Techniques](#functional-programming-techniques)
   - [Lambda Functions](#lambda-functions)
   - [map, filter, reduce Functions](#map-filter-reduce-functions)
   - [Functional Programming Library (functools)](#functional-programming-library-functools)
   - [Use Cases](#use-cases-2)
   - [Additional Information: Immutability](#additional-information-to-know-2)

<br>
<br>

## Background

Python offers various advanced features. Unfortunately, while I've learned about these features, I haven't had much experience using them in practice. Of course, understanding the principles alone greatly improves comprehension of various libraries and frameworks, but if we also learn about real-world applications, we can use Python even more effectively.

In this post, we'll review these advanced features once again and explore their practical applications.

<br>
<br>

## Decorators

Decorators are functions that add supplementary functionality or operations to other functions. This feature allows you to add functionality to a function without changing its actual code.

### Example

In the example below, a function called log_function_call is used as a decorator for the greet function.

```python
# The Decorator function internally defines a wrapper function and returns it.
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Function called: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

# @log_function_call indicates that the log_function_call function 
# is used as a decorator when the greet function is called.
@log_function_call
def greet(name):
    print(f"Hello, {name}!")

greet("Jaeyoung")
```

### Result
```text
Function called: greet
Hello, Jaeyoung!
```

### Use Cases

- **Logging**

```python
import logging

logging.basicConfig(level=logging.INFO)

def log_function_call(func):
    def wrapper(*args, **kwargs):
        logging.info(f"Function called: {func.__name__}")
        try:
            result = func(*args, **kwargs)
            logging.info(f"Function {func.__name__} completed successfully")
            return result
        except Exception as e:
            logging.error(f"Error occurred in function {func.__name__}: {str(e)}")
            raise
    return wrapper

@log_function_call
def divide(a, b):
    return a / b

# Normal case
divide(10, 2)

# Error case
try:
    divide(10, 0)
except ZeroDivisionError:
    pass
```

- **Authentication**

```python
def req_auth(func):
    def wrapper(*args, **kwargs):
        if not is_authenticated():  # Authentication check function (needs separate implementation)
            raise PermissionError("Authentication required.")
        return func(*args, **kwargs)
    return wrapper

@req_auth
def sensitive_operation():
    print("Performing important operation")

sensitive_operation()  # Raises PermissionError if not authenticated
```

- **Caching**

```python
def memoize(func):
    cache = {}
    def wrapper(*args):
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # First execution is slow, but subsequent calls with the same input are fast
```

- **Retry**

```python
import time

# To accept arguments in a decorator, you need to write a triple-nested function.
# This is called a decorator factory.
def retry(max_attempts=3, delay=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    if attempts == max_attempts:
                        raise
                    print(f"Error occurred: {e}. Retrying in {delay} seconds...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=2)
def unstable_network_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "Success"

print(unstable_network_call())
```

### Additional Information to Know

#### wraps

wraps is a decorator provided by Python's functools module that performs several tasks:
1. Metadata preservation - wraps copies the metadata (name, docstring, argument list, etc.) of the original function to the function wrapped by the decorator.
2. Debugging and introspection support - This allows debugging tools and introspection features to correctly display information about the original function.
3. Documentation maintenance - It preserves the docstring of the original function, allowing documentation generation tools to provide accurate information.

**Problem Example**

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        """The wrapper function has been called."""
        result = func(*args, **kwargs)
        return result
    return wrapper

@my_decorator
def say_hello():
    """The say_hello function has been called."""
    print("Hello.")

print(say_hello.__name__)  # Output: wrapper
print(say_hello.__doc__)   # Output: The wrapper function has been called.
```

**Solution Example**

```python
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        """The wrapper function has been called."""
        result = func(*args, **kwargs)
        return result
    return wrapper

@my_decorator
def say_hello():
    """The say_hello function has been called."""
    print("Hello!")

print(say_hello.__name__)  # Output: say_hello
print(say_hello.__doc__)   # Output: The say_hello function has been called.
```

<br>
<br>

## Generators

Generators are functions that create iterators. Unlike regular functions, they use the `yield` keyword to return values one at a time. This allows for efficient memory usage and is useful when dealing with large datasets.

### Example

In the example below, the `fibonacci` function is implemented as a generator.

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Using the generator
for num in fibonacci(10):
    print(num)
```

### Result
```text
0
1
1
2
3
5
8
13
21
34
```

### Characteristics of Generators

1. **Lazy Evaluation**: Values are not calculated in advance but are computed as needed.
2. **Memory Efficiency**: All values are not stored in memory at once, resulting in lower memory usage.
3. **Infinite Sequences**: Theoretically, infinite sequences can be represented.

### Use Cases

- **Reading Large Files**

```python
def read_large_file(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            yield line.strip()

for line in read_large_file('large_file.txt'):
    print(line)
```

- **Generating Infinite Sequences**

```python
def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1

for i in infinite_sequence():
    print(i)
    if i > 100:
        break
```

- **Data Transformation Pipeline**

```python
def numbers():
    for i in range(1, 11):
        yield i

def square(nums):
    for num in nums:
        yield num ** 2

def add_one(nums):
    for num in nums:
        yield num + 1

pipeline = add_one(square(numbers()))
for num in pipeline:
    print(num)
```

### Additional Information to Know

#### Generator Expressions

Similar to list comprehensions, but using parentheses `()` to create generators. The advantage here is that it saves space complexity.

```python
# List comprehension
squares_list = [x**2 for x in range(10)]

# Generator expression
squares_gen = (x**2 for x in range(10))

print(squares_list)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(squares_gen)   # <generator object <genexpr> at 0x...>

for num in squares_gen:
    print(num)
```

#### send Method

The `send` method of generators allows you to pass values into the generator.

```python
def echo_generator():
    while True:
        received = yield
        print(f"Received: {received}")

gen = echo_generator()
next(gen)  # Initialize generator
gen.send("Hello")
gen.send("World")
```

#### Two-way Communication

```python
# Understanding this mechanism allows you to implement complex coroutine patterns using generators.

def two_way_generator():
    while True:
        received = yield "Ready to receive input."
        print(f"Received input: {received}")

gen = two_way_generator()
print(next(gen))  # Output: Ready to receive input.
print(gen.send("Hello"))  # Output: Received input: Hello
                          # Ready to receive input.
```

Generators are powerful tools in Python that enable memory-efficient programming. They can be useful in various situations such as processing large amounts of data, streaming operations, or generating infinite sequences.

<br>
<br>

## Context Managers

Context managers are objects that manage the acquisition and release of resources. They are typically used with the `with` statement and allow specific actions to be performed before and after a code block is executed. This enables safer and more convenient resource management.

### Basic Structure

Context managers must implement the `__enter__` and `__exit__` methods:

```python
class MyContextManager:
    def __enter__(self):
        # Resource acquisition or initialization
        return self  # Or another related object

    def __exit__(self, exc_type, exc_value, traceback):
        # Resource cleanup or release
        # Exception handling (optional)
        return False  # Returning True suppresses exceptions
```

### Example: File Management

```python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_value, traceback):
        if self.file:
            self.file.close()

# Usage example
with FileManager('example.txt', 'w') as f:
    f.write('Hello, Context Manager!')
```

### Using contextlib

The `@contextmanager` decorator from the `contextlib` module allows for simpler creation of context managers:

```python
from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode):
    try:
        f = open(filename, mode)
        yield f
    finally:
        f.close()

# Usage example
with file_manager('example.txt', 'w') as f:
    f.write('Hello, contextlib!')
```

### Use Cases

- **Database Connection Management**

```python
class DatabaseConnection:
    def __enter__(self):
        self.conn = create_connection()  # Connection creation function
        return self.conn

    def __exit__(self, exc_type, exc_value, traceback):
        self.conn.close()

with DatabaseConnection() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
```

- **Time Measurement**

```python
import time
from contextlib import contextmanager

@contextmanager
def timer():
    start = time.time()
    yield
    end = time.time()
    print(f"Execution time: {end - start} seconds")

with timer():
    # Code to measure time
    time.sleep(2)
```

- **Temporary Directory Management**

```python
import os
import shutil
from contextlib import contextmanager

@contextmanager
def temporary_directory():
    temp_dir = 'temp_dir'
    os.mkdir(temp_dir)
    try:
        yield temp_dir
    finally:
        shutil.rmtree(temp_dir)

with temporary_directory() as temp_dir:
    # Using temporary directory
    with open(f"{temp_dir}/temp_file.txt", 'w') as f:
        f.write("Temporary file content")
```

### Key Benefits

1. **Automated Resource Management**: Automatically handles resource acquisition and release.
2. **Exception Handling**: Exceptions can be handled in the `__exit__` method.
3. **Code Conciseness**: Allows for cleaner code compared to using `try`-`finally` blocks.
4. **Reusability**: The same resource management logic can be reused in multiple places.

Using context managers can reduce many repetitive tasks related to resource management and improve code stability and readability. They can be useful in various situations such as file handling, database connections, network sockets, and lock management.

<br>
<br>

## Metaclasses

Metaclasses are "classes of classes" that control the creation and behavior of classes. They are an advanced Python feature that allows you to modify or extend class definitions themselves.

### Basic Concept

In Python, classes are also objects. Classes are instances of a metaclass called `type`. Metaclasses control the class creation process.

```python
class MyClass:
    pass

print(type(MyClass))  # Output: <class 'type'>
```

### Defining Metaclasses

Metaclasses are typically defined by inheriting from `type`:

```python
class MyMetaclass(type):
    def __new__(cls, name, bases, attrs):
        # Modify class creation process
        return super().__new__(cls, name, bases, attrs)
```

### Using Metaclasses

When defining a class, use the `metaclass` keyword argument to specify the metaclass:

```python
class MyClass(metaclass=MyMetaclass):
    pass
```

### Example: Attribute Validation

An example of using a metaclass to automatically validate class attributes:

```python
class ValidateFields(type):
    def __new__(cls, name, bases, attrs):
        for key, value in attrs.items():
            if key.startswith('_'):  # Don't validate private attributes
                continue
            if not isinstance(value, (int, float, str, bool)):
                raise TypeError(f"{key} must be int, float, str, or bool")
        return super().__new__(cls, name, bases, attrs)

class MyModel(metaclass=ValidateFields):
    name = "John"
    age = 30
    height = 1.75
    is_student = True
    # grades = []  # Uncommenting this line will raise a TypeError
```

### Use Cases

- **Implementing Singleton Pattern**

```python
class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class MyClass(metaclass=Singleton):
    pass

a = MyClass()
b = MyClass()
print(a is b)  # Output: True
```

- **Automatic Property Creation**

```python
class AutoProperty(type):
    def __new__(cls, name, bases, attrs):
        for key, value in attrs.items():
            if not key.startswith('_'):
                attrs[key] = property(lambda self, x=value: x)
        return super().__new__(cls, name, bases, attrs)

class Config(metaclass=AutoProperty):
    host = "localhost"
    port = 8080

config = Config()
print(config.host)  # Output: localhost
```

- **Extending Abstract Base Classes**

```python
from abc import ABCMeta, abstractmethod

class ExtendedABCMeta(ABCMeta):
    def __new__(cls, name, bases, attrs):
        for key, value in attrs.items():
            if callable(value) and not key.startswith('_'):
                attrs[key] = abstractmethod(value)
        return super().__new__(cls, name, bases, attrs)

class MyAbstractClass(metaclass=ExtendedABCMeta):
    def method1(self):
        pass
    def method2(self):
        pass

# MyAbstractClass()  # Uncommenting this line will raise a TypeError
```

### Precautions

1. **Complexity**: Metaclasses are complex. It's better to solve simple problems with decorators or inheritance.

2. **Performance**: They can affect performance as they perform additional processing during class creation.

3. **Debugging**: Problems caused by metaclasses can be difficult to debug.

4. **Compatibility**: Compatibility issues may arise with other libraries or frameworks.

Metaclasses are powerful tools, but they are not frequently used in general programming tasks. They are mainly used in framework or library development, or in cases with very specific requirements. When using metaclasses, their necessity and impact should be carefully considered.

## Data Classes

Data classes are used to create classes for storing data. They are defined using the `@dataclass` decorator and automatically generate special methods like `__init__()`, `__repr__()`, `__eq__()`, etc.

<h4>Note</h4> This feature is available from Python 3.7 onwards.

### Example

In the example below, we define a data class called `Person`:

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    height: float

# Creating an instance of the data class
person = Person("John Doe", 30, 175.5)
print(person)
```

### Result
```text
Person(name='John Doe', age=30, height=175.5)
```

### Characteristics of Data Classes

1. **Automatically Generated Methods**
   - `__init__()`: Initialization method
   - `__repr__()`: String representation method
   - `__eq__()`: Equality comparison method

2. **Creating Immutable Instances**
   ```python
   from dataclasses import dataclass, field

   @dataclass(frozen=True)
   class ImmutablePerson:
       name: str
       age: int = field(compare=False)
   ```

3. **Setting Default Values**
   ```python
   @dataclass
   class Configuration:
       host: str = "localhost"
       port: int = 8000
   ```

### Use Cases

- **Simple Data Modeling**

    ```python
    from dataclasses import dataclass
    from typing import List

    @dataclass
    class Student:
        name: str
        student_id: str
        grades: List[float] = field(default_factory=list)

        def average_grade(self):
            return sum(self.grades) / len(self.grades) if self.grades else 0

    students = [
        Student("Alice", "A001", [85, 90, 88]),
        Student("Bob", "B002", [78, 85, 92])
    ]

    for student in students:
        print(f"{student.name}'s average grade: {student.average_grade():.2f}")
    ```

- **Immutable Configuration Objects**

    ```python
    from dataclasses import dataclass

    @dataclass(frozen=True)
    class DatabaseConfig:
        host: str
        port: int
        username: str
        password: str

    config = DatabaseConfig("localhost", 5432, "user", "password")
    # config.port = 3306  # This line would raise a FrozenInstanceError
    ```

- **JSON Serialization**

    ```python
    from dataclasses import dataclass, asdict
    import json

    @dataclass
    class Point:
        x: float
        y: float

    point = Point(10.5, 20.7)
    json_string = json.dumps(asdict(point))
    print(json_string)
    ```

### Additional Information to Know

- #### Post-Initialization

    You can use the `__post_init__` method to run additional logic after initialization.

    ```python
    from dataclasses import dataclass, field

    @dataclass
    class Rectangle:
        width: float
        height: float
        area: float = field(init=False)

        def __post_init__(self):
            self.area = self.width * self.height

    rect = Rectangle(5, 3)
    print(f"Rectangle area: {rect.area}")  # Output: Rectangle area: 15.0
    ```

Data classes help reduce repetitive code and make it easier to define data-centric classes. They are useful for creating simple data structures or configuration objects, and can greatly improve code readability and maintainability.

<br><br>

## Type Hinting

Type hinting, introduced in Python 3.5, allows you to explicitly specify types for variables, function parameters, and return values. This improves code readability and allows development tools to catch potential bugs in advance.

### Basic Type Hinting

Here's an example of basic type hinting:

```python
def greeting(name: str) -> str:
    return f"Hello, {name}!"

age: int = 30
pi: float = 3.14
is_python_fun: bool = True

# Function call
message: str = greeting("Alice")
print(message)
```

### Result
```text
Hello, Alice!
```

### Features of Type Hinting

1. **Generics**
   
   Generics allow you to write reusable code for different types.

   ```python
   from typing import List, Dict, TypeVar

   T = TypeVar('T')

   def first_element(lst: List[T]) -> T:
       return lst[0]

   numbers: List[int] = [1, 2, 3]
   names: List[str] = ["Alice", "Bob", "Charlie"]

   print(first_element(numbers))  # Output: 1
   print(first_element(names))    # Output: Alice
   ```

2. **Type Aliases**
   
   Type aliases allow you to refer to complex types more simply.

   ```python
   from typing import Dict, List, Tuple

   Vector = List[float]
   Matrix = List[Vector]

   def dot_product(v1: Vector, v2: Vector) -> float:
       return sum(x * y for x, y in zip(v1, v2))

   vector1: Vector = [1.0, 2.0, 3.0]
   vector2: Vector = [4.0, 5.0, 6.0]
   result: float = dot_product(vector1, vector2)
   print(f"Dot product: {result}")
   ```

3. **Protocols**
   
   Protocols support structural subtyping. You can define objects with specific methods or attributes.

   ```python
   from typing import Protocol

   class Drawable(Protocol):
       def draw(self) -> None: ...

   class Circle:
       def draw(self) -> None:
           print("Drawing a circle")

   class Square:
       def draw(self) -> None:
           print("Drawing a square")

   def draw_shape(shape: Drawable) -> None:
       shape.draw()

   circle: Circle = Circle()
   square: Square = Square()

   draw_shape(circle)  # Output: Drawing a circle
   draw_shape(square)  # Output: Drawing a square
   ```

### Use Cases

- **Function Overloading**

    ```python
    from typing import overload, Union

    @overload
    def process_data(data: str) -> str: ...

    @overload
    def process_data(data: int) -> int: ...

    def process_data(data: Union[str, int]) -> Union[str, int]:
        if isinstance(data, str):
            return data.upper()
        elif isinstance(data, int):
            return data * 2

    result1: str = process_data("hello")
    result2: int = process_data(5)
    print(result1, result2)  # Output: HELLO 10
    ```

- **Optional Types**

    ```python
    from typing import Optional

    def find_user(user_id: int) -> Optional[str]:
        users = {1: "Alice", 2: "Bob"}
        return users.get(user_id)

    user: Optional[str] = find_user(1)
    if user is not None:
        print(f"Found user: {user}")
    else:
        print("User not found")
    ``` 

- **Callable Types**

    ```python
    from typing import Callable

    def apply_operation(x: int, y: int, operation: Callable[[int, int], int]) -> int:
        return operation(x, y)

    def add(a: int, b: int) -> int:
        return a + b

    result: int = apply_operation(5, 3, add)
    print(f"Result: {result}")  # Output: Result: 8
    ```

### Additional Information to Know

- #### Type Checking Tools

    You can use static type checking tools like mypy to check the consistency of type hints.

    ```python
    # example.py
    def greet(name: str) -> str:
        return "Hello, " + name

    greet(42)  # Type error
    ```

    ```bash
    $ mypy example.py
    example.py:4: error: Argument 1 to "greet" has incompatible type "int"; expected "str"
    ```

Type hinting helps clarify code intent and reduce potential errors without compromising Python's dynamic typing nature.

<br><br>

## Functional Programming Techniques

Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. While Python doesn't fully support functional programming, it offers many functional programming techniques.

### Lambda Functions

Lambda functions are anonymous functions useful for simple operations.

```python
# Regular function definition
def add(x, y):
    return x + y

# Equivalent lambda function
add_lambda = lambda x, y: x + y

print(add(3, 5))        # Output: 8
print(add_lambda(3, 5)) # Output: 8
```

### map, filter, reduce Functions

These functions implement core concepts of functional programming.

1. **map Function**

   `map` applies a function to all elements of an iterable.

   ```python
   numbers = [1, 2, 3, 4, 5]
   squared = list(map(lambda x: x**2, numbers))
   print(squared)  # Output: [1, 4, 9, 16, 25]
   ```

2. **filter Function**

   `filter` selects elements from an iterable that satisfy a specific condition.

   ```python
   numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
   print(even_numbers)  # Output: [2, 4, 6, 8, 10]
   ```

3. **reduce Function**

   `reduce` accumulates the elements of an iterable into a single result.

   ```python
   from functools import reduce

   numbers = [1, 2, 3, 4, 5]
   sum_all = reduce(lambda x, y: x + y, numbers)
   print(sum_all)  # Output: 15
   ```

### Functional Programming Library (functools)

The `functools` module provides tools for working with higher-order functions and operations on callable objects.

1. **partial Function**

   `partial` creates a new function with some arguments pre-filled.

   ```python
   from functools import partial

   def multiply(x, y):
       return x * y

   double = partial(multiply, 2)
   print(double(4))  # Output: 8
   ```

2. **lru_cache Decorator**

   `lru_cache` memoizes function results to improve performance for repeated calls.

   ```python
   from functools import lru_cache

   @lru_cache(maxsize=None)
   def fibonacci(n):
       if n < 2:
           return n
       return fibonacci(n-1) + fibonacci(n-2)

   print(fibonacci(100))  # Calculates quickly
   ```

### Use Cases

- **Data Processing Pipeline**

  You can build data processing pipelines using functional programming techniques.

  ```python
  def read_data(filename):
      with open(filename, 'r') as f:
          return f.readlines()

  def parse_data(lines):
      return [line.strip().split(',') for line in lines]

  def filter_data(data):
      return filter(lambda x: int(x[1]) > 25, data)

  def format_output(data):
      return map(lambda x: f"{x[0]} is {x[1]} years old", data)

  # Execute pipeline
  pipeline = compose(format_output, filter_data, parse_data, read_data)
  result = list(pipeline('data.txt'))
  print(result)
  ```

- **Function Composition**

  Combine multiple functions to create a new function.

  ```python
  def compose(*functions):
      def inner(arg):
          for f in reversed(functions):
              arg = f(arg)
          return arg
      return inner

  def add_one(x):
      return x + 1

  def double(x):
      return x * 2

  f = compose(double, add_one)
  print(f(3))  # Output: 8 ((3 + 1) * 2)
  ```

### Additional Information to Know

- **Immutability**

  Functional programming emphasizes data immutability. In Python, you can use immutable data structures like tuples and frozensets.

  ```python
  # Use tuple instead of mutable list
  immutable_list = (1, 2, 3, 4, 5)
  
  # Immutable set
  immutable_set = frozenset([1, 2, 3])
  ```

Functional programming techniques can improve code readability, reusability, and reduce side effects. They are particularly useful in data processing and parallel programming. In Python, you can combine these techniques with imperative programming to write more flexible and efficient code.