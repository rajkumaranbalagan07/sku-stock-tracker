// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = 'AC4afd929528a87c8502583ed3ce8273cf';
const authToken = 'de4d45c0d469b87d88e2fce62ce2e11e';
const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '+919751888646',
    from: '+14302305158',
  })
  .then((call) => console.log(call.sid));
