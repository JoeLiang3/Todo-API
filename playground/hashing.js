const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123abc";
// bcrypt.genSalt(10, (error, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// });

var hashedPassword = '$2a$10$FzQwmsWYc7jiGFrZRkqwZOq0sgP57uTJva9ogl396SpTJuRyYz.M2';

bcrypt.compare('abcd1e', hashedPassword, (err, res) => {
  console.log(res);
})
// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data,'abc');
// console.log(token);
//
// var decoded = jwt.verify(token, 'abc');
// console.log(decoded);
// jwt.sign
// jwt.verify

// var message = 'I am user number 3'
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + `somesecret`).toString()
// }
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + `somesecret`).toString();
//
// if(resultHash === token.hash) {
//   console.log("data was not changed");
// } else {
//   console.log('data was changed, dont trust');
// }
