class Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class Square extends Shape {
  // takes sideLength, and uses it as => (width, height)
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
}

class Rectangle extends Shape {
  // (width, height)
  constructor(width, height) {
    super(width, height);
  }
}

class Triangle extends Shape {
  // (width, height)
  constructor(height) {
    super(0, height);
  }
}

class Circle extends Shape {
  // (width, height)
  constructor(radius) {
    super(2 * radius, 2 * radius);
  }
}
