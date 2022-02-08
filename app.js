/**
 * todo - get some nice styling
 * todo - draw shapes in the shapeContainer
 * todo - Clicking on any shape should call a method named describe(), which should update the statistics in the sidepanel in index.html
 * todo - Double clicking on any shape should remove the shape from the screen
 * todo - Every shape draws itself when it is created. The shape will be drawn according to the size specified when the shape was created
 * todo - and the shape will be placed in a random location within the shape canvas
 * * - Circles should be purple, Squares should be red, Triangles should be yellow, and Rectangles should be green
 * * - clearing input after submitting => //? selector.val('') sets the value to an empty string, which will show the placeholder html text
 * ! - need to find out how to sanitize the inputs to only accept numbers > 0 to 500, and both params under 250 for circles
 * => only numerical input is accepted, need to further check for numbers within a range that disallows drawing a shape outside the box
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

  calculateArea() {
    return 0.5 * this.height * this.height;
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
    return Math.trunc(Math.PI * radius * radius * 100) / 100;
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
  if (isNumeric(rectangleWidthBox.val()) && isNumeric(rectangleHeightBox.val())) {
    // creates a new instance of a Rectangle
    let newRect = new Rectangle(rectangleWidthBox.val(), rectangleHeightBox.val());
    console.log(newRect); //* logging
    clearInputs();
  } else {
    failMessage();
  }
});

squareButton.click(() => {
  if (isNumeric(squareBox.val())) {
    // creates a new instance of a Square
    let newSquare = new Square(squareBox.val());
    console.log(newSquare); //* logging
    clearInputs();
  } else {
    failMessage();
  }
});

circleButton.click(() => {
  if (isNumeric(circleBox.val())) {
    // creates a new instance of a Circle
    let newCircle = new Circle(circleBox.val());
    console.log(newCircle); //* logging
    clearInputs();
  } else {
    failMessage();
  }
});

triangleButton.click(() => {
  // creates a new instance of a Triangle

  if (isNumeric(triangleBox.val())) {
    let newTriangle = new Triangle(triangleBox.val());
    console.log(newTriangle); //* logging
    clearInputs();
  } else {
    failMessage();
  }
});

//*********************************************************************** Functions ****************************************************/

function isNumeric(str) {
  // return true when input is a string containing a number and only a number
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

let failMessage = function () {
  // this fires when the user attempts to input something nonnumerical
  Swal.fire({
    icon: "error",
    title: "Numbers only please!",
    text: "...and also check that you filled in both inputs for the rectangle!",
    footer: '<a href="https://en.wikipedia.org/wiki/Number">Why do I have this issue?</a>',
  });
};

let clearInputs = function () {
  // clears the inputs of all boxes
  rectangleWidthBox.val("");
  rectangleHeightBox.val("");
  squareBox.val("");
  circleBox.val("");
  triangleBox.val("");
};
