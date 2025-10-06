// 1. Print out 'PROGRAM STARTED' at the start
console.log('PROGRAM STARTED');

// 2. Create a promise that resolves after 3 seconds
const myPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});

// 3. Log out the promise while it's pending
console.log(myPromise); // Will show Promise <pending>

// 4. Print out 'program in progress...'
console.log('program in progress...');

// 5. Print out 'program complete' when the promise completes after 3s
myPromise.then(() => {
  console.log('program complete');
});
