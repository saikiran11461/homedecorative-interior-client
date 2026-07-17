"""Sample Python script.

This is a placeholder file demonstrating basic Python syntax.
"""


def greet(name: str) -> str:
    return f"Hello, {name}!"


def fibonacci(n: int) -> list[int]:
    sequence: list[int] = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence


if __name__ == "__main__":
    print(greet("World"))
    print("First 10 Fibonacci numbers:", fibonacci(10))