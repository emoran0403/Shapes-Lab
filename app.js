/**
 * * - get some nice styling
 * * - Clicking on any shape should call a method named describe(), which should update the statistics in the sidepanel in index.html
 * * - Double clicking on any shape should remove the shape from the screen
 * * - draw shapes in the shapeContainer
 * * - Every shape draws itself when it is created. The shape will be drawn according to the size specified when the shape was created
 * * - and the shape will be placed in a random location within the shape canvas
 * * - set shape dimensions with inline styling??
 * * - Circles should be purple, Squares should be red, Triangles should be yellow, and Rectangles should be green
 * * - clearing input after submitting => //? selector.val('') sets the value to an empty string, which will show the placeholder html text
 * * - need to find out how to sanitize the inputs to only accept numbers > 0 to 500, and both params under 250 for circles
 * => only numerical input is accepted, need to further check for numbers within a range that disallows drawing a shape outside the box
 */

class Shape {
  static id = 0;

  static randomPosition(sizeOffSet) {
    let somePosition = Math.floor(Math.random() * (601 - sizeOffSet));
    return `${somePosition}px`;
  }

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.id = Shape.id++;
    this.div = $(`<div id="${this.id}">`);
    this.div.css("left", Shape.randomPosition(this.width));
    this.div.css("top", Shape.randomPosition(this.height));
    this.div.css("height", `${height}px`);
    this.div.css("width", `${width}px`);
    this.div.click(() => this.describe());
    this.div.dblclick(() => this.doubleClick());
    shapeContainer.append(this.div);
  }

  // testFunc() {
  //   console.log(`click testfunc is working`);
  // }

  // my next challenge is playing with the numbers to make sure there are no shapes going outside the border
  get area() {
    return this.calculateArea();
  }

  calculateArea() {
    return this.width * this.height;
  }

  get perimeter() {
    return this.calculatePerimeter();
  }

  calculatePerimeter() {
    return 2 * this.width + 2 * this.height;
  }

  describe() {
    navName.text(`Shape Name: ${this.name}`);

    if (this.name === `Triangle`) {
      navWidth.text(`Width: ${this.height}px`);
    } else {
      navWidth.text(`Width: ${this.width}px`);
    }

    navHeight.text(`Height: ${this.height}px`);

    if (this.name === `Circle`) {
      navRadius.text(`Radius: ${this.width / 2}`);
      navPerimeter.text(`Circumference: ${this.perimeter}px`);
    } else {
      navRadius.text(`Radius: n/a`);
      navPerimeter.text(`Perimeter: ${this.perimeter}px`);
    }

    navArea.text(`Area: ${this.area}px²`);

    // console.log(`single click worked!`); //*logging
  }

  doubleClick() {
    this.div.remove();
    navName.text(`Shape Name: `);
    navWidth.text(`Width: `);
    navHeight.text(`Height: `);
    navRadius.text(`Radius: `);
    navPerimeter.text(`Perimeter: `);
    navArea.text(`Area: `);

    // console.log(`double click worked!`); //*logging
  }
}

class Square extends Shape {
  // takes sideLength, and uses it as => (width, height)
  // area does not need to be changed
  constructor(sideLength) {
    super(sideLength, sideLength);
    // this.div.style.height = `${sideLength}px`;
    // this.div.style.width = `${sideLength}px`;
    this.div.addClass(`square shape`);
    this.name = `Square`;
  }
}

class Rectangle extends Shape {
  // (width, height)
  // area does not need to be changed

  constructor(width, height) {
    super(width, height);
    // this.div.style.height = `${height}px`;
    // this.div.style.width = `${width}px`;
    this.div.addClass(`rectangle shape`);
    this.name = `Rectangle`;
  }
}

class Circle extends Shape {
  // takes radius, which is then doubled and passed as => (width, height)
  // area needs to take either width or height, then divide by 2 to get back to radius, then * radius * pi
  constructor(radius) {
    super(2 * radius, 2 * radius);
    // this.div.style.height = `${radius}px`;
    // this.div.style.width = `${radius}px`;
    this.div.addClass(`circle shape`);
    this.name = `Circle`;
  }

  calculateArea() {
    const radius = this.width / 2;
    return Math.trunc(Math.PI * radius * radius * 100) / 100;
  }
  calculatePerimeter() {
    const radius = this.width / 2;
    return Math.trunc(Math.PI * 2 * radius * 100) / 100;
  }
}

class Triangle extends Shape {
  // (0, height) to comply with css styling for right isosceles
  // needs to call area, then divide by 2

  constructor(height) {
    super(0, height);
    this.div.css("left", Shape.randomPosition(this.height));

    this.div.css("borderRight", `${height}px solid transparent`); // this is dom styling
    this.div.css("borderBottom", `${height}px solid yellow`);
    // this.div.css(border)
    this.div.addClass(`triangle shape`);
    this.name = `Triangle`;
  }

  calculateArea() {
    return 0.5 * this.height * this.height;
  }
  calculatePerimeter() {
    return Math.trunc((2 + Math.sqrt(2)) * this.height);
  }
}

let navName = $(`#sidenavShapeName`);
let navWidth = $(`#sidenavWidth`);
let navHeight = $(`#sidenavHeight`);
let navRadius = $(`#sidenavRadius`);
let navArea = $(`#sidenavArea`);
let navPerimeter = $(`#sidenavPerimeter`);

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

let funButton = $(`#funButton`);

let shapes = [];

rectangleButton.click(() => {
  // creates a new instance of a Rectangle
  if (onlyNums(rectangleWidthBox.val()) && onlyNums(rectangleHeightBox.val())) {
    let newRect = new Rectangle(decimalCorrector(rectangleWidthBox.val()), decimalCorrector(rectangleHeightBox.val()));
    console.log(newRect); //* logging
    addRotating();
    clearInputs();
  }
});

squareButton.click(() => {
  // creates a new instance of a Square
  if (onlyNums(squareBox.val())) {
    let newSquare = new Square(decimalCorrector(squareBox.val()));
    console.log(newSquare); //* logging
    addRotating();
    clearInputs();
  }
});

circleButton.click(() => {
  // creates a new instance of a Circle
  if (onlyNums(circleBox.val())) {
    let newCircle = new Circle(decimalCorrector(circleBox.val()));
    console.log(newCircle); //* logging
    addRotating();
    clearInputs();
  }
});

triangleButton.click(() => {
  // creates a new instance of a Triangle
  if (onlyNums(triangleBox.val())) {
    let newTriangle = new Triangle(decimalCorrector(triangleBox.val()));
    console.log(newTriangle); //* logging
    addRotating();
    clearInputs();
  }
});

let rotateState = false;

funButton.click(() => {
  // toggles the `rotate` class on all shapes in the shapeContainer div
  if (rotateState) {
    rotateState = false;
    shapeContainer.children().removeClass(`rotate`);
  } else {
    rotateState = true;
    shapeContainer.children().addClass(`rotate`);
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

let addRotating = function () {
  // allows for adding new shapes that will rotate while rotateState is true
  if (rotateState) {
    shapeContainer.children().addClass(`rotate`);
  }
};
