const request = require("request"); // Importing request library
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error !== null) {
      callback(`Error ${error.code} occured during accessing host ${error.hostname}.`, null);
      return;
    }
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const obj = JSON.parse(body); // Deserialize: parse body string into JSON object
    const ip = obj.ip;
    callback(null, ip);
  });
};
//fetchCoordsByIP takes in an IP address and returns the latitude and longitude for it.
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(`Error while getting information from API" ${error}`, null);
      return;
    }
    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(message), null);
      return;
    }
    // parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const fetchlatitude = parsedBody.latitude;
    const fetchlongitude = parsedBody.longitude;
    const coordinates = {lat: fetchlatitude, long: fetchlongitude};
    callback(null, coordinates);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys 'latitude' and 'longitude'
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 *
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const flyOverUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(flyOverUrl, (error, response, body) => { // request callbcak
    if (error) {
      callback(error, null); // error for invalid url etc
      return;
    }

    // Non-200 status code error i-e  server error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    callback(null, JSON.parse(body).response);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};