let first = 0;
let second = 1;
let index = 20;

print first;
print second;

while (index > 0) {
  let result = first + second;
  first = second;
  second = result;
  index -= 1;

  print result;
}
