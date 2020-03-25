/*
- async/await syntax greatly simplifies JavaScript code by
 making it more readable and shorter. 

- It removes the need for 
many of external flow control libraries to deal with asynchronous code

- It also unifies the error handling with the vanilla try ... catch construct, 
a single syntax to handle both synchronous & asynchronous errors. 

- Starting from the version 7.6, Node.js provides native support for async/await

- async function are based on promises, i.e. its return value is 
always a promise. You can use await only within a 
function declared as async. Entities being awaited are in fact
 promises.

 // `request` returns a promise
request("http://url.com")
  .then(response => {
    // handle the HTTP response
  })
  .catch(error => {
    // handle error
  })

*/

async function unexpected() {
  const randomDelay1 = Math.floor(Math.random() * 1000 * 2);
  const randomDelay2 = Math.floor(Math.random() * 1000 * 2);

  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => resolve('Hello, World!'), randomDelay1);
      setTimeout(() => reject(new Error('Something went wrong')), randomDelay2);
    });

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

unexpected();
console.log("Do some other task")

// then also works as in promise
async function awaitable() {
  await { then: resolve => setTimeout(() => resolve(), 1000) };
}
awaitable();

/*

//Handling promsise errors with async await
// try {
  const response = await request("http://url.com");
  // handle the HTTP response
} catch(error) {
  // handle error
}


// requests are made one after another
const response1 = await request("http://url-1.com");
const response2 = await request("http://url-2.com");


Promise.all waits for every promise from an array to resolve and then 
resolves itself to an array containing the values of resolved promises.

const request = require('request');

async function concurrentRequests() {
  const urls = [
    'https://domain1.com',
    'https://domain2.com',
    'https://domain3.com',
  ];

  const requests = urls.map(request);
  console.log(await Promise.all(requests));
}
concurrentRequests();


Promise.race waits for the first promise from an array 
to resolve and the resolves itself to a value of that promise. 

The remaining promises will continue executing as promises are
 not (yet) cancellable.

async function execute(ms) {
  await new Promise(resolve => setTimeout(() => resolve(), ms));
  console.log('Worker executed for', ms);
}

async function main() {
  const workers = [333, 666, 999].map(execute);
  console.log('First who finished', await Promise.race(workers));
}

main();


More and confusing code without async.await:

const getInfo = () => 
  axios.get('/users')
    .then(users => {
      console.log(users)
    })
    .then(() => getGroups())
    .then(groups => {
      console.log(groups)
    })
    .then(() => getFavorites())
    .then(favorites => {
      console.log(favorites)
      return 'all done'
    }

getInfo()

To this with less code use async/awiat 

const getInfo = async () => {
   console.log(await axios.get('/users'))
   console.log(await getGroups())
   console.log(await getFavorites())
   return 'all done';
  }
  getInfo();
*/