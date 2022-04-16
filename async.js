const fs = require("fs");
console.log("before");
fs.readFile("file.txt",cb);
fs.readFile("file1.txt",cb1);
function cb(error,data){
    console.log("file1-->"+data);
}
function cb1(error,data){
    console.log("file2-->"+data);
}
console.log("after");