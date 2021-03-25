const jwt = require('jsonwebtoken');

const jwtVerify = (jwtToken) => new Promise((resolve, reject) => {
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err,user) => {
        if (err) {
          console.log("lalal",err);
          reject(err);
        }
        resolve(user);
    });
});


module.exports = { jwtVerify }