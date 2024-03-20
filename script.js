'use strict';

/////////////////////DEFAULT PARAMETERS/////////////////////
const bookings = [];
//airline booking function
//use the data passed as a parameter to create an object that is then pushed into an array
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //default parameter ES5 way
  // numPassengers = numPassengers || 1;
  // price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
// cannot skip arguments in a function, must use a space
createBooking('LH123', 800); // 800 will be the nb of passengers
createBooking('LH123', undefined, 800);
