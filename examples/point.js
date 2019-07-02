class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  sumX(ref) {
    return this.x + ref.x;
  }

  sumY(ref) {
    return this.y + ref.y;
  }
}

const point1 = new Point(1, 2);
const point2 = new Point(3, 4);

print "point1.x + point2.x = " + point1.sumX(point2);
print "point1.y + point2.y = " + point1.sumY(point2);
