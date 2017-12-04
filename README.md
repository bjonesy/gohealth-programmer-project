# Gohealth Urgent Care Programmer Project

A form that captures and stores a patient's demographic and insurance information.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

* `npm install`
* `yarn install`

### Development

* `npm start`
* `yarn start`

### Deployment

* `npm run build`
* `yarn run build`

## Description

On form submission a patient's information will be saved and posted to the proxied server route `/form-submissions` and will enter the patient's information into a Mongo DB for storage.  The server route `/form-posts` is used to retrieve the form posts from the Mongo DB.  Since I was unable to complete connecting to the Eligibility API, I added a staffing display page for the form posts  that is located at the app's router route `/submissions`.  There is validation for the form fields and will not allow the user to submit the form without required information.   

## Built With

* This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
* [Redux](https://github.com/reactjs/redux).
* [Express](https://github.com/expressjs/express).
* [Mongo DB](https://github.com/mongodb/node-mongodb-native).

## Issues

I was unable to connect to the Insurance Eligibility API.  Below you can find the example `curl` call that was given in the instructions.  There was mention of a possible SSL validation error when trying to connect.  There were no other specifics given about the SSL validation error.  When trying to connect using the Postman client and the terminal the connection returns a timeout error.  Even with with SSL bypassing enabled, the authtoken I was given & CORS headers in the requests.  I need more information and specifics to figure out what I am missing here.  

```
// Times out
curl --insecure -d '{"member": {"first_name": "Rita", "last_name": "Book", "id": "345123987", "birth_date": "19991-10-31"}, "provider":{"first_name": "Marty", "last_name": "Seeger", "npi": "1234567890"}, "trading_partner_id": "united_health_care"}' -H 'authtoken: ghbrandon2046' -X POST https://apistage.gohealthuc.com:1981/v1/eligibility_demo

/**
 * Check health insurance using https://apistage.gohealthuc.com
 *
 * Currently not working. Unable to connect even with SSL validation turned off
 * @return {object}
 */
checkHealthCarrier = () => {
  // Avoid SSL
  const agentOptions = {
      rejectUnauthorized: false,
  }
  const agent = new https.Agent(agentOptions)

  const body = {
    member: {first_name: 'Rita', 'last_name': 'Book', id: '345123987', birth_date: '19991-10-31'}, 
    provider: {first_name: 'Marty', last_name: 'Seeger', npi: '1234567890'}, 
    trading_partner_id: 'united_health_care'
  }

  axios.post('https://apistage.gohealthuc.com:1981/v1/eligibility_demo', {
    agent,
    headers: {
      'authtoken': 'ghbrandon2046',
      'Acces-Control-Allow-Origin': 'http://localhost:3000',
    },
    body: body
  })
  .then(function (response) {
    // 405 error
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  }); 
}
```

## TODOS

* More tests
* Connect to Insurance Eligibility API