//const { fetchMyIP, fetchCoordsByIP } = require('./iss');
const {nextISSTimesForMyLocation} = require('./iss_promised');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('174.92.2.53', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error.message);
//     return;
//   }
//   console.log('It worked! Returned Coordinates:', coordinates);
// });

printPassTimes = (passTimes) => {
  for (let everyPass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(everyPass.risetime);
    const duration = everyPass.duration;
    console.log(`Next pass is at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error.message);
  }
  printPassTimes(passTimes);
});

module.exports = { printPassTimes };