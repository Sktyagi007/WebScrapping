const fs = require("fs");
console.log("before");
// let content = fs.readFileSync("file.txt");
// console.log(content+"");
// *************************************************
// or asynchronously
// *************************************************
fs.readFile("file.txt",cb);
function cb(error,data){
    console.log(data+" ");
}
console.log("after");