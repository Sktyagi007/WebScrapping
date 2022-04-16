const request = require("request");
const jsdom = require("jsdom");
let fs = require("fs");
let path = require("path");
const { execFileSync } = require("child_process");
const { existsSync } = require("fs");
const { JSDOM } = jsdom;


const link = "https://github.com/topics";

request(link,cb);


function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let allAnchorTags = document.querySelectorAll(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<allAnchorTags.length;i++){
            let link = allAnchorTags[i].href;
            let allData = path.join(__dirname,"allData");
            // console.log(allData);
            if(! fs.existsSync(allData)){
                fs.mkdirSync(allData);
            }
            
            let topics = path.join(allData,link);
            console.log(topics);
            if(! fs.existsSync(topics)){
                fs.mkdirSync(topics);
            }
            
            let completeLink = "https://github.com"+link;
            // console.log(link);
            request(completeLink,cb2);
        }
    }
}


function cb2(error,response,html){
    if(error){
        console.log(error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
    }
}