'use strict';

/////////////////////CALL AND APPLY METHOD/////////////////////
const luftthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

luftthansa.book(239, 'Jerome Challet');
luftthansa.book(635, 'john smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = luftthansa.book;

// the this keyword depends on how a function is actually called
// it's undefined cause this func is a regular function call
// the this keyword points to undefined in regular functions
// it's a copy of luftthansa.book but it's not a method anymore
// it's a function
book(23, 'albert einstein'); // cannot read prop airline of undefined

// Call Method
// to fix the above issue we need to sepcifically define "this"
// with call, appply and bind
book.call(eurowings, 23, 'albert einstein');
book.call(luftthansa, 239, 'john doe');

const swiss = {
  airline: 'swiss air lines',
  iatCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'samuel jackson');

// Apply Method
// the difference with call is that apply apply takes an array instead of a list of arg
const flightData = [583, 'mr x'];
book.apply(swiss, flightData);

// using the ... is the same as the apply method above
book.call(swiss, ...flightData);

/////////////////////BIND METHOD/////////////////////
// it returns a new function where the this keyowrd is bound
// it will not use the book function but a new function
// in which this will always be set to this
const bookEW = book.bind(eurowings);
const bookLW = book.bind(luftthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'albert einstein');

// partial application is where a part of the argument is already applied
const bookEW23 = book.bind(eurowings, 23);
bookEW23('person1');
bookEW23('person2');
bookEW23('person3');
bookEW23('person4');

// with event listeners
luftthansa.planes = 300;
//in an event handler function "this" always points to the element on which that handler is attached to
//there "this" in this case is the button element
// so we need to manually define "this" with bind because it will return a new function
luftthansa.buyPlane = function () {
  console.log(this); // returns the button

  this.planes++;
  console.log(this.planes); //NaN
};

// document
//   .querySelector('.buy')
//   .addEventListener('click', luftthansa.buyPlane);
document
  .querySelector('.buy')
  .addEventListener('click', luftthansa.buyPlane.bind(luftthansa));

// Partial application (we can preset parameters)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// here we reuse the addTax function but we change its first arg
// we use bind on addTax to preset the rate
// we can here calculate the VAT with whatever value we provide it
//because we dont have to bother with "this" we don't need to define objName and set it to null instead
// the important thing is we create a brand new specific function
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// challenge function returning another function
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

/////////////////////FUNCTIONS RETURNING FUNCTIONS/////////////////////
//returns a greeting
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('hey');
// greeterHey('jerome'); // hey jerome

// greet('hello')('jerome'); // hello jerome

// //challenge
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);
// greet('hello')('jerome'); // hello jerome

/////////////////////FUNCTIONS ACCEPTING CALLBACK FUNCTIONS/////////////////////
//callback functions allow to create absctraction this we hide the complexity
//replaces spaces in a word
// / /g will select all the spaces
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };
// //transforms the first word into uppercase
// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //higher order function
// const transformer = function (str, fn) {
//   //Javascript is awesome to learn
//   console.log('original string: ', str);
//   //JAVASCRIPT is awesome to learn
//   console.log(`Transformed string: ${fn(str)}`);
//   //Transformed by: upperFirstWord
//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('Javascript is awesome to learn', upperFirstWord);
// transformer('Javascript is awesome to learn', oneWord);

// const high5 = function () {
//   console.log('✋');
// };

// document.body.addEventListener('click', high5); //  ✋

// ['jerome', 'john', 'adam'].forEach(high5); // 3 x ✋

/////////////////////VALUE VS REFERENCE/////////////////////
// JS only passes by value not reference
//the reference itself is still a value but a value that contains a memory address meaning WE PASS A REFERENCE TO THE FUNCTION BUT WE DO NOT PASS BY REFERENCE
// const flight = 'LH234';
// const jerome = {
//   name: 'jerome challet',
//   passport: 2193874029,
// };

// const checkIn = function (flightNum, passenger) {
//   // changing the param of a function is bad practice
//   flightNum = 'LH253';
//   passenger.name = 'Mr ' + passenger.name;
//   if (passenger.passport === 2193874029) {
//     alert('check in ok');
//   } else {
//     alert('wrong passport');
//   }
// };

// checkIn(flight, jerome);
// //here flight is a copy of the original value cause its a primitive
// console.log(flight); // LH234
// // but an obj is a reference type
// // when we pass a ref type to a func, what is copied is the ref to the obj in the memory heap but they both point to the same obj in the memory
// console.log(jerome); // Mr Jerome Challet

// //we now have 2 functions manipulating the same object
// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
// };

// newPassport(jerome);
// checkIn(flight, jerome); // wrong passport alert

/////////////////////DEFAULT PARAMETERS/////////////////////
// const bookings = [];
// //airline booking function
// //use the data passed as a parameter to create an object that is then pushed into an array
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   //default parameter ES5 way
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// // cannot skip arguments in a function, must use a space
// createBooking('LH123', 800); // 800 will be the nb of passengers
// createBooking('LH123', undefined, 800);
