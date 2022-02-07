/**
 * ! need to find out how to sanitize the inputs to only accept numbers > 0 to 500, and both params under 250 for circles
 * todo - get some nice styling
 * todo - draw shapes in the shapeContainer
 * todo - Clicking on any shape should call a method named describe(), which should update the statistics in the sidepanel in index.html
 * todo - Double clicking on any shape should remove the shape from the screen
 * todo - Every shape draws itself when it is created. The shape will be drawn according to the size specified when the shape was created
 * todo - and the shape will be placed in a random location within the shape canvas
 * * - Circles should be purple, Squares should be red, Triangles should be yellow, and Rectangles should be green
 * * - clearing input after submitting => //? selector.val('') sets the value to an empty string, which will show the placeholder html text
 */

class Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.calculateArea();
  }

  calculateArea() {
    return this.width * this.height;
  }

  //   resize(width, height) {
  //     this.width = width;
  //     this.height = height;
  //   }
  describe() {}
}

class Square extends Shape {
  // takes sideLength, and uses it as => (width, height)
  // area does not need to be changed
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
}

class Rectangle extends Shape {
  // (width, height)
  // area does not need to be changed

  constructor(width, height) {
    super(width, height);
  }
}

class Triangle extends Shape {
  // (0, height) to comply with css styling for right isosceles
  // needs to call area, then divide by 2

  constructor(height) {
    super(0, height);
  }
}

class Circle extends Shape {
  // takes radius, which is then doubled and passed as => (width, height)
  // area needs to take either width or height, then divide by 2 to get back to radius, then * radius * pi
  constructor(radius) {
    super(2 * radius, 2 * radius);
  }

  calculateArea() {
    const radius = this.width / 2;

    return Math.PI * radius * radius;
  }

  //   resize(radius) {
  //     super.resize(2 * radius, 2 * radius);
  //   }
}

let rectangleHeightBox = $(`#rectangleHeightBox`);
let rectangleWidthBox = $(`#rectangleWidthBox`);
let rectangleButton = $(`#rectangleButton`);

let squareBox = $(`#squareBox`);
let squareButton = $(`#squareButton`);

let circleBox = $(`#circleBox`);
let circleButton = $(`#circleButton`);

let triangleBox = $(`#triangleBox`);
let triangleButton = $(`#triangleButton`);

let shapes = [];

rectangleButton.click(() => {
  // creates a new instance of a Rectangle
  let newRect = new Rectangle(rectangleWidthBox.val(), rectangleHeightBox.val());
  console.log(newRect); //* logging
  rectangleWidthBox.val(""); // clears the inputs
  rectangleHeightBox.val(""); // clears the inputs
});

squareButton.click(() => {
  // creates a new instance of a Square
  let newSquare = new Square(squareBox.val());
  console.log(newSquare); //* logging
  squareBox.val(""); // clears the inputs
});

circleButton.click(() => {
  // creates a new instance of a Circle
  let newCircle = new Circle(circleBox.val());
  console.log(newCircle); //* logging
  circleBox.val(""); // clears the inputs
});

triangleButton.click(() => {
  // creates a new instance of a Triangle
  let newTriangle = new Triangle(triangleBox.val());
  console.log(newTriangle); //* logging
  triangleBox.val(""); // clears the inputs
});
