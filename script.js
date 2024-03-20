'use strict';

/////////////////////VALUE VS REFERENCE/////////////////////
// JS only passes by value not reference
//the reference itself is still a value but a value that contains a memory address meaning WE PASS A REFERENCE TO THE FUNCTION BUT WE DO NOT PASS BY REFERENCE
const flight = 'LH234';
const jerome = {
  name: 'jerome challet',
  passport: 2193874029,
};

const checkIn = function (flightNum, passenger) {
  // changing the param of a function is bad practice
  flightNum = 'LH253';
  passenger.name = 'Mr ' + passenger.name;
  if (passenger.passport === 2193874029) {
    alert('check in ok');
  } else {
    alert('wrong passport');
  }
};

checkIn(flight, jerome);
//here flight is a copy of the original value cause its a primitive
console.log(flight); // LH234
// but an obj is a reference type
// when we pass a ref type to a func, what is copied is the ref to the obj in the memory heap but they both point to the same obj in the memory
console.log(jerome); // Mr Jerome Challet

//we now have 2 functions manipulating the same object
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jerome);
checkIn(flight, jerome); // wrong passport alert

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
