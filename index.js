const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('174.92.2.53', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error.message);
    return;
  }
  console.log('It worked! Returned', coordinates);
});