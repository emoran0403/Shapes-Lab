/**
 * todo - get some nice styling
 * todo - draw shapes in the shapeContainer
 * todo - Clicking on any shape should call a method named describe(), which should update the statistics in the sidepanel in index.html
 * todo - Double clicking on any shape should remove the shape from the screen
 * todo - Every shape draws itself when it is created. The shape will be drawn according to the size specified when the shape was created
 * todo - and the shape will be placed in a random location within the shape canvas
 * todo - set shape dimensions with inline styling??
 * * - Circles should be purple, Squares should be red, Triangles should be yellow, and Rectangles should be green
 * * - clearing input after submitting => //? selector.val('') sets the value to an empty string, which will show the placeholder html text
 * * - need to find out how to sanitize the inputs to only accept numbers > 0 to 500, and both params under 250 for circles
 * => only numerical input is accepted, need to further check for numbers within a range that disallows drawing a shape outside the box
 */

class Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.div = document.createElement(`div`);
    shapeContainer.append(this.div);
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
    this.div.style.height = `${sideLength}px`;
    this.div.style.width = `${sideLength}px`;
    this.div.classList.add(`square`);
  }
}

class Rectangle extends Shape {
  // (width, height)
  // area does not need to be changed

  constructor(width, height) {
    super(width, height);
    this.div.style.height = `${height}px`;
    this.div.style.width = `${width}px`;
    this.div.classList.add(`rectangle`);
  }
}

class Circle extends Shape {
  // takes radius, which is then doubled and passed as => (width, height)
  // area needs to take either width or height, then divide by 2 to get back to radius, then * radius * pi
  constructor(radius) {
    super(2 * radius, 2 * radius);
    this.div.style.height = `${radius}px`;
    this.div.style.width = `${radius}px`;
    this.div.classList.add(`circle`);
  }

  calculateArea() {
    const radius = this.width / 2;
    return Math.trunc(Math.PI * radius * radius * 100) / 100;
  }

  //   resize(radius) {
  //     super.resize(2 * radius, 2 * radius);
  //   }
}

class Triangle extends Shape {
  // (0, height) to comply with css styling for right isosceles
  // needs to call area, then divide by 2

  constructor(height) {
    super(0, height);
    this.div.style.borderRight = `${height}px solid transparent`;
    this.div.style.borderBottom = `${height}px solid yellow`;
    // this.div.css(border)
    this.div.classList.add(`triangle`);
  }

  calculateArea() {
    return 0.5 * this.height * this.height;
  }
}

let shapeContainer = $(`#shapeContainer`);

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
  if (onlyNums(rectangleWidthBox.val()) && onlyNums(rectangleHeightBox.val())) {
    let newRect = new Rectangle(decimalCorrector(rectangleWidthBox.val()), decimalCorrector(rectangleHeightBox.val()));
    console.log(newRect); //* logging
    clearInputs();
  }
});

squareButton.click(() => {
  // creates a new instance of a Square
  if (onlyNums(squareBox.val())) {
    let newSquare = new Square(decimalCorrector(squareBox.val()));
    console.log(newSquare); //* logging
    clearInputs();
  }
});

circleButton.click(() => {
  // creates a new instance of a Circle
  if (onlyNums(circleBox.val())) {
    let newCircle = new Circle(decimalCorrector(circleBox.val()));
    console.log(newCircle); //* logging
    clearInputs();
  }
});

triangleButton.click(() => {
  // creates a new instance of a Triangle
  if (onlyNums(triangleBox.val())) {
    let newTriangle = new Triangle(decimalCorrector(triangleBox.val()));
    console.log(newTriangle); //* logging
    clearInputs();
  }
});

//*********************************************************************** Functions ****************************************************/

function onlyNums(str) {
  // return true when input is a string containing a number within acceptable values (0.01-250)
  if (typeof str != "string") {
    notNumFail();
    return false; // fails here if input is not a string
  }
  if (str <= 0.09) {
    tooSmallFail();
    return false; // fails here when input is too small
  }
  if (str > 249.99) {
    tooBigFail();
    return false; // fails here when input is too big
  }
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

let notNumFail = function () {
  // this fires when the user attempts to input something nonnumerical
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Numbers only please!",
    footer: '<a href="https://en.wikipedia.org/wiki/Number">Why do I have this issue?</a>',
  });
};

let tooSmallFail = function () {
  // this fires when the user attempts to input something nonnumerical
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Please enter a number from 0.1 or greater",
    footer: '<a href="https://en.wikipedia.org/wiki/Number">Why do I have this issue?</a>',
  });
};

let tooBigFail = function () {
  // this fires when the user attempts to input something nonnumerical
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Please enter a number smaller than 250",
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

let decimalCorrector = function (num) {
  // this takes input and sets it to 2 decimal places
  let floatNum = parseFloat(num); // sets floatNum to a decimal number
  let twoPlaces = floatNum.toFixed(2); // rounds floatNum to 2 decimal places

  return twoPlaces;
};
