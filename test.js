const interpreter = require('./interpreter');

const result = interpreter.run(`24* 6 - 2`);
console.log(result);