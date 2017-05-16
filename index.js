var app = require('./app/main.js')
var args = process.argv;

if(isNaN(args[2])){
  console.log("Argument must be an integer album id");
}else{
  app.main(args[2])
}
