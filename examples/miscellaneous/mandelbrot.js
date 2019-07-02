function draw(color) {
  // Sorry, but I do not have switch yet, neither the member expression for access chars
  if (color === 0) print " ";
  if (color === 1) print ".";
  if (color === 2) print ",";
  if (color === 3) print ":";
  if (color === 4) print ";";
  if (color === 5) print "i";
  if (color === 6) print "1";
  if (color === 7) print "t";
  if (color === 8) print "f";
  if (color === 9) print "L";
}

const WIDTH = 208;
const HEIGHT = 46;
const X_MIN = -2.5;
const X_MAX = 1;
const Y_MIN = -1;
const Y_MAX = 1;

for (let x0 = X_MIN; x0 <= X_MAX; x0 += 1 / WIDTH) {
  for (let y0 = Y_MIN; y0 <= Y_MAX; y0 += 1 / HEIGHT) {
    let x = 0;
    let y = 0;
    let iteration = 0;
    let maxIteration = 100;
    while (x * x + y * y <= 2 * 2 && iteration < maxIteration) {
      let xTemp = x * x - y * y + x0;
      y = 2 * x * y + y0;
      x = xTemp;
      iteration += 1;
    }

    draw(iteration % 10);
  }
}
