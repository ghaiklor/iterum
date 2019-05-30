function fibonacci(num) {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}

for (let i = 0; i < 20; i += 1) {
  print fibonacci(i);
}
