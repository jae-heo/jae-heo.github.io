---
layout: post
title: "Python 고수의 길"
subtitle: "Python 고수가 되려면 어떻게 해야할까요?"
date: 2024-07-13 12:00:00 +0900
last_modified_at: 2024-07-09 12:00:00 +0900
categories: ["tutorial"]
tags: ["python"]
lang: ko
---

## 목차

1. [배경](#배경)
2. [데코레이터 (Decorator)](#데코레이터-decorator)
   - [예시](#예시)
   - [응용사례](#응용사례)
   - [추가 정보: wraps](#추가적으로-알아두면-좋은-정보)
3. [제너레이터 (Generator)](#제너레이터-generator)
   - [예시](#예시-1)
   - [제너레이터의 특징](#제너레이터의-특징)
   - [응용사례](#응용사례-1)
   - [추가 정보](#추가적으로-알아두면-좋은-정보-1)
4. [컨텍스트 매니저 (Context Manager)](#컨텍스트-매니저-context-manager)
   - [기본 구조](#기본-구조)
   - [예시: 파일 관리](#예시-파일-관리)
   - [contextlib 사용](#contextlib-사용)
   - [응용 사례](#응용-사례)
   - [주요 이점](#주요-이점)
5. [메타클래스 (Metaclasses)](#메타클래스-metaclasses)
   - [기본 개념](#기본-개념)
   - [메타클래스 정의](#메타클래스-정의)
   - [메타클래스 사용](#메타클래스-사용)
   - [예시: 속성 검증](#예시-속성-검증)
   - [응용 사례](#응용-사례-1)
   - [주의사항](#주의사항)


<br>
<br>

## 배경

Python에서는 여러 심화된 기능들을 제공합니다. 아쉽게도 필자는 이러한 기능들을 배우기는 했어도 실제로 사용해 볼 경험은 크게 없었습니다. 물론 원리를 아는 것 만으로도 여러 라이브러리/프레임워크에 대한 이해도가 많이 올라가지만, 실제 응용 사례까지 알게된다면 Python을 더욱 알차게 사용할 수 있을 것이라 기대합니다.

이 글에서는 심화 기능들에 대하여 다시한번 정리하고 응용방법까지 알아보겠습니다.

<br>
<br>

## 데코레이터 (Decorator)

데코레이터는 다른 함수의 기능에 부가적인 기능, 작업을 추가하는 함수입니다. 이 기능을 사용하면 실제 함수의 코드를 변경하지 않고도 해당 함수에 기능을 추가할 수 있습니다.

### 예시

아래의 예시에서는 log_function_call 이라는 함수가 greet 함수의 decorator로 사용됩니다. 

```python

# Decorator 함수에서는 내부적으로 wrapper라는 함수를 정의하고 해당 함수를 return하게 됩니다.
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"함수 호출: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

# greet의 함수가 호출될 때 log_function_call 함수를 
# 데코레이터로 사용한다는 것을 @log_function_call 로 표현합니다.
@log_function_call
def greet(name):
    print(f"안녕하세요, {name}님!")

greet("재영")
```

### 결과
```text
함수 호출: greet
안녕하세요, 재영님!
```

### 응용사례

- **로깅**

```python
import logging

logging.basicConfig(level=logging.INFO)

def log_function_call(func):
    def wrapper(*args, **kwargs):
        logging.info(f"함수 호출: {func.__name__}")
        try:
            result = func(*args, **kwargs)
            logging.info(f"함수 {func.__name__} 정상 종료")
            return result
        except Exception as e:
            logging.error(f"함수 {func.__name__}에서 에러 발생: {str(e)}")
            raise
    return wrapper

@log_function_call
def divide(a, b):
    return a / b

# 정상 케이스
divide(10, 2)

# 에러 케이스
try:
    divide(10, 0)
except ZeroDivisionError:
    pass
```

- **인증**

```python
def req_auth(func):
    def wrapper(*args, **kwargs):
        if not is_authenticated():  # 인증 확인 함수 (별도 구현 필요)
            raise PermissionError("인증이 필요합니다.")
        return func(*args, **kwargs)
    return wrapper

@req_auth
def sensitive_operation():
    print("중요한 작업 수행")

sensitive_operation()  # 인증되지 않은 경우 PermissionError 발생
```

- **캐싱**

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

print(fibonacci(100))  # 첫 실행은 느리지만, 이후 동일한 입력에 대하여 빠르게 응답
```

- **재시도**

```python
import time

# 데코레이터에서 인자를 받고싶으면 함수를 3중으로 작성해야합니다.
# 이를 데코레이터 팩토리라고 칭합니다.
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
                    print(f"오류 발생: {e}. {delay}초 후 재시도...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=2)
def unstable_network_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("네트워크 오류")
    return "성공"

print(unstable_network_call())
```

### 추가적으로 알아두면 좋은 정보

- #### wraps

wraps는 Python의 functools 모듈에서 제공하는 데코레이터로, 몇 가지 작업을 수행합니다.
1. 메타데이터 보존 - wraps는 원본 함수의 메타데이터(이름, 문서열, 인자 목록 등)를 데코레이터에 의해 래핑된 함수로 복사합니다.
2. 디버깅 및 내부 검사 지원 - 이를 통해 디버깅 도구와 내부 검사 기능이 원본 함수의 정보를 올바르게 표시할 수 있게 됩니다.
3. 문서화 유지 - 원본 함수의 독스트링(docstring)을 보존하여, 문서 생성 도구가 정확한 정보를 제공할 수 있게 합니다.

**문제 예시**

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        """wrapper 함수가 호출되었습니다."""
        result = func(*args, **kwargs)
        return result
    return wrapper

@my_decorator
def say_hello():
    """say_hello 함수가 호출되었습니다."""
    print("안녕하세요.")

print(say_hello.__name__)  # 출력: wrapper
print(say_hello.__doc__)   # 출력: wrapper 함수가 호출되었습니다.
```

**해결 예시**

```python
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        """wrapper 함수가 호출되었습니다."""
        result = func(*args, **kwargs)
        return result
    return wrapper

@my_decorator
def say_hello():
    """say_hello 함수가 호출되었습니다."""
    print("Hello!")

print(say_hello.__name__)  # 출력: say_hello
print(say_hello.__doc__)   # 출력: say_hello 함수가 호출되었습니다.
```

<br>
<br>

## 제너레이터 (Generator)

제너레이터는 이터레이터를 생성하는 함수입니다. 일반 함수와 달리 `yield` 키워드를 사용하여 값을 하나씩 반환합니다. 이를 통해 메모리를 효율적으로 사용하고, 큰 데이터셋을 다룰 때 유용합니다.

### 예시

아래의 예시에서는 `fibonacci` 함수가 제너레이터로 구현되어 있습니다.

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 제너레이터 사용
for num in fibonacci(10):
    print(num)
```

### 결과
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

### 제너레이터의 특징

1. **지연 평가 (Lazy Evaluation)**: 값을 미리 계산하지 않고, 필요할 때마다 계산합니다.
2. **메모리 효율성**: 모든 값을 한 번에 메모리에 저장하지 않아 메모리 사용량이 적습니다.
3. **무한 시퀀스**: 이론적으로 무한한 시퀀스를 표현할 수 있습니다.

### 응용사례

- **대용량 파일 읽기**

```python
def read_large_file(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            yield line.strip()

for line in read_large_file('large_file.txt'):
    print(line)
```

- **무한 시퀀스 생성**

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

- **데이터 변환 파이프라인**

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

### 추가적으로 알아두면 좋은 정보

- #### 제너레이터 표현식

리스트 컴프리헨션과 유사하지만 소괄호 `()` 를 사용하여 제너레이터를 생성할 수 있습니다. 이때 장점은 공간복잡도를 절약할 수 있습니다.

```python
# 리스트 컴프리헨션
squares_list = [x**2 for x in range(10)]

# 제너레이터 표현식
squares_gen = (x**2 for x in range(10))

print(squares_list)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(squares_gen)   # <generator object <genexpr> at 0x...>

for num in squares_gen:
    print(num)
```

- #### send 메서드

제너레이터의 `send` 메서드를 사용하면 제너레이터 내부로 값을 전달할 수 있습니다.

```python
def echo_generator():
    while True:
        received = yield
        print(f"Received: {received}")

gen = echo_generator()
next(gen)  # 제너레이터 초기화
gen.send("Hello")
gen.send("World")
```

- #### 양방향 통신

```python
# 이 메커니즘을 이해하면 제너레이터를 사용한 복잡한 코루틴 패턴을 구현할 수 있습니다.

def two_way_generator():
    while True:
        received = yield "입력을 받을 준비가 되었습니다."
        print(f"받은 입력: {received}")

gen = two_way_generator()
print(next(gen))  # 출력: 입력을 받을 준비가 되었습니다.
print(gen.send("안녕하세요"))  # 출력: 받은 입력: 안녕하세요
                            # 입력을 받을 준비가 되었습니다.
```

제너레이터는 파이썬에서 메모리 효율적인 프로그래밍을 가능하게 하는 강력한 도구입니다. 대용량 데이터 처리, 스트리밍 작업, 혹은 무한 시퀀스 생성 등 다양한 상황에서 유용하게 사용될 수 있습니다.

<br>
<br>

## 컨텍스트 매니저 (Context Manager)

컨텍스트 매니저는 리소스의 획득과 반환을 관리하는 객체입니다. 주로 `with` 문과 함께 사용되며, 코드 블록 실행 전후에 특정 동작을 수행할 수 있게 해줍니다. 이를 통해 리소스 관리를 더 안전하고 편리하게 할 수 있습니다.

### 기본 구조

컨텍스트 매니저는 `__enter__`와 `__exit__` 메서드를 구현해야 합니다:

```python
class MyContextManager:
    def __enter__(self):
        # 리소스 획득 또는 초기화
        return self  # 또는 다른 관련 객체

    def __exit__(self, exc_type, exc_value, traceback):
        # 리소스 정리 또는 해제
        # 예외 처리 (선택적)
        return False  # True를 반환하면 예외를 억제함
```

### 예시: 파일 관리

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

# 사용 예
with FileManager('example.txt', 'w') as f:
    f.write('Hello, Context Manager!')
```

### contextlib 사용

`contextlib` 모듈의 `@contextmanager` 데코레이터를 사용하면 더 간단하게 컨텍스트 매니저를 만들 수 있습니다:

```python
from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode):
    try:
        f = open(filename, mode)
        yield f
    finally:
        f.close()

# 사용 예
with file_manager('example.txt', 'w') as f:
    f.write('Hello, contextlib!')
```

### 응용 사례

- **데이터베이스 연결 관리**

```python
class DatabaseConnection:
    def __enter__(self):
        self.conn = create_connection()  # 연결 생성 함수
        return self.conn

    def __exit__(self, exc_type, exc_value, traceback):
        self.conn.close()

with DatabaseConnection() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
```

- **시간 측정**

```python
import time
from contextlib import contextmanager

@contextmanager
def timer():
    start = time.time()
    yield
    end = time.time()
    print(f"실행 시간: {end - start} 초")

with timer():
    # 시간을 측정할 코드
    time.sleep(2)
```

- **임시 디렉토리 관리**

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
    # 임시 디렉토리 사용
    with open(f"{temp_dir}/temp_file.txt", 'w') as f:
        f.write("임시 파일 내용")
```

### 주요 이점

1. **자원 관리 자동화**: 리소스의 획득과 해제를 자동으로 처리합니다.
2. **예외 처리**: `__exit__` 메서드에서 예외를 처리할 수 있습니다.
3. **코드 간결성**: `try`-`finally` 블록을 사용하는 것보다 더 깔끔한 코드를 작성할 수 있습니다.
4. **재사용성**: 동일한 리소스 관리 로직을 여러 곳에서 재사용할 수 있습니다.

컨텍스트 매니저를 사용하면 리소스 관리와 관련된 많은 반복적인 작업을 줄일 수 있으며, 코드의 안정성과 가독성을 높일 수 있습니다. 파일 처리, 데이터베이스 연결, 네트워크 소켓, 락(lock) 관리 등 다양한 상황에서 유용하게 활용될 수 있습니다.

<br>
<br>

## 메타클래스 (Metaclasses)

메타클래스는 "클래스의 클래스"로, 클래스의 생성과 동작을 제어하는 고급 Python 기능입니다. 메타클래스를 사용하면 클래스 정의 자체를 수정하거나 확장할 수 있습니다.

### 기본 개념

Python에서 클래스도 객체입니다. 클래스는 `type`이라는 메타클래스의 인스턴스입니다. 메타클래스는 클래스의 생성 프로세스를 제어합니다.

```python
class MyClass:
    pass

print(type(MyClass))  # 출력: <class 'type'>
```

### 메타클래스 정의

메타클래스는 보통 `type`을 상속받아 정의합니다:

```python
class MyMetaclass(type):
    def __new__(cls, name, bases, attrs):
        # 클래스 생성 과정 수정
        return super().__new__(cls, name, bases, attrs)
```

### 메타클래스 사용

클래스를 정의할 때 `metaclass` 키워드 인자를 사용하여 메타클래스를 지정합니다:

```python
class MyClass(metaclass=MyMetaclass):
    pass
```

### 예시: 속성 검증

메타클래스를 사용하여 클래스 속성을 자동으로 검증하는 예:

```python
class ValidateFields(type):
    def __new__(cls, name, bases, attrs):
        for key, value in attrs.items():
            if key.startswith('_'):  # 비공개 속성은 검증하지 않음
                continue
            if not isinstance(value, (int, float, str, bool)):
                raise TypeError(f"{key} must be int, float, str, or bool")
        return super().__new__(cls, name, bases, attrs)

class MyModel(metaclass=ValidateFields):
    name = "John"
    age = 30
    height = 1.75
    is_student = True
    # grades = []  # 이 줄의 주석을 해제하면 TypeError 발생
```

### 응용 사례

- **싱글톤 패턴 구현**

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
print(a is b)  # 출력: True
```

- **자동 프로퍼티 생성**

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
print(config.host)  # 출력: localhost
```

- **추상 베이스 클래스 확장**

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

# MyAbstractClass()  # 이 줄의 주석을 해제하면 TypeError 발생
```

### 주의사항

1. **복잡성**: 메타클래스는 복잡합니다. 간단한 문제는 데코레이터나 상속으로 해결하는 것이 좋습니다.

2. **성능**: 클래스 생성 시 추가적인 처리를 수행하므로 성능에 영향을 줄 수 있습니다.

3. **디버깅**: 메타클래스로 인한 문제는 디버깅이 어려울 수 있습니다.

4. **호환성**: 다른 라이브러리나 프레임워크와의 호환성 문제가 발생할 수 있습니다.

메타클래스는 강력한 도구이지만, 일반적인 프로그래밍 작업에서는 자주 사용되지 않습니다. 주로 프레임워크나 라이브러리 개발, 또는 매우 특수한 요구사항이 있는 경우에 사용됩니다. 메타클래스를 사용할 때는 그 필요성과 영향을 신중히 고려해야 합니다.