 console.log("Program Started");

const promise1 = new Promise((resolve, reject) => {
   setTimeout(() => {
       resolve();
   }, 3000);

   setTimeout(() => {
     reject();
   }, 2000);
 });

 console.log(promise1);
 console.log("Program in progress");

 promise1
   .then(() => {
     console.log("Program Complete");
   })
   .catch(() => {
     console.log("Program failure");
     });

